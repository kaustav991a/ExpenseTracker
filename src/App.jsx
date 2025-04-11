import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./styles/base.scss";
import router from "./Routes";

// Wrapper to handle animation on route change
function App() {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
