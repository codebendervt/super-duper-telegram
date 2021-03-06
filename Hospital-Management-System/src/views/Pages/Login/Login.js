import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Axios from 'axios';
import utils from '../../../utils'

class Login extends Component {

    componentDidMount() {
        if (utils.getCookie("user") != null)
            this.props.history.push('/')
    }
    
    loginSuccessHandler = (user) => {
        utils.setCookie('user', JSON.stringify({ userId: user.userId, role: user.password }));
        utils.executeAfterDelay(() => this.props.history.push('/'), 500);
    }

    handleLogin = (e) => {
        e.preventDefault();

        var data = {
            username: e.target.elements['username'].value,
            password: e.target.elements['password'].value
        }

        this.loginSuccessHandler({userId: data.username, password:data.password})


        // Axios.post(`http://localhost:3001/api/users/${data.username}`, data)
        //     .then(res => this.loginSuccessHandler({userId: data.username, password:data.role}))
        //     .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.handleLogin}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" id="username" placeholder="Username" autoComplete="username" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" id="password" placeholder="Password" autoComplete="current-password" />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button type="submit" color="primary" className="px-4">Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                                            <Link to="/register">
                                                <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;
