import Editor from "@/components/Editor";

export default function Home() {
  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-lato)]">
      <div className="w-full px-4 md:px-0 lg:w-3/5 flex-1 mt-[30vh] animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <Editor />
      </div>
    </div>
  );
}
