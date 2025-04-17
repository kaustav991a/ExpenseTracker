// src/context/LoadingContext.jsx
import React, { createContext, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

export const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const loadingRef = useRef(null);

  const startLoading = () => loadingRef.current?.continuousStart();
  const completeLoading = () => loadingRef.current?.complete();

  return (
    <LoadingContext.Provider value={{ startLoading, completeLoading }}>
      <LoadingBar color="#62dbd3" height={3} ref={loadingRef} />
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
