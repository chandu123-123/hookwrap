/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Remove all console logs
         removeConsole: process.env.NODE_ENV === "production"
      },
      swcMinify: true, 
      terserOptions: {
        compress: {
          drop_console: true,  // Ensure console logs are removed
        },
        output: {
          comments: false,  // Remove comments in production build
        },
      },
};

export default nextConfig;
