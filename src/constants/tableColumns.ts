export interface TableColumn {
  key: string;
  label: string;
  flex?: number;
  minWidth?: string;
  maxWidth?: string;
}

export const TABLE_COLUMNS: TableColumn[] = [
  {
    key: 'type',
    label: 'Type',
    flex: 0,
    minWidth: '100px',
    maxWidth: '120px',
  },
  {
    key: 'name',
    label: 'Name',
    flex: 1, // Takes remaining space
    minWidth: '200px',
  },
  {
    key: 'tags',
    label: 'Tags',
    flex: 0,
    minWidth: '150px',
    maxWidth: '200px',
  },
  {
    key: 'lastUpdated',
    label: 'Last Updated',
    flex: 0,
    minWidth: '150px',
    maxWidth: '180px',
  },
  {
    key: 'actions',
    label: 'Actions',
    flex: 0,
    minWidth: '120px',
    maxWidth: '130px',
  },
];

