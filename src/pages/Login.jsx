import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Header from '../components/Header';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeUsuario: '',
      disabEnvButton: true,
      carregando: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      nomeUsuario: value,
    }, () => this.btnEnvAtive());
  }

  btnEnvAtive = () => {
    const { nomeUsuario } = this.state;
    const taNome = 3;
    // (nomeUsuario.length >= taNome) ? this.setState({ disabEnvButton: false }) : this.setState({ disabEnvButton: true });
    if (nomeUsuario.length >= taNome) {
      this.setState({ disabEnvButton: false });
    } else {
      this.setState({ disabEnvButton: true });
    }
  };

  submitUser = async () => {
    const { nomeUsuario } = this.state;
    const objUser = { name: nomeUsuario };
    this.setState({ carregando: true });
    await createUser(objUser);
    this.setState({ carregando: false, redirect: true });
  }

  render() {
    const { disabEnvButton, nomeUsuario, carregando, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <Header />
        { redirect && (<Redirect to="/search" />) }
        {carregando ? (
          <span>Carregando...</span>
        ) : (
          <form>
            <input
              type="text"
              value={ nomeUsuario }
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ disabEnvButton }
              onClick={ this.submitUser }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
