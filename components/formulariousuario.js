import Router from 'next/router';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import { User } from '../models/models';
import { useEffect, useLayoutEffect, useState } from 'react';


export default function FormularioUsuario({ u }) {
    const [usuario, setUsuario] = useState(null)
    const [imv, setImv] = useState('')
    const [carregando, setCarregando] = useState(true)
    const [textBotao, setTextBotao] = useState('Excluir')
    console.log(u)

    const removeUser = (async () => {
        setCarregando(true)
        var url = process.env.URL + `/admin/remove_user?id=${u}`
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
            Router.push(`/admin/usuarios`);
        }
        else {
            console.log("erro")
            Router.push(`/admin/usuarios`);
        }
    })

    useEffect(async () => {
        var titulo = "Editar Cliente"
        if (!u) {
            titulo = "Novo Cliente"
            var user = new User()
            setUsuario(user)
            setTextBotao("Cancelar")
        }
        else {
            const token = window.localStorage.getItem('token')
            const url = process.env.URL + `/admin/get_user?id=${u}`;
            const res = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

            var data = await res.json()
            setUsuario(data.data)
            var im = ''
            for (var imovel of data.data.imoveis) {
                im += imovel.id + ', '
            }
            setImv(im)
        }
        setCarregando(false)
    }, [])


    const editarUser = async (event) => {
        event.preventDefault();
        setCarregando(true)
        if (u) {
            const url = process.env.URL + '/admin/editar_usuario'
            var imoveis = []
            if (event.target.imoveis.value.length > 0) {
                imoveis = event.target.imoveis.value.replace(' ', '').split(',')
                console.log(imoveis)
            }
            const token = window.localStorage.getItem("token");
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`

                    },
                    body: JSON.stringify({
                        id: u,
                        update: {
                            nome: event.target.nome.value,
                            nascimento: event.target.nascimento.value,
                            nacionalidade: event.target.nacionalidade.value,
                            nasc_cidade: event.target.nasc_cidade.value,
                            nasc_estado: event.target.nasc_estado.value,
                            mae: event.target.mae.value,
                            rg: event.target.rg.value,
                            cpf: event.target.cpf.value,
                            est_civil: event.target.est_civil.value,
                            profissao: event.target.profissao.value,
                            endereco: event.target.endereco.value,
                            telefone: event.target.telefone.value,
                            tipo_imovel: event.target.tipo_imovel.value,
                            cidade_imovel: event.target.cidade_imovel.value,
                            estado_imovel: event.target.estado_imovel.value,
                            bairro_imovel: event.target.bairro_imovel.value,
                            valor_max: event.target.valor_max.value,
                            tipo_pagamento: event.target.tipo_pagamento.value,
                            imoveis: imoveis
                        }
                    })
                }
            );
            const data = await response.json();
            if (data.status == "Success") {
                console.log('Usuario editado com sucesso');
                console.log(data);
                Router.push('/admin/usuarios')
                setCarregando(false)
            }
            else{
                alert("Ocorreu um erro, por favor verifique os dados e tente novamente")
                Router.push('/admin/usuarios')
            }
        }
        else {
            const url = process.env.URL + '/admin/add_user'
            var imoveis = []
            if (event.target.imoveis.value.length > 0) {
                imoveis = event.target.imoveis.value.replace(' ', '').split(',')
                console.log(imoveis)
            }
            const token = window.localStorage.getItem("token");
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`

                    },
                    body: JSON.stringify({
                        nome: event.target.nome.value,
                        email: event.target.email.value,
                        chave: event.target.chave.value,
                        nascimento: event.target.nascimento.value,
                        nacionalidade: event.target.nacionalidade.value,
                        nasc_cidade: event.target.nasc_cidade.value,
                        nasc_estado: event.target.nasc_estado.value,
                        mae: event.target.mae.value,
                        rg: event.target.rg.value,
                        cpf: event.target.cpf.value,
                        est_civil: event.target.est_civil.value,
                        profissao: event.target.profissao.value,
                        endereco: event.target.endereco.value,
                        telefone: event.target.telefone.value,
                        tipo_imovel: event.target.tipo_imovel.value,
                        cidade_imovel: event.target.cidade_imovel.value,
                        estado_imovel: event.target.estado_imovel.value,
                        bairro_imovel: event.target.bairro_imovel.value,
                        valor_max: event.target.valor_max.value,
                        tipo_pagamento: event.target.tipo_pagamento.value,
                        imoveis: imoveis
                    })
                }
            );
            const data = await response.json();
            if (data.status == "Success") {
                console.log('Usuario editado com sucesso');
                console.log(data);
                Router.push('/admin/usuarios')
                setCarregando(false)
            }
            else{
                alert("Ocorreu um erro, por favor verifique os dados e tente novamente")
                Router.push('/admin/usuarios')
            }
        }
    }

    if (carregando) {
        return (
            <div>
                <center> <Spinner style={{ margin: 50 }} animation="border"></Spinner></center>
            </div>
        )
    }


    return (
        <div style={{ backgroundColor: '#E3E3E3', borderRadius: 10, marginTop: 30, padding: 20 }}>
            <Container>
                <center><h3>Editar Usuário</h3></center>
                <Row>
                    <Col>
                        <Form onSubmit={editarUser}>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control defaultValue={usuario.nome} name='nome'></Form.Control>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control defaultValue={usuario.email} name='email'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Chave</Form.Label>
                                        <Form.Control defaultValue={usuario.chave} name='chave'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Endereço</Form.Label>
                                        <Form.Control defaultValue={usuario.endereco} name='endereco'></Form.Control>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Estado civíl</Form.Label>
                                        <Form.Control defaultValue={usuario.est_civil} name='est_civil'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nascimento</Form.Label>
                                        <Form.Control defaultValue={usuario.nascimento} name='nascimento'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Profissão</Form.Label>
                                        <Form.Control defaultValue={usuario.profissao} name='profissao'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nacionalidade</Form.Label>
                                        <Form.Control defaultValue={usuario.nacionalidade} name='nacionalidade'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Cidade do Nascimento</Form.Label>
                                        <Form.Control defaultValue={usuario.nasc_cidade} name='nasc_cidade'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Estado do Nascimento</Form.Label>
                                        <Form.Control defaultValue={usuario.nasc_estado} name='nasc_estado'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control defaultValue={usuario.telefone} name='telefone'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nome da mãe</Form.Label>
                                        <Form.Control defaultValue={usuario.mae} name='mae'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>RG</Form.Label>
                                        <Form.Control defaultValue={usuario.rg} name='rg'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control defaultValue={usuario.cpf} name='cpf'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <div style={{ margin: 10 }}>
                                    <center><b>Preferência de imóvel</b></center>
                                </div>
                            </Row>
                            <Row>
                                <Col xs={1}>
                                    <Form.Group>
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Control defaultValue={usuario.estado_imovel} name='estado_imovel'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control defaultValue={usuario.cidade_imovel} name='cidade_imovel'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control defaultValue={usuario.bairro_imovel} name='bairro_imovel'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control defaultValue={usuario.tipo_imovel} name='tipo_imovel'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Forma de pagamento</Form.Label>
                                        <Form.Control defaultValue={usuario.tipo_pagamento} name='tipo_pagamento'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Valor máximo do investimento</Form.Label>
                                        <Form.Control defaultValue={usuario.valor_max} name='valor_max'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group>
                                <Form.Label>Imoveis</Form.Label>
                                <Form.Control defaultValue={imv} as="textarea" rows={3} name='imoveis'></Form.Control>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <center>
                                        <Button type='submit' className={styles.btnMultiplicar} style={{ margin: 20 }}>Salvar</Button>
                                    </center>
                                </Col>
                                <Col>
                                    <Button variant='danger' style={{ margin: 20 }} onClick={() => { if (window.confirm('Tem certeza?')) removeUser() }} >{textBotao}</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}
