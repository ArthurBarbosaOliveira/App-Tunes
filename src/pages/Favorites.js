import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      carregando: true,

    };
  }

  componentDidMount() {
    this.GetFavoriteSong();
  }

  UltraUpdate = () => {
    this.GetFavoriteSong();
  }

  GetFavoriteSong = async () => {
    this.setState({ carregando: true });
    const result = await getFavoriteSongs();
    this.setState({ result, carregando: false });
  }

  render() {
    const { result, carregando } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites</p>
        { carregando
          ? <Carregando />
          : result.map((element) => (
            <MusicCard
              key={ element.trackCount }
              update={ this.UltraUpdate }
              objeto={ element }
              favorites={ result }
            />))}
      </div>
    );
  }
}

export default Favorites;
