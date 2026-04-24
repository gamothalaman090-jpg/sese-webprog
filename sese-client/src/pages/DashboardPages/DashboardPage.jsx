import { Typography, Grid, Card, CardContent, Divider, Fade, useTheme, Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import { TrendingUp, Users, Activity, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    {
        field: 'status',
        headerName: 'Status',
        width: 140,
        renderCell: (params) => (
            <Box sx={{ 
                bgcolor: params.value === 'Active' ? '#0a0a0a' : '#f4f4f5',
                color: params.value === 'Active' ? 'white' : 'black',
                border: params.value === 'Active' ? 'none' : '1px solid #000',
                px: 2, 
                py: 0.5, 
                fontSize: '0.65rem', 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                lineHeight: 1,
                display: 'inline-flex'
            }}>
                {params.value}
            </Box>
        )
    }
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: 'Active' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status: 'Active' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status: 'Pending' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, status: 'Active' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 25, status: 'Suspended' },
];

const StatCard = ({ title, value, icon: Icon, trend }) => (
    <motion.div whileHover={{ y: -5 }} style={{ height: '100%' }}>
        <Card sx={{ 
            height: '100%', 
            border: '1px solid #000',
            borderRadius: 0,
            '&:hover': { bgcolor: '#fafafa', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.1)' }
        }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: '0.2em' }}>
                        {title}
                    </Typography>
                    <Box sx={{ p: 1, bgcolor: '#0047FF', color: 'white' }}>
                        <Icon size={20} />
                    </Box>
                </Box>
                <Typography variant="h2" sx={{ mb: 2, fontWeight: 900, fontSize: { xs: '2.5rem', md: '3.5rem' }, letterSpacing: '-0.02em' }}>
                    {value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#0047FF' }}>
                        <ArrowUpRight size={18} strokeWidth={3} />
                        <Typography variant="body2" sx={{ fontWeight: 900, ml: 0.5 }}>{trend}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
                        Tracking / Q1
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    </motion.div>
);

function DashboardPage() {
    const theme = useTheme();

    return (
        <Box sx={{ maxWidth: 1800, mx: 'auto', px: { xs: 1, sm: 2, md: 4 } }}>
            {/* Header Section */}
            <Box sx={{ mb: { xs: 6, md: 10 } }}>
                <Typography variant="h1" sx={{ 
                    mb: 2, 
                    fontWeight: 950, 
                    letterSpacing: '-0.04em', 
                    fontSize: { xs: '2.5rem', sm: '4rem', md: '6rem' },
                    lineHeight: 0.9 
                }}>
                    METRIC.CONSO
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Divider sx={{ width: 100, height: 8, bgcolor: '#0047FF', border: 'none' }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: { xs: '0.7rem', md: '1rem' } }}>
                        Operational Overview / System_Node
                    </Typography>
                </Box>
            </Box>

            {/* Stats Row */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard title="Total Registry" value="1,284" icon={Users} trend="+12.4%" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard title="Avg Engagement" value="48.2" icon={Activity} trend="+5.4%" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard title="Growth Factor" value="89.1%" icon={TrendingUp} trend="+2.31%" />
                </Grid>
            </Grid>

            {/* Visuals Row */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid item xs={12} lg={7}>
                    <Card sx={{ height: '100%', border: '1px solid #000', borderRadius: 0 }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 8 }}>
                                <Typography variant="h5" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    PERFORMANCE_ARCHITECTURE
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>LIVE_TELEMETRY</Typography>
                            </Box>
                            <Box sx={{ width: '100%', height: 450 }}>
                                <BarChart
                                    series={[
                                        { data: [45, 52, 38, 65], label: 'Gross Yield', color: '#0047FF' },
                                        { data: [28, 35, 21, 48], label: 'Net Efficiency', color: '#0a0a0a' },
                                    ]}
                                    height={450}
                                    xAxis={[{ data: ['NODE_A', 'NODE_B', 'NODE_C', 'NODE_D'], scaleType: 'band' }]}
                                    margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'top', horizontal: 'middle' },
                                            padding: 0,
                                        }
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <Card sx={{ height: '100%', border: '1px solid #000', borderRadius: 0 }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 8 }}>
                                <Typography variant="h5" sx={{ fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                                    SEGMENT_ALLOCATION
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#0047FF', letterSpacing: '0.1em' }}>DISTRIB_RATIO</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', height: 450, alignItems: 'center', position: 'relative' }}>
                                <PieChart
                                    series={[{
                                        data: [
                                            { id: 0, value: 35, label: 'Core', color: '#0a0a0a' },
                                            { id: 1, value: 45, label: 'Edge', color: '#0047FF' },
                                            { id: 2, value: 20, label: 'Node', color: '#d4d4d8' },
                                        ],
                                        innerRadius: 110,
                                        outerRadius: 160,
                                        paddingAngle: 5,
                                        cornerRadius: 0,
                                    }]}
                                    height={400}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'top', horizontal: 'middle' },
                                            padding: 0,
                                            itemMarkWidth: 8,
                                            itemMarkHeight: 8,
                                            markGap: 8,
                                            itemGap: 24,
                                            labelStyle: {
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em'
                                            }
                                        }
                                    }}
                                />
                                <Box sx={{ 
                                    position: 'absolute', 
                                    textAlign: 'center', 
                                    left: '50%', 
                                    top: '55%',
                                    transform: 'translate(-50%, -50%)',
                                    pointerEvents: 'none'
                                }}>
                                    <Typography variant="h2" sx={{ fontWeight: 950, fontSize: '4.5rem', lineHeight: 1 }}>100</Typography>
                                    <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', letterSpacing: '0.4em', fontSize: '0.65rem' }}>CONSOLIDATED</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Table Section */}
            <Box sx={{ mb: 12 }}>
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Divider sx={{ width: 40, height: 4, bgcolor: 'black', border: 'none' }} />
                    <Typography variant="h3" sx={{ fontWeight: 950, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>SESSION.NODES</Typography>
                    <Typography variant="h6" sx={{ color: '#0047FF', fontWeight: 900 }}>/ REG_LOG</Typography>
                </Box>
                <Card sx={{ border: '1px solid #000', borderRadius: 0 }}>
                    <Box sx={{ height: 500, width: '100%', bgcolor: 'white' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            disableRowSelectionOnClick
                            rowHeight={70}
                            sx={{
                                border: 'none',
                                '& .MuiDataGrid-columnHeader': {
                                    bgcolor: '#fafafa',
                                    textTransform: 'uppercase',
                                    fontSize: '0.7rem',
                                    fontWeight: 950,
                                    letterSpacing: '0.2em',
                                    borderBottom: '3px solid #000',
                                    color: '#000',
                                },
                                '& .MuiDataGrid-columnHeaderTitles': {
                                    fontWeight: 950,
                                },
                                '& .MuiDataGrid-cell': {
                                    borderColor: '#f4f4f5',
                                    fontSize: '0.85rem',
                                    color: '#27272a',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: '3px solid #000',
                                    bgcolor: '#fafafa'
                                }
                            }}
                        />
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}

export default DashboardPage;