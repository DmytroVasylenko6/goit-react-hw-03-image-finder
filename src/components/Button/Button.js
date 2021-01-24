import PropTypes from 'prop-types';
import s from './Button.module.css';
import classNames from 'classnames';

export default function Button({ text, listener, type, styles, disabled }) {
  const search = s.buttonSearch;
  const load = s.buttonLoadMore;

  const style = [];

  if (styles === 'search') {
    style.push(search);
  }

  if (styles === 'load') {
    style.push(load);
  }
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
