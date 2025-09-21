export async function writeReelScript(context) {
  const messages = [
    {
      role: "user",
      content: [{
        type: "text",
        text: `Create a dynamic short-form video script.
Constraints:
- Return ONLY JSON with this schema:
{ "title": string, "hook": string, "lines": string[] }
- Keep it concise for a 20-25s reel.
Context:
${JSON.stringify(context)}`
      }]
    }
  ];
  try {
    const completion = await window.websim.chatCompletion({ messages, json: true });
    const data = JSON.parse(completion.content);
    if (!data.title || !data.hook || !Array.isArray(data.lines)) throw new Error("Bad AI JSON");
    return data;
  } catch (e) {
    return {
      title: "Quick Tips",
      hook: "3 rapid tips you can use now:",
      lines: ["Tip 1: Keep it simple.", "Tip 2: Ship fast, iterate.", "Tip 3: Measure what matters."]
    };
  }
}

export async function narrate(text) {
  try {
    const result = await window.websim.generateTextToSpeech({ text, voice: "en-female" });
    return result.url;
  } catch {
    return null;
  }
}

