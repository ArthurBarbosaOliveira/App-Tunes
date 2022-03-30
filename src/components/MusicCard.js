import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      carregando: false,
      checked: false,
    };
  }

  componentDidMount = () => {
    this.CheckedSong();
  }

  FavoriteSong = async () => {
    this.setState({ carregando: true });
    const { checked } = this.state;
    const { objeto, update } = this.props;

    if (!checked) await addSong(objeto);

    if (checked) await removeSong(objeto);

    this.setState({ carregando: false });

    if (update !== undefined) update();
  }

  CheckedMusic = ({ target }) => this.setState({ checked: target.checked })

  CheckedSong = () => {
    const { favorites, objeto } = this.props;
    if (favorites.some((element) => element.trackId === objeto.trackId)) {
      this.setState({ checked: true });
    }
  }

  render() {
    const { objeto } = this.props;
    const { carregando, checked } = this.state;
    return (
      <>
        { carregando && <Carregando /> }
        { !carregando && (
          <div>
            <label htmlFor="favorite">
              Favorita
              <input
                data-testid={ `checkbox-music-${objeto.trackId}` }
                type="checkbox"
                id="favorite"
                onChange={ this.FavoriteSong }
                onClick={ this.CheckedMusic }
                checked={ checked }
              />
            </label>
            <span>{ objeto.trackName }</span>
            <audio data-testid="audio-component" src={ objeto.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>)}
      </>
    );
  }
}

MusicCard.propTypes = {
  objeto: PropTypes.func.isRequired,
  favorites: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default MusicCard;
