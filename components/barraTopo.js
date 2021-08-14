import styles from "../styles/Home.module.css"
import { Navbar, Nav, Container, NavDropdown, Button, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Router from 'next/router'

export default function BarraSup() {
    const [nome, setNome] = useState(null);

    useEffect(async () => {
        if (!window.localStorage.getItem("token")) {
            Router.push("/login");
        }
        const token = window.localStorage.getItem("token");
        const userId = window.localStorage.getItem('userId');
        const url = process.env.URL + `/admin/get_user?id=${userId}`;
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json()
        if (data.status != "Success") {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }
        setNome(data.data.nome);
    }, [])


    return (
        <div>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#000000" }} variant="dark">
                <Container>
                    <Navbar.Brand className={styles.logoMarca} href={`/`}><img src='/logo-centro 1.png'></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav style={{ paddingRight: 50, color: "white" }}>
                            <Nav.Link href="#">Sobre</Nav.Link>
                            <Nav.Link href="#">Contato</Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                nome
                                    ? <Nav style={{ color: "white" }}> Olá, {nome} </Nav>
                                    : <Button className={styles.btnMultiplicar} type="submit" block>Login</Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}