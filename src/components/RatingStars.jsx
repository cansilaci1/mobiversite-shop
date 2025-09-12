export default function RatingStars({ value = 4.5, count = 120 }) {
  const stars = Math.round(value * 2) / 2;
  return (
    <div className="flex items-center gap-1 text-xs text-muted">
      <span>⭐️</span>
      <span>{stars}</span>
      <span>({count})</span>
    </div>
  );
}
