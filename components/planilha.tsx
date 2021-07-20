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
                            <Col xs={6}>Endereço</Col>
                            <Col xs={2}>Valor</Col>
                            <Col xs={2}>Editar</Col>
                        </Row>
                    </div>
                    {imoveis.map(imovel => (
                        <div className={styles.linhaImovel}>
                            <Row>
                                <Col xs={2}>{imovel.id}</Col>
                                <Col xs={6}>{imovel.endereco} - {imovel.cidade}/{imovel.estado}</Col>
                                <Col xs={2}>{imovel.valor1}</Col>
                                <Col xs={2}>
                                    <Button className={styles.btnMultiplicar} onClick={() => Router.push(`/imoveis/${imovel.id}`)}>Detalhes
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
                            <Col xs={2}>ID</Col>
                            <Col xs={3}>Nome</Col>
                            <Col xs={3}>Email</Col>
                            <Col xs={2}>Contador</Col>
                            <Col xs={2}>Editar</Col>
                        </Row>
                    </div>
                    {usuarios.map(usuario => (
                        <div className={styles.linhaImovel}>
                            <Row>
                                <Col xs={2}>{usuario.id}</Col>
                                <Col xs={3}>{usuario.nome}</Col>
                                <Col xs={3}>{usuario.email}</Col>
                                <Col xs={2}>{usuario.contador}</Col>
                                <Col xs={2}>
                                    <Button className={styles.btnMultiplicar} onClick={() => Router.push(`/imoveis/${imovel.id}`)}>Detalhes
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