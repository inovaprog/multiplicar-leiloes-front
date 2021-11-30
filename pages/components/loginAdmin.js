import { Col, Row, Container, Form, Button, Spinner } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import Router from "next/router"
import { useState } from 'react'

export default function LoginComponent() {

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const login = async (event) => {
        setCarregando(true);
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        var url = process.env.API_URL + '/auth/admin/signin'
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
        if (response.statusCode == 201) {
            window.localStorage.setItem('tokenAdmin', response.data.IdToken);
            Router.push(`/admin/`);
        }
        else if (response.statusCode == 400) {
            setErro('Usuário ou senha incorretos');
            setCarregando(false);
        }
        else if (response.statusCode == 403) {
            setErro('Você não tem permissão para acessar essa página');
            setCarregando(false);
        }
        else {
            setErro('Erro desconhecido');
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
                                    <Form.Label>Senha</Form.Label>
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
                                            ? <div className={styles.erro}>{erro}</div>
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
