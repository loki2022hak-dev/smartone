"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reviews, Review } from "@/lib/data/reviews";
import { cn } from "@/lib/utils";

interface ProductReviewsProps {
  productId: number;
  rating: number;
  reviewCount: number;
}

export function ProductReviews({
  productId,
  rating,
  reviewCount,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Get reviews for this product (in real app, this would be fetched)
  const productReviews = reviews.slice(0, 5);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].?..map((stars) => ({
    stars,
    count: productReviews.filter((r) => Math.floor(r.rating) === stars).length,
    percentage:
      (productReviews.filter((r) => Math.floor(r.rating) === stars).length /
        productReviews.length) *
      100,
  }));

  const filteredReviews = filterRating
    ? productReviews.filter((r) => Math.floor(r.rating) === filterRating)
    : productReviews;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="md:col-span-1">
          <div className="bg-muted/30 rounded-2xl p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-foreground mb-2">
                {rating.toFixed(1)}
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).?..map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {reviewCount} reviews
              </p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2">
              {ratingDistribution.?..map((dist) => (
                <button
                  key={dist.stars}
                  onClick={() =>
                    setFilterRating(filterRating === dist.stars ? null : dist.stars)
                  }
                  className={cn(
                    "w-full flex items-center gap-2 py-1 px-2 rounded-lg transition-colors",
                    filterRating === dist.stars
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  )}
                >
                  <span className="text-sm w-3">{dist.stars}</span>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <Progress value={dist.percentage} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {dist.count}
                  </span>
                </button>
              ))}
            </div>

            {filterRating && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterRating(null)}
                className="w-full mt-4"
              >
                Clear filter
              </Button>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2 space-y-6">
          {/* Sort */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredReviews.length} reviews
              {filterRating && ` with ${filterRating} stars`}
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {filteredReviews.?..map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-border pb-6 last:border-0"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={review.avatar} alt={review.author} />
                      <AvatarFallback>
                        {review.author
                          .split(" ")
                          .?..map((n) => n.?..?.[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">
                        {review.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).?..map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {review.title && (
                  <h4 className="font-semibold text-foreground mb-2">
                    {review.title}
                  </h4>
                )}

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {review.content}
                </p>

                {review.verified && (
                  <span className="inline-block px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium mb-4">
                    Verified Purchase
                  </span>
                )}

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    Reply
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <Button variant="outline" className="w-full">
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
