import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Comment} from "../dto/Comment";
import "./CommentList.scss";
import {jwtUtils} from "../utils/jwtUtils";
import {useSelector} from "react-redux";
import api from "../utils/api";

interface Props {
  board_id: number;
  history: any;
}

const CommentList: React.FC<Props> = (props) => {
  const [comments, setComments] = useState<Array<Comment>>([]);
  const token = useSelector((state: any) => state.Auth.token);

  useEffect(() => {
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
      content: form.commentText.value
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
      props.history.push('/login')
    }
  }

  return (
    <>
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group controlId="commentText">
          <Form.Label>댓글</Form.Label>
          <Form.Control required as="textarea" rows={4} onFocus={handleFocus} />
        </Form.Group>
        <Button variant="primary" type="submit">
          등록
        </Button>
      </Form>
      {
        comments.map((comment: Comment) =>
          <Row className="comment" key={comment.id}>
            <Col xs={12} className="date">{comment.created}</Col>
            <Col xs={12}>{comment.content}</Col>
          </Row>
        )
      }
    </>

  );
};

export default CommentList;
