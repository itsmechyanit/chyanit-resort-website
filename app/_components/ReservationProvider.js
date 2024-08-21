"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  function resetRange() {
    setRange(initialState);
  }

  const ctxValue = {
    range,
    setRange,
    resetRange,
  };

  return (
    <ReservationContext.Provider value={ctxValue}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("Component is not wrapped in the provider");
  }
  return context;
}

export { ReservationProvider, useReservation };
