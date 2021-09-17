import { Container, Row, Col, Spinner } from "react-bootstrap";
import Head from "next/head";
import BarraSup from "../components/barraTopo";
import BlocoImovel from "../components/blocoImovel";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function IndexPage() {
    const [carregando, setCarregando] = useState(true);
    const [imoveis, setImoveis] = useState([]);
    const [user, setUser] = useState({})

    function Linha() {
        return (
            <div
                style={
                    {
                        height: 1,
                        width: "100%",
                        backgroundColor: "#c1c1c1",
                        marginTop: 10,
                        marginBottom: 10
                    }
                }
            ></div>
        )
    }

    useEffect(async () => {
        if (!window.localStorage.getItem("token")) {
            Router.push("/login");
        }
        const token = window.localStorage.getItem("token");
        const userId = window.localStorage.getItem('userId');
        var url = process.env.URL + `/users/imoveis?id=${userId}`;
        var res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json()
        console.log(data)
        if (data.status != "Success") {
            Router.push('/login')
        }
        setImoveis(data.data)
        //buscar User
        url = process.env.URL + `/admin/get_user?id=${userId}`;
        res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json()
        console.log(data)
        if (data.status != "Success") {
            Router.push('/login')
        }
        setUser(data.data)
        setCarregando(false)
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
            <BarraSup />
            <Container>
                {carregando ? <center><Spinner style={{ margin: 50 }} animation="border"></Spinner></center> : null}

                <Row>
                    {imoveis.map(imovel => (
                        <Col key={imovel.id} md={4}>
                            <BlocoImovel imovel={imovel} />
                        </Col>
                    ))}
                </Row>

            </Container>
        </div>
    );
}
