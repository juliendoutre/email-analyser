import React, { Component } from 'react';
import * as d3 from 'd3';
import { Segment, Header } from 'semantic-ui-react';
import { parseRoutingRecords } from './parsing';

const nodesMatch = (node1, node2) => {
  return ('dns' in node1 && 'dns' in node2 && node1['dns'].toLowerCase() === node2['dns'].toLowerCase())
    || ('ipv4' in node1 && 'ipv4' in node2 && node1['ipv4'] === node2['ipv4'])
    || ('ipv6' in node1 && 'ipv6' in node2 && node1['ipv6'] === node2['ipv6'])
};

const updateNodeId = node => {
  if ('dns' in node) {
    node['id'] = node['dns'];
  } else if ('ipv4' in node) {
    node['id'] = node['ipv4'];
  } else if ('ipv6' in node) {
    node['id'] = node['ipv6']
  } else {
    node['id'] = parseInt(Math.random() * 1000, 10).toString();
  }
};

const completeNodeData = (node1, node2) => {
  if ('dns' in node1 && !('dns' in node2)) {
    node2['dns'] = node1['dns'];
  }

  if ('ipv4' in node1 && !('ipv4' in node2)) {
    node2['ipv4'] = node1['ipv4'];
  }

  if ('ipv6' in node1 && !('ipv6' in node2)) {
    node2['ipv6'] = node1['ipv6'];
  }

  updateNodeId(node2);
};

const addOrCompleteNode = (nodes, recordNode) => {
  let didBreak = false;
  for (let node of nodes) {
    if (nodesMatch(recordNode, node)) {
      completeNodeData(recordNode, node);
      didBreak = true;
      break;
    }
  }

  if (!didBreak) {
    let node = {};

    if ('dns' in recordNode) {
      node['dns'] = recordNode['dns'];
    }

    if ('ipv4' in recordNode) {
      node['ipv4'] = recordNode['ipv4'];
    }

    if ('ipv6' in recordNode) {
      node['ipv6'] = recordNode['ipv6'];
    }

    updateNodeId(node);

    nodes.push(node);
  }
};


const getNodeIdForField = (nodes, field, value) => {
  for (let node of nodes) {
    if (node[field] === value) {
      return node['id'];
    }
  }

  return "-1";
};

const getNodeId = (nodes, partialNode) => {
  let id;

  if ('dns' in partialNode) {
    id = getNodeIdForField(nodes, 'dns', partialNode['dns']);
  }
  if (id !== "-1") {
    return id;
  }

  if ('ipv4' in partialNode) {
    id = getNodeIdForField(nodes, 'ipv4', partialNode['ipv4']);
  }
  if (id !== "-1") {
    return id;
  }

  if ('ipv6' in partialNode) {
    id = getNodeIdForField(nodes, 'ipv6', partialNode['ipv6']);
  }

  return id;
};

const prepareGraphData = (header) => {
  const data = { nodes: [], links: [] };

  const records = parseRoutingRecords(header);

  for (let record of records) {
    if ('source' in record) {
      addOrCompleteNode(data.nodes, record['source']);
    }

    if ('target' in record) {
      addOrCompleteNode(data.nodes, record['target']);
    }
  }

  for (let record of records) {
    if ('source' in record && 'target' in record) {
      data.links.push({
        source: getNodeId(data.nodes, record['source']),
        target: getNodeId(data.nodes, record['target']),
        timestamp: record['timestamp'],
      });
    }
  }

  return data;
};

const getNeighbors = (node, links) => links.reduce((neighbors, link) => {
  if (link.target.id === node.id) {
    neighbors.push(link.source.id);
  } else if (link.source.id === node.id) {
    neighbors.push(link.target.id);
  }
  return neighbors;
},
  [node.id]);

const isNeighborLink = (node, link) => link.target.id === node.id || link.source.id === node.id;

const getNodeColor = (node, neighbors) => {
  if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
    return node.level === 1 ? 'blue' : 'green';
  }

  return node.level === 1 ? 'red' : 'gray';
};

const getLinkColor = (node, link) => (isNeighborLink(node, link) ? 'green' : '#E5E5E5');

const getTextColor = (node, neighbors) => (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1 ? 'green' : 'black');

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { enabled: 'Received' in this.props.results };
  }

  componentDidMount() {
    if (this.state.enabled) {
      const width = 1050;
      const height = 500;

      const data = prepareGraphData(this.props.results['Received']);

      console.log(data);

      const svg = d3.select('#canvas')
        .attr('width', width)
        .attr('height', height);

      const simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink()
          .id((link) => link.id)
          .strength((link) => link.strength));

      const dragDrop = d3.drag()
        .on('start', (node) => {
          node.fx = node.x;
          node.fy = node.y;
        })
        .on('drag', (node) => {
          simulation.alphaTarget(0.7).restart();
          node.fx = d3.event.x;
          node.fy = d3.event.y;
        })
        .on('end', (node) => {
          if (!d3.event.active) {
            simulation.alphaTarget(0);
          }
          node.fx = null;
          node.fy = null;
        });

      const selectNode = (selectedNode) => {
        const neighbors = getNeighbors(selectedNode, data.links);
        nodeElements.attr('fill', (node) => getNodeColor(node, neighbors));
        textElements.attr('fill', (node) => getTextColor(node, neighbors));
        linkElements.attr('stroke', (link) => getLinkColor(selectedNode, link));
      };

      const nodeElements = svg.append('g')
        .selectAll('circle')
        .data(data.nodes)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', getNodeColor)
        .call(dragDrop)
        .on('click', selectNode);

      const textElements = svg.append('g')
        .selectAll('text')
        .data(data.nodes)
        .enter()
        .append('text')
        .text((node) => node.id)
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4);

      const linkElements = svg.append('g')
        .selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .attr('stroke-width', 1)
        .attr('stroke', '#E5E5E5');

      simulation.nodes(data.nodes).on('tick', () => {
        nodeElements
          .attr('cx', (node) => node.x)
          .attr('cy', (node) => node.y);
        textElements
          .attr('x', (node) => node.x)
          .attr('y', (node) => node.y);
        linkElements
          .attr('x1', (link) => link.source.x)
          .attr('y1', (link) => link.source.y)
          .attr('x2', (link) => link.target.x)
          .attr('y2', (link) => link.target.y);
      });

      simulation.force('link').links(data.links);
    }
  }

  render() {
    if (this.state.enabled) {
      return <Segment basic><svg id="canvas" /></Segment>;
    }

    return <Segment basic disabled><Header as="h4">Nothing to display.</Header></Segment>;
  }
}
