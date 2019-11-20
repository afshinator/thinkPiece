import React, { Component } from 'react';
import Posts from './Posts';
import { collectIdsAndDocs } from '../utils';
import Authentication from './Authentication'
import { firestore, auth, createUserProfileDocument } from '../firebase';

class Application extends Component {
  state = {
    user: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log('unsubscribeFromAuth, userAuth ', userAuth)
      const user = await createUserProfileDocument(userAuth)
      console.log('unsubFromAuth ', user)
      this.setState({ user })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }


  render() {
    const { user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts />
      </main>
    );
  }
}

export default Application;
