export function blah() {
  return 'blah';
}

export function objectToOptions(obj) {
  return Object.keys(obj).sort().map(k => ({
    label: k,
    value: obj[k],
  }));
}

export function createStateSetter(self) {
  return function createStateSetterAtKey(label) {
    return function setStateFromInput(input) {
      self.setState({ [label]: input.value });
    };
  };
}
