// AppLayout.jsx
import { Outlet } from "react-router-dom";
import { TransactionProvider } from "./context/TransactionContext";
import TopLoader from "./components/Toploader/Toploader";

const AppLayout = () => {
  return (
    <TransactionProvider>
      <TopLoader /> {/* ✅ Loader on top */}
      <Outlet />
    </TransactionProvider>
  );
};

export default AppLayout;
