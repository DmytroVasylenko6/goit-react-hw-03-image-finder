import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import Input from '../Input';
import Button from '../Button';
import s from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
  };

  inputNameId = shortid.generate();

  handleInputChange = event => {
    const { value } = event.currentTarget;
    this.setState({ name: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name.trim() === '') {
      toast('Please enter something');
      return;
    }
    this.props.Submit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  render() {
    const { name } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={s.SearchForm}>
        <Button type="submit" styles="search" />
        <Input
          autocomplete="off"
          placeholder="Search images and photos"
          value={name}
          id={this.inputNameId}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

export default Form;
