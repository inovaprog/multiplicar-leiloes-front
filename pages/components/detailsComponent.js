import { Row, Container, Form, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import Router from 'next/router';

export default function BlocoDetalhe({ imovel }) {

    const lance = (() => {
        const link = `https://api.whatsapp.com/send?phone=5511953061107&text=Ola,%20tenho%20interesse%20no%20imovel%20%23id%20%3D%20${imovel.id}`
        Router.push(link)
    })

    if(!imovel) {
        return null
    }

    return (
        <Container>
            <div className={styles.blocorealty} style={{ marginTop: 50 }}>
                <Row>
                    <center>
                        <div className={styles.value}>{imovel.tipo}</div>
                        <div className={styles.city}>{imovel.city}/{imovel.state} <span>{imovel.district}</span></div>
                        <div className={styles.address}>{imovel.street}</div>
                        <div className={styles.data}>Data: {imovel.firstDate}</div>
                        <div className={styles.value} style={imovel.secondValue ? { textDecoration: 'line-through' } : { textDecoration: 'normal' }}>{imovel.firstValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                        <div className={styles.data}>{imovel.secondDate}</div>
                        <div className={styles.value}>{imovel.secondValue ? imovel.secondValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</div>
                        <div className={styles.data}>{imovel.marketValue ? `Valor de Mercado:  ${imovel.marketValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` : ''}</div>
                    </center>
                </Row>
                <center>
                    <Button onClick={lance} className={styles.btnMultiplicar}>  Fazer Lance </Button>
                </center>
            </div>
        </Container>
    )
}
