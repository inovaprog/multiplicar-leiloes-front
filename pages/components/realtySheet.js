import { Col, Row, Container, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css"
import Router from "next/router"

export default function realtySheet({ realties }) {
    var showHeader = "none";
    var showMsg = "block";
    console.log(realties);
    if (realties.length != 0) {
        showHeader = "block";
        showMsg = "none";
    }
    return (
        <div>
            <Container>
                <center><h3>Imóveis</h3></center>
                <Button onClick={() => Router.push('/admin/adicionar_imovel')}>Adicionar Imóvel</Button>
                <div className={styles.topoTabela} style={{ display: showHeader }}>
                    <Row>
                        <Col sm={1}>ID</Col>
                        <Col sm={5}>Endereço</Col>
                        <Col sm={2}>1ª Praça</Col>
                        <Col sm={2}>2ª Praça</Col>
                        <Col sm={2}>Editar</Col>
                    </Row>
                </div>
                <div style={{ display: showMsg, marginTop: 50 }}>
                    <center><h3>Aplique um filtro para fazer uma busca</h3></center>
                </div>
                {realties.map(realty => (
                    <div id={realty.id} className={styles.linhaImovel}>
                        <Row>
                            <Col sm={2}>{realty.id}</Col>
                            <Col sm={4}>{realty.street} - {realty.city}/{realty.state}</Col>
                            <Col sm={2}>{realty.firstValue ? realty.firstValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</Col>
                            <Col sm={2}>{realty.secondValue ? realty.secondValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</Col>
                            <Col sm={2}>
                                <a href={`/admin/editar_imovel?id=${realty.id}`} onClick={() => window.localStorage.setItem('target', realty.id)} >
                                    <Button className={styles.btnMultiplicar}>Detalhes
                                    </Button>
                                </a>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Container>
        </div>
    )
}
