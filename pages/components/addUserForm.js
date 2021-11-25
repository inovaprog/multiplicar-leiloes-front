import { Col, Row, Container, Form, Button, Spinner } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import Router from "next/router"
import { useState } from 'react'

export default function addUserForm() {

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    const login = async (event) => {
        setCarregando(true);
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        var passwordConfirm = event.target.passwordConfirm.value;
        if (password !== passwordConfirm) {
            setErro("As senhas não conferem");
            setCarregando(false);
            return;
        }
        var url = process.env.URL + '/users/add'
        const token = window.localStorage.getItem("tokenAdmin");

        var res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: event.target.name.value,
                phone: '+55' + event.target.phone.value,
            })
        });
        var response = await res.json();
        if (response.statusCode == 201) {
            window.localStorage.setItem('token', response.data.IdToken);
            Router.push(`/admin/usuarios/`);
        }
        else {
            setErro(response.message);
            setCarregando(false);
        }
    };

    return (
        <Container>
            <div className={styles.blocoLogin}>
                <Row>
                    <Form onSubmit={login}>
                        <center>
                            <h3>Criar Usuário</h3>
                        </center>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="name">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control name='name' type="text" placeholder="Nome" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="phone">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control name='phone' type="text" placeholder="99 99999-9999" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name='email' type="text" placeholder="Email" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="password1">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control name='password' type="password" placeholder="Senha" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="password2">
                                    <Form.Label>Confirmar senha</Form.Label>
                                    <Form.Control name='passwordConfirm' type="password" placeholder="Senha" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <center>
                            <Row>
                                <Col xs={12} style={{ marginTop: 20 }}>
                                    {
                                        carregando
                                            ? <Spinner animation='border' />
                                            : <Button className={styles.btnMultiplicar} type="submit" block>Criar Usuário</Button>
                                    }
                                    {
                                        (erro !== '')
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
