import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import BarraSup from "../components/barraTopo";
import BlocoDetalhe from "../components/blocodetalhe";
import { Imovel } from "../models/models";

export default function IndexPage({ imovel }) {
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
            < BarraSup nome={window.sessionStorage.getItem('name')} />
            <Container>
                <Row>
                    <Col sm={7}>
                        <div>
                            <img style={{ width: "100%", marginTop: 50 }} src={imovel.urlImg} alt="Imagem" />
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
    const token = query.token;
    const id = query.id;

    const url = process.env.URL + `/admin/get_imovel?id=${id}`;
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
    var imovel = data.data
    return {
        props: { imovel },
    }

}