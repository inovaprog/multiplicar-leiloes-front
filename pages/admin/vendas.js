import { Container, Row, Col, Spinner } from "react-bootstrap";
import SalesSheet from "../components/salesSheet";
import Head from "next/head";
import TopBarAdmin from "../components/topBarAdmin";
import { useEffect, useState } from "react";

export default function Sales() {
    const [sales, setsales] = useState([])
    const [carregando, setCarregando] = useState(true)

    useEffect(async () => {
        const token = window.localStorage.getItem('tokenAdmin')
        const url = process.env.API_URL + "/sales";
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
        setsales(data.data);
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
                <TopBarAdmin nome={null} />
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
            <TopBarAdmin />
            <Container>
                <Row>
                    <Col>
                        <SalesSheet sales={sales} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
