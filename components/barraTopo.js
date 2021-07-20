import styles from "../styles/Home.module.css"
import { Navbar, Nav, Container, NavDropdown, Button, Col } from 'react-bootstrap';
import { useState } from "react";


export default function BarraSup({ nome }) {
    if (!nome) {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#000000" }} variant="dark">
                    <Container>
                        <Navbar.Brand className={styles.logoMarca} href="#home"><img src='/logo-centro 1.png'></img></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav style={{ paddingRight: 50, color: "white" }}>
                                <Nav.Link href="#">Sobre</Nav.Link>
                                <Nav.Link href="#">Contato</Nav.Link>
                            </Nav>
                            <Nav>
                                <Button className={styles.btnMultiplicar} type="submit" block>Login</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
    else {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#000000" }} variant="dark">
                    <Container>
                        <Navbar.Brand className={styles.logoMarca} href="#home"><img src='/logo-centro 1.png'></img></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav style={{ paddingRight: 50, color: "white" }}>
                                <Nav.Link href="#">Sobre</Nav.Link>
                                <Nav.Link href="#">Contato</Nav.Link>
                            </Nav>
                            <Nav style={{ color: "white" }}>
                                Ola {nome}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}