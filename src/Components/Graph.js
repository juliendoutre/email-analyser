import React, { Component } from 'react';
import * as d3 from 'd3';
import { Segment, Header } from 'semantic-ui-react';

const getGraphData = (lines) => {
    let data = { nodes: [], links: [] };
    for (let line of lines) {
        let by = line.match(/by [-.:\w]*/);
        let from = line.match(/^from [-.:\w]*/);

        if (by !== null && by.length > 0) {
            let id = by[0].replace('by ', '').toLowerCase();
            if (!data.nodes.reduce((acc, n) => acc || (n.id === id), false)) {
                data.nodes.push({ id: id });
            }

            if (from != null && from.length > 0) {
                let source = from[0].replace('from ', '').toLowerCase();
                data.links.push({
                    source: source, target: id, strength: 0.5,
                });

                if (!data.nodes.reduce((acc, n) => acc || (n.id === source), false)) {
                    data.nodes.push({ id: source });
                }
            }
        }
    }

    return data;
};

const getNeighbors = (node, links) => {
    return links.reduce(function (neighbors, link) {
        if (link.target.id === node.id) {
            neighbors.push(link.source.id)
        } else if (link.source.id === node.id) {
            neighbors.push(link.target.id)
        }
        return neighbors
    },
        [node.id]
    );
};

const isNeighborLink = (node, link) => link.target.id === node.id || link.source.id === node.id;

const getNodeColor = (node, neighbors) => {
    if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
        return node.level === 1 ? 'blue' : 'green'
    }

    return node.level === 1 ? 'red' : 'gray'
};

const getLinkColor = (node, link) => isNeighborLink(node, link) ? 'green' : '#E5E5E5';

const getTextColor = (node, neighbors) => Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1 ? 'green' : 'black';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { enabled: 'Received' in this.props.results };
    }

    componentDidMount() {
        if (this.state.enabled) {
            let width = 1050;
            let height = 500;

            let data = getGraphData(this.props.results["Received"]);

            const svg = d3.select('#canvas')
                .attr('width', width)
                .attr('height', height);

            const simulation = d3.forceSimulation()
                .force('charge', d3.forceManyBody().strength(-100))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force('link', d3.forceLink()
                    .id(link => link.id)
                    .strength(link => link.strength)
                );

            const dragDrop = d3.drag()
                .on('start', node => {
                    node.fx = node.x
                    node.fy = node.y
                })
                .on('drag', node => {
                    simulation.alphaTarget(0.7).restart()
                    node.fx = d3.event.x
                    node.fy = d3.event.y
                })
                .on('end', node => {
                    if (!d3.event.active) {
                        simulation.alphaTarget(0)
                    }
                    node.fx = null
                    node.fy = null
                });

            const selectNode = (selectedNode) => {
                let neighbors = getNeighbors(selectedNode, data.links);
                nodeElements.attr('fill', node => getNodeColor(node, neighbors));
                textElements.attr('fill', node => getTextColor(node, neighbors));
                linkElements.attr('stroke', link => getLinkColor(selectedNode, link));
            };

            const nodeElements = svg.append('g')
                .selectAll('circle')
                .data(data.nodes)
                .enter().append('circle')
                .attr('r', 10)
                .attr('fill', getNodeColor)
                .call(dragDrop)
                .on('click', selectNode);

            const textElements = svg.append('g')
                .selectAll('text')
                .data(data.nodes)
                .enter().append('text')
                .text(node => node.id)
                .attr('font-size', 15)
                .attr('dx', 15)
                .attr('dy', 4);

            const linkElements = svg.append('g')
                .selectAll('line')
                .data(data.links)
                .enter().append('line')
                .attr('stroke-width', 1)
                .attr('stroke', '#E5E5E5')

            simulation.nodes(data.nodes).on('tick', () => {
                nodeElements
                    .attr('cx', node => node.x)
                    .attr('cy', node => node.y);
                textElements
                    .attr('x', node => node.x)
                    .attr('y', node => node.y);
                linkElements
                    .attr('x1', link => link.source.x)
                    .attr('y1', link => link.source.y)
                    .attr('x2', link => link.target.x)
                    .attr('y2', link => link.target.y);
            });

            simulation.force("link").links(data.links);
        }
    }

    render() {
        if (this.state.enabled) {
            return <Segment basic><svg id='canvas'></svg></Segment>;
        } else {
            return <Segment basic disabled><Header as='h4'>Nothing to display.</Header></Segment>;
        }
    }
};
