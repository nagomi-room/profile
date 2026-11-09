/* Shared, dependency-free profile interactions. */
(() => {
  "use strict";
  const dialog = document.querySelector(".lightbox");
  let active = [],
    current = 0,
    trigger = null;
  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };
  const button = (className, text, action) => {
    const el = make("button", className, text);
    el.type = "button";
    el.addEventListener("click", action);
    return el;
  };
  const drawLightbox = () => {
    const item = active[current];
    const img = dialog.querySelector(".lightbox-image");
    img.src = item.src;
    img.alt = item.alt;
    dialog.querySelector(".lightbox-caption").textContent = item.caption || "";
    dialog.querySelector(".lightbox-counter").textContent =
      `${current + 1} / ${active.length}`;
    dialog.querySelector(".lightbox-prev").disabled = current === 0;
    dialog.querySelector(".lightbox-next").disabled =
      current === active.length - 1;
  };
  const move = (delta) => {
    current = Math.max(0, Math.min(active.length - 1, current + delta));
    drawLightbox();
  };
  const open = (item, gallery, source) => {
    if (!dialog || typeof dialog.showModal !== "function") {
      window.open(item.src, "_blank", "noopener,noreferrer");
      return;
    }
    // Never include a concealed spoiler in modal navigation.
    active = gallery.filter((entry) => !entry.spoiler || entry.revealed);
    current = active.indexOf(item);
    trigger = source;
    drawLightbox();
    document.body.classList.add("has-lightbox");
    dialog.showModal();
  };
  if (dialog) {
    dialog
      .querySelector(".lightbox-close")
      .addEventListener("click", () => dialog.close());
    dialog
      .querySelector(".lightbox-prev")
      .addEventListener("click", () => move(-1));
    dialog
      .querySelector(".lightbox-next")
      .addEventListener("click", () => move(1));
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("has-lightbox");
      const img = dialog.querySelector(".lightbox-image");
      img.removeAttribute("src");
      img.alt = "";
      dialog.querySelector(".lightbox-caption").textContent = "";
      active = [];
      trigger?.focus();
    });
  }
  const mountGallery = (mount, supplied, key) => {
    if (!supplied.length) return;
    const entries = supplied.map((item) => ({ ...item, revealed: false }));
    const gallery = make("section", "gallery");
    const heading = make("h4", "gallery-title", "Gallery");
    heading.id = `${key}-gallery-title`;
    gallery.setAttribute("aria-labelledby", heading.id);
    gallery.append(heading);
    const track = make("div", "gallery-track");
    track.id = `${key}-gallery`;
    track.setAttribute("role", "group");
    track.setAttribute("aria-label", "画像一覧");
    entries.forEach((item, index) => {
      const frame = make("figure", "gallery-item");
      const show = () => {
        frame.replaceChildren();
        const imageButton = button("image-button", "", () =>
          open(item, entries, imageButton),
        );
        imageButton.setAttribute("aria-label", `${item.alt}を拡大表示`);
        const img = make("img");
        img.src = item.src;
        img.alt = item.alt;
        img.loading = "lazy";
        img.decoding = "async";
        imageButton.append(img);
        frame.append(imageButton);
        if (item.caption)
          frame.append(make("figcaption", "gallery-caption", item.caption));
        if (item.spoiler)
          frame.append(
            button("hide-spoiler", "ネタバレ画像を隠す", () => {
              item.revealed = false;
              conceal();
              frame.querySelector("button").focus();
            }),
          );
      };
      const conceal = () => {
        frame.replaceChildren();
        const cover = make("div", "spoiler");
        cover.append(make("p", "", "セリフ・ストーリーのネタバレを含みます"));
        cover.append(
          button("", "内容を確認して表示する", () => {
            item.revealed = true;
            show();
            frame.querySelector("button").focus();
          }),
        );
        frame.append(cover);
        frame.setAttribute("aria-label", `画像 ${index + 1}`);
      };
      if (item.spoiler) conceal();
      else show();
      track.append(frame);
    });
    gallery.append(track);
    if (entries.length > 1) {
      const controls = make("div", "gallery-controls");
      const count = make("span", "", `1 / ${entries.length}`);
      count.setAttribute("aria-live", "polite");
      const scroll = (delta) => {
        const width = track.children[0].getBoundingClientRect().width + 12;
        const next = Math.max(
          0,
          Math.min(
            entries.length - 1,
            Math.round(track.scrollLeft / width) + delta,
          ),
        );
        track.scrollTo({
          left: next * width,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
      };
      const prev = button("", "←", () => scroll(-1));
      const next = button("", "→", () => scroll(1));
      prev.setAttribute("aria-label", "前の画像へ");
      next.setAttribute("aria-label", "次の画像へ");
      for (const el of [prev, next]) el.setAttribute("aria-controls", track.id);
      controls.append(prev, count, next);
      gallery.append(
        controls,
        make("p", "gallery-hint", "横にスワイプ ／ 画像をタップして拡大"),
      );
      const update = () => {
        const width = track.children[0].getBoundingClientRect().width + 12;
        const index = Math.round(track.scrollLeft / width);
        count.textContent = `${index + 1} / ${entries.length}`;
        prev.disabled = index === 0;
        next.disabled = index === entries.length - 1;
      };
      track.addEventListener("scroll", update, { passive: true });
      new ResizeObserver(update).observe(track);
    } else gallery.append(make("p", "gallery-hint", "画像をタップして拡大"));
    mount.append(gallery);
  };
  window.ProfileGalleries = {
    mount(groups) {
      document.querySelectorAll("[data-gallery-mount]").forEach((el) => {
        el.replaceChildren();
        const key = el.dataset.galleryMount;
        mountGallery(el, groups[key] || [], key);
      });
    },
  };
})();
