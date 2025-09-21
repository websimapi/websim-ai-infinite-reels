import { writeReelScript, narrate } from "./ai.js";
/* ...existing code... */

export async function generateReelBatch({ count = 5 }) {
  const createdBy = await window.websim.getCreatedBy();
  const project = await window.websim.getCurrentProject();
  const baseAuthor = createdBy?.username || "ai_creator";
  const authorAvatar = createdBy?.username ? `https://images.websim.com/avatar/${createdBy.username}` : "https://images.websim.com/avatar/placeholder";
  const bgFallback = project?.id ? `https://images.websim.com/v1/site/${project.id}/600` : "https://images.websim.com/og.png";

  const items = [];
  for (let i = 0; i < count; i++) {
    const ctx = {
      author: baseAuthor,
      projectTitle: project?.title || "",
      projectDescription: project?.description || "",
      angle: pick(["tutorial", "insight", "teaser", "tip-list", "myth-busting"])
    };
    const script = await writeReelScript(ctx);
    const ttsUrl = await narrate(`${script.hook}. ${script.lines.join(". ")}`);
    items.push({
      id: `${Date.now()}_${i}_${Math.random().toString(36).slice(2,7)}`,
      author: baseAuthor,
      authorAvatar,
      title: script.title,
      hook: script.hook,
      lines: script.lines.slice(0, 5),
      durationInFrames: 30 * 24, // ~24s
      bgImage: bgFallback,
      videoSrc: null,
      tts: ttsUrl
    });
  }
  return items;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

