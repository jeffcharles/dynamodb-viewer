import * as React from 'react';

interface InputProps {
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
}

export default (props: InputProps) => <input className="pt-input" type="text" onChange={props.onChange} />;
