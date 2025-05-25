import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Kids App</div>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "1rem" }}>Hi {user.username}!</span>
              <button onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/sign-up" style={{ marginRight: "1rem" }}>
                Sign Up
              </Link>
              <Link to="/sign-in">Sign In</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
