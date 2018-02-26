import * as React from 'react';
import { Button, Icon, Input, Segment } from 'semantic-ui-react';

interface Props {
  question: string;
  bounds: [number, number];
  handleSubmit: (size: number) => void;
}
interface State {
  size: string;
}

class GetNumericValue extends React.Component<Props, State> {
  state = {
    size: ''
  };

  constructor(props: Props) {
    super(props);
    this.handleSubmitByEnter = this.handleSubmitByEnter.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validSize = this.validSize.bind(this);
  }

  validSize(size: string) {
    const { bounds } = this.props;
    const isNum = /^[0-9]+$/.test(size);
    const [lowerBound, upperBound] = bounds;
    const inRange = lowerBound <= +size && +size <= upperBound;
    return isNum && inRange;
  }

  handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const size = event.currentTarget.value;
    if (this.validSize(size) || size === '') {
      this.setState({ size });
    }
  }

  handleSubmitByEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && this.state.size !== '') {
      this.props.handleSubmit(+this.state.size);
    }
  }

  render() {
    const { size } = this.state;
    const { question, handleSubmit } = this.props;

    const inputButton = (
      <Button disabled={size === ''} onClick={() => handleSubmit(+size)}>
        <Icon name="chevron right" />
      </Button>
    );

    return (
      <Segment>
        <p>{question}</p>
        <Input
          ref={input => {
            if (input) input.focus();
          }}
          value={this.state.size}
          onChange={this.handleInputChange}
          onKeyPress={this.handleSubmitByEnter}
          action={inputButton}
        />
      </Segment>
    );
  }
}

export default GetNumericValue;
