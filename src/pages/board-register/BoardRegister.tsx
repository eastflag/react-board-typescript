import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {Board} from "../../dto/Board";
import api from "../../utils/api";
import {useSelector} from "react-redux";
import {jwtUtils} from "../../utils/jwtUtils";

const BoardRegister: React.FC = (props: any) => {
  const [validated, setValidated] = useState(false);
  const token = useSelector((state: any) => state.Auth.token);

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
      content: form.contentText.value,
      user_id: jwtUtils.getId(token)
    }
    console.log(board);
    addBoard(board);
  };

  const addBoard = async (board: Board) => {
    const res = await api.post('/api/board', board);
    console.log(res);

    props.history.push('/board-list');
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
