// Prompt inspired by Farzaa freewrite: https://github.com/farzaa/freewrite
const CHATGPT_PROMPT_TEMPLATE = `Below is my journal entry. What do you think? Talk through it with me like a friend. Don't therapize me and give me a whole breakdown, don't repeat my thoughts with headings. Really take all of this, and tell me back stuff truly as if you're an old friend.
    
Keep it casual, don't say "yo", help me make new connections I don't see, comfort, validate, challenge, all of it. Don't be afraid to say a lot. Format with markdown headings if needed.

Do not just go through every single thing I say, and say it back to me. You need to process everything I say, make connections I don't see, and deliver it all back to me as a story that makes me feel what you think I want to feel. That's what the best therapists do.

Ideally, your style/tone should sound like the user themselves. It's as if the user is hearing their own tone but it should still feel different, because you have different things to say and don't just repeat back what they say.

My entry:

{content}`;

export function generateChatGPTUrl(content: string): string {
  if (!content || content.trim().length === 0) {
    throw new Error("No content available to share with ChatGPT");
  }

  const promptWithContent = CHATGPT_PROMPT_TEMPLATE.replace(
    "{content}",
    content.trim()
  );
  const encodedMessage = encodeURIComponent(promptWithContent);

  return `https://chat.openai.com/?m=${encodedMessage}`;
}

export function canShareWithChatGPT(content: string | null): boolean {
  return !!(content && content.trim().length > 0);
}
