export default async function handler(req, res) {
    console.log('Simple endpoint hit');
    res.status(200).json({ message: 'Hello, world!' });
  }