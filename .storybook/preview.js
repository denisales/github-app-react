import { configure } from '@storybook/react';

 const req = require.context('../src/components', true, /\.stories\.js$/);

const loaderFn = () => {
    // dynamic loading, unavailable in react-native
   
    req.keys().forEach(fname => req(fname));
    // require('../src/components/actions/actions.story')
  };
  
configure(loaderFn, module);
  