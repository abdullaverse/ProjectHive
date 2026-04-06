const { createProject } = require('./backend/services/projectService');
require('dotenv').config({ path: require('path').resolve(__dirname, './backend/.env') });

const sampleProjects = [
  {
    title: 'Dual-Axis Solar Tracking System',
    department: 'Electrical',
    description: 'High-efficiency solar tracker using Arduino and LDR sensors to maximize energy harvesting by 40%.',
    price: '4,999',
    featured: true,
    imageURL: 'https://images.unsplash.com/photo-1509391366360-fe5bb5858342?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'AI-Based Face Recognition Attendance',
    department: 'Computer Science',
    description: 'Real-time attendance system using OpenCV, Python, and Deep Learning (CNN).',
    price: '2,499',
    featured: true,
    imageURL: 'https://images.unsplash.com/photo-1507146482234-ad93d3957262?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'IoT Weather Monitoring Station',
    department: 'Electronics',
    description: 'Connected weather station providing real-time temperature, humidity, and pressure updates to a cloud dashboard.',
    price: '3,299',
    featured: false,
    imageURL: 'https://images.unsplash.com/photo-1504370805625-d32c54b16100?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Gesture Controlled Robotic Arm',
    department: 'Mechanical',
    description: 'Mimics human hand movements using Flex sensors and MPU6050. Ideal for hazardous environment handling.',
    price: '6,499',
    featured: true,
    imageURL: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Blockchain-Based Voting System',
    department: 'Computer Science',
    description: 'Secure, transparent, and decentralized voting platform using Ethereum Smart Contracts.',
    price: '5,999',
    featured: false,
    imageURL: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Smart Helmet for Coal Miners',
    department: 'Safety',
    description: 'Equipped with gas sensors and collision alerts to ensure worker safety in underground mines.',
    price: '3,899',
    featured: true,
    imageURL: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Waste Segregation Robot',
    department: 'Robotics',
    description: 'Automated waste sorter using inductive sensors and image processing to separate plastic and metal.',
    price: '7,200',
    featured: false,
    imageURL: 'https://images.unsplash.com/photo-1532187863486-abf9d3a3523d?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Wireless Power Transfer System',
    department: 'Electrical',
    description: 'Prototype for inductive wireless charging of mobile devices using Tesla coil principles.',
    price: '1,999',
    featured: false,
    imageURL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop'
  }
];

async function seed() {
  console.log('🌱 Starting project seeding...');
  for (const p of sampleProjects) {
    try {
      await createProject(p);
      console.log(`✅ Added: ${p.title}`);
    } catch (err) {
      console.error(`❌ Failed to add ${p.title}:`, err.message);
    }
  }
  console.log('✨ Seeding complete!');
  process.exit();
}

seed();
