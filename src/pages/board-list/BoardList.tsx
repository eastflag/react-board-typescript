import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {Board} from "../../dto/Board";
import './BoardList.scss';
import api from "../../utils/api";
import {StringUtils} from "../../utils/StringUtils"; // 한글화

const BoardList: React.FC = (props: any) => {
  // console.log(props);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    getBoardList();
  }, []);

  const getBoardList = async () => {
    // res는 http response의 header + body를 모두 갖고 있다.
    const res  = await api.get('/api/board/list');
    console.log(res);
    setBoardList(res.data);
  }

  return (
    <>
      <Row className="mb-3 justify-content-end">
        <Col xs="auto">
          <Button variant="primary" onClick={() => props.history.push('/board-register')}>등 록</Button>
        </Col>
      </Row>
      {
        boardList.map((board: Board) =>
          <Row className="py-2 board" key={board.id} onClick={() => props.history.push(`/board-view/${board.id}`)}>
            <Col xs={8}>{board.title}</Col>
            <Col xs={2} className="text-right">{board.user?.username}</Col>
            <Col xs={2} className="text-right">{StringUtils.getRecentDate(board.created)}</Col>
          </Row>)
      }
    </>
  );
};

export default BoardList;
