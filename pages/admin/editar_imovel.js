import { Container, Row, Col } from "react-bootstrap";
import FormularioImovel from "../../components/formulario";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";

export default function EditarImovel({imovel}) {
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

export async function getServerSideProps({query}) {
    const id = query.id;
    const token = query.token;
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
    var imovel = data.data;
    return {
        props: { imovel },
    }
}