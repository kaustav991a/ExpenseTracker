import { Outlet } from "react-router-dom";
import { TransactionProvider } from "./context/TransactionContext";

const AppLayout = () => {
  return (
    <TransactionProvider>
      <Outlet />
    </TransactionProvider>
  );
};

export default AppLayout;
