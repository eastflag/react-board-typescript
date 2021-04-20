import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Col, Row} from 'react-bootstrap';
import {Board} from "../../dto/Board";
import './BoardList.scss';

const BoardList: React.FC = (props: any) => {
  // console.log(props);
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
      <Row className="mb-3 justify-content-end">
        <Col xs="auto" sm="auto">
          <Button variant="primary" onClick={() => props.history.push('/add')}>등 록</Button>
        </Col>
      </Row>
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
