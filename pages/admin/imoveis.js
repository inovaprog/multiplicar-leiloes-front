import { Container, Row, Col, Form, Button, InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap";
import Planilha from "../../components/planilha";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";
import { useState, useEffect } from "react";

export default function LoginPage({ imoveis }) {
    const [allImoveis, setImoveis] = useState(imoveis);
    async function trocarImoveis(event) {
        var tipo = event.target.tipo.value;
        var q = event.target.q.value;
        const url = process.env.URL + `/admin/get_imoveis?${tipo}=${q}`;
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