<<<<<<< HEAD
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DashboardLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Header />
        <div className="container-fluid p-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

=======
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DashboardLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Header />
        <div className="container-fluid p-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

>>>>>>> a5be8771bc938d3240964aa89163d99f33271362
export default DashboardLayout;