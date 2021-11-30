import styles from "../styles/Home.module.css"
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useEffect } from "react";
import Router from "next/router";

export default function TopBarAdmin() {
    useEffect(async () => {
        if (!window.localStorage.getItem("tokenAdmin")) {
            Router.push("/admin/login");
        }
    }, [])

    const logout = () => {
        window.localStorage.clear();
        window.location.reload();
    }

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
                            <Nav.Link href={`/admin/usuarios`}>Usuários</Nav.Link>
                            <Nav.Link href="/admin/imoveis">Imóveis</Nav.Link>
                            <Nav.Link href="/admin/vendas">Vendas</Nav.Link>
                            <Button className={styles.btnMultiplicar} onClick={logout} block>Sair</Button>                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}