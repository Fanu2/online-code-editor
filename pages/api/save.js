// pages/api/save.js
import { v4 as uuidv4 } from 'uuid';

const snippets = {}; // In-memory storage (use a database in production)

export default function handler(req, res) {
  const { code } = req.body;
  const id = uuidv4(); // Generate a unique ID for the snippet
  snippets[id] = code;

  res.status(200).json({ id });
}
