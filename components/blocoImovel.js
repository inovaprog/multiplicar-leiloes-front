import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import { Imovel } from '../models/models';
import Router from 'next/router'

export default function BlocoImovel({imovel}) {
    return (
        <Container>
            <div className={styles.blocoImovel}>
                <Row>
                    <Col>
                        <div className={styles.fotoImovel}>
                            <img src={'https://via.placeholder.com/300x200'}></img>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <center>
                        <div className={styles.cidade}>{imovel.cidade}/{imovel.estado} <span>Bairro</span></div>
                        <div className={styles.endereco}>{imovel.rua}</div>
                        <div className={styles.data}>Data: {imovel.data1}</div>
                        <div className={styles.preco}>R$ {imovel.valor1}</div>
                        <div className={styles.data}>Data: {imovel.data2}</div>
                        <div className={styles.preco}>R$ {imovel.valor2}</div>
                    </center>
                </Row>
                <center>
                    <Button onClick={()=>Router.push(`/imovel?id=${imovel.id}&token=${window.sessionStorage.getItem('token')}`)} className={styles.btnMultiplicar}> Fazer Lance </Button>
                </center>
            </div>
        </Container>
    )
}
