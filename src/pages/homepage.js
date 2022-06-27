import React from "react";
import {Link} from "react-router-dom";
import {faBurger, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Homepage extends React.Component {
    render() {
        return (
            <main>
                <h2>Home Page</h2>
                <p>Benvenuto nella pagina principale di Fast Food Manager, la web app gestionale per ristoranti e fast food.</p>
                <p>Esplora le principali funzionalità e comincia ad utilizzarla!</p>
                <h3>Funzionalità</h3>
                <ul id="features">
                    <li>
                        <h4>Invio di ordini</h4>
                        <p>Invia ordini in maniera semplice ed intuitiva, gli chef collegati saranno automaticamente notificati dell'arrivo dell'ordine</p>
                        <Link to={'/order'} ><button><FontAwesomeIcon icon={faBurger} /> Nuovo ordine</button></Link>
                    </li>
                    <li>
                        <h4>Aggiornamenti live sullo stato dell'ordine</h4>
                        <p>Ricerca il tuo ordine tramite il numero d'ordine ricevuto al pagamento e sai in tempo reale quando viene preso in carico e quando è pronto</p>
                        <Link to={'/order-search'} ><button><FontAwesomeIcon icon={faSearch} /> Cerca ordine</button></Link>
                    </li>
                    <li>
                        <h4>Per gli amministratori</h4>
                        <p>Gestisci in maniera intuitiva il menu e visualizza lo storico di tutte le transazioni facilmente</p>
                        <Link to={'/auth'} ><button><FontAwesomeIcon icon={faUser} /> Accedi</button></Link>
                    </li>
                    <li>
                        <h4>Per i cuochi</h4>
                        <p>Ricevi in tempo reale le nuove ordinazioni effettuate, prendile in carico e segnalale come pronte in un click</p>
                        <Link to={'/auth'} ><button><FontAwesomeIcon icon={faUser} /> Accedi</button></Link>
                    </li>
                </ul>
            </main>
        );
    }
}

export default Homepage;