import Router from 'next/router';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import { User } from '../models/models';
import { useEffect, useLayoutEffect, useState } from 'react';
import formatarMoeda from '../lib/functions'


export default function FormularioColaborador({ u }) {
    const [usuario, setUsuario] = useState(null)
    const [imv, setImv] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [textBotao, setTextBotao] = useState('Excluir')
    console.log(u)

    const addUserAdmin = async (event) => {
        event.preventDefault();
        setCarregando(true)

        const url = process.env.URL + '/admin/add_user_admin';
        const token = window.localStorage.getItem("token");
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`

                },
                body: JSON.stringify({
                    nome: event.target.nome.value,
                    email: event.target.email.value,
                    chave: event.target.chave.value
                })
            }
        );
        const data = await response.json();
        if (data.status == "Success") {
            console.log('Usuario editado com sucesso');
            console.log(data);
            Router.push('/admin')
            setCarregando(false)
        }
        else {
            alert("Ocorreu um erro, por favor verifique os dados e tente novamente")
            Router.push('/admin')
        }

    }

    if (carregando) {
        return (
            <div>
                <center> <Spinner style={{ margin: 50 }} animation="border"></Spinner></center>
            </div>
        )
    }

    return (
        <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>

            <Container>
                <center><h3>Adicionar Colaborador</h3></center>
                <Row>
                    <Col>
                        <Form onSubmit={addUserAdmin}>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control name='nome'></Form.Control>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control  name='email'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Chave</Form.Label>
                                        <Form.Control name='chave'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <center>
                                        <Button type='submit' className={styles.btnMultiplicar} style={{ margin: 20 }}>Salvar</Button>
                                    </center>
                                </Col>
                                <Col>
                                    <Button variant='danger' style={{ margin: 20 }} href="/admin" >Cancelar</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}
