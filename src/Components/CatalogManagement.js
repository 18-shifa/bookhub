import React, { useState, useEffect } from 'react';
import BookForm from './BookForm';
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const CatalogManagement = ({ user, setUsers }) => {
  const [books, setBooks] = useState(user.catalog);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    const updatedUsers = prevUsers => prevUsers.map(u => u.id === user.id ? { ...u, catalog: books } : u);
    setUsers(updatedUsers);
  }, [books, user.id, setUsers]);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const updateBook = (bookId, updatedInfo) => {
    setBooks(books.map(book => book.id === bookId ? { ...book, ...updatedInfo } : book));
  };

  const deleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const searchBooks = () => {
    return books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const handleEdit = (book) => {
    setBookToEdit(book);
  };

  const handleSubmit = (book) => {
    if (bookToEdit) {
      updateBook(book.id, book);
    } else {
      addBook(book);
    }
    setBookToEdit(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Catalog for {user.name}</Typography>
      <BookForm onSubmit={handleSubmit} bookToEdit={bookToEdit} />
      <TextField
        label="Search Books"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <List>
        {searchBooks().map(book => (
          <ListItem key={book.id}>
            <ListItemText primary={book.title} secondary={book.author} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEdit(book)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => deleteBook(book.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CatalogManagement;
