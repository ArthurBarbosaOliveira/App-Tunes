import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      carregando: false,
    };
  }

  componentDidMount() {
    this.handleLogin();
  }

  handleLogin = () => {
    this.setState({ carregando: true }, async () => {
      const { name } = await getUser();
      this.setState({
        login: name,
        carregando: false,
      });
    });
  }

  render() {
    const { login, carregando } = this.state;

    return (
      <header data-testid="header-component">
        {
          carregando
            ? <Carregando />
            : <p data-testid="header-user-name">{ login }</p>
        }
        <nav>
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Músicas Favoritas
          </Link>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        </nav>
      </header>
    );
  }
}
