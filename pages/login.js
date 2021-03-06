import { Container, Row, Col } from "react-bootstrap";
import BlocoLogin from "./components/login";
import Head from "next/head";
import TopBarClient from "./components/topBarClient";


export default function LoginPage() {
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
            <TopBarClient nome={null} />
            <Container>
                <Row>
                    <Col lg={4}>
                    </Col>
                    <Col lg={4}>
                        <BlocoLogin />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}