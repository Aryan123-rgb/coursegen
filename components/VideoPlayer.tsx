interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black mb-6 sm:mb-10 shadow-xl sm:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      <iframe
        src={`https://www.youtube.com/embed/${videoUrl}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
