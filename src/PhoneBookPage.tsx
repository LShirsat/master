import * as React from 'react';
import PhoneBookComponent from './PhoneBookComponent'
import Header from './Header'

export class PhoneBookPage extends React.Component {

    render() {
        return (
            <div>
                <div style={{ backgroundColor: 'lightgray'}}>
                    <Header />
                </div>
                <div style={{ height: '40px' }}>
                </div>
                <div>
                    <PhoneBookComponent />
                </div>
            </div>
        )
    }
}

export default PhoneBookPage;