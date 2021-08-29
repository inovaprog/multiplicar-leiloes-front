import Router from 'next/router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import formatarMoeda from '../lib/functions'


export default function FormularioVenda({ usuario }) {

    const addVenda = async (event) => {
        event.preventDefault();
        var valor = event.target.valor1.value.replace('R$', '').replace('.', '').replace(',', '.')

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
                    valor: parseFloat(valor),
                    data: event.target.data.value,
                })
            }
        );
        const data = await response.json();
        if (data.status == "Success") {
            console.log('Adicionado com sucesso');
            console.log(data);
            Router.push('/admin/vendas')
        }
        else {
            alert("Ocorreu um erro, por favor verifique os dados e tente novamente")
            Router.push('/admin/vendas')
        }
    }


    return (
        <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>
            <Container>
                <center><h3>Adicionar Usuário</h3></center>
                <Row>
                    <Col>
                        <Form onSubmit={addVenda}>
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
                                <Form.Control id="valor" onChange={() => formatarMoeda('valor')} name='valor'></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Data</Form.Label>
                                <Form.Control type='date' name='data' type="date"></Form.Control>
                            </Form.Group>
                            <Col>
                                <center>
                                    <Button className={styles.btnMultiplicar} type="submit" style={{ margin: 20 }}>Salvar</Button>
                                </center>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
