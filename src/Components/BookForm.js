import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const BookForm = ({ onSubmit, bookToEdit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
    }
  }, [bookToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: bookToEdit ? bookToEdit.id : Date.now(), title, author });
    setTitle('');
    setAuthor('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Author"
        variant="outlined"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        {bookToEdit ? 'Update Book' : 'Add Book'}
      </Button>
    </Box>
  );
};

export default BookForm;
