import { Container, Row, Col, Spinner } from "react-bootstrap";
import Head from "next/head";
import BarraSup from "../components/barraTopo";
import BlocoImovel from "../components/blocoImovel";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function IndexPage() {
    const [carregando, setCarregando] = useState(true);
    const [imoveis, setImoveis] = useState([]);


    useEffect(async () => {
        if (!window.sessionStorage.getItem("token")) {
            Router.push("/login");
        }
        const token = window.sessionStorage.getItem("token");
        const userId = window.sessionStorage.getItem('userId');
        const url = process.env.URL + `/users/imoveis?id=${userId}`;
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json()
        if (data.status != "Success") {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }
        setImoveis(data.data)
        setCarregando(false)
    }, [])

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
            <BarraSup />
            <Container>
                {carregando ?<center><Spinner style={{margin:50}} animation="border"></Spinner></center>  : null}
                <Row>
                    {imoveis.map(imovel => (
                        <Col key={imovel.id} md={4}>
                            <BlocoImovel imovel={imovel} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
