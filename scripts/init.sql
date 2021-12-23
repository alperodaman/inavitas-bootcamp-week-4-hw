SELECT 'CREATE DATABASE bootcamp-week-4-hw'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'bootcamp-week-4-hw')
\gexec

CREATE TABLE vehicle (
	id serial PRIMARY KEY,
	vehicle_plate varchar ( 20 ) UNIQUE NOT NULL,
	current_status serial NOT NULL,
	is_active boolean NOT NULL
);

CREATE TABLE devices (
	id serial PRIMARY KEY,
	vehicle_id serial UNIQUE NOT NULL,
	device_type_id serial NOT NULL,
	device_name varchar ( 75 ) NOT NULL,
	is_online boolean NOT NULL,
	is_active boolean NOT NULL
);

CREATE TABLE devices_type (
	id serial PRIMARY KEY,
	type_name varchar ( 75 ) NOT NULL,
	type_description varchar ( 225 ) NOT NULL,
	is_active boolean NOT NULL
);

CREATE TABLE log_temperature (
	id serial PRIMARY KEY,
	vehicle_id serial UNIQUE NOT NULL,
	device_id serial UNIQUE NOT NULL,
	read_Data varchar ( 50 ) NOT NULL,
	created_at timestamp NOT NULL
);

CREATE TABLE log_location (
	id serial PRIMARY KEY,
	vehicle_id serial UNIQUE NOT NULL,
	device_id serial UNIQUE NOT NULL,
	latitude varchar ( 50 ) NOT NULL,
	longitude varchar ( 50 ) NOT NULL,
	created_at timestamp NOT NULL
);

-- INSERT INTO posts (name, post_date) values ('test', '2019-10-19 23:30:01'),('test2', '2019-10-19 23:32:01');