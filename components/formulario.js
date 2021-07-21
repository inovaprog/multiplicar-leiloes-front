import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styles from "../styles/Home.module.css"


export default function FormularioImovel({imovel}) {
    if (imovel) {
        return (
            <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>
                <Container>
                <center><h3>Editar Imóvel</h3></center>
                    <Row>
                        <Col sm={6}>
                            <Form>
                                <Form.Group>
                                    <Form.Label style={{fontWeight: 'bold'}}>{`ID do Imóvel: ${imovel.id}`}</Form.Label>
                                    <br></br>
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control defaultValue={imovel.rua} name='endereco'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control defaultValue={imovel.tipo} name='tipo'></Form.Control>
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Data 1</Form.Label>
                                            <Form.Control defaultValue={imovel.data1} name='data1'></Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Valor 1</Form.Label>
                                            <Form.Control defaultValue={imovel.valor1} name='valor1'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Data 2</Form.Label>
                                            <Form.Control defaultValue={imovel.data2} name='data2'></Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Valor 2</Form.Label>
                                            <Form.Control defaultValue={imovel.valor2} name='valor2'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col>
                            <div className={styles.imagemImovelAdmin}>
                                <img src={imovel.urlImg} style={{ width: "100%" }}></img>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <Button className={styles.btnMultiplicar}>Salvar</Button>
                                <Button className={styles.btnMultiplicar} style={{ margin: 20 }}>Trocar Imagem</Button>
                            </center>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    else{
        return (
            <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>
                <Container>
                <center><h3>Adicionar Imóvel</h3></center>
                    <Row>
                        <Col sm={6}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control name='endereco'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>tipo</Form.Label>
                                    <Form.Control name='tipo'></Form.Control>
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Data 1</Form.Label>
                                            <Form.Control name='data1'></Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Valor 1</Form.Label>
                                            <Form.Control name='valor1'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Data 2</Form.Label>
                                            <Form.Control name='data2'></Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Valor 2</Form.Label>
                                            <Form.Control name='valor2'></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col>
                            <div className={styles.imagemImovelAdmin}>
                                <img src={'https://via.placeholder.com/600x300'} style={{ width: "100%" }}></img>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <Button className={styles.btnMultiplicar}>Salvar</Button>
                                <Button className={styles.btnMultiplicar} style={{ margin: 20 }}>Trocar Imagem</Button>
                            </center>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}