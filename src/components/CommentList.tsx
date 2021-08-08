import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Comment} from "../dto/Comment";
import "./CommentList.scss";
import {jwtUtils} from "../utils/JwtUtils";
import {useSelector} from "react-redux";
import api from "../utils/api";
import AlertModal from "./AlertModal";
import {StringUtils} from "../utils/StringUtils";

interface Props {
  board_id: number;
  history: any;
}

const CommentList: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const token = useSelector((state: any) => state.Auth.token);

  useEffect(() => {
    console.log(props.history);
    if (!props.board_id) {
      return;
    }

    getComments(props.board_id);
  }, [props.board_id]);

  const getComments = async (board_id: number) => {
    const res = await api.get(`/api/comment/list?board_id=${props.board_id}`);
    setComments(res.data);
  }


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    const comment = {
      board_id: props.board_id,
      content: form.commentText.value,
      user_id: jwtUtils.getId(token)
    }

    let res = await api.post('/api/comment', comment);
    console.log(res);
    res = await api.get(`/api/comment?id=${res.data.id}`);

    const newComments = [...comments];
    newComments.unshift(res.data);

    setComments(newComments);
    form.commentText.value = '';
  };

  const handleFocus = () => {
    if (!jwtUtils.isAuth(token)) {
      setShowModal(true);
    }
  }

  const onCancel = () => {
    setShowModal(false);
  }

  const onOk = () => {
    setShowModal(false);
    // 로그인후 돌아올수 있게 현재경로를 세팅한다.
    props.history.push(`/login?redirectUrl=${props.history.location.pathname}`)
  }

  return (
    <>
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group controlId="commentText">
          <Form.Label>댓글</Form.Label>
          <Form.Control required as="textarea" rows={4} onClick={handleFocus} />
        </Form.Group>
        <Button variant="primary" type="submit">
          등록
        </Button>
      </Form>
      {
        comments.map((comment: Comment) =>
          <Row className="comment" key={comment.id}>
            <Col xs={12}>
              <div className="d-flex justify-content-between">
                <span className="date">{comment.user?.username}</span>
                <span className="date">{StringUtils.getRecentDate(comment.created)}</span>
              </div>
            </Col>
            <Col xs={12}>{comment.content}</Col>
          </Row>
        )
      }
      <AlertModal show={showModal} header="댓글 등록" body="로그인하시겠습니까?" centered={true}
                  onOk={onOk}
                  onCancel={onCancel}>
      </AlertModal>
    </>
  );
};

export default CommentList;
