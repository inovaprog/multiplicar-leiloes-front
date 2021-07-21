import { Container, Row, Col } from "react-bootstrap";
import Planilha from "../../components/planilha";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";

export default function LoginPage({usuarios}) {
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
                        <Planilha usuarios={usuarios} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export async function getServerSideProps({query}) {
    const token = query.token;
    const url = process.env.URL + "/admin/get_all_users";
    const res = await fetch(url,
         {
             method: "GET",
             headers: {
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
             }
         });

    var data = await res.json()
    var usuarios = data.data
    return {
        props: { usuarios },
    }
}