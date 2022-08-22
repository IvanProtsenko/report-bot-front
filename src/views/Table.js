import React, { Component, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { apiService } from '../services/ApiService';
import Button from 'react-bootstrap/Button';
import columnDefsAccounts from '../services/utils/columnDefs';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default class Table extends Component {
  state = {
    selectedRow: false,
    modalShow: false,
    gridRef: null,
    gridApi: null,
    rowData: [],
    columnDefs: columnDefsAccounts,
    defaultColDef: {
      resizable: true,
      sortable: true,
      flex: 1,
      filter: true,
    },

    autoGroupColumnDef: {
      width: 250,
    },

    containerStyle: { width: '100%', height: '900px' },
    gridStyle: { height: '100%', width: '100%' },
  };

  constructor(props) {
    super(props);
  }

  changeRowData(data) {
    this.setState(() => {
      return { rowData: data };
    });
  }

  onLoadGrid = (params) => {
    this.setState(() => {
      return { gridRef: React.createRef({ ...params }) };
    });
  };

  async componentDidMount() {
    const userId = localStorage.getItem('userId');
    const reports = await apiService.getUserReports(userId);
    console.log(reports);
    this.changeRowData(reports);
  }

  render() {
    return (
      <div>
        <div className="ag-theme-alpine" style={{ height: 800, width: '100%' }}>
          <AgGridReact
            rowData={this.state.rowData}
            ref={this.state.gridRef}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            suppressAggFuncInHeader={true}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            animateRows={true}
            rowSelection={'single'}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}
