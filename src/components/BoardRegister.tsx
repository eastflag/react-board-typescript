import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';
import {Board} from "../dto/Board";

const BoardRegister: React.FC = (props: any) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setValidated(false);
      return;
    }

    setValidated(true);
    // Form.Grou의 controlid는 control의 id를 생성 => form[id] => control 노드 로 접근
    console.log(form.titleInput.value);
    const board = {
      title: form.titleInput.value,
      content: form.contentText.value
    }
    addBoard(board);

    props.history.push('/');
  };

  const addBoard = async (board: Board) => {
    const res = await axios.post('/api/board', board);
    console.log(res);
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

export default BoardRegister;
