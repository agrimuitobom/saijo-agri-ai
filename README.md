# 西農PLANTDOC 🌿

作物の写真をアップロードすると、Google Gemini が病害虫を診断してくれる Streamlit アプリです。
農業高校での学習用途を想定しています。

> ⚠️ **注意**: AIによる診断はあくまで参考情報です。誤診の可能性があるため、
> 農薬の使用や防除を行う前に、必ず先生や専門家にご確認ください。

## 主な機能

- 作物写真のアップロード（複数枚対応）
- Gemini による病害虫の診断（推測される状況・確信度・対策アドバイス）
- 画像の自動前処理（向き補正・RGB変換・サイズ縮小）
- 診断結果のテキストダウンロード

## 必要なもの

- Python 3.9 以上
- Google AI Studio で取得した Gemini API キー
  （https://aistudio.google.com/app/apikey で取得できます）

## ローカルでの実行方法

```bash
# 1. 依存ライブラリのインストール
pip install -r requirements.txt

# 2. APIキーを設定（いずれかの方法）

#  (A) 環境変数で渡す
export GEMINI_API_KEY="あなたのAPIキー"

#  (B) Streamlit の secrets ファイルを使う
#      .streamlit/secrets.toml を作成し、次の1行を記載:
#      GEMINI_API_KEY = "あなたのAPIキー"

# 3. アプリを起動
streamlit run app.py
```

ブラウザで `http://localhost:8501` が開きます。

> APIキーはコードや Git にコミットしないでください。
> `.streamlit/secrets.toml` は `.gitignore` で除外しています。

## Streamlit Community Cloud へのデプロイ

1. このリポジトリを GitHub に push する
2. [share.streamlit.io](https://share.streamlit.io) でアプリを作成し、
   リポジトリと `app.py` を指定する
3. **Settings → Secrets** に次を設定する:

   ```toml
   GEMINI_API_KEY = "あなたのAPIキー"
   ```

4. デプロイ後は、接続ブランチ（通常 `main`）へ push / マージすると自動で再デプロイされます。
   反映されない場合は **Manage app → Reboot app** を実行してください。

## 設定の調整

`app.py` 冒頭の定数で動作を変更できます。

| 定数 | 説明 | 既定値 |
|------|------|--------|
| `MODEL_NAME` | 使用する Gemini モデル | `gemini-2.5-flash` |
| `MAX_FILE_SIZE_MB` | アップロード可能なファイルサイズ上限 | `10` |
| `MAX_IMAGE_DIMENSION` | 縮小後の長辺サイズ（px） | `1568` |
| `DIAGNOSIS_PROMPT` | 診断用のプロンプト | — |

## 使用ライブラリ

- [streamlit](https://streamlit.io/)
- [google-genai](https://github.com/googleapis/python-genai)
- [Pillow](https://python-pillow.org/)
