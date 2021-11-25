import { Col, Row, Container, Button, Spinner, Form } from "react-bootstrap";
import styles from "../styles/Home.module.css"
import Router from "next/router"
import { useState } from "react";
import formatarMoeda from "../../lib/functions";

export default function SalesSheet({ sales }) {
    const [carregando, setCarregando] = useState(false);

    const uploadVenda = (async (e) => {
        e.preventDefault()
        setCarregando(true)
        var value = e.target.value.value.replace('R$', '').replace('.', '').replace(',', '.')
        var data = {
            "user": parseInt(e.target.user.value),
            "realty": parseInt(e.target.realty.value),
            "value": parseFloat(value),
            "date": e.target.date.value
        }
        var url = process.env.URL + `/sales/add`
        const token = window.localStorage.getItem("tokenAdmin");
        var res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        var response = await res.json();

        console.log(response)
        if (response.statusCode == 201) {
            Router.reload(window.location.pathname);
        }
        else {
            alert("Ocorreu um erro, por favor verifique os dados e tente novamente")
            setCarregando(false)
        }
        console.log(data)
        setCarregando(false)
    })

    const removeVenda = (async (id) => {
        setCarregando(true)
        var url = process.env.URL + `/sales/${id}/remove`
        const token = window.localStorage.getItem("tokenAdmin");
        var res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        var response = await res.json();
        if (response.statusCode == 200) {
            Router.reload(window.location.pathname);
            setCarregando(false)
        }
        else {
            alert("Ocorreu um erro, por favor verifique os dados e tente novamente")
            Router.reload(window.location.pathname);
            setCarregando(false)
        }
    })

    if (carregando) {
        return (
            <div>
                <Container>
                    <center>
                        {carregando ? <Spinner style={{ margin: 50 }} animation='border' /> : null}
                    </center>
                </Container>
            </div>
        )
    }


    return (
        <div>
            <Container>
                <center><h3>Imóveis Arrematados</h3></center>
                <Form onSubmit={uploadVenda}>
                    <Row>
                        <Col>
                            <Form.Label>Data</Form.Label>
                            <Form.Control type='date' name="date" required></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>ID Imóvel</Form.Label>
                            <Form.Control name="realty" type='numeric' required></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>ID Usuário</Form.Label>
                            <Form.Control name="user" type='numeric' required></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>value</Form.Label>
                            <Form.Control name="value" id="value" onChange={() => formatarMoeda('value')} type='numeric' required></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label style={{ visibility: 'hidden' }}>Confirmar</Form.Label>
                            <Button type='submit'>Adicionar Venda</Button>
                        </Col>
                    </Row>
                </Form>
                <div className={styles.topoTabela}>
                    <Row>
                        <Col sm={1}>ID</Col>
                        <Col sm={3}>Data</Col>
                        <Col sm={2}>Imóvel</Col>
                        <Col sm={2}>Usuário</Col>
                        <Col sm={2}>value</Col>
                    </Row>
                </div>
                {sales.map(sale => (
                    <div className={styles.linharealty}>
                        <Row>
                            <Col sm={1}>{sale.id}</Col>
                            <Col sm={3}>{sale.date.toString().split('-')[2] +'/'+sale.date.toString().split('-')[1]+'/'+sale.date.toString().split('-')[0]}</Col>
                            <Col sm={2}><a href={`/admin/editar_imovel?id=${sale.realty.id}`}>{sale.realty.id}</a></Col>
                            <Col sm={2}><a href={`/admin/editar_usuario?id=${sale.user.id}`}>{sale.user.id}</a></Col>
                            <Col sm={2}>{sale.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Col>
                            <Col sm={2}>
                                <Button className={styles.btnMultiplicar} onClick={() => { if (window.confirm('Tem certeza?')) removeVenda(sale.id) }}>Excluir
                                </Button>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Container>
        </div>
    )
}
