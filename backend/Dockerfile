# ベースイメージ
FROM python:3.9

# 作業ディレクトリを設定
WORKDIR /usr/src/app/

# 必要なパッケージをインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# プロジェクトファイルをコピー
COPY . .

# ポートを公開
EXPOSE 8000

# コマンドを実行
CMD ["sh", "-c", "django-admin startproject django_project"]
