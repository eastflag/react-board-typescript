import React, {useEffect, useState} from 'react';
import {Button, Card, Modal, Row} from "react-bootstrap";
import {Board} from "../../dto/Board";
import CommentList from "../../components/CommentList";
import api from "../../utils/api";
import {jwtUtils} from "../../utils/jwtUtils";
import {useSelector} from "react-redux";
import moment from "moment";

const MyComponent = ({match, history}: any) => {
  const [board, setBoard] = useState<Board>({
    title: '',
    content: ''
  });
  const token = useSelector((state: any) => state.Auth.token);

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(match);
    getBoard(match.params.id);
  }, []);

  const getBoard = async (id: string) => {
    const res = await api.get(`/api/board/${id}`);
    console.log(res.data);
    setBoard(res.data);
  }

  const handleDelete = async () => {
    const res = await api.delete(`/api/board?id=${match.params.id}`);
    setShow(false);
    history.goBack();
  }

  return (
    <>
      {jwtUtils.isAuth(token) && jwtUtils.getId(token) === board?.user?.id &&
        <div className="d-flex justify-content-end">
          <Button variant="info" onClick={() => history.push(`/board-edit/${match.params.id}`)}>수정</Button>
          <Button variant="danger" onClick={() => handleShow()}>삭제</Button>
        </div>
      }
      <div className="d-flex justify-content-between mt-3">
        <h5>{board?.user?.username}</h5>
        <h5>{moment(board?.created).format('YYYY-MM-DD')}</h5>
      </div>
      <Card className="p-3 my-3">
        <Card.Title className="pb-2" style={{borderBottom: '1px solid #dddddd'}}>{board?.title}</Card.Title>
        <Card.Text>
          {board?.content}
        </Card.Text>
      </Card>
      <CommentList board_id={match.params.id} history={history}></CommentList>
      <Row className="justify-content-center mt-3">
        <Button variant="primary" onClick={() => history.goBack()}>돌아가기</Button>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyComponent;
