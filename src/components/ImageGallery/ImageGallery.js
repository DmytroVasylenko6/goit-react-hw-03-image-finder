import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import ImageGalleryItem from '../ImageGalleryItem';
import Container from '../Container';
import Button from '../Button';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchImage;
    const nextName = this.props.searchImage;
    const { page } = this.state;

    if (prevName !== nextName) {
      console.log('Изменилось значения запроса');

      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${page}&key=19197868-48df692c0a14d7fda4172233f&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`No results were found for "${nextName}"`),
          );
        })
        .then(imagess =>
          this.setState({
            images: imagess.hits,
            status: 'resolved',
            page: prevState.page + 1,
          }),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  updateImageGallery = () => {
    this.setState({ status: 'pending' });
    fetch(
      `https://pixabay.com/api/?q=${this.props.searchImage}&page=${this.state.page}&key=19197868-48df692c0a14d7fda4172233f&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(
          new Error(`No results were found for "${this.props.searchImage}"`),
        );
      })
      .then(imagess =>
        this.setState(
          prevState => ({
            images: [...prevState.images, ...imagess.hits],
            status: 'resolved',
            page: prevState.page + 1,
          }),
          this.scroll,
        ),
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending' && images !== null) {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(image => {
              return (
                <li key={image.id}>
                  <ImageGalleryItem
                    src={image.webformatURL}
                    alt={image.tags}
                    dataset={image.largeImageURL}
                  />
                </li>
              );
            })}
          </ul>

          <Container>
            <Loader type="ThreeDots" color="#ca347f" height={80} width={80} />
          </Container>
        </>
      );
    } else if (status === 'pending') {
      return (
        <Container>
          <Loader type="ThreeDots" color="#ca347f" height={80} width={80} />
        </Container>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(image => {
              return (
                <li key={image.id}>
                  <ImageGalleryItem
                    src={image.webformatURL}
                    alt={image.tags}
                    dataset={image.largeImageURL}
                  />
                </li>
              );
            })}
          </ul>

          <Container>
            <Button
              type="button"
              text="load more"
              styles="load"
              listener={() => this.updateImageGallery()}
            />
          </Container>
        </>
      );
    }
  }
}

// ImageGallery.propTypes = {
//   children: PropTypes.object,
// };

export default ImageGallery;
