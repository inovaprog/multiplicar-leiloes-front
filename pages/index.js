import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import BarraSup from "../components/barraTopo";
import BlocoImovel from "../components/blocoImovel";
import { Imovel } from "../models/models";

export default function IndexPage({ imoveis, name, id }) {

    if (imoveis) {
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
                <BarraSup nome={name} id={id} />
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
    else {
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
            </div>
        );
    }
}

export async function getServerSideProps({ query }) {
    const token = query.token;
    const idUser = query.id;
    const urlUser = process.env.URL + `/admin/get_user?id=${idUser}`;
    const resUser = await fetch(urlUser,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

    var dataUser = await resUser.json()
    if (dataUser.status != "Success") {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    var user = dataUser.data
    var name = user.nome
    var id = user.id
    if (user['imoveis']) {
        const url = process.env.URL + `/users/imoveis?id=${idUser}`;
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

        var data = await res.json()
        if (data.status != "Success") {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }
        var imoveis = data.data
        return {
            props: { imoveis, name, id },
        }
    }
    return {
        props: { name },
    }
}