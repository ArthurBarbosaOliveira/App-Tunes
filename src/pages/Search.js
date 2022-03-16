import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      buscarCampo: '',
    };
  }

  handleValidade = (e) => {
    const { value } = e.target;
    const minChar = 2;
    if (value.length >= minChar) this.setState({ disabled: false });
    this.setState({ buscarCampo: value });
  };

  render() {
    const { buscarCampo, disabled } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search" />
        Buscar
        <form>
          <input
            data-testid="search-artist-input"
            value={ buscarCampo }
            type="text"
            onChange={ this.handleValidade }
          />
          <button
            data-testid="search-artist-button"
            disabled={ disabled }
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
