import PropTypes from 'prop-types';
import s from './GalleryContainer.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

function GalleryContainer({ images, listener }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => {
        return (
          <li key={image.id} className={s.item} onClick={listener}>
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
  );
}

GalleryContainer.propTypes = {
  images: PropTypes.array,
};

export default GalleryContainer;
