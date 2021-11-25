import { Container, Row, Col, Spinner } from "react-bootstrap";
import Head from "next/head";
import TopBarAdmin from "../components/topBarAdmin";
import { useState, useEffect } from "react";
import Router from "next/router";

export default function IndexPage() {
    const [dados, setDados] = useState({})
    const [carregando, setCarregando] = useState(true)

    useEffect(async () => {
        const token = window.localStorage.getItem('tokenAdmin')
        const url = process.env.API_URL + "/admin/summary";
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json();
        if (data.statusCode == 200) {
            setDados(data.data);
            setCarregando(false)
        }
        else {
            Router.push('/admin/login')
        }

    }, [])

    const styles = {
        bloco: {
            width: "100%",
            height: 200,
            backgroundColor: "#DCDCDC",
            borderRadius: 10,
            marginTop: 30,
            padding: 10,
        },
        nome: {
            marginTop: 20,
            fontSize: 24,
        },
        quantidade: {
            fontSize: 50,
            fontWeight: "bolder"
        },
        titulo: {
            marginTop: 30
        }
    }

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
                <TopBarAdmin />
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
            <Container style={styles.titulo}>
                <Row>
                    <center><h1>Multiplicar Leilões</h1></center>
                </Row>
                <Row>
                    <Col>
                        <div style={styles.bloco}>
                            <center>
                                <label style={styles.nome}>Imoveis Cadastrados</label>
                                <br></br>
                                <span style={styles.quantidade}>{dados.realties}</span>
                            </center>
                        </div>
                    </Col>
                    <Col>
                        <div style={styles.bloco}>
                            <center>
                                <label style={styles.nome}>Clientes Cadastrados</label>
                                <br></br>
                                <span style={styles.quantidade}>{dados.users}</span>
                            </center>
                        </div>
                    </Col>
                    <Col>
                        <div style={styles.bloco}>
                            <center>
                                <label style={styles.nome}>Vendas Realizadas</label>
                                <br></br>
                                <span style={styles.quantidade}>{dados.sales}</span>
                            </center>
                        </div>
                    </Col>
                    <Col>
                        <div style={styles.bloco}>
                            <center>
                                <label style={styles.nome}>Leiloeiros Cadastrados</label>
                                <br></br>
                                <span style={styles.quantidade}>{dados.auctioneers}</span>
                            </center>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <div style={styles.bloco}>
                            <center>
                                <label style={styles.nome}>Valor total de vendas</label>
                                <br></br>
                                <span style={styles.quantidade}>{dados['saleAmount'].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                            </center>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}