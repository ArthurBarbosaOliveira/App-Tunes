import React from 'react';
import Card from '../components/Card';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      buscarCampo: '',
      carregando: false,
      artist: '',
      data: [],
      pesquisado: false,
    };
  }

  handleValidade = (e) => {
    const { value } = e.target;
    const minChar = 2;
    if (value.length >= minChar) this.setState({ disabled: false });
    this.setState({ buscarCampo: value });
  };

  buscarAlbum = () => {
    const { buscarCampo } = this.state;
    this.setState({ buscarCampo: '' });
    this.setState({ carregando: true }, async () => {
      const resultado = await searchAlbumsAPI(buscarCampo);
      this.setState({
        carregando: false, data: resultado, artist: buscarCampo, pesquisado: true });
    });
  }

  buscarArtist = (artist) => (
    <p>
      Resultado de álbuns de:
      {' '}
      {artist}
    </p>
  );

  render() {
    const { buscarCampo, disabled, carregando, artist, data, pesquisado } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleValidade }
              value={ buscarCampo }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disabled }
              onClick={ this.buscarAlbum }
            >
              Pesquisar
            </button>
          </form>
        </div>
        <div>
          {
            artist !== '' ? this.buscarArtist(artist) : ''
          }
        </div>
        <div>
          {carregando && <Carregando />}
          {
            (data.length === 0) && pesquisado
              ? <p>Nenhum álbum foi encontrado</p>
              : data.map((element, index) => <Card { ...element } key={ index } />)
          }
        </div>
      </>
    );
  }
}

export default Search;
