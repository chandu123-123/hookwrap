import { RateLimiterMemory } from 'rate-limiter-flexible';

// Configure rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of points
  duration: 60, // Per second(s)
});

export async function applyRateLimit(req) {
  try {
    // Use IP or another unique identifier
    const ip = req.headers.get('x-forwarded-for') || req.connection.remoteAddress;

    // Consume a point
    await rateLimiter.consume(ip);
  } catch (error) {
    // Throw error if rate limit is exceeded
    throw new Error('Too many requests, please try again later.');
  }
}
