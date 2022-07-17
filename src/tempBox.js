import React from 'react';

const tempBox = (props) => {
    return(
        <div className='temp'>
            <h1 className='tempLabel'> {props.tempLabel} </h1>
            <h2 className='temperature'> {Math.round(props.temp)}°C </h2>
        </div>
    );
}

export default tempBox;