import React, { Component } from 'react';
import './Bitcoin.scss';
import { ListGroup} from 'react-bootstrap';
//dieczko dla getbitcoin
class BitcoinList extends Component {

    createList = (bitcoin) => {
        
        
        return <ListGroup.Item key={bitcoin.kod}> <span className="zakup">Ostatnie notowanie {bitcoin.kurs} </span> 
                <span className="kod">{bitcoin.kod} </span> 
                <span className="symbol">{bitcoin.symbol} </span>
                <span className={bitcoin.class}> {bitcoin.strzala}</span>
                 </ListGroup.Item>
    } 
            //kursydowsyswieltnia = odbieram propsa od rodzica mapuje go i tworze liste
    render () {
        let kursyDowWswietlenia = this.props.obrobionaListaProps.map(this.createList)
        console.log(this.props.obrobionaListaProps)
        return (
            <div className='main-list'>
                <ListGroup>
                 {kursyDowWswietlenia} 
                </ListGroup>
            </div>
        )
    }
}


export default BitcoinList