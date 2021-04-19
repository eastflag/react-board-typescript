import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Col, Row } from 'react-bootstrap';
import {Board} from "../dto/Board";
import './BoardList.scss';

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
          <Row className="py-2 board" key={board.id}>
            <Col>{board.title}</Col>
            <Col xs="auto" sm="auto">{board.created}</Col>
          </Row>)
      }
    </>
  );
};

export default BoardList;
