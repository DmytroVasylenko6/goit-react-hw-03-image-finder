import PropTypes from 'prop-types';
import s from './Input.module.css';

function Input({
  name,
  label,
  value,
  id,
  placeholder,
  type,
  onChange,
  pattern,
  autocomplete,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      className={s.input}
      pattern={pattern}
      autoComplete={autocomplete}
      autoFocus
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  pattern: PropTypes.string,
  autocomplete: PropTypes.string,
};

export default Input;
