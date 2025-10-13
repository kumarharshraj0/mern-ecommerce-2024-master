import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin-view/layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AdminContactMessages = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://mern-ecommerce-backend-by-me.onrender.com/api/admin/contact', {
          withCredentials: true,
        });
        setMessages(response.data.messages);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchMessages();
    } else {
      setLoading(false);
      setError('User not authenticated.');
    }
  }, [isAuthenticated]);

  if (authLoading) {
    return <div className="p-6">Checking authentication...</div>;
  }

  if (loading) {
    return <div className="p-6">Loading messages...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
        {messages.length === 0 ? (
          <p>No contact messages found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message._id}>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.message}</TableCell>
                  <TableCell>{new Date(message.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    
  );
};

export default AdminContactMessages;
