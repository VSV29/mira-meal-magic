interface ProgressDotsProps {
  total: number;
  current: number;
}

const ProgressDots = ({ total, current }: ProgressDotsProps) => (
  <div className="flex gap-1.5 justify-center">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full transition-all ${
          i < current ? "bg-saffron" : "bg-light-gray"
        }`}
      />
    ))}
  </div>
);

export default ProgressDots;
