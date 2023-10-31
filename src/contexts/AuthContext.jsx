/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { useReducer } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create the Auth context
const AuthContext = createContext();

// create the initial state
const initialState = {
  isLoading: false,
  error: null,
  user: null,
  email: "",
  password: "",
};

// the reducer function that monitor stage change
const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "user/set":
      return { ...state, user: action.user };

    case "email/input":
      return { ...state, email: action.email };

    case "password/input":
      return { ...state, password: action.password };

    case "user/loggedin":
      return { ...state, isLoading: false };

    case "user/loggedout":
      return { ...initialState };

    case "error/rejected":
      return { ...state, error: action.error, isLoading: false };

    case "error/clear":
      return { ...state, error: false };
  }
};

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [{ isLoading, email, password, error, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //handle email change
  const handleEmailInput = (value) => {
    dispatch({ type: "email/input", email: value });
  };

  //handle password change
  const handlePasswordInput = (value) => {
    dispatch({ type: "password/input", password: value });
  };

  //track auth state change to set up protected route
  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch({ type: "user/set", user: currentUser });
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        email,
        password,
        error,
        dispatch,
        handleEmailInput,
        handlePasswordInput,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Cannot use Auth context outside the Auth provider ");
  }
  return context;
};

export { AuthProvider, useAuth };
