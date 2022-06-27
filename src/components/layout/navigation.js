import React from 'react'
import {Outlet, Link} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

class Navigation extends React.Component {
    render() {
        return (
            <>
                <nav>
                    <ul>
                        <li key={0}><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                        <li key={1}><Link to="/order"><FontAwesomeIcon icon={faBurger} /> Nuovo ordine</Link></li>
                        <li key={2}><Link to="/order-search"><FontAwesomeIcon icon={faBurger} /> Cerca ordine</Link></li>
                        <li key={3}><Link to="/auth">Area Personale Autorizzato <FontAwesomeIcon icon={faUser} /></Link></li>
                    </ul>
                </nav>

                <Outlet />
            </>
        );
    }
}

export default Navigation;