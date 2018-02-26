import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import ArrayMenu from 'components/ArrayMenu';
import ArrayViz from 'components/ArrayViz';

interface Props {
  array: number[];
  highlightedIndices: Set<number>;
  createArray: (size: number) => void;
  fillArrayRandomly: () => void;
  swapInArray: (i: number, j: number) => void;
  setHighlightedIndices: (indices: number[]) => void;
  unhighlightIndices: () => void;
}

class Main extends React.Component<Props> {
  render() {
    const {
      array,
      highlightedIndices,
      createArray,
      fillArrayRandomly,
      swapInArray,
      setHighlightedIndices,
      unhighlightIndices
    } = this.props;

    return (
      <>
        <Header size="huge" textAlign="center" dividing>
          Algorithms on arrays
        </Header>
        <Grid columns={2} stackable padded divided>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <ArrayMenu
                array={array}
                createArray={createArray}
                fillArrayRandomly={fillArrayRandomly}
                swapInArray={swapInArray}
                unhighlightIndices={unhighlightIndices}
                setHighlightedIndices={setHighlightedIndices}
              />
            </Grid.Column>
            <Grid.Column textAlign="center">
              <ArrayViz
                width="100%"
                array={array}
                highlightedIndices={highlightedIndices}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default Main;
