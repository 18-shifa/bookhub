import React, { useState } from 'react';
import UserForm from './UserForm';
import CatalogManagement from './CatalogManagement';
import { TextField, List, ListItem, ListItemText,IconButton, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore, Edit, Delete} from '@mui/icons-material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState(''); // Separate state for user search
  const [globalBookSearchQuery, setGlobalBookSearchQuery] = useState(''); // Separate state for global book search
  const [userToEdit, setUserToEdit] = useState(null);

  const addUser = (user) => {
    setUsers([...users, { ...user, catalog: [] }]);
  };

  const updateUser = (userId, updatedInfo) => {
    setUsers(users.map(user => user.id === userId ? { ...user, ...updatedInfo } : user));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const searchUsers = () => {
    return users.filter(user => user.name.toLowerCase().includes(userSearchQuery.toLowerCase()));
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const handleGlobalBookSearch = (query) => {
    setGlobalBookSearchQuery(query);
  };

  const handleSubmit = (user) => {
    if (userToEdit) {
      updateUser(user.id, user);
    } else {
      addUser(user);
    }
    setUserToEdit(null);
  };

  const searchBooksInUsers = () => {
    // Filter books across all users
    let matchedBooks = [];
    users.forEach(user => {
      matchedBooks = matchedBooks.concat(user.catalog.filter(book =>
        book.title.toLowerCase().includes(globalBookSearchQuery.toLowerCase())
      ));
    });
    return matchedBooks;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <UserForm onSubmit={handleSubmit} userToEdit={userToEdit} />
      <TextField
        label="Search Users"
        variant="outlined"
        value={userSearchQuery}
        onChange={(e) => setUserSearchQuery(e.target.value)} // Update user search query
        fullWidth
        sx={{ mt: 2 }}
      />
      <List>
        {searchUsers().map(user => (
          <ListItem key={user.id}>
            <Accordion sx={{ width: '100%' }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <ListItemText primary={user.name} />
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="subtitle1">Actions:</Typography>
                  <Box>
                    <IconButton onClick={() => handleEdit(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteUser(user.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                <CatalogManagement user={user} setUsers={setUsers} />
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>

      {/* Global Book Search */}
      <Typography variant="h6" sx={{ mt: 4 }}>Global Book Search</Typography>
      <TextField
        label="Search Books"
        variant="outlined"
        value={globalBookSearchQuery}
        onChange={(e) => handleGlobalBookSearch(e.target.value)} // Update global book search query
        fullWidth
        sx={{ mt: 2 }}
      />
      <List>
        {searchBooksInUsers().map(book => (
          <ListItem key={book.id}>
            <ListItemText primary={book.title} secondary={book.author} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserManagement;
