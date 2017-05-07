import { Button } from '@blueprintjs/core';
import * as React from 'react';

interface TablesProps {
  tables: string[],
  selectedTable: string | null,
  onTableSelected: (table: string) => void,
  onRefresh: () => void
}

export default (props: TablesProps) => (
  <div>
    <p>Tables: <Button iconName="refresh" onClick={() => props.onRefresh()} /></p>
    <ul className="pt-list-unstyled">
      {(props.tables || []).map(table =>
        <li
          key={table}
          style={(table === props.selectedTable) ? {backgroundColor: 'red'} : {}}
          onClick={() => props.onTableSelected(table)}>{table}</li>
      )}
    </ul>
  </div>
);
