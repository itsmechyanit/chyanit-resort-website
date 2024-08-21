"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "../auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestProfileAction(formData) {
  const session = await auth();

  if (!session) throw new Error("The user is not logged in");
  //verify the posted data
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Invalid national ID");
  const updateData = { nationality, countryFlag, nationalID };
  await updateGuest(session.user.guestId, updateData);
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();

  if (!session) throw new Error("The user is not logged in");

  const bookings = await getBookings(session.user.guestId);

  const bookingIds = bookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("You are not authorized to perform this action");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData) {
  const session = await auth();

  if (!session) throw new Error("The user is not logged in");

  const bookingId = +formData.get("bookingId");

  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("You are not authorized to perform this action");

  const updateData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
  };

  await updateBooking(bookingId, updateData);
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createReservationAction(reservationData, formData) {
  const session = await auth();

  if (!session) throw new Error("The user is not logged in");

  const finalReservationData = {
    ...reservationData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  await createBooking(finalReservationData);
  revalidatePath(`/cabins/${finalReservationData.cabinId}`);
  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}
