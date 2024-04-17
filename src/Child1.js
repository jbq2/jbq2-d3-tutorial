import React, {Component} from 'react';
import * as d3 from 'd3'

class Child1 extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log('child 1 did mount');
    }

    // all data manipulation logic wil occur here
    componentDidUpdate() {
        var data = this.props.data1;
        var margin = {
            top: 10,
            right: 10,
            bottom: 30,
            left: 20
        };

        var w = 500 - margin.left - margin.right;
        var h = 300 - margin.top - margin.bottom;

        var container = d3.select('.child1_svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .select('.g_1')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        var xData = data.map(item => item.total_bill);
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(xData)])
            .range([margin.left, w]);
        container.selectAll('.x_axis_g').data([0]).join('g')
            .attr('class', 'x_axis_g')
            .attr('transform', `translate(0,${h})`)
            .call(d3.axisBottom(xScale));
        
        var yData = data.map(item => item.tip);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(yData)])
            .range([h, 0]);
        container.selectAll('.y_axis_g').data([0]).join('g')
            .attr('class', 'x_axis_g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));
        
        container.selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', function(d) {
                return xScale(d.total_bill);
            })
            .attr('cy', function(d) {
                return yScale(d.tip);
            })
            .attr('r', 3)
            .style('fill', 'orange');
    }

    render() {
        return <svg className="child1_svg">
            <g className="g_1"></g>
        </svg>;
    }
}

export default Child1;