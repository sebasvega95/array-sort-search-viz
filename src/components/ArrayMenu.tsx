import * as React from 'react';
import { Button } from 'semantic-ui-react';

import GetNumericalue from 'components/GetNumericValue';
import PickingSortingAlgorithm from 'components/PickOptionButtons';
import ShowResults from 'components/ShowResults';
import {
  sortArray,
  SortingAlgorithm,
  lookupClosestSequential,
  lookupClosestBinary
} from 'services/array';

enum MenuAction {
  Nothing,
  ArraySize,
  PickingSortingAlgorithm,
  SortingArray,
  GettingValueToLookup,
  LookingUpValue,
  ShowingLookupResult
}

interface Props {
  array: number[];
  createArray: (size: number) => void;
  fillArrayRandomly: () => void;
  swapInArray: (i: number, j: number) => void;
  setHighlightedIndices: (indices: number[]) => void;
  unhighlightIndices: () => void;
}
interface State {
  menuAction: MenuAction;
  valueToLookUp: number;
  lookupResultIndex: number;
  sorted: boolean;
}

const SORTING_ALGORITHMS = [
  SortingAlgorithm.quicksort,
  SortingAlgorithm.heapsort,
  SortingAlgorithm.cocktail
];
const SORTING_ALGORITHMS_NAMES = ['Quicksort', 'Heapsort', 'Cocktail sort'];

class ArrayMenu extends React.Component<Props, State> {
  state = {
    menuAction: MenuAction.Nothing,
    sorted: false,
    valueToLookUp: 0,
    lookupResultIndex: 0
  };

  constructor(props: Props) {
    super(props);
    this.setArraySize = this.setArraySize.bind(this);
    this.sortingArray = this.sortingArray.bind(this);
    this.fillingArray = this.fillingArray.bind(this);
    this.gettingValueToLookup = this.gettingValueToLookup.bind(this);
    this.lookingValueUp = this.lookingValueUp.bind(this);
    this.finishShowingLookupResult = this.finishShowingLookupResult.bind(this);
  }

  setArraySize(size: number) {
    const { createArray, unhighlightIndices } = this.props;
    unhighlightIndices();
    createArray(size);
    this.setState({
      menuAction: MenuAction.Nothing,
      sorted: false
    });
  }

  fillingArray() {
    const { fillArrayRandomly, unhighlightIndices } = this.props;
    this.setState({ sorted: false });
    unhighlightIndices();
    fillArrayRandomly();
  }

  sortingArray(sortingAlgorithm: SortingAlgorithm) {
    const { array, swapInArray, unhighlightIndices } = this.props;
    this.setState({ menuAction: MenuAction.SortingArray });
    sortArray([...array], sortingAlgorithm, swapInArray, () => {
      unhighlightIndices();
      this.setState({ menuAction: MenuAction.Nothing, sorted: true });
    });
  }

  gettingValueToLookup() {
    this.setState({ menuAction: MenuAction.GettingValueToLookup });
  }

  lookingValueUp(value: number) {
    const { array, setHighlightedIndices, unhighlightIndices } = this.props;
    const { sorted } = this.state;
    const search = sorted ? lookupClosestBinary : lookupClosestSequential;
    this.setState({ menuAction: MenuAction.LookingUpValue });
    search(array, value, setHighlightedIndices, index => {
      unhighlightIndices();
      setHighlightedIndices([index]);
      this.setState({
        menuAction: MenuAction.ShowingLookupResult,
        lookupResultIndex: index,
        valueToLookUp: value
      });
    });
  }

  finishShowingLookupResult() {
    const { unhighlightIndices } = this.props;
    unhighlightIndices();
    this.setState({ menuAction: MenuAction.Nothing });
  }

  getSegmentUnderMenu(): JSX.Element | null {
    const { array } = this.props;
    const { menuAction, lookupResultIndex, valueToLookUp } = this.state;
    let lookupResultString: string, underMenu: JSX.Element | null;

    if (array[lookupResultIndex] === valueToLookUp) {
      lookupResultString = `The value ${valueToLookUp} was found at position ${lookupResultIndex}`;
    } else {
      lookupResultString = `The closest value to ${valueToLookUp} in the array is ${
        array[lookupResultIndex]
      } at position ${lookupResultIndex}`;
    }

    switch (menuAction) {
      case MenuAction.ArraySize:
        underMenu = (
          <GetNumericalue
            question="Enter the size of the array"
            bounds={[1, 300]}
            handleSubmit={this.setArraySize}
          />
        );
        break;
      case MenuAction.PickingSortingAlgorithm:
        underMenu = (
          <PickingSortingAlgorithm
            question="Select a sorting algorithm to use"
            options={SORTING_ALGORITHMS}
            optionsNames={SORTING_ALGORITHMS_NAMES}
            callback={this.sortingArray}
          />
        );
        break;
      case MenuAction.GettingValueToLookup:
        underMenu = (
          <GetNumericalue
            question="Enter the value to look up"
            bounds={[0, 1000]}
            handleSubmit={this.lookingValueUp}
          />
        );
        break;
      case MenuAction.ShowingLookupResult:
        underMenu = (
          <ShowResults
            answer={lookupResultString}
            handleSubmit={this.finishShowingLookupResult}
          />
        );
        break;

      default:
        underMenu = null;
        break;
    }
    return underMenu;
  }

  render() {
    const { array } = this.props;
    const { menuAction, sorted } = this.state;

    return (
      <>
        <Button.Group vertical basic fluid color="blue">
          <Button
            disabled={menuAction !== MenuAction.Nothing}
            onClick={() => this.setState({ menuAction: MenuAction.ArraySize })}
          >
            Create array
          </Button>
          <Button
            disabled={menuAction !== MenuAction.Nothing || array.length === 0}
            onClick={this.fillingArray}
          >
            Fill array randomly
          </Button>
          <Button
            disabled={
              menuAction !== MenuAction.Nothing || array.length === 0 || sorted
            }
            onClick={() =>
              this.setState({ menuAction: MenuAction.PickingSortingAlgorithm })
            }
          >
            Sort array
          </Button>
          <Button
            disabled={menuAction !== MenuAction.Nothing || array.length === 0}
            onClick={this.gettingValueToLookup}
          >
            Look up closest value in array
          </Button>
        </Button.Group>
        {this.getSegmentUnderMenu()}
      </>
    );
  }
}

export default ArrayMenu;
