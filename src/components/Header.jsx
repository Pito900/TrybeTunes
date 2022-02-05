import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeUsuario: '',
      carregando: false,
    };
    this.logedUser = this.logedUser.bind(this);
  }

  componentDidMount() {
    this.logedUser();
  }

  logedUser = async () => {
    this.setState({ carregando: true });
    const { name } = await getUser(); // O nomeUsuario ta vindo do getUser, por isso da para desconstruir.
    this.setState({
      nomeUsuario: name, // o nome pego pela função é igual ao nome da chave do estado.
      carregando: false,
    });
  };

  render() {
    const { nomeUsuario, carregando } = this.state; // Aqui estou desconstruindo o nomeUsuario do objeto estado
    return (
      <header data-testid="header-component">
        { carregando ? (
          <p>Carregando...</p>
        ) : (
          <p data-testid="header-user-name">{ nomeUsuario }</p>
        )}
      </header>
    );
  }
}

export default Header;
