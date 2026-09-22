export function openAiCopilot(query?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-ai-copilot", { detail: { query } })
    );
  }
}
