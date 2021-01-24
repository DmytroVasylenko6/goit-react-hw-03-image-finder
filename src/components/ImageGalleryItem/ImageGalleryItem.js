import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ src, dataset, alt }) {
  return (
    <>
      <div className={s.item}>
        <img src={src} alt={alt} data-set={dataset} className={s.image} />
      </div>
    </>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  dataset: PropTypes.string,
  alt: PropTypes.string,
};

export default ImageGalleryItem;
