import { Col, Row, Container, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css"
import Router from "next/router"

export default function UsersSheet({ users }) {
    if (!users) {
        return null;
    }
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
                {users.map(user => (
                    <div className={styles.linhaImovel}>
                        <Row>
                            <Col sm={1}>{user.id}</Col>
                            <Col sm={3}>{user.name}</Col>
                            <Col sm={4}>{user.email}</Col>
                            <Col sm={2}>{user.realties.length}</Col>
                            <Col sm={2}>
                                <Button className={styles.btnMultiplicar} onClick={() => Router.push(`/admin/editar_usuario?id=${user.id}`)}>Detalhes
                                </Button>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Container>
        </div>
    )
}