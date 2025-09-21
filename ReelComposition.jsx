import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, OffthreadVideo, Audio } from "remotion";
const ReelComposition = ({ title, hook, lines, bgImage, videoSrc, tts, seed = "ai-reel" }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const appear = spring({ fps, frame, config: { damping: 200, mass: 0.8 } });
  const zoom = interpolate(frame, [0, durationInFrames], [1.05, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const segment = Math.floor(durationInFrames / (lines.length + 1));
  const currentIdx = Math.floor((frame - 30) / segment);
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#000" }, children: [
    videoSrc ? /* @__PURE__ */ jsxDEV(OffthreadVideo, { src: videoSrc, style: { width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 18,
      columnNumber: 9
    }) : /* @__PURE__ */ jsxDEV(Img, { src: bgImage, style: { width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, filter: "brightness(0.9)" } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 20,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)" } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 23,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { padding: 24, justifyContent: "flex-end", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsxDEV("div", { style: { color: "#fff", fontWeight: 800, fontSize: 42, lineHeight: 1.05, marginBottom: 10, transform: `translateY(${(1 - appear) * 20}px)`, opacity: appear }, children: hook }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 26,
        columnNumber: 9
      }),
      lines.map((line, idx) => {
        const start = 30 + idx * segment;
        const end = start + segment;
        const vis = interpolate(frame, [start, start + 10, end - 10, end], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return /* @__PURE__ */ jsxDEV("div", { style: { fontSize: 28, fontWeight: 600, color: "#f8fafc", textShadow: "0 2px 8px rgba(0,0,0,0.35)", opacity: vis, transform: `translateY(${(1 - vis) * 10}px)` }, children: line }, idx, false, {
          fileName: "<stdin>",
          lineNumber: 34,
          columnNumber: 13
        });
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 25,
      columnNumber: 7
    }),
    tts ? /* @__PURE__ */ jsxDEV(Audio, { src: tts, volume: 1 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 41,
      columnNumber: 14
    }) : null
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 16,
    columnNumber: 5
  });
};
export {
  ReelComposition
};
