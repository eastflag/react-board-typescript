import React, {useEffect, useState} from 'react';
import {Board} from "../../dto/Board";
import {Button, Form} from "react-bootstrap";
import api from "../../utils/api";

const BoardEdit: React.FC = ({match, history}: any) => {
  const [validated, setValidated] = useState(false);
  const [board, setBoard] = useState<Board>({
    title: '',
    content: ''
  });

  const setField = (field: string, value: string) => {
    setBoard({
      ...board,
      [field]: value
    })
  }

  useEffect(() => {
    console.log(match);
    getBoard(match.params.id);
  }, []);

  const getBoard = async (id: string) => {
    const res = await api.get(`/api/board/${id}`);
    console.log(res.data);
    setBoard(res.data);
  }

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
      id: match.params.id,
      title: form.titleInput.value,
      content: form.contentText.value
    }
    updateBoard(board);


  };

  const updateBoard = async (board: Board) => {
    const res = await api.put('/api/board', board);
    console.log(res);

    history.push('/');
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="titleInput">
        <Form.Label>제목</Form.Label>
        <Form.Control required placeholder="" value={board.title} onChange={(e) => setField('title', e.target.value)} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">제목을 입력하세요!!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="contentText">
        <Form.Label>내용</Form.Label>
        <Form.Control required as="textarea" rows={20} value={board.content} onChange={(e) => setField('content', e.target.value)} />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">내용을 입력하세요!!</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        저장
      </Button>
    </Form>
  );
};

export default BoardEdit;
