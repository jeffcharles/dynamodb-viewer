import * as AWS from 'aws-sdk';
import * as React from 'react';
import Tables from './Tables';
import { Record } from '../types';
import Records from './Records';

interface DatabaseState {
  tables: string[] | null,
  selectedTableRecords: Record[] | null
  selectedTable: string | null,
}

function key(row: any, tableDescription: AWS.DynamoDB.TableDescription): string {
  const partitionKeyName: string = tableDescription.KeySchema!.filter(key => key.KeyType === 'HASH')[0].AttributeName;
  const sortKeyName: string | undefined = (tableDescription.KeySchema!.filter(key => key.KeyType === 'RANGE')[0] || {}).AttributeName;
  const partitionKeyType =
    tableDescription.AttributeDefinitions!.filter(d => d.AttributeName === partitionKeyName)[0].AttributeType;
  const sortKeyType = sortKeyName
    ? tableDescription.AttributeDefinitions!.filter(d => d.AttributeName === sortKeyName)[0].AttributeType
    : null;
  const partitionKey = row[partitionKeyName][partitionKeyType];
  const sortKey = sortKeyName && sortKeyType ? row[sortKeyName][sortKeyType] : null;
  return sortKey ? `${partitionKey} -> ${sortKey}` : partitionKey;
}

export default class extends React.Component<{dynamodb: AWS.DynamoDB}, DatabaseState> {
  constructor() {
    super();
    this.state = { tables: null, selectedTable: null, selectedTableRecords: null };
  }

  async componentDidMount() {
    await this.fetchTables();
  }

  async describeTable(table: string): Promise<AWS.DynamoDB.TableDescription> {
    const tableDescriptionRes = await this.props.dynamodb.describeTable({ TableName: table }).promise();
    return tableDescriptionRes.Table!;
  }

  async fetchTables() {
    const tablesRes = await this.props.dynamodb.listTables().promise();
    const tables = tablesRes.TableNames;
    this.setState({ tables: tables || null });
  }

  async fetchRecords(table: string): Promise<any[]> {
    const itemsResult = await this.props.dynamodb.scan({ TableName: table }).promise();
    return itemsResult.Items!;
  }

  async loadTable(table: string) {
    this.setState({ selectedTable: table });
    const [rawRecords, description] = await Promise.all([this.fetchRecords(table), this.describeTable(table)]);
    const records = rawRecords.map(record => ({ key: key(record, description), data: record }));
    this.setState({ selectedTableRecords: records });
  }

  render() {
    const tables = this.state.tables && <Tables
          tables={this.state.tables}
          selectedTable={this.state.selectedTable}
          onTableSelected={table => this.loadTable(table)}
          onRefresh={() => this.fetchTables()} />;
    const rows = this.state.selectedTableRecords && <Records
      records={this.state.selectedTableRecords}
      onRefresh={() => {
        if (this.state.selectedTable) {
          this.loadTable(this.state.selectedTable);
        }}} />;
    return (
      <div>
        {tables}
        {rows}
      </div>
    );
  }
}
