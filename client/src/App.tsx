import "./App.css";
import { Outlet } from "react-router";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { OwnerProvider } from "./context/ownerContext";

function App() {
  return (
    <OwnerProvider>
      <main className="min-h-screen flex flex-col">
        <section className="flex flex-row grow">
          <SideBar />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </section>
        <Footer />
      </main>
    </OwnerProvider>
  );
}

export default App;
