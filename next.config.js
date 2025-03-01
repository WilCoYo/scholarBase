module.exports = {
    async rewrites() {
      return [
        {
          source: '/about',
          destination: '/',
        },
      ]
    },
  }

  module.exports = {
    async redirects() {
      return [
        {
          source: '/about',
          destination: '/',
          permanent: true,
        },
      ]
    },
  }