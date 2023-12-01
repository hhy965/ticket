/** @type {import('next').NextConfig} */
const nextConfig = {
    generateEtags: false,
    env: {
        API_ADDRESS: "http://localhost:3000/api"
    }
}

module.exports = nextConfig
