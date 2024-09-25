import Fastify from 'fastify';
import { transactionRoutes } from './routes/transactionRoutes';
import { testDbConnection } from './services/dbService';
import cors from '@fastify/cors'; // Import the cors plugin

const fastify = Fastify();

// Register CORS
fastify.register(cors, {
  origin: '*', // Allow all origins for development. Adjust this for production
});

// Register routes
fastify.register(transactionRoutes);

// Test database connection
async function startServer() {
  try {
    await testDbConnection();
    console.log('Database connection is working.');
  } catch (error) {
    console.error('Database connection failed.');
    process.exit(1);
  }

  fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

startServer();
