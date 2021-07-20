import { Container, Row, Col } from "react-bootstrap";
import FormularioUsuario from "../../components/formulariousuario";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";

export default function AdicionarUsuario({usuario}) {
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
                        <FormularioUsuario usuario={usuario} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
