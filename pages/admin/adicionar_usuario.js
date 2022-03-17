import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import TopBarAdmin from "../components/topBarAdmin";
import AddUserForm from "../components/addUserForm";

export default function AddUser() {
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
            <TopBarAdmin  />
            <Container>
                <Row>
                    <Col>
                        <AddUserForm />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
