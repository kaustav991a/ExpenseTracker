import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./styles/base.scss";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import Onboarding from "./pages/Onboarding/Onboarding";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ConfirmSignup from "./pages/ConfirmSignup/ConfirmSignup";
import AddExpences from "./pages/AddExpences/AddExpences";

// Wrapper to handle animation on route change
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm-signup" element={<ConfirmSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addexpences" element={<AddExpences />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
