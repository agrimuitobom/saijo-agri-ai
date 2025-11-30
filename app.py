import streamlit as st
import google.generativeai as genai
from PIL import Image

# ==========================================
# 設定エリア
# ==========================================
# ★ここを変更しました★
# Streamlit Cloudの「Secrets（金庫）」からキーを取得します
try:
    API_KEY = st.secrets["GEMINI_API_KEY"]
except:
    st.error("APIキーが設定されていません。Streamlit CloudのSecrets設定を確認してください。")
    st.stop()

genai.configure(api_key=API_KEY)

# モデル設定 (最新のGemini 2.5を指定)
model = genai.GenerativeModel("gemini-2.5-flash")

# ==========================================
# アプリの画面構成
# ==========================================
st.title("西条農業高校 病害虫診断AI 🌿")
st.write("作物の写真をアップロードすると、Geminiが病害虫を診断します。")

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
                response = model.generate_content([prompt, image])
                st.markdown("### 🔍 診断結果")
                st.write(response.text)
            except Exception as e:
                st.error(f"エラーが発生しました: {e}")
