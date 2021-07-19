import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import BarraSup from "../components/barraTopo";
import BlocoDetalhe from "../components/blocodetalhe";
import { Imovel } from "../models/models";

export default function IndexPage({ imovel, name }) {
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
            < BarraSup nome={name} />
            <Container>
                <Row>
                    <Col sm={7}>
                        <div>
                            <img style={{width:"100%", marginTop:50}} src={'https://via.placeholder.com/600x400'} alt="Imagem" />
                        </div>
                    </Col>
                    <Col sm={5}>
                        <BlocoDetalhe imovel={imovel} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export async function getServerSideProps(query: any) {
    //const token = query.token;
    //const id = query.id;
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
    //const url = process.env.URL + "/imoveis/get";
    //const res = await fetch(url,
    //     {
    //         method: "POST",
    //         body: JSON.stringify({id: id }),
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         }
    //     });

    //var data = await res.json()
    //var imoveis = data.data
    var name = "João";
    var imovel = {
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
    };


    return {
        props: { imovel, name },
    }
}