import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { api } from "../utilities/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const { data } = await api.post("/user/login", values);
      if (data?.token) {
        navigate("/profile");
        localStorage.setItem("userID", data?.userID);
      } else {
        toast.error(data?.message || "Unauthorised");
      }
    } catch (err) {
      toast.error("Error while login");
      console.log("Error while login", err);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup controlId="formEmail">
              <Label>Email address</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>

            <FormGroup controlId="formPassword">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>

            <Button variant="primary" type="submit" block>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
