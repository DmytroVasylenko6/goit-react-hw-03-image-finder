import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GalleryContainer from '../GalleryContainer';
import ImageGalleryItem from '../ImageGalleryItem';
import Container from '../Container';
import Button from '../Button';
import pixabayAPI from '../../services/pixabayAPI';
import Modal from '../Modal';

class ImageGallery extends Component {
  state = {
    images: [],
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

    if (prevName !== nextName) {
      const page = 1;
      this.setState({ status: 'pending', page: 1, images: [] });
      this.setImages(nextName, page);
    }
  }

  updateImageGallery = () => {
    const { searchImage } = this.props;
    const { page } = this.state;

    this.setState({ status: 'pending' });
    this.setImages(searchImage, page);
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

  setImages(searchValue, pageNumber) {
    pixabayAPI(searchValue, pageNumber)
      .then(imagess => {
        if (imagess.hits.length === 0) {
          toast('No results were found for the given request!');
        }

        this.setState(
          prevState => ({
            images: [...prevState.images, ...imagess.hits],
            status: 'resolved',
            page: prevState.page + 1,
          }),
          this.scroll,
        );
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  render() {
    const { images, error, status, originalImage, alt, showModal } = this.state;

    return (
      <>
        {images.length > 0 && (
          <GalleryContainer images={images} listener={this.openModal} />
        )}
        {status === 'pending' && (
          <Container>
            <Loader type="ThreeDots" color="#ca347f" height={80} width={80} />
          </Container>
        )}

        {images.length > 0 && status !== 'pending' && (
          <Container>
            <Button
              type="button"
              text="load more"
              styles="load"
              listener={() => this.updateImageGallery()}
            />
          </Container>
        )}

        {status === 'rejected' && toast(error.message)}

        {showModal && (
          <Modal onClose={this.closeModal}>
            <ImageGalleryItem src={originalImage} alt={alt} size="original" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
