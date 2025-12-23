export interface Tag {
  name: string;
  color: string;
}

export interface WorkflowItem {
  id: string;
  type: 'workflow' | 'agent';
  name: string;
  lastUpdated: number; // Unix timestamp
  tags: Tag[];
}

export interface WorkflowsResponse {
  count: number;
  data: WorkflowItem[];
}

