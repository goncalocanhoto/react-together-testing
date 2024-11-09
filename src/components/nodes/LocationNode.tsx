import { Handle, Position } from 'reactflow';

export default function LocationNode({ data }) {
  return (
    <div className="location-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        <i className="fas fa-map-marker-alt" />
        <div className="title">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
} 