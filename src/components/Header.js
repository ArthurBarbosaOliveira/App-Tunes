import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  state = {
    login: '',
    carregando: true,
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ login: name, carregando: false });
  }
  // tem que usar name, para buscar certo na API, por isso não passava no ultimo requisito do test

  render() {
    const { login, carregando } = this.state;
    if (carregando) return <span>Carregando...</span>;
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">
          { login }
        </h3>
        <nav>
          <button type="button">
            <Link to="/search" data-testid="link-to-search">
              Pesquisar
            </Link>
          </button>
          <button type="button">
            <Link to="/favorites" data-testid="link-to-favorites">
              Favoritas
            </Link>
          </button>
          <button type="button">
            <Link to="/profile" data-testid="link-to-profile">
              Perfil
            </Link>
          </button>
        </nav>
      </header>
    );
  }
}
