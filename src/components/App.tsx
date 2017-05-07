import * as AWS from 'aws-sdk';
import * as React from 'react';
import Configuration from './Configuration';
import Database from './Database';
import Header from './Header';
import { Configuration as Conf } from '../types';

export default class extends React.Component<{}, {dynamodb: AWS.DynamoDB | null }> {
  constructor() {
    super();
    this.state = { dynamodb: null };
  }

  onConfigured(c: Conf) {
    AWS.config.update({
      accessKeyId: c.accessKeyId,
      secretAccessKey: c.secretAccessKey,
      region: c.region || 'us-west-2'
    });
    const dynamodb = new AWS.DynamoDB({
      endpoint: c.endpoint
    });
    this.setState({ dynamodb });
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.dynamodb ?
          <Database dynamodb={this.state.dynamodb} /> :
          <Configuration onSubmit={c => this.onConfigured(c)} />}
      </div>
    );
  }
}
