import PropTypes from 'prop-types';
import s from './Button.module.css';
import classNames from 'classnames';

export default function Button({ text, listener, type, styles }) {
  const style = [styles === 'search' ? s.buttonSearch : s.buttonLoadMore];

  return (
    <button
      className={classNames(style.join(' '))}
      type={type}
      onClick={listener}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  listener: PropTypes.func,
  type: PropTypes.string,
  styles: PropTypes.string,
};
