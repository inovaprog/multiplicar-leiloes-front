import Router from 'next/router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styles from "../styles/Home.module.css"


export default function FormularioVenda({ usuario }) {

    const editarUser = async (event) => {
        event.preventDefault();
        const url = process.env.URL + '/admin/add_venda'
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imovel: event.target.imovel.value,
                    usuario: event.target.usuario.value,
                    valor: event.target.valor.value,
                    data: event.target.data.value,
                })
            }
        );
        const data = await response.json();
        if (data.status == "Success") {
            console.log('Adicionado com sucesso');
            console.log(data);
            Router.push('/admin/')
        }
    }


    return (
        <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>
            <Container>
                <center><h3>Adicionar Usuário</h3></center>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>Imóvel</Form.Label>
                                <Form.Control name='imovel'></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Usuário</Form.Label>
                                <Form.Control name='usuario'></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Valor</Form.Label>
                                <Form.Control name='valor'></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Data</Form.Label>
                                <Form.Control name='data' type="date"></Form.Control>
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
