import React, { Component, useRef } from 'react';
import { apiService } from '../services/ApiService';
import { Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Login extends Component {
  state = {
    id: '',
    userId: '',
  };

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleInputId = this.handleInputId.bind(this);
  }

  async handleInputId(event) {
    this.setState(() => {
      return { id: event.target.value };
    });
  }

  async login(event) {
    event.preventDefault();
    let user = await apiService.getUserById(this.state.id);
    if (user) {
      localStorage.setItem('userId', user.id);
      window.location.href = '/main';
    }
  }

  async toMain() {}

  async componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (userId) window.location.href = '/main';
  }

  render() {
    return (
      <div>
        <Form className="Form" noValidate onSubmit={this.login}>
          <Form.Group className="mb-3">
            <Form.Label>Enter your unique telegram id</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleInputId}
              value={this.state.id}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button className="modalButton" variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
