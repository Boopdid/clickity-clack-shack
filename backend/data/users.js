import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Peter Vrutneski',
    email: 'pvrutneski@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Boop Did',
    email: 'boopdid@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
