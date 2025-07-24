import "./App.css";
import { Outlet } from "react-router";
import { OwnerProvider } from "./context/ownerContext";

function App() {
  return (
    <OwnerProvider>
      <Outlet />
    </OwnerProvider>
  );
}

export default App;
