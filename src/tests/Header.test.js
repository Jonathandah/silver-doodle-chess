import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter as Router } from 'react-router-dom';
import Header from '../global/components/header/Header';

Enzyme.configure({ adapter: new Adapter() });

const expect = require('chai').expect;

describe('Test Header components renders ', () => {
    it('Renders without crashing', () => {
        shallow(<Header />);
    });
});

describe('Test header in app', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Router><Header /></Router>);

    });
    it('Create game button should open popup', () => {
        wrapper.find(".Header__nav__button--createGame").simulate("click")
        expect(wrapper.find(".PopUp")).to.have.lengthOf(1);
    });


    it('Close button should close popup', () => {
        wrapper.find(".Header__nav__button--createGame").simulate("click")
        expect(wrapper.find(".PopUp")).to.have.lengthOf(1);
        expect(wrapper.find(".PopUp__section__nav__button").at(0)).to.have.lengthOf(1);
        wrapper.find(".PopUp__section__nav__button").at(1).simulate("click")
        expect(wrapper.find(".PopUp")).to.have.lengthOf(0);
    });



});

