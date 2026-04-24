import React from 'react';
import { Box, Typography, Divider, Button, Card, CardContent } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { UserPlus, Download, Search, ShieldCheck } from 'lucide-react';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { 
        field: 'avatar', 
        headerName: 'REF', 
        width: 80,
        renderCell: (params) => (
            <Box sx={{ 
                width: 32, height: 32, bgcolor: '#0a0a0a', color: 'white', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontWeight: 900, fontSize: '0.65rem' 
            }}>
                {params.row.firstName[0]}{params.row.lastName[0]}
            </Box>
        )
    },
    { field: 'firstName', headerName: 'First Name', width: 150, editable: true },
    { field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email Address', width: 250 },
    { 
        field: 'role', 
        headerName: 'System Role', 
        width: 180,
        renderCell: (params) => (
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                bgcolor: '#fafafa',
                border: '1px solid #000',
                px: 2,
                py: 0.5,
                height: 32,
            }}>
                <ShieldCheck size={14} color={params.value === 'Administrator' ? '#0047FF' : '#71717a'} strokeWidth={3} />
                <Typography variant="body2" sx={{ fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {params.value}
                </Typography>
            </Box>
        )
    },
    {
        field: 'lastActive',
        headerName: 'Last Active',
        width: 180,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'j.snow@nightswatch.org', role: 'Administrator', lastActive: '2026-04-24 10:20' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'c.lann@casterly.com', role: 'Editor', lastActive: '2026-04-23 15:45' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'j.lann@casterly.com', role: 'Viewer', lastActive: '2026-04-22 09:12' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'noone@braavos.net', role: 'Editor', lastActive: '2026-04-24 21:05' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'mother@dragons.io', role: 'Administrator', lastActive: '2026-04-24 18:30' },
    { id: 6, lastName: 'Melisandre', firstName: 'Shadow', email: 'fire@rhllor.org', role: 'Viewer', lastActive: '2026-04-21 12:00' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'f.cliff@sample.com', role: 'Editor', lastActive: '2026-04-20 08:30' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'r.fran@sample.com', role: 'Viewer', lastActive: '2026-04-19 14:20' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'h.roxie@sample.com', role: 'Editor', lastActive: '2026-04-18 11:10' },
];

const UsersPage = () => {
    return (
        <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h2" sx={{ mb: 1, fontWeight: 900, letterSpacing: '-0.02em' }}>USER.REGISTRY</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Divider sx={{ width: 60, height: 4, bgcolor: '#0047FF', border: 'none' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Access Management / Authentication Nodes
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" startIcon={<Download size={16} />} sx={{ borderRadius: 0, px: 3 }}>Export</Button>
                    <Button variant="contained" startIcon={<UserPlus size={16} />} sx={{ bgcolor: 'black', color: 'white', borderRadius: 0, px: 3 }}>New Entry</Button>
                </Box>
            </Box>

            {/* Table Container */}
            <Card sx={{ border: '2px solid #000', borderRadius: 0 }}>
                <Box sx={{ height: 650, width: '100%', bgcolor: 'white' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                        checkboxSelection
                        disableRowSelectionOnClick
                        rowHeight={70}
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-columnHeader': {
                                bgcolor: '#fafafa',
                                borderBottom: '3px solid #000',
                                textTransform: 'uppercase',
                                fontSize: '0.7rem',
                                fontWeight: 950,
                                letterSpacing: '0.2rem',
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
                            '& .MuiDataGrid-toolbarContainer': {
                                p: 3,
                                gap: 2,
                                borderBottom: '1px solid #e4e4e7',
                                '& .MuiButton-root': {
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    color: '#0a0a0a',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                }
                            }
                        }}
                    />
                </Box>
            </Card>
        </Box>
    );
};

export default UsersPage;
