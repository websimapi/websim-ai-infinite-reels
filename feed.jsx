import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Player } from "@websim/remotion/player";
import { ReelComposition } from "./ReelComposition.jsx";
import { generateReelBatch } from "./utils/reels.js";
const Feed = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  useEffect(() => {
    void loadMore();
  }, []);
  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const batch = await generateReelBatch({ count: 5 });
    setItems((prev) => [...prev, ...batch]);
    setLoading(false);
  };
  useEffect(() => {
    const el = document.querySelector(".feed");
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const player = entry.target.querySelector("[data-player]");
        if (!player) return;
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          player.play && player.play();
        } else {
          player.pause && player.pause();
        }
      });
    }, { threshold: [0, 0.6, 1] });
    document.querySelectorAll(".reel").forEach((r) => io.observe(r));
    observerRef.current = io;
    return () => io.disconnect();
  }, [items.length]);
  useEffect(() => {
    const onScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.body.offsetHeight;
      if (docHeight - scrollBottom < 1200) void loadMore();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxDEV("div", { className: "feed", children: [
    items.map((it) => /* @__PURE__ */ jsxDEV("div", { className: "reel", children: [
      /* @__PURE__ */ jsxDEV(
        Player,
        {
          component: ReelComposition,
          durationInFrames: it.durationInFrames,
          fps: 30,
          compositionWidth: 540,
          compositionHeight: 960,
          loop: true,
          controls: false,
          inputProps: it,
          style: { width: "100%", height: "100%" },
          ref: (ref) => {
            if (!ref) return;
            const node = ref?.shadowRoot?.querySelector("video") || ref;
            if (node) {
              node.setAttribute("data-player", "1");
            }
          },
          autoplay: true,
          clickToPlay: true
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 55,
          columnNumber: 11
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "reel-meta", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "meta-left", children: [
          /* @__PURE__ */ jsxDEV("img", { className: "avatar", src: it.authorAvatar, alt: "" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 78,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "caption", children: [
            /* @__PURE__ */ jsxDEV("div", { style: { fontWeight: 800 }, children: [
              "@",
              it.author
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 80,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { style: { opacity: 0.8 }, children: it.title }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 81,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 79,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 77,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("button", { className: "btn", onClick: () => share(it), children: "Share" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 84,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 76,
        columnNumber: 11
      })
    ] }, it.id, true, {
      fileName: "<stdin>",
      lineNumber: 54,
      columnNumber: 9
    })),
    loading && /* @__PURE__ */ jsxDEV("div", { className: "loading", children: "Generating more reels\u2026" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 88,
      columnNumber: 19
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 52,
    columnNumber: 5
  });
};
function share(it) {
  const text = `${it.title} \u2014 via @${it.author}`;
  const url = location.href;
  if (navigator.share) navigator.share({ title: it.title, text, url }).catch(() => {
  });
  else alert(text + "\n" + url);
}
export {
  Feed
};
