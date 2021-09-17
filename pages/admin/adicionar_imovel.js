import { Container, Row, Col } from "react-bootstrap";
import FormularioImovel from "../../components/formulario";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";

export default function AdcionarImovel(){
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
                        <FormularioImovel/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}