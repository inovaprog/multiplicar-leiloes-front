import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import Router from 'next/router';

export default function BlocoDetalhe({ imovel }) {

    const lance = (() => {
        const link = `https://api.whatsapp.com/send?phone=5531996146595&text=Ola,%20tenho%20interesse%20no%20imovel%20%23id%20%3D%20${imovel.id}`
        Router.push(link)
    })

    return (
        <Container>
            <div className={styles.blocoImovel} style={{ marginTop: 50 }}>
                <Row>
                    <center>
                        <div className={styles.preco}>{imovel.tipo}</div>
                        <div className={styles.cidade}>{imovel.cidade}/{imovel.estado} <span>{imovel.bairro}</span></div>
                        <div className={styles.endereco}>{imovel.rua}</div>
                        <div className={styles.data}>Data: {imovel.data1}</div>
                        <div className={styles.preco} style={imovel.valor2 ? { textDecoration: 'line-through' } : { textDecoration: 'normal' }}>{imovel.valor1.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                        <div className={styles.data}>{imovel.data2}</div>
                        <div className={styles.preco}>{imovel.valor2 ? imovel.valor2.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</div>
                        <div className={styles.data}>{imovel.valor_mercado ? `Valor de Mercado:  ${imovel.valor_mercado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` : ''}</div>
                    </center>
                </Row>
                <center>
                    <Button onClick={lance} className={styles.btnMultiplicar}>  Fazer Lance </Button>
                </center>
            </div>
        </Container>
    )
}
