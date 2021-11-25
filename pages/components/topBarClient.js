import styles from "../styles/Home.module.css"
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";

export default function TopBarClient() {
    const [name, setName] = useState(null);
    useEffect(async () => {

        setName(window.localStorage.getItem('name'));

    })

    const logout = () => {
        window.localStorage.clear();
        window.location.reload();
    }

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
                                name
                                    ? (<Nav style={{ color: "white" }}> Olá, {name} </Nav>)
                                    : <Button className={styles.btnMultiplicar} type="submit" block>Login</Button>
                            }
                        </Nav>
                        {
                           (name) ? <Button className={styles.btnMultiplicar} onClick={logout} block>Sair</Button> : null
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}