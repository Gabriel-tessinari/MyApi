CREATE DATABASE gtcm-api;

CREATE EXTENSION pgcrypto;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name varchar(30) NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

INSERT INTO users (name, email, password) VALUES (
  'test',
  'test@mail.com',
  crypt('testspassword', gen_salt('bf'))
);