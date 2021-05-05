import React, { createContext } from "react";
export const CounterContext = createContext({});
export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const SET_USERINFO = "SET_USERINFO";
export const REMOVE_USERINFO = "REMOVE_USERINFO";
export const RESET = "RESET";
export const state = {
  token: "",
  userInfo: {},
};
const resetState = JSON.parse(JSON.stringify(state));
export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case REMOVE_TOKEN:
      localStorage.removeItem('token')
      return {
        ...state,
        token: "",
      };
    case SET_USERINFO:
      return {
        ...state,
        userInfo: {
          ...action.userInfo,
        },
      };
    case REMOVE_USERINFO:
      return {
        ...state,
        userInfo: {}
      };
    case RESET:
      return resetState;
    default:
      return state;
  }
};
