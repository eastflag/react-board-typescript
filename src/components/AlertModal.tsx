import React from 'react';
import {Button, Modal} from "react-bootstrap";

interface Props {
  show: boolean;
  header: string;
  body: string;
  centered: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const AlertModal: React.FC<Props> = (props) => {
  return (
    <Modal
      show={props.show}
      centered={props.centered}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.body}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={props.onOk}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
