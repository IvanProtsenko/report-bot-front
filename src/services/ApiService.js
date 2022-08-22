import makeApolloClient from './utils/makeApolloClient';
import gql from 'graphql-tag';

const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    Owner_by_pk(id: $id) {
      id
    }
  }
`;

const GET_SCHEDULE_BY_ID = gql`
  query GetScheduleByUserId($id: String!) {
    Settings(where: { ownerId: { _eq: $id } }) {
      ownerId
      botActivated
    }
  }
`;

const GET_REPORTS_BY_USER_ID = gql`
  query GetReportsByUserId($id: String!) {
    Report(where: { ownerId: { _eq: $id } }) {
      ownerId
      taskType
      happiness
      focus
      note
      time
    }
  }
`;

const CREATE_SETTINGS = gql`
  mutation CreateSettings {
    insert_Settings_one(
      object: {
        botActivated: false
        fridayFrom: ""
        fridayTill: ""
        mondayFrom: ""
        mondayTill: ""
        ownerId: ""
        saturdayFrom: ""
        saturdayTill: ""
        sundayFrom: ""
        sundayTill: ""
        thursdayFrom: ""
        thursdayTill: ""
        tuesdayFrom: ""
        tuesdayTill: ""
        wednesdayFrom: ""
        wednesdayTill: ""
      }
    ) {
      botActivated
      fridayFrom
      fridayTill
      mondayFrom
      mondayTill
      ownerId
      saturdayFrom
      saturdayTill
      sundayFrom
      sundayTill
      thursdayFrom
      thursdayTill
      tuesdayTill
      tuesdayFrom
      wednesdayFrom
      wednesdayTill
    }
  }
`;

const CREATE_REPORT = gql`
  mutation CreateReport(
    $ownerId: String
    $happiness: Int
    $focus: Int
    $note: String
    $taskType: String
    $time: Date
  ) {
    insert_Report_one(
      object: {
        focus: $focus
        happiness: $happiness
        note: $note
        ownerId: $ownerId
        taskType: $taskType
        time: $time
      }
    ) {
      focus
      happiness
      note
      ownerId
      taskType
      time
    }
  }
`;

class ApiService {
  client;

  constructor(client) {
    this.client = client;
  }

  getUserById = async (id) => {
    try {
      const result = await this.client.query({
        query: GET_USER_BY_ID,
        variables: {
          id,
        },
      });
      console.log(result);
      return result.data.Owner_by_pk;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  getUserSchedule = async (id) => {
    try {
      const result = await this.client.query({
        query: GET_SCHEDULE_BY_ID,
        variables: {
          id,
        },
      });
      return result.data.Settings;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  getUserReports = async (id) => {
    try {
      const result = await this.client.query({
        query: GET_REPORTS_BY_USER_ID,
        variables: {
          id,
        },
      });
      return result.data.Report;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  createReport = async (data) => {
    try {
      const result = await this.client.mutate({
        mutation: CREATE_REPORT,
        variables: {
          focus: data.focus,
          happiness: data.happiness,
          note: data.note,
          ownerId: data.ownerId,
          taskType: data.taskType,
          time: Date.now(),
        },
      });
      return result.data.Report;
    } catch (err) {
      console.log('ERROR:', err);
    }
  };
}

const client = makeApolloClient(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_API_WS_URL
);
const apiService = new ApiService(client);
export { apiService };
