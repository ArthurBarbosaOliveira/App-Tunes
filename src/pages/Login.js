import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    isDisabled: true,
    inputUser: '',
    carregando: false,
    redirect: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validade);
  }

  validade = () => {
    const { inputUser } = this.state;
    const MinChar = 3;
    if (inputUser.length >= MinChar) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const { inputUser } = this.state;
    this.setState({ carregando: true }, async () => {
      await createUser({ name: inputUser });
      this.setState({ carregando: false, redirect: true });
    });
  }

  render() {
    const { isDisabled, inputUser, carregando, redirect } = this.state;
    if (carregando) return <span>Carregando...</span>;
    if (redirect) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <form onSubmit={ this.handleClick }>
          <label htmlFor="inputUser">
            <input
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ inputUser }
              name="inputUser"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
