import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: '',
      carregando: true,
      data: {},
    };
  }

  componentDidMount() {
    this.storageUser();
  }

  storageUser = async () => {
    const usuario = await getUser();
    this.setState({
      usuario: usuario.name,
      carregando: false,
      data: usuario,
    });
  }

  render() {
    const { usuario, carregando, data: { name, email, image, description } } = this.state;
    return (
      <div>
        <Header />
        Profile
        {carregando
          ? <Carregando />
          : (
            <div data-testid="page-profile">
              <div>
                <img
                  src={ image }
                  data-testid="profile-image"
                  alt="img do user"
                />
              </div>
              <br />
              <Link to="profile/edit">
                Editar perfil
              </Link>
              <p>{name}</p>
              <p>{email}</p>
              <p>{description}</p>
              <p>
                {`Usuário: ${usuario}`}
              </p>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
