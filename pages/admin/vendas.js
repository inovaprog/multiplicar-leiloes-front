import { Container, Row, Col, Spinner } from "react-bootstrap";
import PlanilhaVendas from "../../components/planilha-vendas";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const [vendas, setVendas] = useState([])
    const [carregando, setCarregando] = useState(true)

    useEffect(async () => {
        const token = window.localStorage.getItem('token')
        const url = process.env.URL + "/vendas";
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json();
        console.log(data)
        setVendas(data.data);
        setCarregando(false)
    }, [])

    if (carregando) {
        return (
            <div>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                        crossOrigin="anonymous"
                    />
                </Head>
                <BarraSup nome={null} />
                <center><Spinner style={{ margin: 50 }} animation="border"></Spinner></center>
            </div>
        );
    }

    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                    crossOrigin="anonymous"
                />
            </Head>
            <BarraSup nome={null} />
            <Container>
                <Row>
                    <Col>
                        <PlanilhaVendas vendas={vendas} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
