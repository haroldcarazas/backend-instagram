create table users(
	user_id int primary key auto_increment,
	f_name varchar(150) not null,
	m_name varchar(150),
	l_name varchar(150) not null,
	username varchar(200) not null unique,
	email varchar(250) not null unique,
	password varchar(250) not null,
	image varchar(150)
);