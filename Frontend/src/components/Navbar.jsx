import { useState, useEffect } from "react";
import logo from "../assets/newLogo.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  const [active, setActive] = useState(false);
  const [cls, setCls] = useState("inactive");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function openNav() {
    setActive(true);
    setCls("active");
  }
  function closeNav() {
    setActive(false);
    setCls("inactive");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here, e.g., navigate to find page with query
    window.location.href = `/find?search=${encodeURIComponent(searchQuery)}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      }}
    >
      <div className="container-fluid px-4">
        <a
          className="navbar-brand d-flex align-items-center fw-bold text-white"
          href="/"
        >
          <img src={logo} alt="Lost & Found" height="40" className="me-2" />
          <span style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
            Lost & Seek Board
          </span>
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={openNav}
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MenuIcon className="text-white" />
        </button>
        <div
          className={`collapse navbar-collapse ${active ? "show" : ""}`}
          id="navbarNav"
        >
          <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
            <input
              className="form-control rounded-pill me-2 border-0 shadow-sm"
              style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                color: "#333",
                border: "1px solid rgba(255,255,255,0.5)",
              }}
              type="search"
              placeholder="Search for lost items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <button
              className="btn rounded-pill px-3 text-white"
              style={{
                backgroundColor: "#FF69B4",
                border: "none",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
              type="submit"
            >
              <SearchIcon />
            </button>
          </form>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link fw-semibold px-3 text-white"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold px-3 text-white"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                href="/find"
              >
                Find Item
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold px-3 text-white"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                href="/post"
              >
                Post Item
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold px-3 text-white"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                href="/#about"
              >
                About Us
              </a>
            </li>
            {user && user.role === "admin" ? (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link fw-semibold px-3 text-white"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                    href="/admin"
                  >
                    Admin
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link fw-semibold px-3 text-white btn btn-link"
                    style={{
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      textDecoration: "none",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link fw-semibold px-3 text-white"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                  href="/login"
                >
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
        {active && (
          <button
            className="btn ms-2 rounded-pill text-white"
            style={{
              border: "2px solid rgba(255,255,255,0.8)",
              backgroundColor: "transparent",
            }}
            onClick={closeNav}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
