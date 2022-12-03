import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function NavBar() {
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/">
                        Storemanagement
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/orders">
                        Bestellungen
                    </Nav.Link>
                </Nav>
            </Container>
        </NavbarBs>
    );
}
