import React, { Component, useRef } from 'react';
import { apiService } from '../services/ApiService';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { data, PieChart } from './PieChart';

export default class Main extends Component {
  allReports = [];
  state = {
    reports: [],
    taskTypesKeys: [],
    taskTypesTimes: [],
    taskTypesHappiness: [],
    taskTypesFocus: [],
    reportsRendered: false,
    stats: {},
    statsHappiness: {},
    statsFocus: {},
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (!userId) window.location.href = '/';
    const reports = await apiService.getUserReports(userId);
    let taskTypes = reports.map((a) => a.taskType);
    let reportHappiness = reports.map((a) => a.happiness);
    let reportFocus = reports.map((a) => a.focus);
    let duplicateCount = {};
    let duplicateHappiness = {};
    let duplicateFocus = {};
    taskTypes.forEach(
      (e) => (duplicateCount[e] = duplicateCount[e] ? duplicateCount[e] + 1 : 1)
    );
    for (let i = 0; i < taskTypes.length; i++) {
      duplicateHappiness[taskTypes[i]] = duplicateHappiness[taskTypes[i]]
        ? duplicateHappiness[taskTypes[i]] + reportHappiness[i]
        : reportHappiness[i];
      duplicateFocus[taskTypes[i]] = duplicateFocus[taskTypes[i]]
        ? duplicateFocus[taskTypes[i]] + reportFocus[i]
        : reportFocus[i];
    }
    for (let i = 0; i < Object.keys(duplicateCount).length; i++) {
      duplicateHappiness[Object.keys(duplicateCount)[i]] =
        duplicateHappiness[Object.keys(duplicateCount)[i]] /
        duplicateCount[Object.keys(duplicateCount)[i]];
      duplicateFocus[Object.keys(duplicateCount)[i]] =
        duplicateFocus[Object.keys(duplicateCount)[i]] /
        duplicateCount[Object.keys(duplicateCount)[i]];
    }
    let result = Object.keys(duplicateCount).map((e) => {
      return {
        key: e,
        count: duplicateCount[e],
        happiness: duplicateHappiness[e],
        focus: duplicateFocus[e],
      };
    });
    let keys = result.map((a) => a.key);
    let times = result.map((a) => a.count);
    let happiness = result.map((a) => a.happiness);
    let focus = result.map((a) => a.focus);
    this.setState(() => {
      return { taskTypesKeys: keys };
    });
    this.setState(() => {
      return { taskTypesTimes: times };
    });
    this.setState(() => {
      return { taskTypesHappiness: happiness };
    });
    this.setState(() => {
      return { taskTypesFocus: focus };
    });
    let dataChart = {
      labels: this.state.taskTypesKeys,
      datasets: [
        {
          data: this.state.taskTypesTimes,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    let dataChartHappiness = {
      labels: this.state.taskTypesKeys,
      datasets: [
        {
          data: this.state.taskTypesHappiness,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    let dataChartFocus = {
      labels: this.state.taskTypesKeys,
      datasets: [
        {
          data: this.state.taskTypesFocus,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    this.setState(() => {
      return { stats: dataChart };
    });
    this.setState(() => {
      return { statsHappiness: dataChartHappiness };
    });
    this.setState(() => {
      return { statsFocus: dataChartFocus };
    });
    this.setState(() => {
      return { reports };
    });
    this.setState(() => {
      return { reportsRendered: true };
    });
  }

  renderReports() {
    return (
      <div>
        <Row>
          <Col xs={2}>
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
          </Col>
          <Col>
            <PieChart stats={this.state.stats} />
            Times
          </Col>
          <Col>
            <PieChart stats={this.state.statsHappiness} />
            avg Happiness
          </Col>
          <Col>
            <PieChart stats={this.state.statsFocus} />
            avg Focus
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    let { reportsRendered } = this.state;
    return reportsRendered ? this.renderReports() : 'Loading reports';
  }
}
