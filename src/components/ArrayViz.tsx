import * as d3 from 'd3';
import * as React from 'react';

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 500;

interface Props {
  array: number[];
  highlightedIndices: Set<number>;
  width: string;
}

class ArrayViz extends React.Component<Props> {
  svg: d3.Selection<SVGElement | null, {}, null, undefined>;
  scaleX: d3.ScaleBand<number>;
  scaleY: d3.ScaleLinear<number, number>;
  width: number;
  height: number;

  constructor(props: Props) {
    super(props);
    const { array } = this.props;
    this.width = SVG_WIDTH;
    this.height = SVG_HEIGHT;
    this.scaleX = d3.scaleBand<number>().range([0, this.width]);
    this.scaleY = d3.scaleLinear().range([this.height, 0]);
    this.scaleX.domain(d3.range(array.length));
    this.scaleY.domain([0, d3.max(array) as number]);
  }

  componentDidMount() {
    const { array, highlightedIndices } = this.props;
    this.svg
      .selectAll('.bar')
      .data(array)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .style(
        'fill',
        (d, i) => (highlightedIndices.has(i) ? 'red' : 'CornflowerBlue')
      )
      .attr('x', (d: number, i: number) => this.scaleX(i) as number)
      .attr('y', (d: number) => this.scaleY(d))
      .attr('width', this.scaleX.bandwidth())
      .attr('height', (d: number) => this.height - this.scaleY(d));
  }

  componentDidUpdate() {
    const { array, highlightedIndices } = this.props;
    this.scaleX.domain(d3.range(array.length));
    this.scaleY.domain([0, d3.max(array) as number]);

    const dataJoin = this.svg.selectAll('.bar').data(array);
    dataJoin.exit().remove(); // Old elements that aren't there anymore
    dataJoin
      .enter() // New elements
      .append('rect')
      .attr('class', 'bar')
      .merge(dataJoin) // Update elements
      .style(
        'fill',
        (d, i) => (highlightedIndices.has(i) ? 'red' : 'CornflowerBlue')
      )
      .attr('x', (d: number, i: number) => this.scaleX(i) as number)
      .attr('y', (d: number) => this.scaleY(d))
      .attr('width', this.scaleX.bandwidth())
      .attr('height', (d: number) => this.height - this.scaleY(d));
  }

  render() {
    const { width } = this.props;

    return (
      <svg
        ref={svg => (this.svg = d3.select(svg))}
        width={width}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        style={{ borderStyle: 'dotted' }}
      />
    );
  }
}

export default ArrayViz;
