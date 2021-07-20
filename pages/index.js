import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import BarraSup from "../components/barraTopo";
import BlocoImovel from "../components/blocoImovel";
import { Imovel } from "../models/models";

export default function IndexPage({ imoveis , name}) {
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
            <BarraSup nome={name} />
            <Container>
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

export async function getServerSideProps({query}) {
    //const token = query.token;
    //const urlUser = process.env.URL + "/getUser";
    //const resUser = await fetch(url,
    //     {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         }
    //     });

    //var dataUser = await resUser.json()
    //var user = dataUser.data
    //var name = user.name
    //const url = process.env.URL + "/user/imoveis/";
    //const res = await fetch(url,
    //     {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         }
    //     });

    //var data = await res.json()
    //var imoveis = data.data
    var name = "Bruno";
    var imoveis = [
        {
            id: 1,
            nome: "Imóvel 1",
            endereco: "Rua 1",
            bairro: "Bairro 1",
            cidade: "Cidade 1",
            estado: "MG",
            rua: "Rua 1",
            valor1: 1000,
            valor2: 2000,
            data1: "01/01/2018",
            data2: "01/01/2018",
            tipo: "Tipo 1"
        },
        {
            id: 2,
            nome: "Imóvel 2",
            endereco: "Rua 2",
            bairro: "Bairro 2",
            cidade: "Cidade 2",
            estado: "MG",
            rua: "Rua 2",
            valor1: 1000,
            valor2: 2000,
            data1: "01/01/2018",
            data2: "01/01/2018",
            tipo: "Tipo 2"
        }
    ];


    return {
        props: { imoveis , name},
    }
}