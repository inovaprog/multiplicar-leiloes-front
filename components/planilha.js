import { Col, Row, Container, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css"
import Router from "next/router"

export default function Planilha({ imoveis, usuarios }) {
    if (imoveis) {
        return (
            <div>
                <Container>
                    <center><h3>Imóveis</h3></center>
                    <Button onClick={() => Router.push('/admin/adicionar_imovel')}>Adicionar Imóvel</Button>
                    <div className={styles.topoTabela}>
                        <Row>
                            <Col xs={1}>ID</Col>
                            <Col xs={5}>Endereço</Col>
                            <Col xs={2}>1ª Praça</Col>
                            <Col xs={2}>2ª Praça</Col>
                            <Col xs={2}>Editar</Col>
                        </Row>
                    </div>
                    {imoveis.map(imovel => (
                        <div className={styles.linhaImovel}>
                            <Row>
                                <Col xs={2}>{imovel.id}</Col>
                                <Col xs={4}>{imovel.rua} - {imovel.cidade}/{imovel.estado}</Col>
                                <Col xs={2}>{imovel.valor1.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Col>
                                <Col xs={2}>{imovel.valor2 ? imovel.valor2.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : ''}</Col>
                                <Col xs={2}>
                                    <Button className={styles.btnMultiplicar} onClick={() => Router.push(`/admin/editar_imovel?id=${imovel.id}`)}>Detalhes
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Container>
            </div>
        )
    }
    if (usuarios) {
        console.log(usuarios)
        return (
            <div>
                <Container>
                    <center><h3>Usuários</h3></center>
                    <Button onClick={() => Router.push('/admin/adicionar_usuario')}>Adicionar Usuário</Button>
                    <div className={styles.topoTabela}>
                        <Row>
                            <Col xs={1}>ID</Col>
                            <Col xs={3}>Nome</Col>
                            <Col xs={4}>Email</Col>
                            <Col xs={2}>Imoveis</Col>
                            <Col xs={2}>Editar</Col>
                        </Row>
                    </div>
                    {usuarios.map(usuario => (
                        <div className={styles.linhaImovel}>
                            <Row>
                                <Col xs={1}>{usuario.id}</Col>
                                <Col xs={3}>{usuario.nome}</Col>
                                <Col xs={4}>{usuario.email}</Col>
                                <Col xs={2}>{usuario.imoveis.length}</Col>
                                <Col xs={2}>
                                    <Button className={styles.btnMultiplicar} onClick={() => Router.push(`/admin/editar_usuario?id=${usuario.id}`)}>Detalhes
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Container>
            </div>
        )
    }
}