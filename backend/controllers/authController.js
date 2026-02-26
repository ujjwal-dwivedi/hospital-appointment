import sql from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const initUsersTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      "userId"  SERIAL PRIMARY KEY,
      name      VARCHAR(100) NOT NULL,
      email     VARCHAR(100) UNIQUE NOT NULL,
      password  VARCHAR(255) NOT NULL,
      role      VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'patient'))
    )
  `;
};
initUsersTable();

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['admin', 'patient'].includes(role)) {
      return res.status(400).json({ error: 'Role must be either admin or patient' });
    }

    const existing = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role})
      RETURNING "userId", name, email, role
    `;

    const user = result[0];
    const token = generateToken(user.userId, user.role);

    res.status(201).json({
      message: 'Registration successful',
      user,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.userId, user.role);

    res.json({
      message: 'Login successful',
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};