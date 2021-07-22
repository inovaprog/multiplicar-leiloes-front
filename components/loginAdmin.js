import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import Router from "next/router"

export default function BlocoLogin() {

    const login = async (event) => {
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
        console.log(response.data);
        if (response.status == 'Success') {
            window.sessionStorage.setItem('email', email);
            window.sessionStorage.setItem('password', password);
            window.sessionStorage.setItem('token', response.data.IdToken);
            Router.push(`/admin/imoveis?token=${response.data.IdToken}`);
        }
        else{
            
            console.log("erro")
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
                                    <Button className={styles.btnMultiplicar} type="submit"  block>Login</Button>
                                </Col>
                            </Row>
                        </center>
                    </Form>

                </Row>
            </div>
        </Container>
    )
}
