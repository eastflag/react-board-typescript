import { Formik } from 'formik';
import React from 'react';
import {Button, Form} from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";

const SignUp = ({history}) => {
  const submit = async (values: any) => {
    console.log(values);
    const {email, password, username} = values;
    const {status, data} = await axios.post('/api/auth/signup', {email, password, username});
    if (status >= 200 && status < 300) {
      history.push('/login');
    }
  }
  return (
    <Formik
      initialValues={{ email: '', password: '', password2: '', username: ''}}
      onSubmit={submit}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("이메일형식으로 입력하세요")
          .required("필수필드 입니다."),
        password: Yup.string()
          .required("Required")
          .min(6, "6자이상 입력하세요"),
        password2: Yup.string()
          .oneOf([Yup.ref("password"), null], "패스워드가 일치하지 않습니다.")
          .required("패스워드가 일치하지 않습니다."),
        username: Yup.string()
          .required("필수필드 입니다.")
      })}>
      {
        ({values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting }) => (<Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" placeholder="Enter email"
                          value={values.email}
                          onChange={handleChange} onBlur={handleBlur}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && errors.email ? true : false} />
            { touched.email && !errors.email && <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback> }
            { touched.email && errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> }
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="enter Password"
                          value={values.password}
                          onChange={handleChange} onBlur={handleBlur}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && errors.password ? true : false} />
            { touched.password && !errors.password && <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback> }
            { touched.password && errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> }
          </Form.Group>
          <Form.Group controlId="formGroupPassword2">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control type="password" name="password2" placeholder="confirm Password"
                          value={values.password2}
                          onChange={handleChange} onBlur={handleBlur}
                          isValid={touched.password2 && !errors.password2}
                          isInvalid={touched.password2 && errors.password2 ? true : false} />
            { touched.password2 && !errors.password2 && <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback> }
            { touched.password2 && errors.password2 && <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback> }
          </Form.Group>
          <Form.Group controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="username" placeholder="enter username"
                          value={values.username}
                          onChange={handleChange} onBlur={handleBlur}
                          isValid={touched.username && !errors.username}
                          isInvalid={touched.username && errors.username ? true : false} />
            { touched.username && !errors.username && <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback> }
            { touched.username && errors.username && <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback> }
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>)
      }
    </Formik>
  );
}

export default SignUp;
