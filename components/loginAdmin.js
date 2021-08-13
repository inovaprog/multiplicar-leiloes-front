import { Col, Row, Container, Form, Button, Spinner } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import Router from "next/router"
import { useState } from 'react'

export default function BlocoLogin() {

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(false);

    const login = async (event) => {
        setCarregando(true);
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        var url = process.env.URL + '/admin/signin'
        var res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        var response = await res.json();
        if (response.status == 'Success') {
            window.sessionStorage.setItem('email', email);
            window.sessionStorage.setItem('password', password);
            window.sessionStorage.setItem('token', response.data.IdToken);
            Router.push(`/admin`);
        }
        else {
            console.log("erro")
            setErro(true);
            setCarregando(false);
        }
    };

    return (
        <Container>
            <div className={styles.blocoLogin}>
                <Row>
                    <Form onSubmit={login}>
                        <center>
                            <h3>Login</h3>
                        </center>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="formControlsText">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name='email' type="text" placeholder="Nome" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="formControlsPassword">
                                    <Form.Label>Chave</Form.Label>
                                    <Form.Control name='password' type="password" placeholder="Senha" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <center>
                            <Row>
                                <Col xs={12} style={{ marginTop: 20 }}>
                                    {
                                        carregando
                                            ? <Spinner animation='border' />
                                            : <Button className={styles.btnMultiplicar} type="submit" block>Login</Button>
                                    }
                                    {
                                        erro
                                            ? <div className={styles.erro}>Usuário ou senha incorretos</div>
                                            : null
                                    }

                                </Col>
                            </Row>
                        </center>
                    </Form>

                </Row>
            </div>
        </Container>
    )
}
