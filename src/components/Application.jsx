import React, { Component } from 'react';
import Posts from './Posts';
import { collectIdsAndDocs } from '../utils';
import Authentication from './Authentication'
import { firestore, auth, createUserProfileDocument } from '../firebase';

class Application extends Component {
  render() {
    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication />
        <Posts />
      </main>
    );
  }
}

export default Application;
