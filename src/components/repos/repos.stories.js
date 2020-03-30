import React from 'react';
import { storiesOf } from '@storybook/react';
import Repos from './index'


const stories = storiesOf('Repos', module)

stories.add('with title prop', () => (
  <Repos title="Favoritos" />
));
stories.add('with repos', () => (
  <Repos title="Favoritos" className='starred' repos={
    [
      {link: '#', name: 'Site Denis'},
      {link: '#', name: 'Blog Denis'}
    ]
  }/>
));