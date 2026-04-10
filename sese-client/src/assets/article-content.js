const articles = [
    {
        id: 'full-stack-app',
        no: '01',
        type: 'Web Application',
        stack: 'React · Node.js · PostgreSQL',
        title: 'Architectural Data Platform',
        desc: 'A robust data management system designed for architectural scale. Implementing complex CRUD operations with a focus on high-performance relational mapping and intuitive user workflows.',
        content: `
            <p>This project explores the intersection of large-scale architecture and modern web technologies. The core challenge was managing deeply nested relational data while maintaining a sub-200ms response time for complex queries.</p>
            <h3>Core Technical Challenges</h3>
            <ul>
                <li>Optimizing PostgreSQL query plans for multi-table joins.</li>
                <li>Implementing a reactive state management system using Zustand.</li>
                <li>Ensuring absolute data integrity through rigorous server-side validation.</li>
            </ul>
            <p>The result is a highly reliable platform that serves as a single source of truth for architectural metadata, enabling teams to collaborate in real-time without friction.</p>
        `,
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'ui-ux-system',
        no: '02',
        type: 'Interface Design',
        stack: 'Figma · React · Tailwind',
        title: 'Industrial Design System',
        desc: 'A rigid, high-contrast design system built for industrial management interfaces. Focused on accessibility, information density, and absolute visual clarity in low-light environments.',
        content: `
            <p>Design in high-stakes industrial environments requires a different set of priorities. This system, dubbed "Onyx," prioritizes rapid scanability and error reduction above all else.</p>
            <h3>Design Principles</h3>
            <ul>
                <li><strong>High Contrast:</strong> Minimal color usage, relying on scale and weight for hierarchy.</li>
                <li><strong>Density Control:</strong> Categorizing data into rigid modules to prevent cognitive overload.</li>
                <li><strong>Motion Intent:</strong> Using subtle micro-interactions to confirm critical operations.</li>
            </ul>
            <p>Built with Tailwind CSS v4, the system allows for rapid prototyping and deployment across various hardware specifications.</p>
        `,
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'mobile-navigation',
        no: '03',
        type: 'Mobile Application',
        stack: 'ReactNative · Skia',
        title: 'Geospatial Asset Tracker',
        desc: 'A real-time asset tracking application utilizing advanced geospatial APIs and high-performance 2D rendering for complex map overlays and trajectory visualizations.',
        content: `
            <p>Tracking assets in motion requires precision and performance. This mobile application leverage ReactNative-Skia to render high-frequency data streams directly on the GPU.</p>
            <h3>Technical Implementation</h3>
            <ul>
                <li>Integration with low-latency GPS data streams.</li>
                <li>Custom shader implementation for trajectory heatmaps.</li>
                <li>Offline-first architecture for remote site operations.</li>
            </ul>
            <p>The application provides field technicians with immediate, visual confirmation of asset status, even in areas with limited connectivity.</p>
        `,
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    },
];

export default articles;
