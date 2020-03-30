import React from 'react';
import { storiesOf } from '@storybook/react';
import Pagination from './index'


const stories = storiesOf('Pagination', module)

stories.add('Sem props', () => (
    <Pagination />
));
stories.add('Com total e activePage', () => (
    <Pagination total={10} activePage={5} />
));
stories.add('Com page link', () => (
    <Pagination
        total={10}
        activePage={1}
        pageLink={'https://google.com/page/%page%'}
    />
));
stories.add('Com callback', () => (
    <Pagination
        total={15}
        activePage={7}
        pageLink={'https://google.com/page/%page%'}
        onClick={(page) => {
            window.alert(page)
        }}
    />
));