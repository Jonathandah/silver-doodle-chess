import React from 'react';
import "./PopUp.sass"
import axios from "axios"
import { useFormState } from 'react-use-form-state';
const PopUp = ({ info, updateShowPopUp }) => {
    const [formState, { radio, label }] = useFormState();

    console.log(info)

    function doRequest(e) {

        if (e.target.value == "Join") {
            axios.post("/")

        } else {
            axios.post("/")
            console.log(formState.values)
        }


    }


    return (
        <div className="PopUp">
            <section className="PopUp__section">
                <div className="PopUp__section__container">
                    {info.join ?
                        <>
                            <p className="PopUp__section__container__info">
                                Owner: {info.join.owner}
                            </p>
                            <p className="PopUp__section__container__info">
                                Board: {info.join.board}
                            </p>
                            <p className="PopUp__section__container__info">
                                White: {info.join.header.White}
                            </p>
                            <p className="PopUp__section__container__info">
                                Black: {info.join.header.Black}
                            </p>
                            <p className="PopUp__section__container__info">
                                Date: {info.join.header.Date}
                            </p>
                        </>
                        :

                        <form>
                            <label {...label('color', "white")}>White</label>
                            <input {...radio('color', 'White')} />

                            <label {...label('color', 'Black')}>Black</label>
                            <input {...radio('color', 'Black')} />


                        </form>



                    }
                </div>

                <nav className="PopUp__section__nav">
                    <button className="PopUp__section__nav__button" value={info.join ? "Join" : "Create Game"} onClick={(e) => doRequest(e)}>{info.join ? "Join" : "Create Game"}</button>
                    <button className="PopUp__section__nav__button" onClick={() => updateShowPopUp({ join: false, create: false })}>Cancel</button>
                </nav>
            </section>
        </div>
    );

};

export default PopUp;