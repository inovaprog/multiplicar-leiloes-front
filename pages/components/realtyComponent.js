import { Col, Row, Container, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css"
import Router from 'next/router'

export default function RealtyComponent({ realty }) {
    if (!realty) {
        return null;
    }
    if (realty.secondValue > 0) {
        var promo = (realty.marketValue > 0) ? 100 - parseInt(realty.secondValue/realty.marketValue*100) : null
    }
    else {
        var promo = (realty.marketValue > 0) ? 100 - parseInt(realty.firstValue/realty.marketValue*100) : null
    }
    var street = realty.street.split('-')
    street.splice(0, 1);
    street.splice(-2, 2);
    return (
        <Container>
            <div className={styles.blocorealty}>
                {
                    realty.imgUrl ?
                <Row>
                    <Col>
                        <div id={styles.container}>
                            <img src={realty.imgUrl.split(',')[0]}/>
                            {promo ? <figcaption > <span>{promo}%</span> de desconto</figcaption> : null}
                        </div>
                        <div style={{backgroundColor: "green",
                                    color: "white",
                                    maxWidth: "100%",
                                    padding: 10,
                                    marginBottom: 5,
                                    fontSize: "1em", 
                                    fontWeight: "bold",
                    }}>Valor de mercado: {realty.marketValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                    </Col>
                </Row>
                :
                null
                }
                <Row>
                    <center>
                        <div className={styles.city}>{realty.city}/{realty.state} <span>{realty.bairro}</span></div>
                        <div className={styles.address}>{street}</div>
                        <div className={styles.data}>{realty.firstDate}</div>
                        {!realty.secondValue ? <div> Lance Mínimo: </div> : null}
                        <div className={styles.value} style={(realty.secondValue > 0) ? { textDecoration: 'line-through' } : { color:"red", fontSize: 30 }}>{realty.firstValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                        <div className={styles.data}>{realty.data2}</div>
                        <div className={styles.value}>{realty.secondDate ? realty.secondDate.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</div>
                        {realty.secondValue ? <div> Lance Mínimo: </div> : null}
                        <div className={styles.value} style={{color:"red", fontSize: 30}}>{realty.secondValue ? realty.secondValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</div>

                    </center>
                </Row>
                <center>
                    <Button onClick={() => Router.push(`/realty?id=${realty.id}`)} className={styles.btnMultiplicar}> Ver detalhes </Button>
                </center>
            </div>
        </Container>
    )
}
