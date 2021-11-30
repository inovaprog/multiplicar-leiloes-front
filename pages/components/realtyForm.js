import { Container, Row, Col, Form, Button, Carousel, Spinner, FormControl } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import { Realty } from '../../models/models'
import { useEffect, useState, useLayoutEffect } from 'react'
import React from 'react'
import Router from 'next/router'
import formatarMoeda from '../../lib/functions'

export default function RealtyForm({ realty }) {
    console.log(realty)
    const [images, setImages] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [fotos, setFotos] = useState([]);

    useLayoutEffect(() => {
        if ('imgUrl' in realty) {
            if (realty.imgUrl != null) {
                var imgs = realty.imgUrl.split(",");
                setImages(imgs);
            }
        }
    }, [realty])

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
            await converte2b64(image).then((result) => {  fotos.push(result.split(',')[1]) })
            show.push(URL.createObjectURL(image))
        }
        setImages(show)
        setFotos(fotos)
    }

    const removeImovel = (async () => {
        var url = process.env.API_URL + `/realty/${realty.id}/remove`;
        const token = window.localStorage.getItem("tokenAdmin");
        var res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        var response = await res.json();
        console.log(response)
        if (response.statusCode == 200) {
            Router.push(`/admin/imoveis`);
        }
        else {
            console.log("erro")
            Router.push(`/admin/imoveis`);
        }
    })


    const addImovel = (async (event) => {
        event.preventDefault()
        var firstValue = event.target.firstValue.value.replace('R$', '').replace('.', '').replace(',', '.')
        var secondValue = event.target.secondValue.value.replace('R$', '').replace('.', '').replace(',', '.')
        var marketValue = event.target.marketValue.value.replace('R$', '').replace('.', '').replace(',', '.')
        const token = window.localStorage.getItem("tokenAdmin");
        var data = {
            state: event.target.state.value,
            city: event.target.city.value,
            district: event.target.district.value,
            street: event.target.street.value,
            marketValue: parseFloat(marketValue),
            firstValue: parseFloat(firstValue),
            secondValue: parseFloat(secondValue),
            firstDate: event.target.firstDate.value,
            secondDate: event.target.secondDate.value,
            type: event.target.type.value,
            analyzed: event.target.analyzed.checked,
            source: event.target.source.value,
            image: fotos,
        }
        if (!event.target.id.value) {
            var url = process.env.API_URL + '/realty/add'
            var res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
        } else {
            var updateData = {
                id: event.target.id.value,
                update: data
            }
            var url = process.env.API_URL + `/realty/${updateData.id}/edit`
            var res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });
        }
        var response = await res.json();
        if (response.statusCode == 201) {
            Router.push(`/admin/imoveis`);
        }
        else {
            alert("Ocorreu um erro. Por favor verifique os dados e tente novamente.")
            setCarregando(false);
        }
    })

    var titulo = "Editar Imóvel"
    var textBotao = "Excluir"
    if (!realty) {
        titulo = "Novo Imóvel"
        var realty = new Realty();
        var id_label = " ---- "
        textBotao = "Cancelar"
    }
    else {
        var id_label = realty.id
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
                            <Form.Control style={{ display: 'none' }} name='id' value={realty.id}></Form.Control>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label style={{ fontWeight: 'bold' }}>{`ID do Imóvel: ${id_label}`}</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Check defaultChecked={realty.analyzed} type="checkbox" name='analyzed' id="analyzed" label="Analisado Juridicamente" ></Form.Check>
                                    </Col>
                                    <Col>
                                        <Form.Control required defaultValue={realty.source} name="source"></Form.Control>
                                    </Col>
                                </Row>
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control required defaultValue={realty.street} name='street'></Form.Control>
                            </Form.Group>
                            <Row>
                                <Col sm={4}>
                                    <Form.Group>
                                        <Form.Label>district</Form.Label>
                                        <Form.Control required defaultValue={realty.district} name='district'></Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group>
                                        <Form.Label>city</Form.Label>
                                        <Form.Control required defaultValue={realty.city} name='city'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={2}>
                                    <Form.Group>
                                        <Form.Label>state</Form.Label>
                                        <Form.Control required defaultValue={realty.state} name='state'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={7}>
                                    <Form.Group>
                                        <Form.Label>type do imóvel</Form.Label>
                                        <Form.Control required defaultValue={realty.type} name='type'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={5}>
                                    <Form.Group>
                                        <Form.Label>Valor de mercado</Form.Label>
                                        <Form.Control defaultValue={realty.marketValue ? realty.marketValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0.00.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} id="marketValue" onChange={() => formatarMoeda('marketValue')} name='marketValue'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Primeira Praça</Form.Label>
                                        <Form.Control required defaultValue={realty.firstDate} name='firstDate'></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Valor 1ª Praça</Form.Label>
                                        <Form.Control required defaultValue={realty.firstValue ? realty.firstValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0.00.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} id="firstValue" onChange={() => formatarMoeda('firstValue')} name='firstValue'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Segunda Praça</Form.Label>
                                        <Form.Control defaultValue={realty.secondDate} name='secondDate'></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Valor 2ª Praça</Form.Label>
                                        <Form.Control defaultValue={realty.secondValue ? realty.secondValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0.00.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} id="secondValue" onChange={() => formatarMoeda('secondValue')} name='secondValue'></Form.Control>
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
                        <Row style={{ margin: 30, padding: 10 }}>
                            <Col>
                                <center><Button href={realty.sourceLink} target='_blank'>Abrir em {realty.source}</Button></center>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </div >
    )

}