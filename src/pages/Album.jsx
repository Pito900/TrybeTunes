import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = { // Estou criando os estados que usarei nessa etapa. Possuem os nomes do que vem na requisição de cada album (ver requisito 6)
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      musicsList: [],
      favoriteMusics: [],
      carregando: false,
    };
  }

  async componentDidMount() { // criando a função que irá pegar as musicas do album
    const { id } = this.props; // peguei o id que passei como parâmetro pela URL.
    const musicsAlbum = await getMusics(id);
    const getFavoriteSongsAPI = await getFavoriteSongs(); // Pegando todas as musicas favoritas pela a API
    const recoveredFavoritesMusics = getFavoriteSongsAPI.map((music) => music.trackId); // Colocando os Id das musicas favoritas voltadas da API no vetor de musicas favoritas
    this.setState({ favoriteMusics: recoveredFavoritesMusics });
    const { artistName, collectionName, artworkUrl100 } = musicsAlbum[0]; //  Aqui estou pegando o objeto, que é o primeiro elemento do array musicas do album
    this.setState({
      artistName,
      collectionName,
      artworkUrl100,
      musicsList: musicsAlbum.slice(1), // usando slice para pegar as musicas e colocando no array da lista de todas as musicas (criei este array no estado)
    }); // O slice(1) irá retornar todos os elementos do array musicsAlbuns após o elemento 1.
  }

  handleFavoriteMusics = async (trackId) => {
    this.setState({ carregando: true });
    const { musicsList, favoriteMusics } = this.state;
    const isRemoving = favoriteMusics.some((id) => id === trackId);
    const encontraMusica = musicsList.find((song) => song.trackId === trackId);
    if (!isRemoving) {
      await addSong(encontraMusica);
      const newFavorites = [...favoriteMusics, trackId];
      this.setState({ carregando: false, favoriteMusics: newFavorites });
    } else {
      await removeSong(encontraMusica);
      const newFavorites = favoriteMusics.filter((id) => id !== trackId);
      this.setState({ carregando: false, favoriteMusics: newFavorites });
    }
  }

  render() {
    const {
      artistName,
      collectionName,
      artworkUrl100,
      musicsList,
      favoriteMusics,
      carregando,
    } = this.state;
    return (
      <main>
        <Header />
        {carregando ? (
          <p>Carregando...</p>
        ) : (
          <div data-testid="page-album">
            <section>
              <p data-testid="artist-name">
                { artistName }
              </p>
              <p data-testid="album-name">{collectionName}</p>
              <img src={ artworkUrl100 } alt={ collectionName } />
            </section>
            {musicsList.map(({ trackName, previewUrl, trackId }) => ( // é importante olhar o retorno da solicitação para entender de onde esses parâmetros vieram
              <section key={ trackId }>
                <h4>{trackName}</h4>
                <MusicCard
                  trackId={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  onToFavoriteMusic={ () => this.handleFavoriteMusics(trackId) }
                  checkedOrNot={ favoriteMusics.includes(trackId) }
                />
              </section>
            ))}
          </div>
        )}
      </main>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
