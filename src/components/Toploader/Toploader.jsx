// src/components/TopLoader.jsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const TopLoader = () => {
  const location = useLocation();
  const loadingRef = useRef(null);

  useEffect(() => {
    // Start loading when the route changes
    loadingRef.current?.continuousStart();

    // Minimum loading duration (e.g., 800ms)
    const minDuration = 800;
    const timer = setTimeout(() => {
      loadingRef.current?.complete();
    }, minDuration); // Ensures loader is visible for at least 'minDuration' ms

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <LoadingBar color="#205551" height={3} ref={loadingRef} />;
};

export default TopLoader;
