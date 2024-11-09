import { useCallback } from 'react';
import ReactFlow, { 
  Background, Controls, MiniMap,
  applyNodeChanges, applyEdgeChanges, addEdge,
  type Node, type Edge, type Connection 
} from 'reactflow';
import { useStateTogether } from 'react-together';
import LocationNode from '../components/nodes/LocationNode';
import 'reactflow/dist/style.css';

const nodeTypes = {
  location: LocationNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'location',
    position: { x: 100, y: 100 },
    data: { label: 'Paris' },
  },
  {
    id: '2',
    type: 'location',
    position: { x: 300, y: 100 },
    data: { label: 'London' },
  },
];

export default function ReactFlowPage() {
  const [nodes, setNodes] = useStateTogether<Node[]>('travel_nodes', initialNodes);
  const [edges, setEdges] = useStateTogether<Edge[]>('travel_edges', []);
  const [viewport, setViewport] = useStateTogether('viewport', { x: 0, y: 0, zoom: 1 });

  const onAddNode = useCallback(() => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'location',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: 'New Location' },
    };
    setNodes([...nodes, newNode]);
  }, [nodes, setNodes]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 4 }}>
        <button onClick={onAddNode}>Add Location</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
        onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
        onConnect={(params: Connection) => setEdges((eds) => addEdge(params, eds))}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
} 