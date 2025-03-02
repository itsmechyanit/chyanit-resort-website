"use client";
import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationProvider";
import { createReservationAction } from "../_lib/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  // CHANGE
  const { maxCapacity } = cabin;
  const { range, resetRange } = useReservation();
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
  const extrasPrice = 0;
  const totalPrice = cabinPrice + extrasPrice;
  const status = "unconfirmed";
  const hasBreakfast = false;
  const isPaid = false;
  const cabinId = cabin.id;
  const guestId = user.guestId;

  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    extrasPrice,
    totalPrice,
    status,
    hasBreakfast,
    isPaid,
    cabinId,
    guestId,
  };

  const createReservationActionWithData = createReservationAction.bind(
    null,
    reservationData
  );

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={async (formData) => {
          await createReservationActionWithData(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!range.from || !range.to ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
