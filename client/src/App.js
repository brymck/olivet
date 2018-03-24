import React, { Component } from 'react';
import './App.css';

// Ace
import AceEditor from 'react-ace';
// import 'brace/ext/language_tools';
import 'brace/keybinding/emacs';
import 'brace/keybinding/vim';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';

// react-select
import Select from 'react-select';
import 'react-select/dist/react-select.css';

// react-tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const languages = {
  'JavaScript': 'javascript',
  'Python': 'python',
};

const keyboardHandlers = {
  '(none)': null,
  'Emacs': 'emacs',
  'Vim': 'vim',
}

const themes = {
  'GitHub': 'github',
  'Monokai': 'monokai',
  'Solarized Dark': 'solarized_dark',
  'Solarized Light': 'solarized_light',
}

const defaultLanguage = 'python';
const defaultKeyboardHandler = null;
const defaultTheme = 'github';

const objectToOptions = (obj) => {
  return Object.keys(obj).sort().map(k => ({
    label: k,
    value: obj[k],
  }));
};

class App extends Component {
  state = {
    keyboardHandler: defaultKeyboardHandler,
    language: defaultLanguage,
    theme: defaultTheme,
  }

  setStateFromInput = (label) => (input) => {
    this.setState({ [label]: input.value })
  }

  render() {
    const data = [{
      name: 'brymck',
    }];

    const columns = Object.keys(data[0]).map(x => ({ Header: x, accessor: x }));

    const {
      keyboardHandler,
      language,
      theme,
    } = this.state;

    return (
      <div className="App">
        <Tabs>
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
                <label>Language</label>
                <Select
                  name="language"
                  value={language}
                  onChange={this.setStateFromInput('language')}
                  options={objectToOptions(languages)}
                />
                <label>Keybinding</label>
                <Select
                  name="keyboardHandler"
                  value={keyboardHandler}
                  onChange={this.setStateFromInput('keyboardHandler')}
                  options={objectToOptions(keyboardHandlers)}
                />
                <label>Theme</label>
                <Select
                  name="theme"
                  value={theme}
                  onChange={this.setStateFromInput('theme')}
                  options={objectToOptions(themes)}
                />
              </div>
              <div className="col-sm-8">
                <AceEditor
                  // enableLiveAutocompletion
                  keyboardHandler={keyboardHandler}
                  mode={language}
                  theme="github"
                  width="100%"
                />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default App;