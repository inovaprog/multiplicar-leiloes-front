import Router from 'next/router';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import { useEffect, useState } from 'react';
import formatarMoeda from '../../lib/functions'


export default function UserFrom({ userId }) {
    const [user, setUser] = useState(null)
    const [imv, setImv] = useState('')
    const [carregando, setCarregando] = useState(true)
    const [textBotao, setTextBotao] = useState('Bloquear')

    const removeUser = (async () => {
        setCarregando(true)
        if (!user.isBlocked) {
            var url = process.env.URL + `/users/${user.id}/block`
        } else {
            var url = process.env.URL + `/users/${user.id}/unblock`
        }
        const token = window.localStorage.getItem("tokenAdmin");
        var res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        var data = await res.json();
        console.log(data)
        if (data.statusCode == 200) {
            Router.push(`/admin/usuarios`);
        }
        else {
            console.log(data.data)
            Router.push(`/admin/usuarios`);
        }
    })

    const editarUser = async (event) => {
        event.preventDefault();
        setCarregando(true)

        var realties = []
        if (event.target.realties.value.length > 0) {
            realties = event.target.realties.value.replace(' ', '').split(',')
        }
        var value = event.target.maxValue.value.replace('R$', '').replace('.', '').replace(',', '.')
        const token = window.localStorage.getItem("tokenAdmin");
        let payload = {
            name: event.target.name.value,
            birthDay: event.target.birthDay.value,
            nationality: event.target.nationality.value,
            cityOfBirth: event.target.cityOfBirth.value,
            stateOfBirth: event.target.stateOfBirth.value,
            motherName: event.target.motherName.value,
            rg: event.target.rg.value,
            cpf: event.target.cpf.value,
            civilStatus: event.target.civilStatus.value,
            career: event.target.career.value,
            address: event.target.address.value,
            phone: event.target.phone.value,
            realtyType: event.target.realtyType.value,
            realtyCity: event.target.realtyCity.value,
            realtyState: event.target.realtyState.value,
            realtyDistrict: event.target.realtyDistrict.value,
            maxValue: parseFloat(value),
            paymentType: event.target.paymentType.value,
            realties: realties
        }
        const url = process.env.URL + `/users/${userId}/edit`
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`

                },
                body: JSON.stringify({
                    update: payload
                })
            }
        );
        const data = await response.json();
        if (data.statusCode == 201) {
            console.log('Usuario editado com sucesso');
            console.log(data);
            Router.push('/admin/usuarios')
            setCarregando(false)
        }
        else {
            alert("Ocorreu um erro, por favor verifique os dados e tente novamente")
            Router.push('/admin/usuarios')
        }
    }


    useEffect(async () => {
        const token = window.localStorage.getItem('tokenAdmin')
        const url = process.env.URL + `/users/${userId}`;
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        var data = await res.json()
        console.log(data)
        setUser(data.data)
        var userRealties = ''
        for (var realty of data.data.realties) {
            userRealties += realty.id + ', '
        }
        setImv(userRealties)


        if (data.data.isBlocked) {
            console.log('bloqueado')
            setTextBotao('Desbloquear')
        }
        setCarregando(false)
    }, [])



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
                                <Form.Control defaultValue={user.name} name='name'></Form.Control>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control defaultValue={user.email} name='email'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Endereço</Form.Label>
                                        <Form.Control defaultValue={user.address} name='address'></Form.Control>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Estado civíl</Form.Label>
                                        <Form.Control defaultValue={user.civilStatus} name='civilStatus'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nascimento</Form.Label>
                                        <Form.Control type='date' defaultValue={user.birthDay} name='birthDay'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Profissão</Form.Label>
                                        <Form.Control defaultValue={user.career} name='career'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nacionalidade</Form.Label>
                                        <Form.Control defaultValue={user.nationality} name='nationality'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Cidade do Nascimento</Form.Label>
                                        <Form.Control defaultValue={user.cityOfBirth} name='cityOfBirth'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Estado do Nascimento</Form.Label>
                                        <Form.Control defaultValue={user.stateOfBirth} name='stateOfBirth'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control defaultValue={user.phone} name='phone'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Nome da mãe</Form.Label>
                                        <Form.Control defaultValue={user.motherName} name='motherName'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>RG</Form.Label>
                                        <Form.Control defaultValue={user.rg} name='rg'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control defaultValue={user.cpf} name='cpf'></Form.Control>
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
                                        <Form.Control defaultValue={user.realtyState} name='realtyState'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control defaultValue={user.realtyCity} name='realtyCity'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control defaultValue={user.realtyDistrict} name='realtyDistrict'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control defaultValue={user.realtyType} name='realtyType'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Forma de pagamento</Form.Label>
                                        <Form.Control defaultValue={user.paymentType} name='paymentType'></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Valor máximo do investimento</Form.Label>
                                        <Form.Control defaultValue={user.maxValue ? user.maxValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0.00} onChange={() => formatarMoeda('valor')} id="valor" name='maxValue'></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group>
                                <Form.Label>Imoveis</Form.Label>
                                <Form.Control defaultValue={imv} as="textarea" rows={3} name='realties'></Form.Control>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <center>
                                        <Button type='submit' className={styles.btnMultiplicar} style={{ margin: 20 }}>Salvar</Button>
                                    </center>
                                </Col>
                                <Col>
                                    <Button variant='danger' style={{ margin: 20 }} onClick={() => { if (window.confirm('Tem certeza?')) addCollaborador() }} >Adicionar como Colaborador</Button>
                                </Col>
                                <Col>
                                    {user.isBlocked ?
                                        <Button variant='danger' style={{ margin: 20 }} onClick={() => { if (window.confirm('Tem certeza?')) removeUser() }} >{textBotao}</Button>
                                        :
                                        <Button variant='danger' style={{ margin: 20 }} onClick={() => { if (window.confirm('Tem certeza?')) removeUser() }} >{textBotao}</Button>
                                    }
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}
