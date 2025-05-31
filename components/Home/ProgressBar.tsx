const lines = 20; // Number of lines in the progress bar

export default function ProgressBar({ progress } : { progress: number }) {
  const filledLines = Math.floor((progress / 100) * lines); // Calculate filled lines based on progress
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className={`h-5 w-2.5 rounded-full ${
              i < filledLines ? "bg-emerald-700" : "bg-gray-700"
            }`}
          />
        ))}
      </div>
      <span className="font-semibold text-emerald-700 bg-emerald-700/10 rounded-md px-2">
        {progress.toFixed(2)}%
      </span>
    </div>
  );
}
