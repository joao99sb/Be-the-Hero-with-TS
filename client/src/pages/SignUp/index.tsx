import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container } from './styles';
import Imput from '../../components/Inputs';
import Button from '../../components/Button';
import { getValidationErrors } from '../../utils/getValidationErros';

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const hundleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('name is required'),
        email: Yup.string().required('email is required').email(),
        password: Yup.string().min(
          6,
          'password must be of minimum 6 characters',
        ),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <>
      <Container>
        <Form onSubmit={hundleSubmit} ref={formRef}>
          <h1> Register your NGO </h1>
          <Imput icon={FiUser} name="name" placeholder="Name" />
          <Imput icon={FiMail} name="email" placeholder="E-mail" />
          <Imput
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />

          <Button type="submit">Sign Up</Button>
        </Form>
        <a href="login">
          <FiArrowLeft />
          Back to Log in
        </a>
      </Container>
    </>
  );
};

export default SingUp;
