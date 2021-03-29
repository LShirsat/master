
import { initializeIcons } from "@fluentui/react";
import './App.css';
import PhoneBookPage from './PhoneBookPage';

function App() {
    
    initializeIcons();
    
    return (
        <div>
            <PhoneBookPage />
        </div>
    );
}

export default App;