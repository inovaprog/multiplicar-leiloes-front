import { Col, Row, Container, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css"
import Router from "next/router"

export default function Planilha({ imoveis, usuarios }) {
    var showHeader = "none";
    var showMsg = "block";
    if (imoveis) {
        if (imoveis.length != 0) {
            showHeader = "block";
            showMsg = "none";
        }
        return (
            <div>
                <Container>
                    <center><h3>Imóveis</h3></center>
                    <Button onClick={() => Router.push('/admin/adicionar_imovel')}>Adicionar Imóvel</Button>
                    <div className={styles.topoTabela} style={{display : showHeader}}>
                        <Row>
                            <Col sm={1}>ID</Col>
                            <Col sm={5}>Endereço</Col>
                            <Col sm={2}>1ª Praça</Col>
                            <Col sm={2}>2ª Praça</Col>
                            <Col sm={2}>Editar</Col>
                        </Row>
                    </div>
                    <div style={{display : showMsg , marginTop: 50}}>
                        <center><h3>Aplique um filtro para fazer uma busca</h3></center>
                    </div>
                    {imoveis.map(imovel => (
                        <div className={styles.linhaImovel}>
                            <Row>
                                <Col sm={2}>{imovel.id}</Col>
                                <Col sm={4}>{imovel.rua} - {imovel.cidade}/{imovel.estado}</Col>
                                <Col sm={2}>{imovel.valor1.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Col>
                                <Col sm={2}>{imovel.valor2 ? imovel.valor2.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : ''}</Col>
                                <Col sm={2}>
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
                            <Col sm={1}>ID</Col>
                            <Col sm={3}>Nome</Col>
                            <Col sm={4}>Email</Col>
                            <Col sm={2}>Imoveis</Col>
                            <Col sm={2}>Editar</Col>
                        </Row>
                    </div>
                    {usuarios.map(usuario => (
                        <div className={styles.linhaImovel}>
                            <Row>
                                <Col sm={1}>{usuario.id}</Col>
                                <Col sm={3}>{usuario.nome}</Col>
                                <Col sm={4}>{usuario.email}</Col>
                                <Col sm={2}>{usuario.imoveis.length}</Col>
                                <Col sm={2}>
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