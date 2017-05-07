import * as React from 'react';
import { Button } from '@blueprintjs/core';
import { Configuration } from '../types';
import Input from './Input';
import Label from './Label';

interface ConfigurationProps {
  onSubmit: (conf: Configuration) => void
}

export default class extends React.Component<ConfigurationProps, Configuration> {
  constructor(props: ConfigurationProps) {
    super(props);
    this.state = { endpoint: '', region: '', accessKeyId: '', secretAccessKey: ''};
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <Label>Endpoint: <Input onChange={e => this.setState({ endpoint: e.target.value })} /></Label>
        <Label>Region: <Input onChange={e => this.setState({ region: e.target.value })} /></Label>
        <Label>Access Key ID: <Input onChange={e => this.setState({ accessKeyId: e.target.value })} /></Label>
        <Label>Secret Access Key: <Input onChange={e => this.setState({ secretAccessKey: e.target.value })} /></Label>
        <Button text="Submit" type="submit" />
      </form>
    );
  }
}
