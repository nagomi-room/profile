/* Images and order migrated from https://lit.link/nodoka_twst (2026-11-12).
   Paths are relative to nodoka/index.html.
   Format: { src, width, height, alt, caption, warning, spoiler }
   - spoiler: true keeps the image, alt and caption out of the DOM until the
     viewer chooses to show it. `warning` is the source's own label
     (e.g. "⚠️7章ネタバレ") and is shown on the cover; it must not describe
     the content.
   - Captions and warnings use the wording from lit.link. */
window.ProfileGalleries.mount({
  twst: [
    {
      src: "images/twst-my-profile.webp",
      width: 960,
      height: 441,
      alt: "ゲーム内「MY PROFILE」画面のスクリーンショット",
      caption: "",
      spoiler: false,
    },
    {
      src: "images/twst-union-line.webp",
      width: 400,
      height: 184,
      alt: "台詞の画面：「年を重ねる度、階段をあがるように理想の美へ近づいてみせる。期待してなさい」",
      caption: "ユニオン獲得台詞",
      spoiler: false,
    },
    {
      src: "images/twst-chapter7-01.webp",
      width: 400,
      height: 183,
      alt: "ヴィルの台詞のストーリー画面：「偽りの王冠なんか、誰がかぶるもんですか。」",
      warning: "⚠️7章ネタバレ",
      spoiler: true,
    },
    {
      src: "images/twst-chapter7-02.webp",
      width: 400,
      height: 183,
      alt: "ヴィルの台詞のストーリー画面：「今この時、誰がこの世で一番美しいかはアタシが決めるわ！」",
      warning: "⚠️7章ネタバレ",
      spoiler: true,
    },
  ],
  splk: [
    {
      src: "images/splk-profile-screens.webp",
      width: 960,
      height: 695,
      alt: "ゲーム内のプロフィール、フォト詳細、スナップ詳細の3画面を並べたスクリーンショット",
      caption: "",
      spoiler: false,
    },
    {
      src: "images/splk-personal-story-01.webp",
      width: 381,
      height: 400,
      alt: "ディディの台詞のストーリー画面：「世の中には、才能の差に打ちひしがれ、悲しむ者も多い。」「だからこそ、俺がその者たちすべてを救ってみせよう。」「誰よりも才能を持たない、この俺が！」",
      warning: "⚠️ﾊﾟｿｽﾄﾈﾀﾊﾞﾚ",
      spoiler: true,
    },
    {
      src: "images/splk-personal-story-02.webp",
      width: 183,
      height: 400,
      alt: "ディディの台詞が縦に並ぶストーリーのログ画面（その1）",
      warning: "⚠️ﾊﾟｿｽﾄﾈﾀﾊﾞﾚ",
      spoiler: true,
    },
    {
      src: "images/splk-personal-story-03.webp",
      width: 183,
      height: 400,
      alt: "ディディの台詞が縦に並ぶストーリーのログ画面（その2）",
      warning: "⚠️ﾊﾟｿｽﾄﾈﾀﾊﾞﾚ",
      spoiler: true,
    },
  ],
});
