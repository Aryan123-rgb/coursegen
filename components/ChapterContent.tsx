import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChapterContentProps {
  content: string;
}

export function ChapterContent({ content }: ChapterContentProps) {
  return (
    <article className="prose prose-invert prose-lg max-w-none break-words prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-code:text-purple-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:break-words prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-blockquote:border-purple-500/50 prose-blockquote:text-gray-400 prose-a:text-indigo-400 prose-li:text-gray-300 prose-th:text-white prose-td:text-gray-300 [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-xl [&_iframe]:border [&_iframe]:border-white/10 [&_iframe]:my-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: (props) => (
            <span className="block my-8 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-auto object-cover"
                {...props}
                alt={props.alt || ""}
              />
            </span>
          ),
          a: (props) => (
            <a
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
