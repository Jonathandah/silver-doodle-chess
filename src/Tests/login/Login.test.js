import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../../views/login/Login';
import validateUser from '../../Global/functions/validateUser/validateUser';
Enzyme.configure({ adapter: new Adapter() });

const expect = require('chai').expect;

describe('Test login component', () => {
  it('Renders without crashing', () => {
    shallow(<Login />);
  });

  it('Username input should handle names shorter than 4 characters ', () => {
    const wrapperLogin = shallow(<Login />);
    console.log(validateUser({ username: 'jo', password: 'no' }));
    // expect(wrapperLogin.find('.Search').exists()).to.equal(true);
  });
});
