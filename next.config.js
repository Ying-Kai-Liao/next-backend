/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [{
        protocol: 'https',
        hostname: 'qr-official.line.me',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },],
      },
}

module.exports = (nextConfig)