import { Container, Row, Col, Form, Button, Carousel, Spinner } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import { Imovel } from '../models/models'
import { useEffect, useState, useLayoutEffect } from 'react'
import React from 'react'
import Router from 'next/router'

export default function FormularioImovel({ imovel }) {
    const [images, setImages] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [fotos, setFotos] = useState([]);

    useLayoutEffect(() => {
        console.log("teste")
        if ('urlImg' in imovel) {
            var imgs = imovel.urlImg.split(",");
            setImages(imgs);
        }
    }, [imovel])

    const converte2b64 = (file) => {
        return new Promise((resolve, reject) => {
            try {
                var image = file
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onloadend = () => {
                    resolve(reader.result)
                }
            } catch (error) {
                reject("error")
            }
        })
    }

    async function upFoto(event) {
        var imageList = event.target.files
        var fotos = []
        var show = []
        for (var image of imageList) {
            await converte2b64(image).then((result) => { fotos.push(result.split(',')[1]) })
            show.push(URL.createObjectURL(image))
        }
        setImages(show)
        setFotos(fotos)
    }

    const removeImovel = (async () => {
        var url = process.env.URL + `/admin/remove_imovel?id=${imovel.id}`
        const token = window.localStorage.getItem("token");
        var res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        var response = await res.json();
        if (response.status == 'Success') {
            Router.push(`/admin/imoveis`);
        }
        else {
            console.log("erro")
            Router.push(`/admin/imoveis`);
        }
    })


    const addImovel = (async (event) => {
        console.log(event)
        event.preventDefault()
        if (!event.target.id.value) {
            var data = {
                estado: event.target.estado.value,
                cidade: event.target.cidade.value,
                bairro: event.target.bairro.value,
                rua: event.target.rua.value,
                valor1: event.target.valor1.value,
                valor2: event.target.valor2.value,
                data1: event.target.data1.value,
                data2: event.target.data2.value,
                tipo: event.target.tipo.value,
                foto: fotos,
            }
            var url = process.env.URL + '/admin/add_imovel'
            const token = window.localStorage.getItem("token");
            var res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
        } else {
            var data = {
                id: event.target.id.value,
                update: {
                    estado: event.target.estado.value,
                    cidade: event.target.cidade.value,
                    bairro: event.target.bairro.value,
                    rua: event.target.rua.value,
                    valor1: event.target.valor1.value,
                    valor2: event.target.valor2.value,
                    data1: event.target.data1.value,
                    data2: event.target.data2.value,
                    tipo: event.target.tipo.value,
                    foto: fotos
                }
            }
            console.log(data)
            var url = process.env.URL + '/admin/edit_imovel'
            const token = window.localStorage.getItem("token");
            var res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
        }
        var response = await res.json();
        if (response.status == 'Success') {
            Router.push(`/admin/`);
        }
        else {
            console.log("erro")
            setCarregando(false);
        }
    })

    var titulo = "Editar Imóvel"
    var textBotao = "Excluir"
    if (!imovel) {
        titulo = "Novo Imóvel"
        var imovel = new Imovel();
        var id_label = " ---- "
        textBotao = "Cancelar"
    }
    else {
        var id_label = imovel.id
    }

    if (carregando) {
        return (
            <div>
                <center><Spinner style={{ margin: 50 }} animation="border"></Spinner></center>
            </div>
        );
    }

    const hiddenFileInput = React.useRef(null);


    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>
            <Container>
                <center><h3>{titulo}</h3></center>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={addImovel}>
                            <Form.Control style={{ display: 'none' }} name='id' value={imovel.id}></Form.Control>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: 'bold' }}>{`ID do Imóvel: ${id_label}`}</Form.Label>
                                <br></br>
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control required defaultValue={imovel.rua} name='rua'></Form.Control>
                            </Form.Group>
                            <Row>
                                <Col sm={4}>
                                    <Form.Group>
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control required defaultValue={imovel.bairro} name='bairro'></Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group>
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control required defaultValue={imovel.cidade} name='cidade'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={2}>
                                    <Form.Group>
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Control required defaultValue={imovel.estado} name='estado'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={7}>
                                    <Form.Group>
                                        <Form.Label>Tipo do imóvel</Form.Label>
                                        <Form.Control required defaultValue={imovel.tipo} name='tipo'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={5}>
                                    <Form.Group>
                                        <Form.Label>Valor de mercado</Form.Label>
                                        <Form.Control defaultValue={imovel.valor_mercado} name='valor_mercado'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Primeira Praça</Form.Label>
                                        <Form.Control required defaultValue={imovel.data1} name='data1'></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Valor 1ª Praça</Form.Label>
                                        <Form.Control required defaultValue={imovel.valor1} name='valor1'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Segunda Praça</Form.Label>
                                        <Form.Control defaultValue={imovel.data2} name='data2'></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Valor 2ª Praça</Form.Label>
                                        <Form.Control defaultValue={imovel.valor2} name='valor2'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <center>
                                    <Button className={styles.btnMultiplicar} type="submit" >Salvar</Button>
                                    <Button className={styles.btnMultiplicar} style={{ margin: 20 }} onClick={handleClick}>Trocar Imagem</Button>
                                    <input type="file" style={{ display: 'none' }} onChange={upFoto} ref={hiddenFileInput} id="file" name="file" multiple />
                                    <Button variant='danger' style={{ margin: 20 }} onClick={() => { if (window.confirm('Tem certeza?')) removeImovel() }} >{textBotao}</Button>
                                </center>
                            </Row>
                        </Form>
                    </Col>
                    <Col>
                        <div className={styles.imagemImovelAdmin}>
                            <div>
                                <Carousel prevLabel={null} nextLabel={null}>
                                    {images.map(i => (
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={i}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    )

}