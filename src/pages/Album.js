import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArtist: {},
      data: [],
      favoritos: [],
    };
  }

  componentDidMount() {
    this.buscarGetMusic();
  }

  buscarGetMusic = async () => {
    const { match } = this.props;
    const resultado = await getMusics(match.params.id);
    const resultadoFav = await getFavoriteSongs();
    const [dataArtist, ...resto] = resultado;
    resultadoFav.map((element) => removeSong(element));
    this.setState({ data: resto, dataArtist, favoritos: resultadoFav });
  };

  render() {
    const { data, dataArtist, favoritos } = this.state;
    const { artistName, collectionName } = dataArtist;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">
            {artistName}
          </p>

          <p data-testid="album-name">
            {collectionName}
            {artistName}
          </p>
          {data.map(
            (item, index) => (<MusicCard
              { ...item }
              key={ index }
              fav={ favoritos }
            />),
          )}

        </div>
      </>
    );
  }
}

Album.propTypes = {
  encontro: PropTypes.array,
}.isRequired;

export default Album;
