import { useFormik } from "formik";
import React from "react";
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
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
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
      const { data } = await api.post("/api/register", values);
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Registeration successful");
      navigate("/");
    } catch (err) {
      console.log("error while registering user", err);
      toast.error("Something went wrong");
    }
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup controlId="formFirstName">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>

            <FormGroup controlId="formLastName">
              <Label>Last Name</Label>
              <Input
                type="text"
                placeholder="Enter your last name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                required
              />
            </FormGroup>

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
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
