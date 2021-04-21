import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {Board} from "../dto/Board";

interface Props {
  board: Board;
  validated: boolean;
  handleSubmit: (event: any) => void;
}

const BoardForm: React.FC<Props> = (props) => {
  useEffect(() => {

  }, [props.board]);
  return (
    <Form noValidate validated={props.validated} onSubmit={props.handleSubmit}>
      <Form.Group controlId="titleInput">
        <Form.Label>제목</Form.Label>
        <Form.Control required placeholder="" />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">제목을 입력하세요!!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="contentText">
        <Form.Label>내용</Form.Label>
        <Form.Control required as="textarea" rows={20} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">내용을 입력하세요!!</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        저장
      </Button>
    </Form>
  );
};

export default BoardForm;
