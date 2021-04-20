import React, {useEffect, useState} from 'react';
import {Card, Row} from "react-bootstrap";
import axios from "axios";
import {Board} from "../../dto/Board";

const MyComponent = ({match}: any) => {
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
      <Card>
        <Card.Title>{board?.title}</Card.Title>
        <Card.Text>
          {board?.content}
        </Card.Text>
      </Card>
    </>
  );
};

export default MyComponent;
