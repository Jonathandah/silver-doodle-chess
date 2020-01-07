import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../views/home/Home';
import axios from 'axios';

import jest from 'jest-mock';
import mocked_data from '../Global/mocked/mocked_data';

// Make sure to resolve with a promise

Enzyme.configure({ adapter: new Adapter() });

const expect = require('chai').expect;

beforeEach(() => {
    axios.get = jest.fn(() => {
        // const url = axios.get.mock.calls[0][0]
        return new Promise((resolve, reject) => {
            resolve({ data: mocked_data });
        });
    });
});

describe('Test Home components renders ', () => {
    it('Renders without crashing', () => {
        shallow(<Home />);
    });
});

describe('Render games in home component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Home />);
    });
    it('Excpects 4 list elements', done => {
        expect(
            wrapper.update().find('.Home__container__list__item')
        ).to.have.lengthOf(4);

        done();
    });

    it('Should only se join button for avalible games', () => {
        expect(
            wrapper.update().find('.Home__container__list__item__button')
        ).to.have.lengthOf(2);
    });
});

// describe("Test Logout button", () => {
//     it("Pressing on logout should redirecgt to logout page", () => {
//         const wrapper = mount(<Login />)

//         wrapper.find(".Home__nav__logout").simulate("click")
//         wrapper.debug()
//     })
// })

// describe('Test filter between my and all games', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = mount(<Home />);
//     axios.get = jest.fn(() => {
//       const url = axios.get.mock.calls[0][0];
//       console.log('my url', url);
//       return new Promise((resolve, reject) => {
//         resolve({
//           data: {
//             header: { Black: 'Jonathan', White: 'Joanna', Date: '2019-01-02' },
//             board: '4',
//             owner: 'Jonathan'
//           }
//         });
//       });
//     });
//   });

//   it('Show only my games', () => {
//     expect(
//       wrapper
//         .update()
//         .find('.Home__container__nav__tab')
//         .at(0)
//         .text()
//     ).to.equal('My Games');

//     wrapper
//       .find('.Home__container__nav__tab')
//       .at(0)
//       .simulate('click');
//     wrapper.update();

//     expect(wrapper.find('.Home__container__list__item')).to.have.lengthOf(1);
//   });
// });

describe('Test Pop up in Home component ', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Home />);
    });
    it('Opening popup through join button', done => {
        expect(wrapper.update().find('.Home__container__list')).to.have.lengthOf(1);
        expect(wrapper.find('.Home__container__list__item')).to.have.lengthOf(4);

        expect(
            wrapper.find('.Home__container__list__item__button')
        ).to.have.lengthOf(2);

        wrapper
            .find('.Home__container__list__item__button')
            .at(0)
            .simulate('click');

        expect(wrapper.find('.PopUp')).to.have.length(1);

        expect(
            wrapper
                .find('.PopUp__section__nav__button')
                .at(0)
                .text()
        ).to.equal('Join');
        done();
    });

    it('Closing popup when pressed on cancle', () => {
        wrapper
            .update()
            .find('.Home__container__list__item__button')
            .at(0)
            .simulate('click');

        expect(wrapper.find('.PopUp')).to.have.length(1);

        wrapper
            .find('.PopUp__section__nav__button')
            .at(1)
            .simulate('click');

        expect(wrapper.find('.PopUp')).to.have.length(0);
    });

    it('Clicking on create game should open popup for creating a new game', () => {
        wrapper
            .update()
            .find('.Home__nav__create')
            .at(0)
            .simulate('click');

        expect(wrapper.find('.PopUp')).to.have.length(1);

        expect(
            wrapper
                .find('.PopUp__section__nav__button')
                .at(0)
                .text()
        ).to.equal('Create Game');
    });
});
