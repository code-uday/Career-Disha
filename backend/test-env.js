require('dotenv').config();

console.log('Environment variables loaded:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Key exists' : 'No key found');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'URI exists' : 'No URI found');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Secret exists' : 'No secret found');
console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE);
console.log('NODE_ENV:', process.env.NODE_ENV); 