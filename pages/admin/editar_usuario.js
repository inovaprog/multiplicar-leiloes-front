import { Container, Row, Col, Spinner } from "react-bootstrap";
import UserForm from "../components/userForm";
import Head from "next/head";
import TopBarAdmin from "../components/topBarAdmin";
import { useEffect, useState } from "react";

export default function EditUser({ id }) {

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
                        <UserForm userId={id} />
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