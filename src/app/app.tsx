import { LiveGrid } from '@modules/live-grid';
import React, { FormEvent, useCallback, useState } from 'react';
import './app.scss';
import logo from './logo.svg';

const env = process.env.NODE_ENV?.toUpperCase();

export function App() {
    const [size, setSize] = useState(5);

    const onSizeChange = useCallback((e: FormEvent<HTMLInputElement>) => {
        setSize(parseInt(e.currentTarget.value, 10));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {env}
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <input type="number" value={size} onChange={onSizeChange} />
                <LiveGrid size={size} />
            </header>
        </div>
    );
}
