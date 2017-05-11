import * as React from 'react';
import { Button } from '@blueprintjs/core';
import { Record } from '../types';

export default(props: {record: Record, onDeleteRecord: (record: Record) => void}) => (
  <div>
    {props.record.name}: <Button iconName="pt-icon-delete" onClick={() => props.onDeleteRecord(props.record)} />
    <pre>{JSON.stringify(props.record.data, null, 2)}</pre>
  </div>
);
