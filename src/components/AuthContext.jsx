// src/context/AuthContext.js
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useReducer } from "react";
import { auth } from "../firebase";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// Create the Auth context
// export const Context = createContext();

const AuthContext = createContext();

const initialState = {
  isLoading: false,
  user: null,
  email: "",
  password: "",
  error: "",
};

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
  }
};

const AuthProvider = ({ children }) => {
  const [{ isLoading, email, password, error, user }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const navigate = useNavigate();

  //handle email change
  const handleEmailInput = (value) => {
    dispatch({ type: "email/input", email: value });
  };

  //handle password change
  const handlePasswordInput = (value) => {
    dispatch({ type: "password/input", password: value });
  };

  //handle user login
  // const handleUserLogin = async () => {
  //   dispatch({ type: "loading" });

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     if (user) {
  //       dispatch({ type: "user/loggedin" });
  //       // navigate("/gallery");
  //     }
  //   } catch (error) {
  //     dispatch({
  //       type: "error/rejected",
  //       error: `Error Logging in: ${error.message}`,
  //     });
  //   }
  // };

  //handle user sign out
  const handleUserSignOut = async () => {
    // try {
    //   await signOut(auth);
    //   dispatch({ type: "user/loggedout" });

    //   // navigate("/login");
    // } catch (error) {
    //   console.log(error);
    // }
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
        // handleUserLogin,
        // handleUserSignOut,
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

// Auth Provider component
// export const AuthContext = ({ children }) => {
//   // const auth = getAuth();
//   const [user, setUser] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let unsubscribe;
//     unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setLoading(false);
//       if (currentUser) setUser(currentUser);
//       else {
//         setUser(null);
//       }
//     });
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, []);

//   const values = {
//     user: user,
//     setUser: setUser,
//   };

//   return (
//     <Context.Provider value={values}>{!loading && children}</Context.Provider>
//   );
// };
