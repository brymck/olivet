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

// react-select
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { objectToOptions } from '../util';

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

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableLiveAutocompletion: false,
      keyboardHandler: null,
      language: 'javascript',
      theme: 'github',
    };
  }

  setStateFromInput(label) {
    return input => this.setState({ [label]: input.value });
  }

  render() {
    const {
      enableLiveAutocompletion,
      keyboardHandler,
      language,
      theme,
    } = this.state;

    return (
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
    );
  }
}
