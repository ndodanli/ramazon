CREATE DATABASE ramazon;

CREATE TABLE products(
product_id SERIAL PRIMARY KEY,
image VARCHAR(255),
brand VARCHAR(255),
price integer,
category VARCHAR(255),
count_in_stock integer,
description VARCHAR(255),
);

CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
username VARCHAR(255),
password VARCHAR(255),
name VARCHAR(255),
email VARCHAR(255),
is_admin boolean,
);
