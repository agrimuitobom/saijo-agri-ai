import streamlit as st
from google import genai
from PIL import Image

# ==========================================
# 設定エリア
# ==========================================
# ★ここを変更しました★
# Streamlit Cloudの「Secrets（金庫）」からキーを取得します
try:
    API_KEY = st.secrets["GEMINI_API_KEY"]
except (KeyError, FileNotFoundError):
    st.error("APIキーが設定されていません。Streamlit CloudのSecrets設定を確認してください。")
    st.stop()

# 新SDK (google-genai) のクライアントを初期化
client = genai.Client(api_key=API_KEY)

# モデル設定 (最新のGemini 2.5を指定)
MODEL_NAME = "gemini-2.5-flash"

# ==========================================
# アプリの画面構成
# ==========================================
st.title("西農PLANTDOC 🌿")
st.write("作物の写真をアップロードすると、Geminiが病害虫を診断します。")
st.caption("⚠️ AIによる診断は参考情報です。誤診の可能性があるため、農薬の使用や防除を行う前に、必ず先生や専門家にご確認ください。")

uploaded_file = st.file_uploader("写真を撮ってアップロードしてください", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption='アップロードされた写真', use_container_width=True)
    
    if st.button("AIで診断する"):
        with st.spinner('AIが診断中...'):
            try:
                prompt = """
                あなたは農業高校の専門的な指導員です。
                この画像を分析し、以下のフォーマットで回答してください。
                
                1. **推測される状況**: 作物名と、見られる症状（病気や害虫の可能性）
                2. **確信度**: 高・中・低
                3. **対策アドバイス**: 生徒にもわかるような具体的な対処法
                """
                response = client.models.generate_content(
                    model=MODEL_NAME,
                    contents=[prompt, image],
                )
                st.markdown("### 🔍 診断結果")
                st.write(response.text)
                st.caption("※ この結果はAIによる推測です。対応の前に先生・専門家への確認をお願いします。")
            except Exception as e:
                st.error(f"エラーが発生しました: {e}")
