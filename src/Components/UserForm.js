import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const UserForm = ({ onSubmit, userToEdit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
    }
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: userToEdit ? userToEdit.id : Date.now(), name });
    setName('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        {userToEdit ? 'Update User' : 'Add User'}
      </Button>
    </Box>
  );
};

export default UserForm;
