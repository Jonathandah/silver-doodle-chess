import React from 'react';

const Create = ({ label, radio }) => {
    return (
        <form>
            <label {...label('color', 'white')}>White</label>
            <input {...radio('color', 'White')} />

            <label {...label('color', 'Black')}>Black</label>
            <input {...radio('color', 'Black')} />
        </form>
    );
};

export default Create;