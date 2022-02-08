import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() { // aqui só fiz o que o requisito mandou...ele mesmo já deu esse formato.
    const {
      trackName,
      previewUrl,
      trackId,
      onToFavoriteMusic,
      checkedOrNot,
    } = this.props;
    return (
      <div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackName }>
          Favorita
          <input
            label="Favorita"
            type="checkbox"
            id={ trackName }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ onToFavoriteMusic }
            checked={ checkedOrNot } // ver se o vetor ded musicas favoritas tem o id da musica. Dai se sim, marca como true se tiver e falso caso n tenha.
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  checkedOrNot: PropTypes.bool,
  onChange: PropTypes.func,
}.isRequired;

export default MusicCard;
