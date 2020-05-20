import React, {Component} from 'react';
import axios from "axios";

class QuantityConversion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unitType: ['Length'],
            units: ['Inch', 'Feet', 'Yard', 'Centimeter'],
            selectedUnitType: '',
            inputValue: 0,
            inputUnit: 'Inch',
            outputUnit: 'Inch',
            outputValue: 0
        };
        this.changeUnitType = this.changeUnitType.bind(this);
    }

    componentDidMount() {
        this.setState({
            unitType: [
                {name: 'Length', units: ['Inch', 'Feet', 'Yard', 'Centimeter']},
                {name: 'Weight', units: ['Kilogram', 'Gram', 'Tonne']},
                {name: 'Volume', units: ['Litre', 'Gallon', 'Millilitre']},
                {name: 'Temperature', units: ['Celsius', 'Fahrenheit']},
            ]
        });
    }

    changeInputUnit(event) {
        this.setState({inputUnit: event.target.value});
    }

    changeOutputUnit(event) {
        this.setState({outputUnit: event.target.value});
    }

    setInput(event) {
        this.setState({inputValue: event.target.value})
    }

    changeUnitType(event) {
        this.setState({selectedUnitType: event.target.value});
        this.setState({units: this.state.unitType.find(unitType => unitType.name === event.target.value).units});
    }


    getConversion() {
        axios.get("http://localhost:8080/quantitycontroller/getconcersion/" + this.state.inputUnit + "/" + this.state.outputUnit + "/" + this.state.inputValue)
            .then(response => {
                this.setState({outputValue:response.data})
            })
            .catch(error => {
                alert("Please enter proper value")
            })
    }

    render() {
        return (
            <div className='box'>
                <h2>Unit Conversion</h2>
                <div className="form">
                    <select value={this.state.selectedUnitType} onChange={this.changeUnitType}>
                        {this.state.unitType.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
                    </select>
                </div>
                <br/>
                <div className="form">
                    <input type={"number"} value={this.state.inputValue} onChange={this.setInput.bind(this)}></input>
                    <br/>
                    <select value={this.state.inputUnit} onChange={this.changeInputUnit.bind(this)}>
                        {this.state.units.map((e, key) => {
                            return <option key={key}>{e}</option>;
                        })}
                    </select>
                </div>
                <h2 className="form">=</h2>
                <div className="form">
                    <input type={"number"} value={this.state.outputValue}></input><br/>
                    <select value={this.state.outputUnit} onChange={this.changeOutputUnit.bind(this)}>
                        {this.state.units.map((e, key) => {
                            return <option key={key}>{e}</option>;
                        })}
                    </select>
                </div>

                <div>
                    <button className='form' onClick={this.getConversion.bind(this)}>Convert</button>
                </div>
            </div>

        )
    }

}

export default QuantityConversion;

