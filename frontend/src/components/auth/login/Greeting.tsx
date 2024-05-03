import React from 'react';

interface IGreeting {
    name: string
}

const Greeting = ({name}: IGreeting) => {
    return (
        <div>
            <h3>Hi {name}</h3>
        </div>
    );
};

export default Greeting;