"use client";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservationAction } from "../_lib/actions";

function ReservationCardList({ bookings }) {
  const [optimisticState, setOptimisticState] = useOptimistic(
    bookings,
    (currBookings, bookingId) =>
      currBookings.filter((booking) => booking.id !== bookingId)
  );
  async function onDeleteReservation(bookingId) {
    setOptimisticState(bookingId);
    await deleteReservationAction(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticState.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDeleteReservation={onDeleteReservation}
        />
      ))}
    </ul>
  );
}

export default ReservationCardList;
