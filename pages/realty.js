import { Container, Row, Col, Spinner, Carousel } from "react-bootstrap";
import Head from "next/head";
import BlocoDetalhe from "./components/detailsComponent";
import { useEffect, useState } from "react";
import TopBarClient from "./components/topBarClient";
import Router from "next/router";

export default function RealtyPage({ id }) {
    const [imovel, setImovel] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(async () => {
        const token = window.localStorage.getItem("token");
        const url = process.env.API_URL + `/realty/${id}`;
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json()
        if (data.statusCode == 200) {
            var images = data.data[0].imgUrl.split(",");
            setImovel(data.data[0]);
            setImages(images);
            setCarregando(false);
        }
        else {
            Router.push('/login')
        }
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
                < TopBarClient />
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
            < TopBarClient />
            <Container>
                <Row>
                    <Col sm={7}>
                        <div>
                            <Carousel prevLabel={null} nextLabel={null}>
                                {images.map(i => (
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={i}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    </Col>
                    <Col sm={5}>
                        <BlocoDetalhe imovel={imovel} />
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