"use client";

import { useOptimistic } from "react";
import { deleteReservationAction } from "../_lib/actions";
import ReservationCard from "./ReservationCard";

export default function ReservationsList({ bookings }) {
  const [optimisticBookings, deleteBooking] = useOptimistic(
    bookings,
    (currBookings, bookingId) => {
      return currBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    deleteBooking(bookingId);
    await deleteReservationAction(bookingId);
  }

  return (
    <>
      <ul className="space-y-6">
        {optimisticBookings.map((booking) => (
          <ReservationCard
            onDelete={handleDelete}
            booking={booking}
            key={booking.id}
          />
        ))}
      </ul>
    </>
  );
}
