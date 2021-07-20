import { Container, Row, Col } from "react-bootstrap";
import FormularioUsuario from "../../components/formulariousuario";
import Head from "next/head";
import BarraSup from "../../components/barraTopoAdmin";

export default function EditarImovel({usuario}) {
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
            <BarraSup nome={null} />
            <Container>
                <Row>
                    <Col>
                        <FormularioUsuario usuario={usuario} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export async function getServerSideProps(query: any) {
    //const token = query.token;
    //const url = process.env.URL + "/admin/imoveis/";
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
    var usuario = {
        id: 1,
        nome: "Joao",
        email: "joao@joao.com",
        chave: 12356,
        contador: 5,
        imoveis: ['jfdsfs', 'fdsfdsfds', 'fdfs']
    };


    return {
        props: { usuario },
    }
}