import React, { useState, useEffect } from 'react';
import {
  Box, Button, Modal, Stack, Typography,
  FormControl, TextField, InputLabel, Select, MenuItem,
} from '@mui/material';
import { UserPlus, User, ChevronDown, X, Pencil, ToggleLeft, ToggleRight } from 'lucide-react';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

// ─── Design: Editorial Brutalism ─────────────────────────────────────
// Table reads like a structured journal register — no MUI DataGrid chrome,
// pure typographic hierarchy with role badges and binary status toggles.

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 640 },
  bgcolor: '#fafafa',
  border: '2px solid #0a0a0a',
  boxShadow: '8px 8px 0px #0a0a0a',
  p: 4,
};

const roleBadge = {
  admin:  { bg: '#0a0a0a', text: '#fff',     label: 'Admin' },
  editor: { bg: '#3f3f46', text: '#fff',     label: 'Editor' },
  viewer: { bg: '#e4e4e7', text: '#3f3f46',  label: 'Viewer' },
};

const RoleBadge = ({ type }) => {
  const s = roleBadge[type] || roleBadge.viewer;
  return (
    <span style={{
      backgroundColor: s.bg, color: s.text,
      fontSize: '9px', fontWeight: 800,
      letterSpacing: '0.25em', textTransform: 'uppercase',
      padding: '2px 8px', display: 'inline-block',
    }}>
      {s.label}
    </span>
  );
};

const StatusDot = ({ active }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: active ? '#16a34a' : '#dc2626',
  }}>
    <span style={{
      width: 7, height: 7, borderRadius: '50%',
      backgroundColor: active ? '#16a34a' : '#dc2626',
      display: 'inline-block',
    }} />
    {active ? 'Active' : 'Inactive'}
  </span>
);

const UsersPage = () => {
  const [open, setOpen]           = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const navigate = useNavigate();

  const emptyUser = {
    firstName: '', lastName: '', age: '', gender: '',
    contactNumber: '', email: '', username: '', password: '',
    address: '', type: 'editor', isActive: true,
  };
  const [newUser, setNewUser] = useState(emptyUser);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(data.users || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (localStorage.getItem('type') === 'editor') navigate('/dashboard');
    else loadUsers();
  }, [navigate]);

  const handleOpen = () => { setIsEditing(false); setNewUser(emptyUser); setOpen(true); };
  const handleClose = () => { setOpen(false); setIsEditing(false); setEditUserId(null); };

  const handleEdit = (id) => {
    const u = users.find(u => u._id === id);
    if (u) { setNewUser({ ...u, password: '' }); setEditUserId(id); setIsEditing(true); setOpen(true); }
  };

  const handleSaveUser = async () => {
    try {
      if (isEditing) {
        const payload = { ...newUser };
        if (!payload.password) delete payload.password;
        await updateUser(editUserId, payload);
      } else {
        await createUser(newUser);
      }
      loadUsers(); handleClose();
    } catch (e) { console.error(e); }
  };

  const handleToggleActive = async (id, isActive) => {
    try { await updateUser(id, { isActive: !isActive }); loadUsers(); }
    catch (e) { console.error(e); }
  };

  const field = (key) => ({
    value: newUser[key],
    onChange: (e) => setNewUser({ ...newUser, [key]: e.target.value }),
  });

  return (
    <>
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#71717a', marginBottom: 6 }}>
            §03 — Registry
          </p>
          <h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#0a0a0a', margin: 0 }}>
            Users
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
          <UserPlus size={15} />
          Add User
        </button>
      </div>

      {/* ── Table ─────────────────────────────────────────────────── */}
      <div style={{ border: '2px solid #0a0a0a', overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr 1fr 1fr 1.5fr 1fr 1.5fr',
          backgroundColor: '#0a0a0a',
          padding: '10px 20px',
        }}>
          {['Name', 'Age', 'Gender', 'Email', 'Role', 'Status', 'Contact', 'Address', 'Password', 'Actions'].map(h => (
            <span key={h} style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9a9a9a' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Body */}
        {loading ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#71717a', fontSize: 12, letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' }}>
            Loading registry…
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#71717a', fontSize: 12, letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' }}>
            No records found.
          </div>
        ) : users.map((u, i) => (
          <div
            key={u._id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr 1fr 1fr 1.5fr 1fr 1.5fr',
              padding: '14px 20px',
              borderTop: '1px solid #e4e4e7',
              alignItems: 'center',
              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f4f5'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#fff' : '#fafafa'}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>
              {u.firstName} {u.lastName}
            </span>
            <span style={{ fontSize: 12, color: '#52525b' }}>{u.age}</span>
            <span style={{ fontSize: 12, color: '#52525b', textTransform: 'capitalize' }}>{u.gender}</span>
            <span style={{ fontSize: 11, color: '#52525b', wordBreak: 'break-all' }}>{u.email}</span>
            <span><RoleBadge type={u.type} /></span>
            <span><StatusDot active={u.isActive} /></span>
            <span style={{ fontSize: 11, color: '#52525b' }}>{u.contactNumber}</span>
            <span style={{ fontSize: 11, color: '#52525b' }}>{u.address || '—'}</span>
            {/* Password column — masked for security */}
            <span style={{ fontSize: 13, color: '#a1a1aa', letterSpacing: '0.1em' }}>••••••••</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => handleEdit(u._id)}
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
                onClick={() => handleToggleActive(u._id, u.isActive)}
                title={u.isActive ? 'Deactivate' : 'Activate'}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: u.isActive ? '#16a34a' : '#dc2626',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {u.isActive ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row count ─────────────────────────────────────────────── */}
      <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9a9a9a' }}>
          {users.length} record{users.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Add / Edit Modal ──────────────────────────────────────── */}
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: '#0a0a0a' }}>
              {isEditing ? 'Edit Record' : 'New Record'}
            </Typography>
            <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a' }}>
              <X size={20} />
            </button>
          </Stack>

          {/* Label style */}
          {[
            { label: 'First Name',   key: 'firstName' },
            { label: 'Last Name',    key: 'lastName' },
            { label: 'Age',          key: 'age',           inputMode: 'numeric', pattern: '[0-9]*' },
            { label: 'Contact',      key: 'contactNumber', inputMode: 'tel',     pattern: '[0-9+]*' },
            { label: 'Email',        key: 'email' },
            { label: 'Username',     key: 'username' },
            { label: 'Address',      key: 'address' },
          ].map(({ label, key, inputMode = 'text', pattern }) => (
            <Box key={key} sx={{ mb: 2 }}>
              <label style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 4 }}>
                {label}
              </label>
              <input
                value={newUser[key]}
                inputMode={inputMode}
                pattern={pattern}
                onChange={(e) => {
                  // Strip non-numeric chars for tel/numeric fields
                  const val = (inputMode === 'tel' || inputMode === 'numeric')
                    ? e.target.value.replace(/[^0-9+]/g, '')
                    : e.target.value;
                  setNewUser({ ...newUser, [key]: val });
                }}
                style={{
                  width: '100%', padding: '8px 12px',
                  border: '1.5px solid #d4d4d8', background: '#fff',
                  fontSize: 13, color: '#0a0a0a',
                  outline: 'none', boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = '#0a0a0a'}
                onBlur={e => e.target.style.borderColor = '#d4d4d8'}
              />
            </Box>
          ))}

          <Box sx={{ mb: 2 }}>
            <label style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 4 }}>
              Password {isEditing && <span style={{ fontWeight: 600, letterSpacing: '0.1em', textTransform: 'none', fontSize: 9 }}>(leave blank to keep)</span>}
            </label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              style={{
                width: '100%', padding: '8px 12px',
                border: '1.5px solid #d4d4d8', background: '#fff',
                fontSize: 13, color: '#0a0a0a',
                outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
              onFocus={e => e.target.style.borderColor = '#0a0a0a'}
              onBlur={e => e.target.style.borderColor = '#d4d4d8'}
            />
          </Box>

          <Stack direction="row" gap={2} sx={{ mb: 2 }}>
            {/* Gender */}
            <Box sx={{ flex: 1 }}>
              <label style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 4 }}>Gender</label>
              <select
                value={newUser.gender}
                onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #d4d4d8', background: '#fff', fontSize: 13, color: '#0a0a0a', outline: 'none', fontFamily: 'inherit' }}
              >
                <option value="">— Select —</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </Box>
            {/* Role */}
            <Box sx={{ flex: 1 }}>
              <label style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#71717a', display: 'block', marginBottom: 4 }}>Role</label>
              <select
                value={newUser.type || 'editor'}
                onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #d4d4d8', background: '#fff', fontSize: 13, color: '#0a0a0a', outline: 'none', fontFamily: 'inherit' }}
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </Box>
          </Stack>

          <Stack direction="row" gap={2} sx={{ mt: 3 }}>
            <button
              onClick={handleClose}
              style={{ flex: 1, padding: '10px', border: '1.5px solid #0a0a0a', background: 'transparent', fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', color: '#0a0a0a' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveUser}
              style={{ flex: 1, padding: '10px', border: '1.5px solid #0a0a0a', background: '#0a0a0a', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3f3f46'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0a0a0a'}
            >
              {isEditing ? 'Save Changes' : 'Add Record'}
            </button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default UsersPage;
