import React, { Component } from 'react';

// react-hotkeys
import { HotKeys } from 'react-hotkeys';

// react-tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './App.css';
import Chart from './components/Chart';
import Editor from './components/Editor';

const keyMap = {
  goToChart: 'G C',
  goToEditor: 'G E',
  goToTable: 'G T',
};

function getHandlers(self) {
  return {
    goToTable: () => self.setState({ tabIndex: 0 }),
    goToChart: () => self.setState({ tabIndex: 1 }),
    goToEditor: () => self.setState({ tabIndex: 2 }),
  };
}

class App extends Component {
  static async callApi() {
    const response = await fetch('/sources/gdp_per_capita');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [{ name: 'bryan' }],
      tabIndex: 0,
    };
  }

  componentDidMount() {
    this.constructor.callApi()
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err)); // eslint-disable-line no-console
  }

  setStateFromInput(label) {
    return input => this.setState({ [label]: input.value });
  }

  render() {
    const {
      data,
      tabIndex,
    } = this.state;

    const columns = Object.keys(data[0]).map(x => ({ Header: x, accessor: x }));

    return (
      <HotKeys keyMap={keyMap} handlers={getHandlers(this)} attach={window} focused>
        <div className="App container">
          <Tabs selectedIndex={tabIndex} onSelect={i => this.setState({ tabIndex: i })}>
            <TabList>
              <Tab>Table</Tab>
              <Tab>Chart</Tab>
              <Tab>Editor</Tab>
            </TabList>
            <TabPanel>
              <ReactTable
                data={data}
                columns={columns}
              />
            </TabPanel>
            <TabPanel>
              <Chart data={data} />
            </TabPanel>
            <TabPanel>
              <Editor />
            </TabPanel>
          </Tabs>
        </div>
      </HotKeys>
    );
  }
}

export default App;
