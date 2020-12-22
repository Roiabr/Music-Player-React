import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMusic} from "@fortawesome/free-solid-svg-icons"

const Nav = ({ setLibraryState, libraryState}) => {
    return(
        <nav>
            <h1>Waves</h1>
            <button onClick={() => setLibraryState(!libraryState)}>
                Library
                <FontAwesomeIcon icon={faMusic} ></FontAwesomeIcon>
            </button>
        </nav>


    );
}
export default Nav;