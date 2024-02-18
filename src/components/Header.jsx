import { useNavigate } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

const Header = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Navbar dark color="dark">
      <NavbarBrand className="mx-4">FileStore</NavbarBrand>
      <Nav className="app-header">
        <NavItem>
          <NavLink href="/profile">My Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={logoutUser}>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
