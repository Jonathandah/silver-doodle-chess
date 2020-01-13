import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { MemoryRouter as Router } from 'react-router-dom';

import jest from 'jest-mock';
import mocked_data from '../Global/mocked/mocked_data';
const UserStore = require('../global/store/userStore')
import Home from '../views/home/Home';
import { BehaviorSubject } from 'rxjs';

Enzyme.configure({ adapter: new Adapter() });

const expect = require('chai').expect;

beforeEach(() => {
    axios.get = jest.fn(() => {
        // const url = axios.get.mock.calls[0][0]
        return new Promise((resolve, reject) => {
            resolve({ data: mocked_data });
        });
    });
    UserStore.user$ = new BehaviorSubject("test");

});

describe('Test Home components renders ', () => {
    it('Renders without crashing', () => {
        shallow(<Home />);
    });
});

describe('Render games in home component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Router><Home /></Router>);
    });
    it('Excpects 4 list elements', done => {
        //expect(localStorage.getItem.mock.calls.length).to.equal(1);
        expect(
            wrapper.update().find('.Home__container__list__item')
        ).to.have.lengthOf(4);


        done();
    });

    it('Should only see join button for avalible games', () => {
        expect(
            wrapper.update().find('.Home__container__list__item__button')
        ).to.have.lengthOf(2);
    });

});


describe("Try to join game", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Router><Home /></Router>);
    });
    it("Try joinig game should redirect to GameList component", () => {
        expect(wrapper.find(".Home__container__list__item__button")).to.have.length(2)
        let button = wrapper.find(".Home__container__list__item__button")
        button.at(0).simulate("click")
        expect(wrapper.update().find("GamesList")).to.have.length(1)
    })
})

