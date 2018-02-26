import * as React from 'react';
import { Button, Segment } from 'semantic-ui-react';

interface Props {
  answer: string;
  handleSubmit: () => void;
}

class ShowResults extends React.Component<Props> {
  render() {
    const { answer, handleSubmit } = this.props;
    return (
      <Segment>
        <p>{answer}</p>
        <Button onClick={handleSubmit}>OK</Button>
      </Segment>
    );
  }
}

export default ShowResults;
