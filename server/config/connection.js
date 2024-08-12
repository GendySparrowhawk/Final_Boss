const mongoose = require('mongoose');

const is_prod = process.env.NODE_ENV === 'production';

mongoose.connect(is_prod ? process.env.DB_URL : 'mongodb://127.0.0.1:27017/final_boss');
// const is_prod = process.env.NODE_ENV === 'production';

// const mongoURI = is_prod ? process.env.DB_URL : 'mongodb://127.0.0.1:27017/final_boss';

// if (!mongoURI) {
//   throw new Error('MongoDB URI is not defined. Please set DB_URL in your environment variables.');
// }

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;
