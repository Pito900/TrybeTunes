import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      LookingFor: '',
      disabSearchButton: true,
      listAlbuns: [],
      respostaAPI: false,
      nameArtist: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      LookingFor: value,
    }, () => this.searchButtonClick());
  }

  searchButtonClick = () => {
    const { LookingFor } = this.state;
    const taNome = 2;
    if (LookingFor.length >= taNome) {
      this.setState({ disabSearchButton: false });
    } else {
      this.setState({ disabSearchButton: true });
    }
  };

  searchButtonBanda = async () => {
    const { LookingFor } = this.state;
    this.setState({
      carregando: true,
      nameArtist: LookingFor,
    });
    const albuns = await searchAlbumsAPI(LookingFor);
    this.setState({
      carregando: false,
      LookingFor: '',
      disabSearchButton: true,
      listAlbuns: albuns,
      respostaAPI: true,
    });
  }

  render() {
    const {
      disabSearchButton,
      listAlbuns,
      respostaAPI,
      carregando,
      nameArtist,
    } = this.state;
    const cabecalho = (
      <h2>
        Resultado de álbuns de:
        {' '}
        { nameArtist }
      </h2>);
    return (
      <div data-testid="page-search">
        <Header />
        { carregando ? (
          <p>Carregando...</p>
        ) : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ disabSearchButton }
              onClick={ this.searchButtonBanda }
            >
              Pesquisar
            </button>
            {respostaAPI && cabecalho}
            {respostaAPI && listAlbuns.length !== 0 && listAlbuns.map(
              ({
                artistName,
                collectionName,
                artworkUrl100,
                trackCount,
                collectionId,
              }) => (
                <section key={ collectionId }>
                  <h3>{`Resultado de álbuns de: ${artistName}`}</h3>
                  <img
                    src={ artworkUrl100 }
                    alt={ collectionName }
                  />
                  <h3>{ collectionName }</h3>
                  <h3>{ artistName }</h3>
                  <h3>{ trackCount }</h3>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    clique para mais
                  </Link>
                </section>
              ),
            )}
          </form>
        )}
        { respostaAPI && listAlbuns.length === 0 && <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
