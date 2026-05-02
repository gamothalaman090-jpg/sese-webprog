import { useRef } from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Stack, Button } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FileBarChart, Map as MapIcon, Zap, Activity } from 'lucide-react';

const ReportsPage = () => {
    const printRef = useRef(null);

    const handlePrint = () => {
        const printContent = printRef.current;

        if (!printContent) {
            return;
        }

        const printWindow = window.open('', '_blank', 'width=1200,height=900');

        if (!printWindow) {
            return;
        }

        const headMarkup = Array.from(
            document.querySelectorAll('style, link[rel="stylesheet"]')
        )
            .map((node) => node.outerHTML)
            .join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date());

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>DIAGNOSTIC_REPORT_${new Date().getTime()}</title>
                    ${headMarkup}
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet">
                    <style>
                        @page {
                            size: A4;
                            margin: 12mm;
                        }

                        * {
                            box-sizing: border-box;
                        }

                        body {
                            margin: 0;
                            font-family: 'Inter', Helvetica, sans-serif;
                            background: #fff;
                            color: #0a0a0a;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }

                        .report-shell {
                            padding: 0;
                        }

                        .report-header {
                            border-top: 4px solid #000;
                            border-bottom: 4px solid #000;
                            padding: 12px 0;
                            margin-bottom: 16px;
                        }

                        .header-top {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 8px;
                        }

                        .brand {
                            font-weight: 900;
                            font-size: 12px;
                            letter-spacing: 0.15em;
                            color: #0047FF;
                        }

                        .report-header h1 {
                            margin: 0 0 8px 0;
                            font-size: 24px;
                            font-weight: 900;
                            text-transform: uppercase;
                            letter-spacing: -0.03em;
                            line-height: 1;
                        }

                        .meta-bar {
                            display: flex;
                            gap: 12px;
                        }

                        .meta-tag {
                            background: #0a0a0a;
                            color: #fff;
                            padding: 4px 8px;
                            font-size: 9px;
                            font-weight: 800;
                            letter-spacing: 0.1em;
                            text-transform: uppercase;
                        }

                        .meta-tag.blue {
                            background: #0047FF;
                        }

                        .executive-summary {
                            margin-bottom: 16px;
                            padding-bottom: 16px;
                            border-bottom: 4px solid #000;
                        }

                        .executive-summary h2, .section-title {
                            font-size: 14px;
                            font-weight: 900;
                            text-transform: uppercase;
                            letter-spacing: 0.1em;
                            margin: 0 0 8px 0;
                            color: #0047FF;
                        }

                        .executive-summary > p {
                            font-size: 11px;
                            line-height: 1.5;
                            margin: 0 0 12px 0;
                            font-weight: 600;
                        }

                        .summary-grid {
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            gap: 16px;
                        }

                        .summary-box {
                            border: 2px solid #0a0a0a;
                            padding: 12px;
                        }

                        .summary-box h3 {
                            font-size: 10px;
                            font-weight: 900;
                            margin: 0 0 8px 0;
                            letter-spacing: 0.05em;
                            border-bottom: 2px solid #0a0a0a;
                            padding-bottom: 4px;
                            text-transform: uppercase;
                        }

                        .summary-box p {
                            font-size: 10px;
                            line-height: 1.4;
                            margin: 0;
                            color: #27272a;
                        }

                        .report-content {
                            /* Scale down the charts to fit on the same page */
                            zoom: 0.60;
                        }

                        /* Force desktop grid layout to prevent vertical stacking in print view */
                        .report-content .MuiGrid-root.MuiGrid-container {
                            display: flex !important;
                            flex-wrap: wrap !important;
                        }

                        .report-content .MuiGrid-root.MuiGrid-item:nth-of-type(1) {
                            flex: 0 0 100% !important;
                            max-width: 100% !important;
                        }

                        .report-content .MuiGrid-root.MuiGrid-item:nth-of-type(2) {
                            flex: 0 0 35% !important;
                            max-width: 35% !important;
                        }

                        .report-content .MuiGrid-root.MuiGrid-item:nth-of-type(3) {
                            flex: 0 0 65% !important;
                            max-width: 65% !important;
                        }

                        .report-content .MuiCard-root {
                            box-shadow: none !important;
                            border: 2px solid #0a0a0a !important;
                            border-radius: 0 !important;
                            break-inside: avoid;
                            page-break-inside: avoid;
                            margin-bottom: 16px;
                            height: 100%;
                        }

                        .report-content .MuiCardContent-root {
                            padding: 16px !important;
                        }

                        .report-content svg {
                            max-width: 100%;
                            height: auto !important;
                        }
                    </style>
                </head>
                <body>
                    <main class="report-shell">
                        <header class="report-header">
                            <div class="header-top">
                                <div class="brand">ANALYTIC.FLOW // DATA_EXPORT</div>
                                <div class="brand" style="color: #0a0a0a;">ID: ${Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
                            </div>
                            <h1>Diagnostic Matrix Report</h1>
                            <div class="meta-bar">
                                <div class="meta-tag">TIMESTAMP: ${exportedAt.toUpperCase()}</div>
                                <div class="meta-tag blue">STATUS: NOMINAL</div>
                                <div class="meta-tag">SYS_OP: ROOT</div>
                            </div>
                        </header>

                        <section class="executive-summary">
                            <h2>01 // EXECUTIVE_SUMMARY</h2>
                            <p>This document presents a comprehensive diagnostic overview of the system's operational parameters over the current reporting cycle. The data indicates sustained nominal performance across all primary metrics, with localized anomalies strictly contained within acceptable operational thresholds.</p>
                            
                            <div class="summary-grid">
                                <div class="summary-box">
                                    <h3>Performance_Trends</h3>
                                    <p>Historical data demonstrates a 14% improvement in response times and a steady state of task completion. The time-sequence chart illustrates a reduction in peak latency during high-load periods, indicating high system elasticity.</p>
                                </div>
                                <div class="summary-box">
                                    <h3>System_Vitals</h3>
                                    <p>Core CPU load remains within optimal parameters (75%), providing sufficient overhead for burst processing. Memory allocation (42%) indicates efficient resource management with zero critical leaks detected over the 24-hour cycle.</p>
                                </div>
                                <div class="summary-box">
                                    <h3>Geospatial_Routing</h3>
                                    <p>Primary active nodes remain heavily concentrated in Metro Manila (Station_01). Connection stability and localized latency metrics from this primary hub reflect a highly robust and redundant network topology.</p>
                                </div>
                            </div>
                        </section>

                        <section class="report-content">
                            <h2 class="section-title">02 // DATA_VISUALIZATION</h2>
                            ${printContent.outerHTML}
                        </section>
                        <footer style="margin-top: 40px; border-top: 2px solid #000; padding-top: 16px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; display: flex; justify-content: space-between;">
                            <div>CONFIDENTIAL / INTERNAL USE ONLY</div>
                            <div>END OF REPORT // DATA SECURE</div>
                        </footer>
                    </main>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for styles and charts to render
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 1000);
    };

    return (
        <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 1, sm: 2, md: 4 } }}>
            {/* Header */}
            <Box sx={{ mb: { xs: 8, md: 12 }, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                <Box>
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
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" sx={{ borderRadius: 0, px: 3, borderColor: '#0a0a0a', color: '#0a0a0a', fontWeight: 800, '&:hover': { bgcolor: '#f4f4f5', borderColor: '#0a0a0a' } }} onClick={handlePrint}>Export</Button>
                </Box>
            </Box>

            <Box ref={printRef}>
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
        </Box>
    );
};

export default ReportsPage;
