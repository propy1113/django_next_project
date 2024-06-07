プロジェクトのディレクトリ構造を表示するコマンド
```
tree -I '.git|node_modules'
```

Djangoの管理画面のユーザ情報
`python manage.py createsuperuser`でユーザを作成する。
ユーザ名：admin
パスワード：admin

## プロジェクトを立ち上げてから使用したコマンド

### backend
    python manage.py startapp notes
    python manage.py makemigrations
    python manage.py migrate

### frontend
    npx -y create-next-app next_app    #コマンド実行時に色々聞かれるため、DockerfileのCMDで自動で立ち上がらなかった（TypeScriptのインストールなど...）
    #npm install axios
    npm install -D tailwindcss
    npx tailwindcss init -p

settigns.pyの設定
```
ALLOWED_HOSTS = [0.0.0.0]
INSTALLED_APPLS = [
    ... ,
    'rest_framework',
    'corsheaders',    #フロントからバックへPOSTリクエスト送信時にセキュリティ関係のエラーがでるのを解決するために必要（Djangoの仕様らしい）
    'myapp',          #startappコマンドで作成したアプリ名を追記
]
MIDDLEWARE = [
    ... ,
    'corsheaders.middleware.CorsMiddleware',    #フロントからバックへPOSTリクエスト送信時にセキュリティ関係のエラーがでるのを解決するために必要（Djangoの仕様らしい）
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",    #フロントからバックへPOSTリクエスト送信時にセキュリティ関係のエラーがでるのを解決するために必要（Djangoの仕様らしい）
]
```


## tailwindcssの設定

### stylesディレクトリの作成
    mkdir styles
    
### ./styles/globals.cssを作成/設定
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ./pages/_app.jsを作成/設定
```
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
export default MyApp
```

### ./next.config.jsを作成/設定
```
// next.config.js
module.exports = {
    // ...
    cssModules: true,
    // ...
};
```

### ./postcss.config.jsを作成/設定
```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### ./tailwind.config.jsを作成/設定
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
