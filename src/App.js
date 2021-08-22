import { useState } from 'react';
import Table from './components/Table';

const App = () => {
    const [state, setState] = useState({ numberList: [0] });
    const onClick = () => {
        // not ok
        // state.numberList.push(1);
        // setState(state);

        // ok
        const { numberList } = state;
        numberList.push(1);
        setState({ numberList });
    }
    return (
        <>
            <h1>length = {state.numberList.length}</h1>
            <button onClick={onClick}>Set State</button>
            <Table />
        </>
    )
}

/*class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numberList: []
        };
    }

    onClick() {
        const { numberList } = this.state;
        numberList.push(1);
        this.setState({ numberList });
    }

    render() {
        const { numberList } = this.state;
        return (
            <>
                <h1>length = {numberList.length}</h1>
                <button onClick={() => this.onClick()}>Set State</button>
            </>
        )
    }
}*/

export default App;