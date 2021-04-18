import React, {useEffect, useState} from 'react';
import axios, {ResponseType} from "axios";
import {Col, Row } from 'react-bootstrap';
import {Board} from "../dto/Board";

const BoardList: React.FC = () => {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    getBoardList();
  }, []);

  const getBoardList = async () => {
    // res는 http response의 header + body를 모두 갖고 있다.
    const res  = await axios.get('/api/boards');
    console.log(res);
    setBoardList(res.data);
  }

  return (
    <>
      {
        boardList.map((board: Board)=>
          <Row>
            <Col xs={8} sm={8}>{board.title}</Col>
            <Col xs={4} sm={4}>{board.created}</Col>
          </Row>)
      }
    </>
  );
};

export default BoardList;
