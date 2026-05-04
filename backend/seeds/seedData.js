const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@taskmanager.com',
      password: 'admin123',
      role: 'admin'
    });

    const member1 = await User.create({
      name: 'Sarah Johnson',
      email: 'sarah@taskmanager.com',
      password: 'member123',
      role: 'member'
    });

    const member2 = await User.create({
      name: 'Mike Wilson',
      email: 'mike@taskmanager.com',
      password: 'member123',
      role: 'member'
    });

    const member3 = await User.create({
      name: 'Emily Davis',
      email: 'emily@taskmanager.com',
      password: 'member123',
      role: 'member'
    });

    console.log('Users created');

    // Create projects
    const project1 = await Project.create({
      name: 'E-Commerce Platform',
      description: 'Build a modern e-commerce platform with React and Node.js featuring product catalog, cart, and payment integration.',
      owner: admin._id,
      members: [admin._id, member1._id, member2._id],
      status: 'active'
    });

    const project2 = await Project.create({
      name: 'Mobile Banking App',
      description: 'Design and develop a secure mobile banking application with real-time transaction tracking and biometric authentication.',
      owner: admin._id,
      members: [admin._id, member2._id, member3._id],
      status: 'active'
    });

    const project3 = await Project.create({
      name: 'HR Management System',
      description: 'Create a comprehensive HR management system for employee onboarding, leave management, and performance reviews.',
      owner: admin._id,
      members: [admin._id, member1._id, member3._id],
      status: 'active'
    });

    console.log('Projects created');

    // Helper for dates
    const daysFromNow = (days) => {
      const d = new Date();
      d.setDate(d.getDate() + days);
      return d;
    };

    // Create tasks
    const tasks = [
      { title: 'Design product catalog UI', description: 'Create wireframes and high-fidelity mockups for the product catalog page.', project: project1._id, assignedTo: member1._id, createdBy: admin._id, status: 'completed', priority: 'high', dueDate: daysFromNow(-2) },
      { title: 'Implement user authentication', description: 'Set up JWT-based authentication with signup, login, and password reset.', project: project1._id, assignedTo: member2._id, createdBy: admin._id, status: 'in-progress', priority: 'high', dueDate: daysFromNow(3) },
      { title: 'Build shopping cart API', description: 'Create REST API endpoints for cart operations.', project: project1._id, assignedTo: member1._id, createdBy: admin._id, status: 'todo', priority: 'medium', dueDate: daysFromNow(7) },
      { title: 'Payment gateway integration', description: 'Integrate Stripe payment gateway for secure transactions.', project: project1._id, assignedTo: member2._id, createdBy: admin._id, status: 'todo', priority: 'high', dueDate: daysFromNow(14) },
      { title: 'Design login screen', description: 'Create a modern and user-friendly login screen with biometric options.', project: project2._id, assignedTo: member3._id, createdBy: admin._id, status: 'completed', priority: 'medium', dueDate: daysFromNow(-5) },
      { title: 'Set up transaction database', description: 'Design and implement the transaction database schema.', project: project2._id, assignedTo: member2._id, createdBy: admin._id, status: 'in-progress', priority: 'high', dueDate: daysFromNow(2) },
      { title: 'Real-time notifications', description: 'Implement push notifications for transaction alerts.', project: project2._id, assignedTo: member3._id, createdBy: admin._id, status: 'todo', priority: 'medium', dueDate: daysFromNow(10) },
      { title: 'Security audit', description: 'Conduct a full security audit of the banking application.', project: project2._id, assignedTo: member2._id, createdBy: admin._id, status: 'todo', priority: 'high', dueDate: daysFromNow(-1) },
      { title: 'Employee onboarding flow', description: 'Design the employee onboarding workflow with document upload.', project: project3._id, assignedTo: member1._id, createdBy: admin._id, status: 'completed', priority: 'high', dueDate: daysFromNow(-3) },
      { title: 'Leave management module', description: 'Build leave request and approval workflow.', project: project3._id, assignedTo: member3._id, createdBy: admin._id, status: 'in-progress', priority: 'medium', dueDate: daysFromNow(5) },
      { title: 'Performance review dashboard', description: 'Create analytics dashboard for employee performance reviews.', project: project3._id, assignedTo: member1._id, createdBy: admin._id, status: 'todo', priority: 'low', dueDate: daysFromNow(20) },
      { title: 'Payroll integration', description: 'Integrate with payroll system for automated salary processing.', project: project3._id, assignedTo: member3._id, createdBy: admin._id, status: 'todo', priority: 'high', dueDate: daysFromNow(15) },
    ];

    await Task.insertMany(tasks);
    console.log('Tasks created');

    console.log('\n--- Seed Data Summary ---');
    console.log(`Users: ${await User.countDocuments()}`);
    console.log(`Projects: ${await Project.countDocuments()}`);
    console.log(`Tasks: ${await Task.countDocuments()}`);
    console.log('\nDemo Credentials:');
    console.log('Admin: admin@taskmanager.com / admin123');
    console.log('Member: sarah@taskmanager.com / member123');
    console.log('Member: mike@taskmanager.com / member123');
    console.log('Member: emily@taskmanager.com / member123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
