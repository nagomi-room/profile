# Profile

のどか（[@nodoka_twst](https://x.com/nodoka_twst)）のプロフィールサイト。
ビルド不要・外部ライブラリ不要の HTML / CSS / JavaScript です。

## 構成

```text
index.html                 のどかページへの入口
nodoka/
  index.html               のどかの本文
  profile.js               のどかの画像設定
  images/                  確認済みの画像のみを保存
assets/
  css/profile.css          共通デザイン・レスポンシブ対応
  js/profile.js            共通ギャラリー・拡大・ネタバレ制御
docs/content-status.md     素材と本文の確認状況
AGENTS.md                  開発方針
.github/workflows/pages.yml
```

将来は `account-name/index.html` と個別の `profile.js`、`images/` を追加し、共通CSS・JSを参照します。各プロフィール間へのリンクは設置しません。ルートの入口は現在の「のどか」を維持できます。

## 本文と画像

本文と画像は既存リトリン（https://lit.link/nodoka_twst ）から 2026-11-12 に移行しました。移行内容・画像一覧・未確認事項は [docs/content-status.md](docs/content-status.md) を確認してください。リトリンにない個人情報・好み・交流条件は追加していません。

本文は `nodoka/index.html` を直接編集します。単独の画像は `<a class="zoom" href="images/…" data-zoom><img …></a>` の形で置くと、JavaScript 有効時は拡大ダイアログ、無効時は画像ファイルへのリンクになります。

ギャラリー画像は `nodoka/images/` に置き、`nodoka/profile.js` の配列に追加します。

```js
window.ProfileGalleries.mount({
  twst: [
    { src: 'images/twst-01.webp', width: 960, height: 540, alt: '画像の説明', caption: '', spoiler: false },
    { src: 'images/twst-dialogue-01.webp', width: 400, height: 183, alt: '表示後に読む画像の説明', warning: '⚠️7章ネタバレ', spoiler: true }
  ],
  sprk: []
});
```

セリフ・ストーリー画像は `spoiler: true` とし、`warning` に内容を含まない警告ラベル（例：⚠️7章ネタバレ）を入れます。初期状態では画像要素を作成せず、説明文・拡大表示にも内容を出しません。明示的に表示した画像だけを拡大の前後操作に含めます。「隠す」またはページ再読み込みで非表示に戻ります。画像は適切な WebP/JPEG/PNG に圧縮し、用途に応じて横幅 1200–1800px 程度を目安にしてください。確認していない代替画像は使いません。

JavaScript が無効でも本文とリンクは読めます。ギャラリーは JavaScript が必要です。ダイアログ非対応ブラウザーでは画像を新しいタブで開きます。

## ローカル確認

リポジトリの親ディレクトリから `python3 -m http.server 8000` を実行し、`http://localhost:8000/profile/nodoka/` を開きます。GitHub Pages の `/profile/` と同じ相対パスで確認できます。

## GitHub Pages

1. この変更を `main` ブランチへ反映します。
2. GitHub の Settings → Pages → Build and deployment → Source を **GitHub Actions** にします。
3. `Deploy profile to GitHub Pages` ワークフローの成功を確認します。

公開予定URL: `https://nagomi-room.github.io/profile/nodoka/`

ルート `https://nagomi-room.github.io/profile/` からも移動できます。独自ドメインやサーバー設定は不要です。公開ファイルは `index.html`・`assets/`・`nodoka/` のみで、開発文書は配信しません。サイトは静的な趣味プロフィールで、解析・Cookie・外部フォント・広告を使用しません。
