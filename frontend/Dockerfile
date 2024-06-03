# ベースイメージ
FROM node:18.17.0

# 作業ディレクトリを設定
WORKDIR /usr/src/app/

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# axiosをインストール
RUN npm install axios

# アプリケーションコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# コマンドを実行
CMD ["sh", "-c", "npx -y create-next-app next_app"]
