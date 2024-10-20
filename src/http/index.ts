"use client";

import axios from "axios";
const BASE_URL = "http://localhost:4000/api";
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const APIauthenticated = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  },
});

export { API, APIauthenticated };
