/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Remove all console logs
         removeConsole: process.env.NODE_ENV === "production"
      },
};

export default nextConfig;
