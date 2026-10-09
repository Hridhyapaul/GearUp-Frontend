
import { Star } from "lucide-react";

interface ReviewRatingProps {
  rating: number;
}

const ReviewRating = ({ rating }: ReviewRatingProps) => {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < rating;

        return (
          <Star
            key={index}
            size={16}
            className={
              isFilled
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }
          />
        );
      })}

      <span className="ml-1 text-sm text-muted-foreground">
        {rating}/5
      </span>
    </div>
  );
};

export { ReviewRating };
