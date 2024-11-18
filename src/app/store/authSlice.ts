import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyRecord } from "dns";
import { API } from "@/http";
import { Status } from "../types/status";
import { AppDispatch } from "./store";

export interface LoginData {
  email: string;
  password: string;
}

interface User {
  username: string;
  email: string;
  password: string;
  token: string;
}

interface AuthSate {
  user: User;
  status: Status;
  token: string | null;
}

const initialState: AuthSate = {
  user: {} as User,
  status: Status.LOADING,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //created function aka setter
    setUser(state: AuthSate, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setStatus(state: AuthSate, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    resetStatus(state: AuthSate) {
      state.status = Status.LOADING;
    },

    setToken(state: AuthSate, action: PayloadAction<string>) {
      state.user.token = action.payload;
    },
  },
});

export const { setUser, setStatus, resetStatus, setToken } = authSlice.actions;
export default authSlice.reducer;

function login(data: LoginData) {
  return async function loginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        const { token } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setToken(token));
        localStorage.setItem("token", token);
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      dispatch(setStatus(Status.FAILURE));
    }
  };
}

const logOut = () => {
  return async function (dispatch: AppDispatch) {
    try {
      localStorage.clear();
      dispatch(resetStatus());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
};

export { login, logOut };
