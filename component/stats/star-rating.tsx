// components/Stats/StarRating.tsx
import React from "react";

interface StarRatingProps {
  count?: number;
  color?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ count = 5, color = "fill-orange-400" }) => {
  return (
    <div className="flex gap-1 mb-1">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${color}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
