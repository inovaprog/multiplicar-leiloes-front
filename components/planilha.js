import { Col, Row, Container, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css"
import Router from "next/router"

export default function Planilha({ imoveis, usuarios }) {
    if (imoveis) {
        return (
            <div>
                <Container>
                    <center><h3>Imóveis</h3></center>

                    <div className={styles.topoTabela}>
                        <Row>
                            <Col xs={2}>ID</Col>
                            <Col xs={4}>Endereço</Col>
                            <Col xs={2}>Valor 1</Col>
                            <Col xs={2}>Valor 2</Col>
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
        return (
            <div>
                <Container>
                    <center><h3>Usuários</h3></center>

                    <div className={styles.topoTabela}>
                        <Row>
                            <Col xs={1}>ID</Col>
                            <Col xs={3}>Nome</Col>
                            <Col xs={4}>Email</Col>
                            <Col xs={2}>Contador</Col>
                            <Col xs={2}>Editar</Col>
                        </Row>
                    </div>
                    {usuarios.map(usuario => (
                        <div className={styles.linhaImovel}>
                            <Row>
                                <Col xs={1}>{usuario.id}</Col>
                                <Col xs={3}>{usuario.nome}</Col>
                                <Col xs={4}>{usuario.email}</Col>
                                <Col xs={2}>{usuario.contador}</Col>
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