"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in!");
  }

  const nationalID = formData.get("nationalID").toString();
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid ID");

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  await updateGuest(session.user.guestId, updateData);
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in!");
  }

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  const isUsersBooking = guestBookingIds.includes(bookingId);

  if (!isUsersBooking) throw new Error("Not your bookings to delete! ");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in!");
  }
  const bookingId = parseInt(formData.get("bookingId"));

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  const isUsersBooking = guestBookingIds.includes(bookingId);

  if (!isUsersBooking) throw new Error("Not your bookings to delete! ");

  const observations = formData.get("observations");

  const numGuests = formData.get("numGuests");

  const updateData = {
    observations,
    numGuests,
  };

  await updateBooking(bookingId, updateData);

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createBookingAction(bookingData, formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in!");
  }
  
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
