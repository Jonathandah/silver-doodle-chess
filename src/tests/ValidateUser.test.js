import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../views/login/Login';
import Register from '../views/register/Register';
import validateUser from '../Global/functions/validateUser/validateUser';
Enzyme.configure({ adapter: new Adapter() });

const expect = require('chai').expect;

describe('Test Login and Register component', () => {
  it('Renders Login without crashing', () => {
    shallow(<Login />);
  });
  it('Renders Register without crashing', () => {
    shallow(<Register />);
  });

  it('ValidateUser should handle names shorter than 4 characters and password shorter than 6 characters ', () => {
    expect(
      Object.keys(validateUser({ username: 'jo', password: 'no' })).length
    ).to.equal(2);
    // expect(wrapperLogin.find('.Search').exists()).to.equal(true);
  });

  it('Correct length on all the values should return empty object', () => {
    expect(
      Object.keys(
        validateUser({ username: 'jonathan', password: '12342414hej' })
      ).length == 0
    ).to.be.true;
    // expect(wrapperLogin.find('.Search').exists()).to.equal(true);
  });
});
