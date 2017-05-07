import * as React from 'react';

interface LabelProps {
  children?: any,
}

export default (props: LabelProps) => <label className="pt-label">{props.children}</label>;
