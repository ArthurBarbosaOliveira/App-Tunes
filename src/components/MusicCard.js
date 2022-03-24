import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carregando: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.CheckedSong();
  }

    FavoriteSong = () => {
      const { props } = this;
      const dataSong = {
        trackId: props.trackId,
        trackName: props.trackName,
      };

      this.setState({ carregando: true }, async () => {
        const resultado = await addSong(dataSong);
        if (resultado === 'OK') this.setState({ carregando: false });
      });
    };

    CheckedChange = () => {
      this.setState((prev) => ({
        checked: !prev.checked,
      }));
    }

    CheckedSong = () => {
      const { fav, trackId } = this.props;
      if (fav.some((element) => element.trackId === trackId)) {
        this.setState({ checked: true });
      }
    }

    track = () => {
      const { trackId, trackName, previewUrl } = this.props;
      const { checked } = this.state;

      return (
        <>
          <span>{trackName}</span>
          <label htmlFor="favorite">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id="favorite"
              onChange={ this.CheckedChange }
              onClick={ this.FavoriteSong }
              checked={ checked }
            />
          </label>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </>
      );
    };

    render() {
      const { carregando } = this.state;
      return (carregando ? <Carregando /> : this.track());
    }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
