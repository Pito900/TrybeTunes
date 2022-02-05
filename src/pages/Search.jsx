import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      LookingFor: '',
      disabSearchButton: true,
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

  render() {
    const { disabSearchButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
