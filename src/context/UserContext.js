import React from "react";
import axios from 'axios';

// API 정보
var apiDomain = 'http://localhost:8080';
var loginPath = apiDomain + '/oauth/login';
var joinPath = apiDomain + '/oauth/join';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, accessToken: action.accessToken };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("accessToken"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, joinUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError, setErrorMessage) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {

    // 로그인 데이터
    let loginData = {
      email: login,
      password: password
    }

    // 로그인 처리
    axios.post(loginPath, loginData)
    .then((response) => {
      // 로그인 완료
      if (response.data.result) {
        localStorage.setItem('accessToken', response.data.accessToken)
        setError(null)
        setIsLoading(false)
        dispatch({ 
          type: 'LOGIN_SUCCESS',
          accessToken: response.data.accessToken
        })

        history.push('/app/dashboard')
      } else {
        setError(true);
        setIsLoading(false);
      }
    })
    .catch(() => {
      setErrorMessage("통신 오류가 발생하였습니다 :(");
      setError(true);
      setIsLoading(false);
    });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function joinUser(name, login, password, setActiveTabId, setIsLoading, setError, setErrorMessage) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {

    // 로그인 데이터
    let joinData = {
      name: name,
      email: login,
      password: password
    }

    // 로그인 처리
    axios.post(joinPath, joinData)
    .then((response) => {
      console.log(response);
      // 회원가입 완료
      if (response.data.result) {
        setError(null)
        setIsLoading(false)

        // 회원가입 완료 후 로그인 탭으로 이동
        setActiveTabId(0);
      } else {
        setErrorMessage('회원가입 실패하였습니다.')
        setError(true);
        setIsLoading(false);
      }
    })
    .catch(() => {
      setErrorMessage('통신 오류가 발생하였습니다 :(')
      setError(true);
      setIsLoading(false);
    });
  } else {
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("accessToken");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
