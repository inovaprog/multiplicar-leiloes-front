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
                                <Nav.Link href={`/admin/usuarios`}>Clientes</Nav.Link>
                                <Nav.Link href="/admin/imoveis">Imóveis</Nav.Link>
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
                        <Navbar.Brand className={styles.logoMarca} onClick={() => Router.back()}><img src='/logo-centro 1.png'></img></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav style={{ paddingRight: 50, color: "white" }}>
                                <Nav.Link href="#">Clientes</Nav.Link>
                                <Nav.Link href="#">Imóveis</Nav.Link>
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