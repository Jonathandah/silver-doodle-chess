import React from 'react';

const Create = ({ label, radio }) => {
    return (
        <form>
            <i className="far fa-square white__player"></i><label {...label('color', 'white')} className='PopUp__choose__white'>White</label>
            <input {...radio('color', 'White')} />
            <br />
            <i className="fas fa-square black__player"></i><label {...label('color', 'Black')}  className='PopUp__choose__white'>Black</label>
            <input {...radio('color', 'Black')} />
        </form>
    );
};

export default Create;