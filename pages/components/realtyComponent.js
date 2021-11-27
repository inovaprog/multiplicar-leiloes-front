import { Col, Row, Container, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import Router from 'next/router'

export default function RealtyComponent({ realty }) {
    if (!realty) {
        return null;
    }
    var promo = (realty.marketValue > 0) ? 100 - parseInt(realty.firstValue/realty.marketValue*100) : null
    var street = realty.street.split('-')
    street.splice(0, 1);
    street.splice(-2, 2);
    return (
        <Container>
            <div className={styles.blocorealty}>
                <Row>
                    <Col>
                        <div id={styles.container}>
                            <img src={realty.imgUrl.split(',')[0]}/>
                            {promo ? <figcaption > <span>{promo}%</span> de desconto</figcaption> : null}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <center>
                        <div className={styles.city}>{realty.city}/{realty.state} <span>{realty.bairro}</span></div>
                        <div className={styles.address}>{street}</div>
                        <div className={styles.data}>{realty.firstDate}</div>
                        <div className={styles.value} style={(realty.secondDate > 0) ? { textDecoration: 'line-through' } : { textDecoration: 'normal' }}>{realty.firstValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                        <div className={styles.data}>{realty.data2}</div>
                        <div className={styles.value}>{realty.secondDate ? realty.secondDate.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</div>
                    </center>
                </Row>
                <center>
                    <Button onClick={() => Router.push(`/realty?id=${realty.id}`)} className={styles.btnMultiplicar}> Ver detalhes </Button>
                </center>
            </div>
        </Container>
    )
}
