import React, { Component, useRef } from 'react';
import { apiService } from '../services/ApiService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Settings extends Component {
  allReports = [];
  state = {
    settings: {},
    settingsRendered: false,
    botEnabled: false,
    mondayFrom: 0,
    mondayTo: 0,
    tuesdayFrom: 0,
    tuesdayTo: 0,
    wednesdayFrom: 0,
    wednesdayTo: 0,
    thursdayFrom: 0,
    thursdayTo: 0,
    fridayFrom: 0,
    fridayTo: 0,
    saturdayFrom: 0,
    saturdayTo: 0,
    sundayFrom: 0,
    sundayTo: 0,
  };

  constructor(props) {
    super(props);
    this.handleInputBotEnabled = this.handleInputBotEnabled.bind(this);
    this.handleInputMondayFrom = this.handleInputMondayFrom.bind(this);
    this.handleInputMondayTo = this.handleInputMondayTo.bind(this);
    this.handleInputTuesdayFrom = this.handleInputTuesdayFrom.bind(this);
    this.handleInputTuesdayTo = this.handleInputTuesdayTo.bind(this);
    this.handleInputWednesdayFrom = this.handleInputWednesdayFrom.bind(this);
    this.handleInputWednesdayTo = this.handleInputWednesdayTo.bind(this);
    this.handleInputThursdayFrom = this.handleInputThursdayFrom.bind(this);
    this.handleInputThursdayTo = this.handleInputThursdayTo.bind(this);
    this.handleInputFridayFrom = this.handleInputFridayFrom.bind(this);
    this.handleInputFridayTo = this.handleInputFridayTo.bind(this);
    this.handleInputSaturdayFrom = this.handleInputSaturdayFrom.bind(this);
    this.handleInputSaturdayTo = this.handleInputSaturdayTo.bind(this);
    this.handleInputSundayFrom = this.handleInputSundayFrom.bind(this);
    this.handleInputSundayTo = this.handleInputSundayTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (!userId) window.location.href = '/';
    const settings = await apiService.getUserSchedule(userId);
    this.setState(() => {
      return { settings };
    });
    console.log(settings);
    this.setState(() => {
      return { settingsRendered: true };
    });
  }

  async handleInputBotEnabled(event) {
    this.setState(() => {
      return { botEnabled: event.target.checked };
    });
  }

  async handleInputMondayFrom(event) {
    this.setState(() => {
      return { mondayFrom: event.target.value };
    });
  }

  async handleInputMondayTo(event) {
    this.setState(() => {
      return { mondayTo: event.target.value };
    });
  }

  async handleInputTuesdayFrom(event) {
    this.setState(() => {
      return { tuesdayFrom: event.target.value };
    });
  }

  async handleInputTuesdayTo(event) {
    this.setState(() => {
      return { tuesdayTo: event.target.value };
    });
  }

  async handleInputWednesdayFrom(event) {
    this.setState(() => {
      return { wednesdayFrom: event.target.value };
    });
  }

  async handleInputWednesdayTo(event) {
    this.setState(() => {
      return { wednesdayTo: event.target.value };
    });
  }

  async handleInputThursdayFrom(event) {
    this.setState(() => {
      return { thursdayFrom: event.target.value };
    });
  }

  async handleInputThursdayTo(event) {
    this.setState(() => {
      return { thursdayTo: event.target.value };
    });
  }

  async handleInputFridayFrom(event) {
    this.setState(() => {
      return { fridayFrom: event.target.value };
    });
  }

  async handleInputFridayTo(event) {
    this.setState(() => {
      return { fridayTo: event.target.value };
    });
  }

  async handleInputSaturdayFrom(event) {
    this.setState(() => {
      return { saturdayFrom: event.target.value };
    });
  }

  async handleInputSaturdayTo(event) {
    this.setState(() => {
      return { saturdayTo: event.target.value };
    });
  }

  async handleInputSundayFrom(event) {
    this.setState(() => {
      return { sundayFrom: event.target.value };
    });
  }

  async handleInputSundayTo(event) {
    this.setState(() => {
      return { sundayTo: event.target.value };
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let data = {
      botActivated: this.state.botEnabled,
      fridayFrom: this.state.fridayFrom,
      fridayTill: this.state.fridayTo,
      mondayFrom: this.state.mondayFrom,
      mondayTill: this.state.mondayTo,
      ownerId: localStorage.getItem('userId'),
      saturdayFrom: this.state.saturdayFrom,
      saturdayTill: this.state.saturdayTo,
      sundayFrom: this.state.sundayFrom,
      sundayTill: this.state.sundayTo,
      thursdayFrom: this.state.thursdayFrom,
      thursdayTill: this.state.thursdayTo,
      tuesdayFrom: this.state.tuesdayFrom,
      tuesdayTill: this.state.tuesdayTo,
      wednesdayFrom: this.state.wednesdayFrom,
      wednesdayTill: this.state.wednesdayTo,
    };
    console.log(data);
    // if (this.state.settings) {
    //   apiService.updateUserSettings(data);
    // } else {
    //   apiService.createUserSettings(data);
    // }
  }

  renderReports() {
    return (
      <div>
        <div>
          <Button
            className="modalButton"
            variant="primary"
            onClick={() => {
              window.location.href = '/main';
            }}
          >
            Reports
          </Button>
        </div>
        <Form className="FormSettings" noValidate onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              onClick={this.handleInputBotEnabled}
              value={this.state.botEnabled}
              label="Enable bot notifications"
            />
          </Form.Group>
          <Row>
            <Col xs={1}>Monday From/To</Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.mondayFrom}
                  onChange={this.handleInputMondayFrom}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.mondayTo}
                  onChange={this.handleInputMondayTo}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={1}>Tuesday From/To</Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.tuesdayFrom}
                  onChange={this.handleInputTuesdayFrom}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.tuesdayTo}
                  onChange={this.handleInputTuesdayTo}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={1}>Wednesday From/To</Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.wednesdayFrom}
                  onChange={this.handleInputWednesdayFrom}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.wednesdayTo}
                  onChange={this.handleInputWednesdayTo}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={1}>Thursday From/To</Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.thursdayFrom}
                  onChange={this.handleInputThursdayFrom}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.thursdayTo}
                  onChange={this.handleInputThursdayTo}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={1}>Friday From/To</Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.fridayFrom}
                  onChange={this.handleInputFridayFrom}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.fridayTo}
                  onChange={this.handleInputFridayTo}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={1}>Saturday From/To</Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.saturdayFrom}
                  onChange={this.handleInputSaturdayFrom}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.saturdayTo}
                  onChange={this.handleInputSaturdayTo}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={1}>Sunday From/To</Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.sundayFrom}
                  onChange={this.handleInputSundayFrom}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={this.state.sundayTo}
                  onChange={this.handleInputSundayTo}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-grid gap-2">
            <Button className="modalButton" variant="primary" type="submit">
              Save settings
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  render() {
    let { settingsRendered } = this.state;
    return settingsRendered ? this.renderReports() : 'Loading settings';
  }
}
