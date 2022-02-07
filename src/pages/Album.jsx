import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = { // Estou criando os estados que usarei nessa etapa. Possuem os nomes do que vem na requisição de cada album (ver requisito 6)
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      musicsList: [],
    };
  }

  async componentDidMount() { // criando a função que irá pegar as musicas do album
    const { id } = this.props; // peguei o id que passei como parâmetro pela URL.
    const musicsAlbum = await getMusics(id);
    const { artistName, collectionName, artworkUrl100 } = musicsAlbum[0]; //  Aqui estou pegando o objeto, que é o primeiro elemento do array musicas do album
    this.setState({
      artistName,
      collectionName,
      artworkUrl100,
      musicsList: musicsAlbum.slice(1), // usando slice para pegar as musicas e colocando no array da lista de todas as musicas (criei este array no estado)
    }); // O slice(1) irá retornar todos os elementos do array musicsAlbuns após o elemento 1.
  }

  render() {
    const { artistName, collectionName, artworkUrl100, musicsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
            <MusicCard url={ previewUrl } />
          </section>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
