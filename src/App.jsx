/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';

// Ace
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/keybinding/emacs';
import 'brace/keybinding/vim';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';

// react-hotkeys
import { HotKeys } from 'react-hotkeys';

// react-select
import Select from 'react-select';
import 'react-select/dist/react-select.css';

// react-tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './App.css';

const languages = {
  JavaScript: 'javascript',
  Python: 'python',
};

const keyboardHandlers = {
  '(none)': null,
  Emacs: 'emacs',
  Vim: 'vim',
};

const themes = {
  GitHub: 'github',
  Monokai: 'monokai',
  'Solarized Dark': 'solarized_dark',
  'Solarized Light': 'solarized_light',
};

const defaultLanguage = 'python';
const defaultKeyboardHandler = null;
const defaultTheme = 'github';

const keyMap = {
  goToTable: 'g T',
  goToEditor: 'g E',
};

function getHandlers(self) {
  return {
    goToTable: () => self.setState({ tabIndex: 0 }),
    goToEditor: () => self.setState({ tabIndex: 1 }),
  };
}

function objectToOptions(obj) {
  return Object.keys(obj).sort().map(k => ({
    label: k,
    value: obj[k],
  }));
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
      enableLiveAutocompletion: false,
      keyboardHandler: defaultKeyboardHandler,
      language: defaultLanguage,
      tabIndex: 0,
      theme: defaultTheme,
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
      enableLiveAutocompletion,
      keyboardHandler,
      language,
      tabIndex,
      theme,
    } = this.state;

    const columns = Object.keys(data[0]).map(x => ({ Header: x, accessor: x }));

    return (
      <HotKeys keyMap={keyMap} handlers={getHandlers(this)} attach={window} focused>
        <div className="App container">
          <Tabs selectedIndex={tabIndex} onSelect={i => this.setState({ tabIndex: i })}>
            <TabList>
              <Tab>Table</Tab>
              <Tab>Editor</Tab>
            </TabList>
            <TabPanel>
              <ReactTable
                data={data}
                columns={columns}
              />
            </TabPanel>
            <TabPanel>
              <div className="row">
                <div className="col-sm-4">
                  <form>
                    <div className="form-group">
                      <label>Language</label>
                      <Select
                        name="language"
                        value={language}
                        onChange={this.setStateFromInput('language')}
                        options={objectToOptions(languages)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Keybinding</label>
                      <Select
                        name="keyboardHandler"
                        value={keyboardHandler}
                        onChange={this.setStateFromInput('keyboardHandler')}
                        options={objectToOptions(keyboardHandlers)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Theme</label>
                      <Select
                        name="theme"
                        value={theme}
                        onChange={this.setStateFromInput('theme')}
                        options={objectToOptions(themes)}
                      />
                    </div>
                    <div className="form-check">
                      <input
                        id="enableLiveAutocompletion"
                        name="enableLiveAutocompletion"
                        className="form-check-input"
                        type="checkbox"
                        checked={enableLiveAutocompletion}
                        onChange={e => this.setState({
                          enableLiveAutocompletion: e.target.checked,
                        })}
                      />
                      <label className="form-check-label" htmlFor="enableLiveAutocompletion">
                        Enable live autocompletion
                      </label>
                    </div>
                  </form>
                </div>
                <div className="col-sm-8">
                  <AceEditor
                    enableLiveAutocompletion={enableLiveAutocompletion}
                    keyboardHandler={keyboardHandler}
                    mode={language}
                    theme={theme}
                    width="100%"
                  />
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </HotKeys>
    );
  }
}

export default App;
