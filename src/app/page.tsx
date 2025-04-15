import Editor from "@/components/Editor";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen font-[family-name:var(--font-noto-sans)]">
      <div className="w-full px-4 md:px-0 md:w-[640px] flex-1 mt-[40vh]">
        <Editor />
      </div>
    </div>
  );
}
