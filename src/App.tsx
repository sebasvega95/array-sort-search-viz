import * as React from 'react';

import Main from 'scenes/Main';

import 'semantic-ui-css/semantic.min.css';

interface Props {}
interface State {
  array: number[];
  highlightedIndices: Set<number>;
}

class App extends React.Component<Props, State> {
  state = {
    array: [],
    highlightedIndices: new Set()
  };

  constructor(props: Props) {
    super(props);
    this.createArray = this.createArray.bind(this);
    this.fillArrayRandomly = this.fillArrayRandomly.bind(this);
    this.swapInArray = this.swapInArray.bind(this);
    this.unhighlightIndices = this.unhighlightIndices.bind(this);
    this.setHighlightedIndices = this.setHighlightedIndices.bind(this);
  }

  createArray(size: number) {
    let array = new Array(size).fill(0);
    array = array.map(() => Math.floor(Math.random() * 1000));
    this.setState({ array });
  }

  fillArrayRandomly() {
    const { array } = this.state;
    const newArray = array.map(() => Math.floor(Math.random() * 1000));
    this.setState({ array: newArray });
  }

  swapInArray(i: number, j: number) {
    const array = [...this.state.array];
    [array[i], array[j]] = [array[j], array[i]];
    this.setState({ array, highlightedIndices: new Set([i, j]) });
  }

  setHighlightedIndices(indices: number[]) {
    this.setState({ highlightedIndices: new Set(indices) });
  }

  unhighlightIndices() {
    this.setState({ highlightedIndices: new Set() });
  }

  render() {
    return (
      <Main
        array={this.state.array}
        highlightedIndices={this.state.highlightedIndices}
        createArray={this.createArray}
        fillArrayRandomly={this.fillArrayRandomly}
        swapInArray={this.swapInArray}
        unhighlightIndices={this.unhighlightIndices}
        setHighlightedIndices={this.setHighlightedIndices}
      />
    );
  }
}

export default App;
