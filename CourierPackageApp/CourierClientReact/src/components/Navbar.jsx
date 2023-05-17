import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./Context";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function NavbarComp() {
  const { token, deleteToken, isDeleted, setIsDeleted } =
    useContext(AppContext);
  const navigate = useNavigate();

  // return (
  //   <section>
  //     {token ? (
  //       <nav className="navbar navbar-dark bg-dark">
  //         <h2 className="navbar-brand">Courier Packages Service</h2>
  //         <div>
  //           <h4 className="signedUser" style={{ color: "white" }}>
  //             Signed user: {token.username}
  //           </h4>
  //           <Link to="/" className="link-button">
  //             <button
  //               id="logout"
  //               className="btn btn-danger"
  //               type="button"
  //               onClick={() => deleteToken()}
  //             >
  //               Logout
  //             </button>
  //           </Link>
  //         </div>
  //       </nav>
  //     ) : (
  //       <nav className="navbar navbar-dark bg-dark">
  //         <h2 className="navbar-brand">Courier Packages Application</h2>
  //         <div>
  //           <Link to="register" className="link-button">
  //             <button className="btn btn-light">Register</button>
  //           </Link>
  //           <Link to="login" className="link-button">
  //             <button className="btn btn-light">Login</button>
  //           </Link>
  //         </div>
  //       </nav>
  //     )}
  //   </section>
  // );
  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
      {token ? (
        <Container fluid>
          <Link to="/">
            <Navbar.Brand>Courier Service</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav style={{ margin: "5px" }}>
              <Nav.Link disabled>Logged in as: {token.username}</Nav.Link>
              <Button
                style={{ width: "auto" }}
                variant="outline-primary"
                onClick={() => deleteToken()}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      ) : (
        <Container fluid>
          <Link to="/">
            <Navbar.Brand className="justify-content-start">
              Courier Service
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Button
              className="btn btn-light"
              onClick={() => navigate("register")}
            >
              Register
            </Button>
            <Button className="btn btn-light" onClick={() => navigate("login")}>
              Login
            </Button>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );
}

export default NavbarComp;
