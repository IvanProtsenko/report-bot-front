import React, { Component, useRef } from 'react';
import { apiService } from '../services/ApiService';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { data, PieChart } from './PieChart';
import { DateRangePicker } from 'react-date-range';
import Table from './Table';

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
    selectionRange: {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      key: 'selection',
    },
  };

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  async getChartResults(taskTypes, reportHappiness, reportFocus) {
    let duplicateCount = {};
    taskTypes.forEach(
      (e) => (duplicateCount[e] = duplicateCount[e] ? duplicateCount[e] + 1 : 1)
    );
    let duplicateHappiness = await this.getAvgHappiness(
      duplicateCount,
      taskTypes,
      reportHappiness
    );
    let duplicateFocus = await this.getAvgFocus(
      duplicateCount,
      taskTypes,
      reportFocus
    );
    let result = Object.keys(duplicateCount).map((e) => {
      return {
        key: e,
        count: duplicateCount[e],
        happiness: duplicateHappiness[e],
        focus: duplicateFocus[e],
      };
    });

    return result;
  }

  async getAvgHappiness(duplicateCount, taskTypes, reportHappiness) {
    let duplicateHappiness = {};
    for (let i = 0; i < taskTypes.length; i++) {
      duplicateHappiness[taskTypes[i]] = duplicateHappiness[taskTypes[i]]
        ? duplicateHappiness[taskTypes[i]] + reportHappiness[i]
        : reportHappiness[i];
    }
    for (let i = 0; i < Object.keys(duplicateCount).length; i++) {
      duplicateHappiness[Object.keys(duplicateCount)[i]] =
        duplicateHappiness[Object.keys(duplicateCount)[i]] /
        duplicateCount[Object.keys(duplicateCount)[i]];
    }

    return duplicateHappiness;
  }

  async getAvgFocus(duplicateCount, taskTypes, reportFocus) {
    let duplicateFocus = {};
    for (let i = 0; i < taskTypes.length; i++) {
      duplicateFocus[taskTypes[i]] = duplicateFocus[taskTypes[i]]
        ? duplicateFocus[taskTypes[i]] + reportFocus[i]
        : reportFocus[i];
    }
    for (let i = 0; i < Object.keys(duplicateCount).length; i++) {
      duplicateFocus[Object.keys(duplicateCount)[i]] =
        duplicateFocus[Object.keys(duplicateCount)[i]] /
        duplicateCount[Object.keys(duplicateCount)[i]];
    }

    return duplicateFocus;
  }

  async makeChartData(labels, data) {
    let dataChart = {
      labels,
      datasets: [
        {
          data,
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

    return dataChart;
  }

  async componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (!userId) window.location.href = '/';
    const reports = await apiService.getUserReports(userId);

    let taskTypes = reports.map((a) => a.taskType);
    let reportHappiness = reports.map((a) => a.happiness);
    let reportFocus = reports.map((a) => a.focus);
    let result = await this.getChartResults(
      taskTypes,
      reportHappiness,
      reportFocus
    );
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
    let dataChart = await this.makeChartData(
      this.state.taskTypesKeys,
      this.state.taskTypesTimes
    );
    let dataChartHappiness = await this.makeChartData(
      this.state.taskTypesKeys,
      this.state.taskTypesHappiness
    );
    let dataChartFocus = await this.makeChartData(
      this.state.taskTypesKeys,
      this.state.taskTypesFocus
    );
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

  handleSelect(ranges) {
    console.log(ranges.selection);
    this.setState(() => {
      return { selectionRange: ranges.selection };
    });
  }

  renderReports() {
    return (
      <div>
        <Row>
          <Col className="charts" xs={2}>
            <div className="chart">
              <PieChart stats={this.state.stats} />
              Times
            </div>
            <div className="chart">
              <PieChart stats={this.state.statsHappiness} />
              avg Happiness
            </div>
            <div className="chart">
              <PieChart stats={this.state.statsFocus} />
              avg Focus
            </div>
          </Col>
          <Col xs={5} className="Table">
            <Table />
          </Col>
          <Col xs={4} className="calendar">
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
            <DateRangePicker
              ranges={[this.state.selectionRange]}
              onChange={this.handleSelect}
            />
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
