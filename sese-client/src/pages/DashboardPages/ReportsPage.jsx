import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Stack } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FileBarChart, Map as MapIcon, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportsPage = () => {
    return (
        <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 1, sm: 2, md: 4 } }}>
            {/* Header */}
            <Box sx={{ mb: { xs: 8, md: 12 } }}>
                <Typography variant="h1" sx={{ 
                    mb: 3, 
                    fontWeight: 950, 
                    letterSpacing: '-0.04em', 
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5.5rem' },
                    lineHeight: 1
                }}>
                    ANALYTIC.FLOW
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Divider sx={{ width: 120, height: 10, bgcolor: '#0047FF', border: 'none' }} />
                    <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: { xs: '0.7rem', md: '1.2rem' } }}>
                        Diagnostic Matrix / Data_Points
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Primary Metric: Performance Over Time */}
                <Grid item xs={12}>
                    <Card sx={{ border: '1px solid #000', boxShadow: 'none', borderRadius: 0 }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 8, flexWrap: 'wrap', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box sx={{ p: 1.5, bgcolor: '#0047FF', color: 'white' }}>
                                        <Activity size={24} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                                        PERFORMANCE_HISTORICAL
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                    <Typography variant="overline" display="block" sx={{ fontWeight: 800, color: 'text.secondary', lineHeight: 1 }}>
                                        LAST UPDATED
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#0047FF' }}>
                                        {new Date().toLocaleTimeString()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%', height: { xs: 300, md: 500 } }}>
                                <LineChart
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 18, 20], label: 'Time Sequence (ms)' }]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5, 4, 7, 3, 6],
                                            area: true,
                                            color: '#0047FF',
                                            showMark: false,
                                        },
                                    ]}
                                    height={500}
                                    margin={{ left: 50, right: 30, top: 40, bottom: 60 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sub-Metrics Section */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', border: '1px solid #000', boxShadow: 'none', borderRadius: 0 }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 6, md: 10 } }}>
                                <Box sx={{ p: 1, bgcolor: '#0a0a0a', color: 'white' }}>
                                    <Zap size={24} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    SYSTEM_VITALS
                                </Typography>
                            </Box>
                            <Stack spacing={8} alignItems="center">
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Gauge 
                                        width={240} 
                                        height={240} 
                                        value={75} 
                                        color="#0a0a0a" 
                                        innerRadius="85%"
                                        text={null}
                                    />
                                    <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                                        <Typography variant="h2" sx={{ fontWeight: 900 }}>75%</Typography>
                                        <Typography variant="overline" sx={{ fontWeight: 800, opacity: 0.6 }}>CPU_LOAD</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Gauge 
                                        width={240} 
                                        height={240} 
                                        value={42} 
                                        color="#0047FF" 
                                        innerRadius="85%"
                                        text={null}
                                    />
                                    <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                                        <Typography variant="h2" sx={{ fontWeight: 900 }}>42%</Typography>
                                        <Typography variant="overline" sx={{ fontWeight: 800, opacity: 0.6 }}>MEM_ALLOC</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Geographic Context */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ height: '100%', border: '1px solid #000', boxShadow: 'none', borderRadius: 0 }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 6, md: 10 } }}>
                                <Box sx={{ p: 1, bgcolor: '#f4f4f5', color: '#0047FF' }}>
                                    <MapIcon size={24} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    GEOSPATIAL_DISTRIBUTION
                                </Typography>
                            </Box>
                            <Box sx={{ height: { xs: 400, md: 600 }, width: '100%', border: '4px solid #0a0a0a', position: 'relative' }}>
                                <MapContainer center={[14.604253, 120.994314]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; OpenStreetMap contributors'
                                    />
                                    <Marker position={[14.604253, 120.994314]}>
                                        <Popup>
                                            <Typography variant="body2" sx={{ fontWeight: 900 }}>METRO_MANILA (STATION_01)</Typography>
                                            <Divider sx={{ my: 1 }} />
                                            <Typography variant="caption" sx={{ color: '#0047FF', fontWeight: 700 }}>STATUS: ACTIVE_NOMINAL</Typography>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReportsPage;
