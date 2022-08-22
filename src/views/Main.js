import React, { Component, useRef } from 'react';
import { apiService } from '../services/ApiService';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class Main extends Component {
  allReports = [];
  state = {
    reports: [],
    reportsRendered: false,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (!userId) window.location.href = '/';
    const reports = await apiService.getUserReports(userId);
    this.setState(() => {
      return { reports };
    });
    console.log(this.state.reports);
    this.setState(() => {
      return { reportsRendered: true };
    });
  }

  renderReports() {
    return (
      <div>
        <div>
          <Button
            className="modalButton"
            variant="primary"
            onClick={() => {
              window.location.href = '/settings';
            }}
          >
            Settings
          </Button>
        </div>
        <div>Reports:</div>
        {this.state.reports.forEach((report) => {
          this.allReports.push(
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{report.time}</Card.Title>
                <Card.Text>
                  <div>Task type: {report.taskType}</div>
                  <div>Happiness: {report.happiness}</div>
                  <div>Focus: {report.focus}</div>
                  <div>Note: {report.note}</div>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
        {this.allReports}
      </div>
    );
  }

  render() {
    let { reportsRendered } = this.state;
    return reportsRendered ? this.renderReports() : 'Loading reports';
  }
}
