import React, { Component } from 'react';
import axios from 'axios';
import './GetBitcoin.scss';
import BitcoinList from '../bitcoinList/Bitcoin'
//rodzica na bitcoinlist
class GetBitCoin extends Component {

    constructor(props) {
        super(props)
            this.state = {
                kurs: [],
                kursFiltr: [],
            }
    }
    getBitcoinData = () => {

        
        axios.get('https://blockchain.info/pl/ticker').then( res => {
            const axiosRes = res.data
            //zmieniam obiekt axiosRes na tablicę obiektNaTablice
            let staraWartosc = this.state.kurs
            let ObiektNaTablice = []
            ObiektNaTablice = Object.keys(axiosRes).map(klucz => {
                let obietPojedynczeWaluty = {}
                obietPojedynczeWaluty.kod = klucz
                obietPojedynczeWaluty.symbol = axiosRes[klucz].symbol
                obietPojedynczeWaluty.kurs = axiosRes[klucz].buy
                
                //lastObj roibmy, ktora wykonuje funkcje find na starej tablicy z obiektami (oldRates),  
                //czyli wyszukuje pojedyncze obiekty ktorego kod dla pojedynczego obiektu walut 
                //jest rowny z kodem lastobj \/ \/
                let lastObj = staraWartosc.find(lastObj => obietPojedynczeWaluty.kod === lastObj.kod)
                debugger
                
                if(lastObj === undefined || lastObj.kurs === obietPojedynczeWaluty.kurs){
                    obietPojedynczeWaluty.class = 'blue';
                    obietPojedynczeWaluty.strzala = String.fromCharCode(8596)
                } else if (lastObj.kurs < obietPojedynczeWaluty.kurs) {
                    obietPojedynczeWaluty.class = 'green';
                    obietPojedynczeWaluty.strzala = String.fromCharCode(8593)
                }
                else {
                    obietPojedynczeWaluty.class = 'red';
                    obietPojedynczeWaluty.strzala = String.fromCharCode(8595)
                }

                
                console.log("dupa:", staraWartosc)
           

                return obietPojedynczeWaluty
            })
            console.log(ObiektNaTablice)

            this.setState( {
                kurs: ObiektNaTablice
            })
            this.filterCryptoList()
        })

    }
    //odpalanie jak sie rodzi ponizej
    componentDidMount = () => {
        this.getBitcoinData()
        this.timer = setInterval(() => this.getBitcoinData(), 15000);
     
    }
    filterCryptoList = () => {
        console.log(this._inputFilter.value)
        let przefiltrowanyStateKurs = this.state.kurs
        let szukanaWartosc = this._inputFilter.value.toUpperCase().trim()

        przefiltrowanyStateKurs = przefiltrowanyStateKurs.filter(waluty => {
            return (waluty.kod.search(szukanaWartosc) !== -1)
        })
        this.setState ({
            kursFiltr: przefiltrowanyStateKurs
        })
    }
    render(){
        return (
            <div>
                <input
                ref= { (data) => {this._inputFilter = data; } }
                placeholder="Filter"
                onChange={this.filterCryptoList}
                id="filter"/>
                <BitcoinList obrobionaListaProps={this.state.kursFiltr}/>
            </div>
        )
    }
}

export default GetBitCoin