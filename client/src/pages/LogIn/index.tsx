import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container } from './styles';
import Imput from '../../components/Inputs';
import Button from '../../components/Button';
import { getValidationErrors } from '../../utils/getValidationErros';

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const hundleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('email is required').email(),
        password: Yup.string().required(),
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
    <Container>
      <Form ref={formRef} onSubmit={hundleSubmit}>
        <h1> Wellcome back! </h1>
        <Imput icon={FiMail} name="email" placeholder="E-mail" />
        <Imput
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Log in</Button>
      </Form>
      <a href="login">
        <FiLogIn />
        Sign Up
      </a>
    </Container>
  );
};

export default LogIn;
