import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import Form from './components/Form';
import Section from './components/Section';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    searchImage: '',
  };

  handleSubmitForm = formdata => {
    this.setState({
      searchImage: formdata.name,
    });
  };

  render() {
    return (
      <>
        <Searchbar>
          <Form Submit={this.handleSubmitForm} />
        </Searchbar>
        <ToastContainer autoClose={3000} />
        <Section>
          <ImageGallery searchImage={this.state.searchImage} />
        </Section>
      </>
    );
  }
}

export default App;
