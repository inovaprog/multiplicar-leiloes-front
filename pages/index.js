import { Container, Row, Col, Spinner } from "react-bootstrap";
import Head from "next/head";
import TopBarClient from "./components/topBarClient"
import RealtyComponent from "./components/realtyComponent";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function IndexPage() {
    const [carregando, setCarregando] = useState(true);
    const [realties, setRealties] = useState([]);
    const [user, setUser] = useState({})


    useEffect(async () => {
        if (!window.localStorage.getItem("token")) {
            Router.push("/login");
        }
        const token = window.localStorage.getItem("token");
        var url = process.env.URL + `/users/me`;
        var res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json()
        if (data.statusCode == 200) {
            setRealties(data.data.realties)
            setUser(data.data)
            localStorage.setItem("name", data.data.name)
            setCarregando(false)
        }
        else {
            Router.push('/login')
        }
    }, [])

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

            <TopBarClient />
            <Container>
                {carregando ? <center><Spinner style={{ margin: 50 }} animation="border"></Spinner></center> : null}

                <Row>
                    {realties.map(realty => (
                        <Col key={realty.id} md={4}>
                            <RealtyComponent realty={realty} />
                        </Col>
                    ))}
                </Row>

            </Container>
        </div>
    );
}
