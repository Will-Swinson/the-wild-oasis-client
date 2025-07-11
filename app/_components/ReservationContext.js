"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initalState = { from: null, to: null };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initalState);

  function resetRange() {
    setRange(initalState);
  }
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error("Context was used outside provider");
  }
  return context;
}

export { ReservationProvider, useReservation };
