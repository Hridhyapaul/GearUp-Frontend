
import { getAccessTokenCookie } from "@/lib/auth-cookie";
import { requireRole } from "@/lib/auth-guard";
import { getReviews } from "@/services/review.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReviewRating } from "@/components/dashboard/ReviewRating";

const CustomerReviewsPage = async () => {
  const user = await requireRole(["CUSTOMER"]);
  const accessToken = await getAccessTokenCookie();

  if (!accessToken) {
    return null;
  }

  const response = await getReviews(accessToken);

  const customerReviews = response.data.filter(
    (review) => review.customerId === user.id,
  );

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Reviews</h1>

        <p className="mt-2 text-muted-foreground">
          View your reviews and ratings for rented gear.
        </p>
      </div>

      <div className="rounded-lg border p-5">
        <p className="text-sm text-muted-foreground">
          Total Reviews
        </p>

        <p className="mt-1 text-2xl font-bold">
          {customerReviews.length}
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            Review History
          </h2>

          <p className="text-sm text-muted-foreground">
            Your ratings and feedback for gear.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gear</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Review Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customerReviews.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    You have not submitted any reviews yet.
                  </TableCell>
                </TableRow>
              ) : (
                customerReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">
                      {review.gearItem.name}
                    </TableCell>

                    <TableCell>
                        <ReviewRating rating={review.rating} />
                    </TableCell>

                    <TableCell className="max-w-sm whitespace-normal">
                      {review.comment}
                    </TableCell>

                    <TableCell>
                      {new Date(
                        review.createdAt,
                      ).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default CustomerReviewsPage;
