import Router from 'next/router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styles from "../styles/Home.module.css"


export default function FormularioUsuario({ usuario }) {

    const editarUser = async (event) => {
        event.preventDefault();
        const url = process.env.URL + '/admin/editar_usuario'
        var imoveis = ''
        if(event.target.imoveis.value.length > 0) {
            imoveis = event.target.imoveis.value
        }
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: usuario.id.toString(),
                    nome: event.target.nome.value,
                    imoveis: imoveis
                })
            }
        );
        const data = await response.json();
        if(data.status == "Success") {
            console.log('Usuario editado com sucesso');
            console.log(data);
            Router.push('/admin/usuarios')
        }
    }

    if (usuario) {
        return (
            <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>
                <Container>
                    <center><h3>Editar Usuário</h3></center>
                    <Row>
                        <Col>
                            <Form onSubmit={editarUser}>
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
                                    <Form.Control value={usuario.chave} disabled name='chave'></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Imoveis</Form.Label>
                                    <Form.Control defaultValue={usuario.imoveis} as="textarea" rows={3} name='imoveis'></Form.Control>
                                </Form.Group>
                                <Col>
                                    <center>
                                        <Button type='submit' className={styles.btnMultiplicar} style={{ margin: 20 }}>Salvar</Button>
                                    </center>
                                </Col>
                            </Form>
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