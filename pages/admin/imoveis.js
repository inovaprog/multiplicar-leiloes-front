import { Container, Row, Col, Form, Button, InputGroup, DropdownButton, Dropdown, FormControl, Spinner } from "react-bootstrap";
import Head from "next/head";
import { useState, useEffect } from "react";
import TopBarAdmin from "../components/topBarAdmin";
import RealtySheet from "../components/realtySheet.js";

export default function LoginPage() {
    const [allrealties, setrealties] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(async () => {
        setCarregando(true);
        const token = window.localStorage.getItem("tokenAdmin");
        let target = window.localStorage.getItem("target");
        var localUrl = process.env.API_URL + "/realty?state=zzz";
        var apiUrl = window.localStorage.getItem("searchUrl") || localUrl;
        const res = await fetch(apiUrl,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        var data = await res.json();
        if (data.statusCode == 200) {
            var realties = data.data
            console.log(realties);
            if (realties.length > 0) {
                setrealties(realties)
                window.localStorage.setItem('searchUrl', apiUrl);
                var elemento = document.createElement('a');
                elemento.setAttribute('href', '#' + target);
                setCarregando(false);
                if (target) {
                    elemento.click();
                    window.localStorage.removeItem("target");
                }
            }
            setCarregando(false);
        }
        else {
            window.location.href = "/admin/login";
        }

    }, []);

    async function changeRealties(event) {
        event.preventDefault();
        window.localStorage.removeItem("realties");

        var city = event.target.city.value;
        var district = event.target.district.value;
        var type = event.target.type.value;
        var state = event.target.state.value;
        var cres = event.target.valorCres.checked;
        var decres = event.target.valorDecres.checked;
        var id = event.target.id.value;
        var source = event.target.source.value;
        var order = event.target.order.value || 'id';

        var query = '?';
        if (id != '') {
            query += '&id=' + id;
        }
        if (city != '') {
            query += '&city=' + city;
        }
        if (district != '') {
            query += '&district=' + district;
        }
        if (type != '') {
            query += '&type=' + type;
        }
        if (state != '') {
            query += '&state=' + state;
        }
        if (source != '') {
            query += '&source=' + source;
        }
        if (order != '') {
            query += '&order=' + order;
        }
        if (cres) {
            query += '&sort=asc';
        }
        if (decres) {
            query += '&d_order=desc';
        }
        var url = process.env.API_URL + "/realty" + query;
        window.localStorage.setItem("searchUrl", url);
        window.location.reload();
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
                <Container>
                    <center>
                        {carregando ? <Spinner style={{ margin: 50 }} animation='border' /> : null}
                    </center>
                </Container>
            </div>
        )
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
                <center>
                    {carregando ? <Spinner style={{ margin: 50 }} animation='border' /> : null}
                    <Form onSubmit={changeRealties} style={{ padding: 25 }}>
                        <Row>
                            <Col sm={1}>
                                <Form.Control placeholder="ID" name="id"></Form.Control>
                            </Col>
                            <Col sm={1}>
                                <Form.Control placeholder="Estado" name="state"></Form.Control>
                            </Col>
                            <Col sm={2}>
                                <Form.Control placeholder="Cidade" name="city"></Form.Control>
                            </Col>
                            <Col sm={2}>
                                <Form.Control placeholder="Bairro" name="district"></Form.Control>
                            </Col>
                            <Col sm={2}>
                                <Form.Control placeholder="Tipo" name="type"></Form.Control>
                            </Col>
                            <Col sm={2}>
                                <FormControl as="select" name="source">
                                    <option value=''>Selecione</option>
                                    <option value="zukerman">Zukerman</option>
                                    <option value="megaLeiloes">Mega Leilões</option>
                                    <option value="sodreSantoro">Sodre Santoro</option>
                                    <option value="frazao">Frazão</option>
                                    <option value="biasi">Biasi</option>
                                    <option value="lanceJudicial">Lance Judicial</option>
                                    <option value="leilaoVip">Leilão Vip</option>
                                    <option value="fidalgo">Fidalgo Leilões</option>
                                    <option value="webLeiloes">Web Leilões</option>
                                    <option value="asgleiloes">ASG Leilões</option>
                                    <option value="d1lance">D1 Lance</option>

                                </FormControl>
                            </Col>
                            <Col sm={2}>
                                <Button type="submit" bsStyle="primary">Buscar</Button>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col sm={2}>
                                <FormControl as="select" name="order">
                                    <option value=''>Ordernar por:</option>
                                    <option value="firstValue">Valor 1ª Praça</option>
                                    <option value="secondValue">Valor 2ª Praça</option>
                                    <option value="city">Cidade</option>
                                </FormControl>
                            </Col>
                            <Col sm={2}>
                                <Form.Check type="radio" name='valor' id="valorCres" label="Valor crescente" />
                            </Col>
                            <Col sm={2}>
                                <Form.Check type="radio" name='valor' id="valorDecres" label="Valor decrescente" />
                            </Col>
                        </Row>
                    </Form>
                </center>
                <Row>
                    <Col>
                        <RealtySheet realties={allrealties} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
