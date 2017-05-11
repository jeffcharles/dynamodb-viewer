import * as React from 'react';
import { Button, Dialog, Intent } from '@blueprintjs/core';

export default (props: {isOpen: boolean, onConfirm: () => void, onCancel: () => void}) => (
  <Dialog isOpen={props.isOpen}>
    <div className="pt-dialog-body">
      Are you sure you want to delete this item?
    </div>
    <div className="pt-dialog-footer">
      <div className="pt-dialog-footer-actions">
        <Button text="Cancel" onClick={() => {
          props.onCancel();
        }} />
        <Button intent={Intent.PRIMARY} onClick={() => {
          props.onConfirm();
        }} text="OK" />
      </div>
    </div>
  </Dialog>
);
