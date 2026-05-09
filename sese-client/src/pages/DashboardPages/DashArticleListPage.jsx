import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
  FormControl,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FilePlus, FileText, Pencil, Trash2, X } from 'lucide-react';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../services/ArticleService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DashArticleListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editArticleId, setEditArticleId] = useState(null); // Track the article being edited
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArticle, setNewArticle] = useState({
    no: '',
    title: '',
    type: '',
    desc: '',
    stack: '',
    img: '',
  });

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles || []); // Handle potentially undefined array
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false); // Reset to "Add" mode

    // Auto-generate the next 'no'
    let nextNo = '01';
    if (articles && articles.length > 0) {
      const currentNos = articles.map(a => parseInt(a.no, 10)).filter(n => !isNaN(n));
      const maxNo = currentNos.length > 0 ? Math.max(...currentNos) : 0;
      nextNo = String(maxNo + 1).padStart(2, '0');
    }

    setNewArticle({
      no: nextNo,
      title: '',
      type: '',
      desc: '',
      stack: '',
      img: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    if (articleToEdit) {
      setNewArticle({ ...articleToEdit });
      setEditArticleId(id); // Track the article being edited
      setIsEditing(true); // Switch to "Edit" mode
      setOpen(true); // Open the modal
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id);
        loadArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  }

  const handleSaveArticle = async () => {
    try {
      if (isEditing) {
        // Update article
        await updateArticle(editArticleId, newArticle);
      } else {
        // Add new article
        await createArticle(newArticle);
      }
      loadArticles(); // Reload articles
      handleClose(); // Close modal
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  return (
    <>
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#71717a', marginBottom: 6 }}>
            §04 — Content
          </p>
          <h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#0a0a0a', margin: 0 }}>
            Articles
          </h1>
        </div>
        <button
          onClick={handleOpen}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            backgroundColor: '#0a0a0a', color: '#fff',
            border: 'none', padding: '10px 20px',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.3em',
            textTransform: 'uppercase', cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3f3f46'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0a0a0a'}
        >
          <FilePlus size={15} />
          Add Article
        </button>
      </div>

      {/* Modal for Add/Edit Article */}
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: '#0a0a0a' }}>
              {isEditing ? 'Edit Article' : 'New Article'}
            </Typography>
            <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a' }}>
              <X size={20} />
            </button>
          </Stack>

          {/* Form fields */}
          {[
            { label: 'Article No. (Auto-generated)', key: 'no', disabled: true },
            { label: 'Title', key: 'title' },
            { label: 'Type (e.g. Web Development)', key: 'type' },
            { label: 'Stack (e.g. React, Node.js)', key: 'stack' },
            { label: 'Image URL', key: 'img' },
            { label: 'Description', key: 'desc', isMultiline: true },
          ].map(({ label, key, disabled, isMultiline }) => (
            <Box key={key} sx={{ mb: 2 }}>
              <label style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 4 }}>
                {label}
              </label>
              {isMultiline ? (
                <textarea
                  value={newArticle[key]}
                  onChange={(e) => setNewArticle({ ...newArticle, [key]: e.target.value })}
                  rows={3}
                  disabled={disabled}
                  style={{
                    width: '100%', padding: '8px 12px',
                    border: '1.5px solid #d4d4d8', background: disabled ? '#f4f4f5' : '#fff',
                    fontSize: 13, color: disabled ? '#a1a1aa' : '#0a0a0a',
                    outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'inherit', resize: 'vertical',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => !disabled && (e.target.style.borderColor = '#0a0a0a')}
                  onBlur={e => !disabled && (e.target.style.borderColor = '#d4d4d8')}
                />
              ) : (
                <input
                  type="text"
                  value={newArticle[key]}
                  onChange={(e) => setNewArticle({ ...newArticle, [key]: e.target.value })}
                  disabled={disabled}
                  style={{
                    width: '100%', padding: '8px 12px',
                    border: '1.5px solid #d4d4d8', background: disabled ? '#f4f4f5' : '#fff',
                    fontSize: 13, color: disabled ? '#a1a1aa' : '#0a0a0a',
                    outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => !disabled && (e.target.style.borderColor = '#0a0a0a')}
                  onBlur={e => !disabled && (e.target.style.borderColor = '#d4d4d8')}
                />
              )}
            </Box>
          ))}

          <Stack direction="row" gap={2} sx={{ mt: 3 }}>
            <button
              onClick={handleClose}
              style={{ flex: 1, padding: '10px', border: '1.5px solid #0a0a0a', background: 'transparent', fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', color: '#0a0a0a' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveArticle}
              style={{ flex: 1, padding: '10px', border: '1.5px solid #0a0a0a', background: '#0a0a0a', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3f3f46'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0a0a0a'}
            >
              {isEditing ? 'Save Changes' : 'Add Article'}
            </button>
          </Stack>
        </Box>
      </Modal>

      {/* ── Table ─────────────────────────────────────────────────── */}
      <div style={{ border: '2px solid #0a0a0a', overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 1.5fr 1fr 1.5fr 2fr 1fr',
          backgroundColor: '#0a0a0a',
          padding: '10px 20px',
        }}>
          {['No.', 'Title', 'Type', 'Stack', 'Description', 'Actions'].map(h => (
            <span key={h} style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9a9a9a' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Body */}
        {loading ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#71717a', fontSize: 12, letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' }}>
            Loading articles…
          </div>
        ) : articles.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#71717a', fontSize: 12, letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' }}>
            No records found.
          </div>
        ) : articles.map((a, i) => (
          <div
            key={a._id}
            style={{
              display: 'grid',
              gridTemplateColumns: '0.5fr 1.5fr 1fr 1.5fr 2fr 1fr',
              padding: '14px 20px',
              borderTop: '1px solid #e4e4e7',
              alignItems: 'center',
              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f4f5'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#fff' : '#fafafa'}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0a0a0a' }}>{a.no}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>{a.title}</span>
            <span style={{ fontSize: 12, color: '#52525b' }}>{a.type}</span>
            <span style={{ fontSize: 11, color: '#52525b', wordBreak: 'break-all' }}>{a.stack}</span>
            <span style={{ fontSize: 11, color: '#52525b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.desc}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => handleEdit(a._id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  backgroundColor: 'transparent', border: '1.5px solid #0a0a0a',
                  padding: '4px 12px', fontSize: 9, fontWeight: 800,
                  letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer',
                  color: '#0a0a0a', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0a0a0a'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0a0a0a'; }}
              >
                <Pencil size={11} /> Edit
              </button>
              <button
                onClick={() => handleDelete(a._id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  backgroundColor: 'transparent', border: '1.5px solid #0a0a0a',
                  padding: '4px 12px', fontSize: 9, fontWeight: 800,
                  letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer',
                  color: '#0a0a0a', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0a0a0a'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0a0a0a'; }}
                title="Delete"
              >
                <Trash2 size={11} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row count ─────────────────────────────────────────────── */}
      <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9a9a9a' }}>
          {articles.length} record{articles.length !== 1 ? 's' : ''}
        </span>
      </div>
    </>
  );
};

export default DashArticleListPage;
