<<<<<<< HEAD
import React, { useEffect, useState } from "react";

function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );
  
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
  return(
    <div>
      <div
          className="text-white py-4 shadow"
          style={{
            background:
              "linear-gradient(135deg, #0d6efd, #6610f2)",
          }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-1">
                Inventory Management System
              </h2>

              <p className="mb-0 opacity-75">
                Manage products and inventory efficiently
              </p>
            </div>

            <div className="d-flex align-items-center">

              <div className="text-end me-3">

                <h6 className="mb-0 fw-bold text-white">
                  {user?.fullName}
                </h6>
                <small className="text-light">
                  Administrator
                </small>
              </div>

              <div
                className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: "45px",
                  height: "45px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                {user?.fullName
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
=======
import React, { useEffect, useState } from "react";

function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );
  
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
  return(
    <div>
      <div
          className="text-white py-4 shadow"
          style={{
            background:
              "linear-gradient(135deg, #0d6efd, #6610f2)",
          }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-1">
                Inventory Management System
              </h2>

              <p className="mb-0 opacity-75">
                Manage products and inventory efficiently
              </p>
            </div>

            <div className="d-flex align-items-center">

              <div className="text-end me-3">

                <h6 className="mb-0 fw-bold text-white">
                  {user?.fullName}
                </h6>
                <small className="text-light">
                  Administrator
                </small>
              </div>

              <div
                className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: "45px",
                  height: "45px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                {user?.fullName
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
>>>>>>> a5be8771bc938d3240964aa89163d99f33271362
export default Header;