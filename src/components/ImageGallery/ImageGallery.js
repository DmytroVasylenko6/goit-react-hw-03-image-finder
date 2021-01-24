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
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchImage;
    const nextName = this.props.searchImage;
    console.log(this.state.images);

    if (prevName !== nextName) {
      console.log('Изменилось значения запроса');

      this.setState({ loading: true, status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=19197868-48df692c0a14d7fda4172233f&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`No results were found for "${nextName}"`),
          );
        })
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, error, status } = this.state;
    console.log(images);

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
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
            {images.hits.map(image => {
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
            <Button type="button" text="load more" styles="load" />
          </Container>
        </>
      );
    }
    // return <>
    //   {error && <h1>{error.message}</h1>}
    //   <ul className={s.ImageGallery}>
    //   {images && images.hits.map(image => {
    //     return <li key={image.id}>
    //       <ImageGalleryItem src={image.webformatURL} alt={image.tags} dataset={image.largeImageURL}/>
    //     </li>
    //   })}
    //   </ul>
    //   <Container>
    //       {images && !loading && <Button type="button" text="load more" styles="load" />}
    //       {loading && <Loader type="ThreeDots" color="#ca347f" height={80} width={80} />}
    //   </Container>
    // </>
  }
}

// ImageGallery.propTypes = {
//   children: PropTypes.object,
// };

export default ImageGallery;
