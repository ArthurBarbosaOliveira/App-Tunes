import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const {
      artistId,
      artistName,
      artworkUrl100,
      collectionId,
      collectionName,
      collectionPrice,
      releaseDate,
      trackCount,
    } = this.props;

    return (
      <div>
        <span>{artistId}</span>
        <span>{artistName}</span>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ {
            pathname: `/album/${collectionId}`,
            query: { ...this.props },
          } }
        >
          Album
        </Link>
        <p>{artworkUrl100}</p>
        <p>{collectionId}</p>
        <p>{collectionName}</p>
        <p>{collectionPrice}</p>
        <p>{releaseDate}</p>
        <p>{trackCount}</p>
      </div>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string,
  collectionId: PropTypes.string,
}.isRequired;

export default Card;
