import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import classNames from 'classnames';

function ImageGalleryItem({ src, dataset, alt, size }) {
  const originalImg = s.original;
  const previewImg = s.preview;

  const style = [s.image];

  if (size === 'original') {
    style.push(originalImg);
  }

  if (size === 'preview') {
    style.push(previewImg);
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        data-set={dataset}
        className={classNames(style.join(' '))}
      />
    </>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  dataset: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.string,
};

export default ImageGalleryItem;
