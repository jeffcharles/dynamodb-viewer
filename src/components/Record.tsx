import * as React from 'react';
import { Record } from '../types';

export default(props: {record: Record}) => (
  <div>{props.record.key}: <pre>{JSON.stringify(props.record.data, null, 2)}</pre></div>
);
