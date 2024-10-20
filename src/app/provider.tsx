"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";

import { io } from "socket.io-client";
export const socket = io("http://localhost:4000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
