import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import {Board} from "../../dto/Board";

const MyComponent = ({match, history}: any) => {
  const [board, setBoard] = useState<Board>({
    title: '',
    content: ''
  });

  useEffect(() => {
    console.log(match);
    getBoard(match.params.id);
  }, []);

  const getBoard = async (id: string) => {
    const res = await axios.get(`/api/board/${id}`);
    console.log(res.data);
    setBoard(res.data);
  }

  return (
    <>
      <Row className="justify-content-end">
        <Button variant="info" onClick={() => history.push(`/board-edit/${match.params.id}`)}>수정</Button>
      </Row>
      <Card className="p-3 my-3">
        <Card.Title className="pb-2" style={{borderBottom: '1px solid #dddddd'}}>{board?.title}</Card.Title>
        <Card.Text>
          {board?.content}
        </Card.Text>
      </Card>
      <Row className="justify-content-center">
        <Button variant="primary" onClick={() => history.goBack()}>돌아가기</Button>
      </Row>
    </>
  );
};

export default MyComponent;
