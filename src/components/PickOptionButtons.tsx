import * as React from 'react';
import { Button, Segment } from 'semantic-ui-react';

interface Props {
  question: string;
  options: any[];
  optionsNames: string[];
  callback: (value: any) => void;
}

class PickOptionsButton extends React.Component<Props> {
  render() {
    const { question, options, optionsNames, callback } = this.props;
    return (
      <Segment>
        <p>{question}</p>
        <Button.Group>
          {options.map((opt, i) => (
            <>
              <Button
                key={`pick-${optionsNames[i]}`}
                onClick={() => callback(opt)}
              >
                {optionsNames[i]}
              </Button>
              {i < options.length - 1 ? <Button.Or /> : null}
            </>
          ))}
        </Button.Group>
      </Segment>
    );
  }
}

export default PickOptionsButton;
