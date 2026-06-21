import os
from datetime import datetime

import streamlit as st
from google import genai
from PIL import Image, ImageOps, UnidentifiedImageError

# ==========================================
# 設定エリア
# ==========================================
# モデル設定 (最新のGemini 2.5を指定)
MODEL_NAME = "gemini-2.5-flash"

# 画像の制限設定
MAX_FILE_SIZE_MB = 10          # アップロード可能なファイルサイズの上限
MAX_IMAGE_DIMENSION = 1568     # 長辺をこのサイズまで縮小（API安定・コスト/速度対策）

# 診断用プロンプト
DIAGNOSIS_PROMPT = """
あなたは農業高校の専門的な指導員です。アップロードされた画像を分析し、生徒に向けて日本語で回答してください。

# 重要な前提
- 画像に作物・植物が写っていない場合、または不鮮明で判断できない場合は、無理に診断しないでください。「作物が判別できません」と伝え、明るい場所で患部に近づいて撮り直すようアドバイスしてください。
- 確実でない場合は断定を避け、確信度を「低」としてください。

# 回答フォーマット（以下のMarkdown見出しで出力してください）
## 1. 推測される状況
作物名と、見られる症状（病気・害虫の可能性）。判別できない場合はその旨を記載。

## 2. 確信度
「高 / 中 / 低」のいずれかを記載し、その理由を一言添える。

## 3. 対策アドバイス
生徒にもわかる具体的な対処法を箇条書きで。農薬を使用する場合は必ず指導者に相談するよう添える。
"""


# ==========================================
# ヘルパー関数
# ==========================================
def get_api_key():
    """APIキーを取得する。Streamlit CloudのSecretsを優先し、
    無ければ環境変数 GEMINI_API_KEY にフォールバックする（ローカル開発用）。"""
    try:
        return st.secrets["GEMINI_API_KEY"]
    except (KeyError, FileNotFoundError):
        return os.environ.get("GEMINI_API_KEY")


def load_image(uploaded_file):
    """アップロードファイルを検証・前処理する。
    成功時は (画像, None)、失敗時は (None, エラーメッセージ) を返す。"""
    file_size_mb = uploaded_file.size / (1024 * 1024)
    if file_size_mb > MAX_FILE_SIZE_MB:
        return None, (
            f"ファイルサイズが大きすぎます（{file_size_mb:.1f}MB）。"
            f"{MAX_FILE_SIZE_MB}MB以下の画像をアップロードしてください。"
        )

    try:
        image = Image.open(uploaded_file)
        image = ImageOps.exif_transpose(image)  # スマホ写真の向きを補正
        image = image.convert("RGB")            # RGBA/パレット等をRGBに統一
    except (UnidentifiedImageError, OSError):
        return None, "画像を読み込めませんでした。ファイルが破損しているか、対応していない形式の可能性があります。"

    # 大きすぎる画像を縮小（APIエラー・コスト・速度の対策）
    if max(image.size) > MAX_IMAGE_DIMENSION:
        image.thumbnail((MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION))

    return image, None


def build_report(result_text, when):
    """ダウンロード用の診断結果テキストを組み立てる。"""
    return (
        f"西農PLANTDOC 診断結果\n"
        f"診断日時: {when.strftime('%Y-%m-%d %H:%M')}\n"
        f"{'-' * 30}\n\n"
        f"{result_text}\n\n"
        f"{'-' * 30}\n"
        f"※ この結果はAIによる推測です。対応の前に先生・専門家にご確認ください。\n"
    )


# ==========================================
# 初期化
# ==========================================
API_KEY = get_api_key()
if not API_KEY:
    st.error(
        "APIキーが設定されていません。Streamlit CloudのSecrets、"
        "またはローカルでは環境変数 GEMINI_API_KEY を設定してください。"
    )
    st.stop()

client = genai.Client(api_key=API_KEY)

if "results" not in st.session_state:
    st.session_state["results"] = {}  # file_id -> 診断結果テキスト


# ==========================================
# アプリの画面構成
# ==========================================
st.title("西農PLANTDOC 🌿")
st.write("作物の写真をアップロードすると、Geminiが病害虫を診断します。")
st.caption("⚠️ AIによる診断は参考情報です。誤診の可能性があるため、農薬の使用や防除を行う前に、必ず先生や専門家にご確認ください。")

uploaded_files = st.file_uploader(
    "写真を撮ってアップロードしてください（複数枚可）",
    type=["jpg", "jpeg", "png"],
    accept_multiple_files=True,
)

if uploaded_files:
    # 現在アップロードされていないファイルの古い結果を掃除する
    current_ids = {f.file_id for f in uploaded_files}
    st.session_state["results"] = {
        k: v for k, v in st.session_state["results"].items() if k in current_ids
    }

    for uploaded_file in uploaded_files:
        st.divider()

        image, error = load_image(uploaded_file)
        if error:
            st.error(f"【{uploaded_file.name}】{error}")
            continue

        st.image(image, caption=uploaded_file.name, use_container_width=True)

        if st.button("AIで診断する", key=f"diagnose_{uploaded_file.file_id}"):
            with st.spinner(f"AIが診断中...（{uploaded_file.name}）"):
                try:
                    response = client.models.generate_content(
                        model=MODEL_NAME,
                        contents=[DIAGNOSIS_PROMPT, image],
                    )
                    st.session_state["results"][uploaded_file.file_id] = (response.text or "").strip()
                    st.toast(f"診断が完了しました（{uploaded_file.name}）", icon="✅")
                except Exception as e:
                    st.session_state["results"].pop(uploaded_file.file_id, None)
                    st.error(f"エラーが発生しました: {e}")

        # 診断結果の表示（ダウンロード押下で再実行されても結果を保持する）
        result_text = st.session_state["results"].get(uploaded_file.file_id)
        if result_text == "":
            st.warning("診断結果を取得できませんでした。別の写真でもう一度お試しください。")
        elif result_text:
            st.markdown("### 🔍 診断結果")
            st.write(result_text)
            st.caption("※ この結果はAIによる推測です。対応の前に先生・専門家への確認をお願いします。")

            now = datetime.now()
            st.download_button(
                label="📄 診断結果をダウンロード",
                data=build_report(result_text, now).encode("utf-8"),
                file_name=f"plantdoc_{now.strftime('%Y%m%d_%H%M%S')}.txt",
                mime="text/plain",
                key=f"download_{uploaded_file.file_id}",
            )
