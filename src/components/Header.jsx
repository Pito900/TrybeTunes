import React from 'react';
import { Link } from 'react-router-dom';
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
    this.logedUser(); // Após a página renderizar, o componentDidMount aplica a função logedUser.
  }

  logedUser = async () => {
    this.setState({ carregando: true });
    const { name } = await getUser(); // O name ta vindo do getUser, por isso da para desconstruir (construimos o objeto de usuários no passo anterior).
    this.setState({
      nomeUsuario: name,
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
        <nav>
          <Link to="/search" data-testid="link-to-search"> Search</Link>
          <p />
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites</Link>
          <p />
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        </nav>

      </header>
    );
  }
}

export default Header;
