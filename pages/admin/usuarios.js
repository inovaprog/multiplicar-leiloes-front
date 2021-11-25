import { Container, Row, Col, Spinner } from "react-bootstrap";
import UsersSheet from "../components/usersSheet";
import Head from "next/head";
import TopBarAdmin from "../components/topBarAdmin";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function LoginPage() {
    const [users, setUsers] = useState([])
    const [carregando, setCarregando] = useState(true)

    useEffect(async () => {
        const token = window.localStorage.getItem('tokenAdmin')
        const url = process.env.URL + "/users";
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json();
        console.log(data)
        if (data.statusCode == 200) {
            setUsers(data.data);
        }
        else {
            Router.push('/admin/login')
        }
        setCarregando(false)
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
                <TopBarAdmin nome={null} />
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
            <TopBarAdmin />
            <Container>
                <Row>
                     <Col>
                        <UsersSheet users={users} />
                    </Col> 
                </Row>
            </Container>
        </div>
    );
}
