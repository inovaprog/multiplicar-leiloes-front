import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styles from "../styles/Home.module.css"


export default function FormularioUsuario({ usuario }) {
    if (usuario) {
        return (
            <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>
                <Container>
                <center><h3>Editar Usuário</h3></center>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control defaultValue={usuario.nome} name='nome'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control defaultValue={usuario.email} disabled name='email'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Chave</Form.Label>
                                    <Form.Control value={usuario.chave} disabled name='email'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Imoveis</Form.Label>
                                    <Form.Control defaultValue={usuario.imoveis} as="textarea" rows={3} name='email'></Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <Button type='submit' className={styles.btnMultiplicar} style={{ margin: 20 }}>Salvar</Button>
                            </center>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    else {
        return (
            <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>
                <Container>
                    <center><h3>Adicionar Usuário</h3></center>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control name='nome'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name='email'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Chave</Form.Label>
                                    <Form.Control name='email'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Imoveis</Form.Label>
                                    <Form.Control as="textarea" rows={3} name='email'></Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <Button className={styles.btnMultiplicar} style={{ margin: 20 }}>Salvar</Button>
                            </center>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}