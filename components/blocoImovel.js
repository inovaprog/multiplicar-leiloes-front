import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import Router from 'next/router'

export default function BlocoImovel({imovel}) {
    console.log(imovel)
    var rua = imovel.rua.split('-')
    rua.splice(0, 1);
    rua.splice(-2,2);
    return (
        <Container>
            <div className={styles.blocoImovel}>
                <Row>
                    <Col>
                        <div className={styles.fotoImovel}>
                            <img src={imovel.urlImg}></img>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <center>
                        <div className={styles.cidade}>{imovel.cidade}/{imovel.estado} <span>{imovel.bairro}</span></div>
                        <div className={styles.endereco}>{rua}</div>
                        <div className={styles.data}>{imovel.data1}</div>
                        <div className={styles.preco} style={imovel.valor2 ? {textDecoration: 'line-through'} : {textDecoration: 'normal'}}>{imovel.valor1.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                        <div className={styles.data}>{imovel.data2}</div>
                        <div className={styles.preco}>{imovel.valor2 ? imovel.valor2.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : ''}</div>
                    </center>
                </Row>
                <center>
                    <Button onClick={()=>Router.push(`/imovel?id=${imovel.id}`)} className={styles.btnMultiplicar}> Ver detalhes </Button>
                </center>
            </div>
        </Container>
    )
}
