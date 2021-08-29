import { Container, Row, Col, Form, Button, InputGroup, DropdownButton, Dropdown, FormControl, Spinner } from "react-bootstrap";
import Planilha from "../../components/planilha";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";
import { useState, useEffect } from "react";

export default function LoginPage() {
    const [allImoveis, setImoveis] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [url, setUrl] = useState(process.env.URL + "/admin/get_imoveis?estado=0");

    useEffect(async () => {
        setCarregando(true);
        const token = window.localStorage.getItem("token");
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        if (res.status == 200) {
            var data = await res.json()
            var imoveis = data.data
            setImoveis(imoveis)
            setCarregando(false)
        }
        else {
            window.location.href = "admin/login";
        }

    }, [url]);

    async function trocarImoveis(event) {
        event.preventDefault();
        var cidade = event.target.cidade.value;
        var bairro = event.target.bairro.value;
        var tipo = event.target.tipo.value;
        var estado = event.target.estado.value;
        var cres = event.target.valorCres.checked;
        var decres = event.target.valorDecres.checked;
        var id = event.target.id.value;

        var query = '?';
        if (id != '') {
            query += '&id=' + id;
        }
        if (cidade != '') {
            query += '&cidade=' + cidade;
        }
        if (bairro != '') {
            query += '&bairro=' + bairro;
        }
        if (tipo != '') {
            query += '&tipo=' + tipo;
        }
        if (estado != '') {
            query += '&estado=' + estado;
        }
        if (cres) {
            query += '&order=valor1';
        }
        if (decres) {
            query += '&d_order=valor1';
        }
        var url = process.env.URL + "/admin/get_imoveis" + query;
        console.log(url.replace('?&', '?'));
        setUrl(url);
        return () => { }
    }

    if (carregando) {
        return (
            <div>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                        crossorigin="anonymous"
                    />
                </Head>
                <BarraSup nome={null} />
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
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                    crossorigin="anonymous"
                />
            </Head>
            <BarraSup nome={null} />
            <Container>
                <center>
                    {carregando ? <Spinner style={{ margin: 50 }} animation='border' /> : null}
                    <Form onSubmit={trocarImoveis} style={{ padding: 25 }}>
                        <Row>
                            <Col sm={2}>
                                <Form.Control placeholder="ID" name="id"></Form.Control>
                            </Col>
                            <Col sm={2}>
                                <Form.Control placeholder="Estado" name="estado"></Form.Control>
                            </Col>
                            <Col sm={2}>
                                <Form.Control placeholder="Cidade" name="cidade"></Form.Control>
                            </Col>
                            <Col sm={2}>
                                <Form.Control placeholder="Bairro" name="bairro"></Form.Control>
                            </Col>
                            <Col sm={2}>
                                <Form.Control placeholder="Tipo" name="tipo"></Form.Control>
                            </Col>
                            <Col sm={2}>
                                <Button type="submit" bsStyle="primary">Buscar</Button>
                            </Col>
                            <Col sm={2}>
                                <Form.Check type="radio" name='valor' id="valorCres" label="Valor crescente" />
                                <Form.Check type="radio" name='valor' id="valorDecres" label="Valor decrescente" />
                            </Col>
                        </Row>
                    </Form>
                </center>
                <Row>
                    <Col>
                        <Planilha imoveis={allImoveis} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
