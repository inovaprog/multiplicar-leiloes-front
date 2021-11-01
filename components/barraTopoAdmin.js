import styles from "../styles/Home.module.css"
import { Navbar, Nav, Container, NavDropdown, Button, Col } from 'react-bootstrap';
import { useEffect } from "react";
import Router from "next/router";

export default function BarraSup({ nome }) {
    useEffect(async () => {
        if (!window.localStorage.getItem("token")) {
            Router.push("/admin/login");
        }
    })

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#000000" }} variant="dark">
                <Container>
                    <Navbar.Brand className={styles.logoMarca} href="/admin/"><img src='/logo-centro 1.png'></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav style={{ paddingRight: 50, color: "white" }}>
                            <Nav.Link href={`/admin/adicionar_colaborador`}>Colaborador</Nav.Link>
                            <Nav.Link href={`/admin/usuarios`}>Clientes</Nav.Link>
                            <Nav.Link href="/admin/imoveis">Imóveis</Nav.Link>
                            <Nav.Link href="/admin/vendas">Vendas</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}