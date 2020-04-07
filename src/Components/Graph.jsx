import React, { Component } from 'react';
import * as d3 from 'd3';
import { Segment, Header, Grid, Icon } from 'semantic-ui-react';
import { parseRoutingRecords } from './parsing';
import routingNodeItem from './RoutingNodeItem';

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


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { enabled: 'Received' in this.props.results, selectedNode: {} };
  }

  componentDidMount() {
    if (this.state.enabled) {
      const data = prepareGraphData(this.props.results['Received']);

      const types = ["standard"]

      const width = document.getElementsByClassName("eleven wide column")[0].offsetWidth;
      const height = 0.5 * width;

      const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

      const svg = d3.select('#canvas')
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .style("font", "12px sans-serif");

      const color = d => {
        return d3.scaleOrdinal(d3.schemeCategory10)(d.group);
      };

      svg.append("defs").selectAll("marker")
        .data(types)
        .join("marker")
        .attr("id", d => `arrow-${d}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -0.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("fill", color)
        .attr("d", "M0,-5L10,0L0,5");


      const linkArc = d => {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `;
      };

      const drag = simulation => {
        const dragStarted = d => {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        };

        const dragged = d => {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        };

        const dragEnded = d => {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        };

        return d3.drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded);
      };

      const node = svg.append("g")
        .attr("id", "nodes-container")
        .attr("fill", "#1f77b4")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(data.nodes)
        .join("g")
        .attr("isClicked", "false")
        .call(drag(simulation));

      node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("r", 10);

      node.append("text")
        .attr("dx", 20)
        .attr("dy", "0.31em")
        .style("fill", "black")
        .text(d => d.id);

      function setActiveNode(el) {
        el.style("fill", "orange");
        el.select("text").style("fill", "orange").style("font-weight", "bold");
      }

      function setInactiveNode(el) {
        el.style("fill", "#1f77b4");
        el.select("text").style("fill", "black").style("font-weight", "normal");
      }

      node.on("mouseover", function () {
        setActiveNode(d3.select(this));
      });

      node.on("mouseout", function () {
        const el = d3.select(this);
        if (el.attr("isClicked") === "false") {
          setInactiveNode(el);
        }
      });

      const updateState = (node) => this.setState({ selectedNode: node });
      updateState.bind(this);

      node.on("click", function (d) {
        const el = d3.select(this);
        if (el.attr("isClicked") === "false") {
          updateState(d);
          d3.select("#nodes-container").selectAll("g").attr("isClicked", "false").style("fill", "#1f77b4").select("text").style("fill", "black").style("font-weight", "normal");
          setActiveNode(el);
          el.attr("isClicked", "true");
        } else {
          el.attr("isClicked", "false");
          updateState({});
        }
      });

      const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(data.links)
        .join("path")
        .attr("stroke", d => color(d))
        .attr("marker-end", `url(${new URL(`#arrow-standard`, document.location)})`);

      simulation.on("tick", () => {
        link
          .attr("d", linkArc);
        node
          .attr("transform", d => `translate(${d.x},${d.y})`);
      });
    }
  }

  render() {
    if (this.state.enabled) {
      return <Segment basic>
        <Grid>
          <Grid.Column width={5}>
            <Header as='h3' disabled={Object.keys(this.state.selectedNode).length === 0} textAlign='center'>
              {Object.keys(this.state.selectedNode).length !== 0 ? <Icon name='server' /> : null}
              <Header.Content>{Object.keys(this.state.selectedNode).length === 0 ? 'Click on a node to begin!' : 'Selected server'}</Header.Content>
            </Header>
            {routingNodeItem(this.state.selectedNode)}
          </Grid.Column>
          <Grid.Column width={11}>
            <svg id="canvas" />
          </Grid.Column>
        </Grid>
      </Segment>;
    }

    return <Segment basic disabled><Header as="h4">Nothing to display.</Header></Segment>;
  }
}
