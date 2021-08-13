import { Container, Row, Col, Spinner } from "react-bootstrap";
import FormularioImovel from "../../components/formulario";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function EditarImovel({ id }) {
    const [imovel, setImovel] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(async () => {
        const url = process.env.URL + `/admin/get_imovel?id=${id}`;
        const token = window.sessionStorage.getItem("token");
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json()
        var imovel = data.data[0];
        console.log(imovel)
        if (!imovel) {
            Router.push('/admin/adicionar_imovel')
        }
        else {
            setImovel(imovel);
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
                <Row>
                    <Col>
                        <FormularioImovel imovel={imovel} />
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