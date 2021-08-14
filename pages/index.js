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
                    crossorigin="anonymous"
                />
            </Head>
            <BarraSup />
            <Container>
                {carregando ? <center><Spinner style={{ margin: 50 }} animation="border"></Spinner></center> : null}
                <Row>
                    <Col xs={4} style={{ margin: 0 }}>
                        <div style={
                            {
                                width: "100%",
                                backgroundColor: "#DCDCDC",
                                borderRadius: 10,
                                marginTop: 10,
                                padding: 20
                            }
                        }>
                            <center><div><b>Meus Dados</b></div></center>
                            <div><b>Nome: </b>{user.nome}</div>
                            <div><b>Data de nascimento: </b>{user.nascimento}</div>
                            <div><b>Nacionalidade: </b>{user.nacionalidade}</div>
                            <div><b>Cidade de nascimento: </b>{user.nasc_cidade}</div>
                            <div><b>Estado de nascimento: </b>{user.nasc_estado}</div>
                            <div><b>Nome da mãe: </b>{user.mae}</div>
                            <div><b>Estado civil: </b>{user.est_civil}</div>
                            <div><b>Profissão: </b>{user.profissao}</div>
                            <div><b>Endereço: </b>{user.endereco}</div>
                            <div><b>Email: </b>{user.email}</div>
                            <div><b>Telefone: </b>{user.telefone}</div>
                            <Linha></Linha>
                            <center><b>Documentos</b></center>
                            <div><b>RG: </b>{user.rg}</div>
                            <div><b>CPF: </b>{user.cpf}</div>
                            <Linha></Linha>
                            <center><b>Preferências</b></center>
                            <div><b>Tipo de Imóvel: </b>{user.tipo_imovel}</div>
                            <div><b>Cidade: </b>{user.cidade_imovel}</div>
                            <div><b>Estado: </b>{user.estado_imovel}</div>
                            <div><b>Bairro: </b>{user.bairro_imovel}</div>
                            <Linha></Linha>
                            <center><b>Dados de pagamento</b></center>
                            <div><b>Investimento máximo: </b>{user.valor_max}</div>
                            <div><b>Tipo de pagamento: </b>{user.tipo_pagamento}</div>
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            {imoveis.map(imovel => (
                                <Col key={imovel.id} md={6}>
                                    <BlocoImovel imovel={imovel} />
                                </Col>
                            ))}
                        </Row>
                    </Col>

                </Row>
            </Container>
        </div>
    );
}
