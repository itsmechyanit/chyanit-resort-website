import ReservationCard from "@/app/_components/ReservationCard";
import { getBookings } from "@/app/_lib/data-service";
import { auth } from "@/app/auth";
import ReservationCardList from "@/app/_components/ReservationCardList";
import Link from "next/link";

export const metadata = {
  title: "Your Reservations",
};

export default async function Page() {
  // CHANGE
  const session = await auth();

  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationCardList bookings={bookings} />
      )}
    </div>
  );
}
