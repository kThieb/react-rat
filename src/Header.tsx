import React from 'react';

interface Props {

}

export const Header: React.FC<Props> = () => {
    return(    
        <div>
            <h2><a>React Rat!</a></h2>
            <nav>
                <ul>
                    <li><a>About</a></li>
                    <li><a>Contact Us</a></li>
                </ul>
            </nav>
        </div>
    );
}