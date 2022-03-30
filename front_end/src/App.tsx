import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChainId, DAppProvider } from "@usedapp/core"
import Container from '@mui/material/Container';
import { Main } from "./components/Main"

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan],
      notifications: {
        expirationPeriod: 500,
        checkInterval: 500
      }
    }}>

    <Container maxWidth="md">
        <Main />
    </Container>
    </DAppProvider>
  );
}

export default App;
