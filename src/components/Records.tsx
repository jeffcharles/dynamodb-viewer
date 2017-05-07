import { Button } from '@blueprintjs/core'
import * as React from 'react';
import Record from './Record';
import { Record as RecordType } from  '../types';

interface RecordsProps {
  records: RecordType[],
  onRefresh: () => void
}

export default (props: RecordsProps) => (
  <div>
    Records: <Button iconName="refresh" onClick={() => props.onRefresh()} />
    <ul className="pt-list-unstyled">
      {props.records.map(record =>
        <li key={record.key}><Record record={record} /></li>
      )}
    </ul>
  </div>
);
