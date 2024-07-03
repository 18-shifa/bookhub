import React from 'react';
import './App.css'; 
import UserManagement from './Components/UserManagement';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container className="container">
      <Typography variant="h2" className="book-hub-heading">Book Hub</Typography>
      <UserManagement />
    </Container>
  );
}

export default App;
