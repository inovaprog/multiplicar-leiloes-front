import { Col, Row, Container, Button, Spinner, Form } from "react-bootstrap";
import styles from "../styles/Home.module.css"
import Router from "next/router"
import { useState } from "react";
import formatarMoeda from "../lib/functions";

export default function PlanilhaVendas({ vendas }) {
    const [carregando, setCarregando] = useState(false);

    const uploadVenda = (async (e) => {
        e.preventDefault()
        setCarregando(true)
        var valor = e.target.valor.value.replace('R$', '').replace('.', '').replace(',', '.')
        var data = {
            "user": parseInt(e.target.user.value),
            "imovel": parseInt(e.target.imovel.value),
            "valor": parseFloat(valor),
            "data": e.target.data.value
        }
        var url = process.env.URL + `/vendas/add_venda`
        const token = window.localStorage.getItem("token");
        var res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        var response = await res.json();
        if (response.status == 'Success') {
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
        var url = process.env.URL + `/vendas/remove?id=${id}`
        const token = window.localStorage.getItem("token");
        var res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        var response = await res.json();
        if (response.status == 'Success') {
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
                            <Form.Control type='date' name="data" required></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>ID Imóvel</Form.Label>
                            <Form.Control name="imovel" type='numeric' required></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>ID Usuário</Form.Label>
                            <Form.Control name="user" type='numeric' required></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Valor</Form.Label>
                            <Form.Control name="valor" id="valor" onChange={() => formatarMoeda('valor')} type='numeric' required></Form.Control>
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
                        <Col sm={2}>Valor</Col>
                    </Row>
                </div>
                {vendas.map(venda => (
                    <div className={styles.linhaImovel}>
                        <Row>
                            <Col sm={1}>{venda.id}</Col>
                            <Col sm={3}>{venda.data.toString().split('-')[2] +'/'+venda.data.toString().split('-')[1]+'/'+venda.data.toString().split('-')[0]}</Col>
                            <Col sm={2}><a href={`/admin/editar_imovel?id=${venda.imovel.id}`}>{venda.imovel.id}</a></Col>
                            <Col sm={2}><a href={`/admin/editar_usuario?id=${venda.user.id}`}>{venda.user.id}</a></Col>
                            <Col sm={2}>{venda.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Col>
                            <Col sm={2}>
                                <Button className={styles.btnMultiplicar} onClick={() => { if (window.confirm('Tem certeza?')) removeVenda(venda.id) }}>Excluir
                                </Button>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Container>
        </div>
    )
}
