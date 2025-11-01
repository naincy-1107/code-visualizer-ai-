import './Flowchart.css';

export default function Flowchart({ flowchartData, algorithmName }) {
  if (!flowchartData || !flowchartData.nodes || flowchartData.nodes.length === 0) {
    return null;
  }

  const { nodes, edges } = flowchartData;
  const nodeWidth = 150;
  const nodeHeight = 60;
  const verticalSpacing = 100;
  const horizontalSpacing = 200;

  // Calculate positions
  const positionedNodes = nodes.map((node, index) => {
    let x, y;
    
    // Simple vertical layout for most cases
    if (node.position) {
      x = node.position.x;
      y = node.position.y;
    } else {
      x = 200;
      y = 50 + (index * verticalSpacing);
    }
    
    return {
      ...node,
      x,
      y,
      width: nodeWidth,
      height: nodeHeight
    };
  });

  const svgWidth = 600;
  const svgHeight = Math.max(400, positionedNodes.length * verticalSpacing + 100);

  // Determine node shape based on type
  const getNodeShape = (nodeType) => {
    switch (nodeType?.toLowerCase()) {
      case 'start':
      case 'end':
        return 'ellipse';
      case 'decision':
        return 'diamond';
      case 'process':
      default:
        return 'rectangle';
    }
  };

  // Render node based on shape
  const renderNode = (node, index) => {
    const { x, y, width, height, label, type } = node;
    const shape = getNodeShape(type);
    const centerX = x;
    const centerY = y;

    if (shape === 'ellipse') {
      return (
        <ellipse
          key={index}
          cx={centerX}
          cy={centerY}
          rx={width / 2}
          ry={height / 2}
          className={`flowchart-node flowchart-node-${type || 'process'}`}
        >
          <title>{label}</title>
        </ellipse>
      );
    } else if (shape === 'diamond') {
      const points = [
        `${centerX},${centerY - height / 2}`,  // top
        `${centerX + width / 2},${centerY}`,    // right
        `${centerX},${centerY + height / 2}`,     // bottom
        `${centerX - width / 2},${centerY}`      // left
      ].join(' ');
      
      return (
        <polygon
          key={index}
          points={points}
          className={`flowchart-node flowchart-node-${type || 'process'}`}
        >
          <title>{label}</title>
        </polygon>
      );
    } else {
      return (
        <rect
          key={index}
          x={centerX - width / 2}
          y={centerY - height / 2}
          width={width}
          height={height}
          className={`flowchart-node flowchart-node-${type || 'process'}`}
        >
          <title>{label}</title>
        </rect>
      );
    }
  };

  // Render edges (arrows)
  const renderEdges = () => {
    if (!edges || edges.length === 0) {
      // Auto-generate edges if not provided
      return positionedNodes.map((node, index) => {
        if (index === positionedNodes.length - 1) return null;
        const from = node;
        const to = positionedNodes[index + 1];
        
        return (
          <g key={`edge-${index}`}>
            <line
              x1={from.x}
              y1={from.y + from.height / 2}
              x2={to.x}
              y2={to.y - to.height / 2}
              className="flowchart-edge"
              markerEnd="url(#arrowhead)"
            />
          </g>
        );
      }).filter(Boolean);
    }

    return edges.map((edge, index) => {
      const from = positionedNodes.find(n => n.id === edge.from);
      const to = positionedNodes.find(n => n.id === edge.to);
      
      if (!from || !to) return null;

      // Calculate edge positions
      const fromY = from.y + from.height / 2;
      const toY = to.y - to.height / 2;
      const midX = (from.x + to.x) / 2;
      const midY = (fromY + toY) / 2;

      return (
        <g key={`edge-${index}`}>
          <line
            x1={from.x}
            y1={fromY}
            x2={to.x}
            y2={toY}
            className="flowchart-edge"
            markerEnd="url(#arrowhead)"
          />
          {edge.label && (
            <text
              x={midX}
              y={midY - 5}
              className="flowchart-edge-label"
              textAnchor="middle"
            >
              {edge.label}
            </text>
          )}
        </g>
      );
    });
  };

  return (
    <div className="flowchart-container">
      <h3 className="flowchart-title">Algorithm Flowchart</h3>
      <svg
        width={svgWidth}
        height={svgHeight}
        className="flowchart-svg"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" className="flowchart-arrow" />
          </marker>
        </defs>
        
        {/* Render edges first (so they appear behind nodes) */}
        {renderEdges()}
        
        {/* Render nodes */}
        {positionedNodes.map((node, index) => (
          <g key={`node-${index}`}>
            {renderNode(node, index)}
            <text
              x={node.x}
              y={node.y}
              className="flowchart-text"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

