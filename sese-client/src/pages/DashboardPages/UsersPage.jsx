import { useState, useMemo } from 'react';
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
    Divider,
    Card,
    CardContent,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { UserPlus, Download, Search, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import usersSeedRaw from '../../assets/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) => value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
    try {
        const parsed = JSON.parse(usersSeedRaw);
        return parsed.map((user, index) => ({
            id: index + 1,
            firstName: String(user.firstName ?? '').trim(),
            lastName: String(user.lastName ?? '').trim(),
            age: String(user.age ?? '').trim(),
            gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
                ? String(user.gender ?? '').trim().toLowerCase()
                : '',
            contactNumber: String(user.contactNumber ?? '').trim(),
            email: String(user.email ?? '').trim().toLowerCase(),
            role: roles.includes(String(user.role ?? '').trim().toLowerCase())
                ? String(user.role ?? '').trim().toLowerCase()
                : 'editor',
            username: String(user.username ?? '').trim().toLowerCase(),
            password: String(user.password ?? ''),
            address: String(user.address ?? '').trim(),
            isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
        }));
    } catch {
        return [];
    }
};

const initialUsers = loadUsers();

const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = useState(initialUsers);
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterGender, setFilterGender] = useState('all');
    const [filterStatus, setFilterStatus] = useState('active');

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (user = null) => {
        setModal({ open: true, id: user?.id ?? null });
        setForm(user ? { ...blankForm, ...user } : { ...blankForm });
        setErrors({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setShowPassword(false);
        resetForm();
    };

    const handleChange = ({ target: { name, value, checked, type } }) => {
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const nextErrors = {};
        const email = form.email.trim().toLowerCase();
        const username = form.username.trim().toLowerCase();

        [
            ['firstName', 'First name'],
            ['lastName', 'Last name'],
            ['age', 'Age'],
            ['gender', 'Gender'],
            ['contactNumber', 'Contact number'],
            ['email', 'Email'],
            ['role', 'Role'],
            ['username', 'Username'],
            ['password', 'Password'],
            ['address', 'Address'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) {
                nextErrors[key] = `${label} is required.`;
            }
        });

        if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = 'Enter a valid email address.';
        }
        if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
            nextErrors.email = 'Email address already exists.';
        }

        // Beginner-friendly validations as requested
        if (!nextErrors.username && /\s/.test(form.username)) {
            nextErrors.username = 'Username must not contain spaces.';
        }
        if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) {
            nextErrors.username = 'Username already exists.';
        }

        if (!nextErrors.password && form.password.length < 8) {
            nextErrors.password = 'Password must be at least 8 characters long.';
        }

        if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber)) {
            nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
        }

        if (!nextErrors.age && !/^\d+$/.test(form.age)) {
            nextErrors.age = 'Age must be a valid number.';
        }

        return nextErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formattedForm = {
            ...form,
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            age: form.age.trim(),
            contactNumber: form.contactNumber.trim(),
            email: form.email.trim().toLowerCase(),
            username: form.username.trim().toLowerCase(),
            address: form.address.trim(),
        };

        setUsers((prev) =>
            modal.id
                ? prev.map((user) => (user.id === modal.id ? { ...user, ...formattedForm } : user))
                : [
                    ...prev,
                    {
                        ...formattedForm,
                        id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
                    }
                ]
        );
        closeModal();
    };

    const toggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user))
        );
    };

    const fieldProps = (name, label, extra = {}) => ({
        name,
        label,
        value: form[name],
        onChange: handleChange,
        error: Boolean(errors[name]),
        helperText: errors[name],
        fullWidth: true,
        size: "small",
        InputLabelProps: {
            sx: { fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }
        },
        ...extra,
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 80, align: 'center', headerAlign: 'center' },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 160,
            valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
        },
        { field: 'username', headerName: 'Username', minWidth: 130 },
        { field: 'age', headerName: 'Age', width: 70 },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 110,
            valueGetter: (_, row) => labelize(row.gender),
        },
        { field: 'contactNumber', headerName: 'Contact Number', minWidth: 150 },
        { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 200 },
        {
            field: 'role',
            headerName: 'Role',
            width: 120,
            valueGetter: (_, row) => labelize(row.role),
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: '#fafafa',
                    border: '1px solid #000',
                    px: 1.5,
                    py: 0.5,
                    height: 28,
                }}>
                    <ShieldCheck size={14} color={params.row.role === 'admin' ? '#0047FF' : '#71717a'} strokeWidth={3} />
                    <Typography variant="body2" sx={{ fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {params.value}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'isActive',
            headerName: 'Status',
            width: 120,
            renderCell: ({ row }) => (
                <Chip
                    size="small"
                    label={row.isActive ? 'Active' : 'Inactive'}
                    sx={{
                        borderRadius: 0,
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: '0.65rem',
                        bgcolor: row.isActive ? '#0047FF' : '#f4f4f5',
                        color: row.isActive ? 'white' : '#71717a',
                        border: '1px solid',
                        borderColor: row.isActive ? '#0047FF' : '#d4d4d8'
                    }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={2} sx={{ py: 0.5, pr: 2 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => openModal(row)}
                        sx={{ borderRadius: 0, fontWeight: 800, borderColor: '#0a0a0a', color: '#0a0a0a', px: 2, '&:hover': { bgcolor: '#f4f4f5', borderColor: '#0a0a0a' } }}
                    >
                        EDIT
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => toggleStatus(row.id)}
                        sx={{
                            borderRadius: 0,
                            fontWeight: 800,
                            bgcolor: row.isActive ? '#0a0a0a' : '#ef4444',
                            color: 'white',
                            px: 2,
                            '&:hover': { bgcolor: row.isActive ? '#27272a' : '#dc2626' },
                            boxShadow: 'none'
                        }}
                    >
                        {row.isActive ? 'ENABLE' : 'DISABLE'}
                    </Button>
                </Stack>
            ),
        },
    ];

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            // Search text
            const textMatches = searchTerm === '' || [user.firstName, user.lastName, user.email, user.username]
                .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));

            // Filters
            const roleMatches = filterRole === 'all' || user.role === filterRole;
            const genderMatches = filterGender === 'all' || user.gender === filterGender;
            const statusMatches = filterStatus === 'all' || (filterStatus === 'active' ? user.isActive : !user.isActive);

            return textMatches && roleMatches && genderMatches && statusMatches;
        });
    }, [users, searchTerm, filterRole, filterGender, filterStatus]);

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ p: 2, borderBottom: '1px solid #e4e4e7', display: 'flex', justifyContent: 'flex-end' }}>
                <GridToolbarExport
                    printOptions={{ disableToolbarButton: true }}
                    sx={{
                        color: '#000',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.75rem'
                    }}
                />
            </GridToolbarContainer>
        );
    }

    return (
        <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 4 }}>
                <Box>
                    <Typography variant="h2" sx={{ mb: 1, fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>User.Registry</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Divider sx={{ width: 60, height: 4, bgcolor: '#0047FF', border: 'none' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Access Management / Authentication Nodes
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<UserPlus size={16} />}
                        onClick={() => openModal()}
                        sx={{ bgcolor: 'black', color: 'white', borderRadius: 0, px: 3, fontWeight: 800 }}
                    >
                        New Entry
                    </Button>
                </Box>
            </Box>

            {/* Search and Filters */}
            <Card sx={{ border: '2px solid #000', borderRadius: 0, mb: 4, boxShadow: 'none' }}>
                <CardContent sx={{ p: 3 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                        <TextField
                            placeholder="Search by Name, Email, or Username..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            fullWidth
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={18} color="#71717a" />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 0, '& fieldset': { borderColor: '#d4d4d8' } }
                            }}
                        />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ minWidth: { md: 450 } }}>
                            <TextField
                                select
                                label="Role"
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                size="small"
                                fullWidth
                                InputProps={{ sx: { borderRadius: 0 } }}
                            >
                                <MenuItem value="all">All Roles</MenuItem>
                                {roles.map(r => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                            </TextField>
                            <TextField
                                select
                                label="Gender"
                                value={filterGender}
                                onChange={(e) => setFilterGender(e.target.value)}
                                size="small"
                                fullWidth
                                InputProps={{ sx: { borderRadius: 0 } }}
                            >
                                <MenuItem value="all">All Genders</MenuItem>
                                {genders.map(g => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                            </TextField>
                            <TextField
                                select
                                label="Status"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                size="small"
                                fullWidth
                                InputProps={{ sx: { borderRadius: 0 } }}
                            >
                                <MenuItem value="all">All Status</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </TextField>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            {/* Table Container */}
            <Card sx={{ border: '2px solid #000', borderRadius: 0, boxShadow: 'none' }}>
                <Box sx={{ height: 650, width: '100%', bgcolor: 'white' }}>
                    <DataGrid
                        rows={filteredUsers}
                        columns={columns}
                        slots={{ toolbar: CustomToolbar }}
                        disableRowSelectionOnClick
                        rowHeight={64}
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-columnHeader': {
                                bgcolor: '#fafafa',
                                borderBottom: '3px solid #000',
                                textTransform: 'uppercase',
                                fontSize: '0.7rem',
                                fontWeight: 950,
                                letterSpacing: '0.15rem',
                                color: '#000',
                            },
                            '& .MuiDataGrid-cell': {
                                borderColor: '#f4f4f5',
                                fontSize: '0.85rem',
                                color: '#27272a',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                            },
                        }}
                    />
                </Box>
            </Card>

            {/* User Form Modal */}
            <Dialog
                open={modal.open}
                onClose={closeModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 0, border: '2px solid #000', boxShadow: '8px 8px 0px rgba(0,0,0,1)' }
                }}
            >
                <DialogTitle sx={{ borderBottom: '2px solid #000', pb: 2, mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {modal.id ? 'EDIT_USER_PROFILE' : 'CREATE_NEW_USER'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box component="form" id="user-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Stack spacing={3}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('firstName', 'First Name')} />
                                <TextField {...fieldProps('lastName', 'Last Name')} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('username', 'Username')} />
                                <TextField
                                    {...fieldProps('password', 'Password')}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('email', 'Email Address')} type="email" />
                                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('age', 'Age')} type="number" sx={{ flex: 1 }} />
                                <TextField select {...fieldProps('gender', 'Gender')} sx={{ flex: 2 }}>
                                    <MenuItem value="" disabled>Select Gender</MenuItem>
                                    {genders.map(g => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                                </TextField>
                                <TextField select {...fieldProps('role', 'System Role')} sx={{ flex: 2 }}>
                                    {roles.map(r => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                                </TextField>
                            </Stack>
                            <TextField {...fieldProps('address', 'Full Address')} multiline rows={2} />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={form.isActive}
                                        onChange={handleChange}
                                        name="isActive"
                                        color="primary"
                                    />
                                }
                                label={<Typography sx={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Active Account Status</Typography>}
                                sx={{ m: 0 }}
                            />
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '2px solid #000' }}>
                    <Button onClick={closeModal} variant="outlined" sx={{ borderRadius: 0, fontWeight: 700, color: '#000', borderColor: '#000', px: 3 }}>
                        Cancel
                    </Button>
                    <Button type="submit" form="user-form" variant="contained" sx={{ borderRadius: 0, fontWeight: 800, bgcolor: '#0a0a0a', px: 4 }}>
                        {modal.id ? 'Save Changes' : 'Create User'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UsersPage;
