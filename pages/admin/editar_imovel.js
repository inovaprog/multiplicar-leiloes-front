import { Container, Row, Col, Spinner } from "react-bootstrap";
import Head from "next/head";
import TopBarAdmin from "../components/topBarAdmin";
import { useEffect, useState } from "react";
import Router from "next/router";
import RealtyForm from "../components/realtyForm";

export default function EditarImovel({ id }) {
    const [realty, setRealty] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(async () => {
        const url = process.env.URL + `/realty/${id}`;
        const token = window.localStorage.getItem("tokenAdmin");
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json()
        var realty = data.data[0];
        if (!realty) {
            Router.push('/admin/adicionar_imovel')
        }
        else {
            setRealty(realty);
            setCarregando(false);
        }
    }, []);

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
                    crossOrigin="anonymous"
                />
            </Head>
            <TopBarAdmin nome={null} />
            <Container>
                <Row>
                    <Col>
                        <RealtyForm realty={realty} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const id = query.id;
    return {
        props: { id },
    }
}