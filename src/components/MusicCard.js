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
        amgArtistId: props.amgArtistId,
        artistId: props.artistId,
        artistName: props.artistName,
        artistViewUrl: props.artistViewUrl,
        artworkUrl60: props.artworkUrl60,
        artworkUrl100: props.artworkUrl100,
        collectionCensoredName: props.collectionCensoredName,
        collectionExplicitness: props.collectionExplicitness,
        collectionId: props.collectionId,
        collectionName: props.collectionName,
        collectionPrice: props.collectionPrice,
        collectionType: props.collectionType,
        collectionViewUrl: props.collectionViewUrl,
        contentAdvisoryRating: props.contentAdvisoryRating,
        copyright: props.copyright,
        country: props.country,
        currency: props.currency,
        primaryGenreName: props.primaryGenreName,
        releaseDate: props.releaseDate,
        trackCount: props.trackCount,
        wrapperType: props.wrapperType,
      };

      this.setState({ carregando: true }, async () => {
        const resultado = await addSong(dataSong);
        this.setState({ carregando: false, checked: resultado === 'OK' });
      });
    };

    CheckedMusic = () => {
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
              onChange={ this.CheckedMusic }
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
