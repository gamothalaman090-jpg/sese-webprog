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
    {
        id: 'realtime-commerce',
        no: '04',
        type: 'E-Commerce Platform',
        stack: 'Next.js · WebSocket · MongoDB',
        title: 'Dynamic Inventory Management',
        desc: 'A real-time inventory and commerce platform with instant stock synchronization across multiple warehouses. Built for handling high-velocity transactions and stock updates.',
        content: `
            <p>Modern e-commerce demands real-time inventory visibility across distributed fulfillment centers. This platform uses WebSocket connections to maintain sub-second inventory synchronization and prevent overselling scenarios.</p>
            <h3>Architecture Highlights</h3>
            <ul>
                <li>WebSocket-based bidirectional communication for live stock updates.</li>
                <li>Distributed transaction processing with eventual consistency patterns.</li>
                <li>Advanced caching strategies to minimize database load.</li>
            </ul>
            <p>The system handles thousands of concurrent transactions while maintaining data consistency and providing real-time visibility to warehouse operators and customers alike.</p>
        `,
        img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'analytics-dashboard',
        no: '05',
        type: 'Data Visualization',
        stack: 'Vue.js · D3.js · Apache Kafka',
        title: 'Enterprise Analytics Dashboard',
        desc: 'A comprehensive data visualization platform aggregating real-time metrics from diverse sources. Designed to uncover actionable insights from complex multi-dimensional datasets.',
        content: `
            <p>Enterprise decision-making relies on distilling massive datasets into meaningful visualizations. This dashboard ingests data streams from multiple sources using Apache Kafka and renders interactive D3.js visualizations with minimal latency.</p>
            <h3>Key Features</h3>
            <ul>
                <li>Real-time data pipeline processing millions of events per minute.</li>
                <li>Custom D3.js visualizations for domain-specific metrics.</li>
                <li>Drill-down capabilities with automatic query optimization.</li>
            </ul>
            <p>Users can explore data multidimensionally, answering complex business questions without requiring engineering resources or lengthy data preparation cycles.</p>
        `,
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'ai-content-engine',
        no: '06',
        type: 'AI Integration',
        stack: 'Python · FastAPI · TensorFlow',
        title: 'Intelligent Content Generation System',
        desc: 'An AI-powered content generation platform leveraging neural networks for personalized recommendations and automated content creation. Designed for scale and contextual accuracy.',
        content: `
            <p>Content personalization at scale requires sophisticated machine learning models working in tandem with real-time inference engines. This system combines TensorFlow models with FastAPI for sub-millisecond latency in production environments.</p>
            <h3>ML Pipeline Architecture</h3>
            <ul>
                <li>Custom fine-tuned models for domain-specific content generation.</li>
                <li>Real-time feature vectorization and model inference serving.</li>
                <li>A/B testing framework integrated into the recommendation engine.</li>
            </ul>
            <p>The platform delivers personalized content experiences to millions of users while maintaining contextual relevance and continuously improving through feedback loops and model retraining cycles.</p>
        `,
        img: 'https://images.unsplash.com/photo-1677442d019cecf9e2c39dcdb13cf57b0176080e?q=80&w=2070&auto=format&fit=crop',
    },
];

export default articles;
