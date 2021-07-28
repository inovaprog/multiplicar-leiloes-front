import { Container, Row, Col, Form, Button, InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap";
import Planilha from "../../components/planilha";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";
import { useState, useEffect } from "react";

export default function LoginPage({ imoveis }) {
    const [allImoveis, setImoveis] = useState(imoveis);

    async function trocarImoveis(event) {
        event.preventDefault();
        var tipo = event.target.tipo.value;
        var q = event.target.q.value;
        const url = process.env.URL + `/admin/get_imoveis?${tipo.toLowerCase()}=${q}`;
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

        var data = await res.json()
        var imoveis = data.data
        console.log(imoveis)
        setImoveis(imoveis)
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
                    <Form onSubmit={trocarImoveis} style={{ padding: 25 }}>
                        <Row>
                            <Col sm={3}>
                                <Form.Control required="true" name="tipo" as="select">
                                    <option>Cidade</option>
                                    <option>Estado</option>
                                    <option>Bairro</option>
                                    <option>Tipo</option>
                                </Form.Control>
                            </Col>
                            <Col sm={6}>
                                <Form.Control placeholder="Busca" name="q"></Form.Control>
                            </Col>
                            <Col sm={3}>
                                <Button type="submit" bsStyle="primary">Buscar</Button>
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

export async function getServerSideProps({ query }) {
    const token = query.token;
    const url = process.env.URL + "/admin/get_imoveis";
    const res = await fetch(url,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

    var data = await res.json()
    var imoveis = data.data

    return {
        props: { imoveis },
    }
}