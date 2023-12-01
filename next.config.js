/** @type {import('next').NextConfig} */
const nextConfig = {
    generateEtags: false,
    env: {
        API_ADDRESS: "https://ticket-lilac.vercel.app/api"
    }
}

module.exports = nextConfig
