import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css"

export default function BlocoLogin() {

    const login = async (event) => {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        var url = process.env.URL+'/login'
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
        if (response.status === 'Success') {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('token', response.data.IdToken);
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
