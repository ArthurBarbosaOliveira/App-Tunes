import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicas: '',
      carregando: false,
      tela: false,
    };
  }

  componentDidMount = () => {
    this.buscarGetMusic();
    this.buscarGetFavorite();
  }

  buscarGetFavorite = async () => {
    this.setState({ carregando: true });
    const resultadoFav = await getFavoriteSongs();
    this.setState({ resultadoFav, carregando: false });
  }

  buscarGetMusic = async () => {
    const { match } = this.props;
    const resultado = await getMusics(match.params.id);

    this.setState({ musicas: resultado, tela: true });
  }

  render() {
    const { tela, musicas, carregando, resultadoFav } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { carregando ? <Carregando />
          : (
            <>
              <p>Album</p>
              { tela && (
                <div className="music-card" key={ musicas[0].trackCount }>
                  <img src={ musicas[0].artworkUrl100 } alt={ musicas[0].artistName } />
                  <span data-testid="artist-name">{ musicas[0].artistName }</span>
                  <span data-testid="album-name">{ musicas[0].collectionName }</span>
                </div>
              ) }
              { tela && musicas.map((index) => {
                if (typeof index.previewUrl === 'undefined') return '';
                return (<MusicCard
                  key={ index.trackCount }
                  objeto={ index }
                  favorites={ resultadoFav }
                />);
              })}
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
