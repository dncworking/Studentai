import { sql } from "../config/db.js";

export const getUserByEmailM = async (email) => {
  const data = await sql`
    SELECT * FROM users
    WHERE email = ${email}`;
  return data[0];
};

export const getUserByIDM = async (user_id) => {
  const data = await sql`
    SELECT * FROM users
    WHERE id = ${user_id}`;
  return data[0];
};

export const createUserM = async (userData) => {
  const { username, email, password } = userData;

  const data = await sql`
    INSERT INTO users (username, email, password)
    VALUES (${username},${email},${password})
    RETURNING id, username, email`;
  return data[0];
};
