# Profile

のどか（[@nodoka_twst](https://x.com/nodoka_twst)）のプロフィールサイトです。
ビルド不要で、外部ライブラリを使わない HTML / CSS / JavaScript で作っています。

公開URL: https://nagomi-room.github.io/profile/nodoka/
（ルートの https://nagomi-room.github.io/profile/ からも移動します）

## 構成

```text
index.html                 のどかページへの入口
nodoka/
  index.html               のどかの本文
  profile.js               のどかのギャラリー設定
  images/                  掲載画像
assets/
  css/profile.css          共通デザイン・レスポンシブ対応
  js/profile.js            共通ギャラリー・拡大表示・ネタバレ制御
docs/content-status.md     本文・画像の出典と一覧
AGENTS.md                  開発方針
.github/workflows/pages.yml
```

アカウントを追加するときは、`account-name/index.html` と、そのアカウント用の `profile.js`・`images/` を作り、共通の CSS・JS を参照します。各プロフィール間にはリンクを置きません。

## 本文と画像

出典・画像一覧・未確認事項は [docs/content-status.md](docs/content-status.md) にまとめています。

- **本文**: `nodoka/index.html` を直接編集します。
- **単独の画像**: `<a class="zoom" href="images/…" data-zoom><img …></a>` の形で置きます。JavaScript が有効なら拡大ダイアログで開き、無効なら画像ファイルへのリンクとして働きます。
- **ギャラリー画像**: `nodoka/images/` に置き、`nodoka/profile.js` の配列に追加します。

```js
window.ProfileGalleries.mount({
  twst: [
    { src: 'images/twst-01.webp', width: 960, height: 540, alt: '画像の説明', caption: '', spoiler: false },
    { src: 'images/twst-dialogue-01.webp', width: 400, height: 183, alt: '表示後に読む画像の説明', warning: '⚠️7章ネタバレ', spoiler: true }
  ],
  splk: []
});
```

### ネタバレ画像

セリフやストーリーの画像は `spoiler: true` にし、`warning` には内容に触れない警告ラベル（例：⚠️7章ネタバレ）を入れます。

- **表示前**: 画像要素も alt もキャプションも作りません。拡大表示の前後送りにも含めません。
- **表示ボタンを押したとき**: その画像をそのまま拡大表示します。閉じると、ギャラリー内のその画像に操作位置（フォーカス）が戻ります。
- **再び隠す**: 「ネタバレ画像を隠す」を押すか、ページを再読み込みすると隠れます。

### JavaScript が無効なとき

本文・単独画像・ネタバレでないギャラリー画像は、`<noscript>` 内のリンクとして表示されます。ネタバレ画像は表示されません。`dialog` 要素に対応していないブラウザーでは、画像を新しいタブで開きます。

### 画像の形式

WebP などに圧縮して置きます。元画像より大きく引き伸ばしたり、確認していない代わりの画像を使ったりはしません。

## ローカル確認

リポジトリの親ディレクトリで `python3 -m http.server 8000` を実行し、`http://localhost:8000/profile/nodoka/` を開きます。公開時と同じ `/profile/` 配下のパスで確認できます。

## GitHub Pages

公開には GitHub Actions を使います（Settings → Pages → Source: GitHub Actions）。

`main` に push すると、`Deploy profile to GitHub Pages` ワークフローが動いて公開されます。公開されるのは `index.html`・`assets/`・`nodoka/` だけで、開発用の文書は公開されません。

解析ツール・Cookie・外部フォント・広告は使っていません。
