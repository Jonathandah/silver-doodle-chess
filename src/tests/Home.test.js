import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../views/home/Home';
import axios from 'axios';

import jest from "jest-mock"
import mocked_data from "../global/mocked/mocked_data"

axios.get = jest.fn(() => {
    // const url = axios.get.mock.calls[0][0]
    return new Promise((resolve, reject) => {
        resolve({ data: mocked_data })
    })
})

// Make sure to resolve with a promise

Enzyme.configure({ adapter: new Adapter() });

const expect = require('chai').expect;

beforeEach(() => {

})
describe('Test Home components renders ', () => {
    it('Renders without crashing', () => {
        shallow(<Home />);
    });
});

describe("Render games in home component", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Home />)
    })
    it("send in correct data", (done) => {
        expect(wrapper.update().find(".Home__container__list__item")).to.have.lengthOf(4)
        done();
        // axios.get.mockImplementation(() => Promise.resolve({ mocked_data }))

    })


    it("send in bad data", () => {


        // axios.get = jest.fn(() => {
        //     // const url = axios.get.mock.calls[0][0]
        //     return new Promise((resolve, reject) => {
        //         resolve({ data: "hehejahbjbh" })
        //     })
        // })

        console.log(wrapper.find(".Home__container__list__item").length)

    })


})



// describe("Test Logout button", () => {
//     it("Pressing on logout should redirecgt to logout page", () => {
//         const wrapper = mount(<Login />)

//         wrapper.find(".Home__nav__logout").simulate("click")
//         wrapper.debug()
//     })
// })

describe('Test Pop up in Home component ', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Home />)
    })
    it('Opening popup through join button', (done) => {
        expect(wrapper.update().find(".Home__container__list")).to.have.lengthOf(1)
        expect(wrapper.find(".Home__container__list__item")).to.have.lengthOf(4)

        expect(wrapper.find(".Home__container__list__item__button")).to.have.lengthOf(2)

        wrapper.find(".Home__container__list__item__button").at(0).simulate("click")

        expect(wrapper.find(".PopUp")).to.have.length(1)

        expect(wrapper.find(".PopUp__section__nav__button").at(0).text()).to.equal("Join")
        done();
    });

    it('Closing popup when pressed on cancle', () => {

        wrapper.update().find(".Home__container__list__item__button").at(0).simulate("click")

        expect(wrapper.find(".PopUp")).to.have.length(1)


        wrapper.find(".PopUp__section__nav__button").at(1).simulate("click")

        expect(wrapper.find(".PopUp")).to.have.length(0)


    });

    it('Clicking on create game should open popup for creating a new game', () => {
        wrapper.update().find(".Home__nav__create").at(0).simulate("click")

        expect(wrapper.find(".PopUp")).to.have.length(1)


        expect(wrapper.find(".PopUp__section__nav__button").at(0).text()).to.equal("Create Game")


    });

});
