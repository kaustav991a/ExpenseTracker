import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./styles/base.scss";
import router from "./Routes";
import LoadingProvider from "./context/LoadingContext";

// Wrapper to handle animation on route change
function App() {
  return (
    <LoadingProvider>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </LoadingProvider>
  );
}

export default App;
