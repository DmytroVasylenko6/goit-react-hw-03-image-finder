import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import ImageGalleryItem from '../ImageGalleryItem';
import Container from '../Container';
import Button from '../Button';
import s from './ImageGallery.module.css';
import pixabayAPI from '../../services/pixabayAPI';
import Modal from '../Modal';

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    originalImage: null,
    alt: null,
  };

  static propTypes = {
    searchImage: PropTypes.string,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchImage;
    const nextName = this.props.searchImage;
    let { page } = this.state;

    if (prevName !== nextName) {
      page = 1;

      this.setState({ status: 'pending' });
      pixabayAPI(nextName, page)
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
    const { searchImage } = this.props;
    const { page } = this.state;

    this.setState({ status: 'pending' });
    pixabayAPI(searchImage, page)
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

  openModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      originalImage: e.target.dataset.set,
      alt: e.target.alt,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, error, status, originalImage, alt, showModal } = this.state;

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
                    size="preview"
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
                <li key={image.id} onClick={this.openModal} className={s.item}>
                  <ImageGalleryItem
                    src={image.webformatURL}
                    alt={image.tags}
                    dataset={image.largeImageURL}
                    size="preview"
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
          {showModal && (
            <Modal onClose={this.closeModal}>
              <ImageGalleryItem src={originalImage} alt={alt} size="original" />
            </Modal>
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
