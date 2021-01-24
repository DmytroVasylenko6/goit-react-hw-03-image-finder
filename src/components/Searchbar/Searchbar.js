import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ children }) {
  return <header className={s.Searchbar}>{children}</header>;
}

Searchbar.propTypes = {
  children: PropTypes.object,
};

export default Searchbar;
