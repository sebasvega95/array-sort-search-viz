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
            <React.Fragment key={`pick-${optionsNames[i]}`}>
              <Button onClick={() => callback(opt)}>{optionsNames[i]}</Button>
              {i < options.length - 1 ? <Button.Or /> : null}
            </React.Fragment>
          ))}
        </Button.Group>
      </Segment>
    );
  }
}

export default PickOptionsButton;
