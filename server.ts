import mongoose from 'mongoose';

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure!!!');
  }
}
connect();
