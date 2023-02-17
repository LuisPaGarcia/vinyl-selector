const { PHASE_DEVELOPMENT_SERVER } = require('next/dist/shared/lib/constants')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    
    return [
      {
        source: '/.netlify/functions/searchArtistByQuery',
        destination: 'http://localhost:3001/.netlify/functions/searchArtistByQuery',
      },
      {
        source: '/.netlify/functions/getArtistAlbumsById',
        destination: 'http://localhost:3001/.netlify/functions/getArtistAlbumsById',
      },
      {
        source: '/.netlify/functions/getArtistAlbumCoverById',
        destination: 'http://localhost:3001/.netlify/functions/getArtistAlbumCoverById',
      }
    ]
  },
}
