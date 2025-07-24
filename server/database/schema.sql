create table owner (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null,
  email varchar(255) not null unique,
  password varchar(255) not null,
  isAdmin boolean not null default false
);

create table manager (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null,
  firstname varchar(255) not null,
  email varchar(255) not null unique,
  telephone varchar(20) not null 
);

create table mobilhome (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null,
  owner_id int unsigned not null,
  manager_id int unsigned not null,
  foreign key(owner_id) references owner(id),
  foreign key(manager_id) references manager(id)
);

create table reservation (
  id int unsigned primary key auto_increment not null,
  start_date date not null,
  end_date date not null,
  mobilhome_id int unsigned not null,
  owner_id int unsigned not null,
  foreign key(mobilhome_id) references mobilhome(id),
  foreign key(owner_id) references owner(id)
);

create table vacationer (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null,
 firstname varchar(255) not null,
  age int unsigned not null
);

create table vacationer_reservation (  
  reservation_id int unsigned not null,
  vacationer_id int unsigned not null,
  primary key (reservation_id, vacationer_id),
  foreign key(reservation_id) references reservation(id),
  foreign key(vacationer_id) references vacationer(id)
);

create table owner_manager (
  owner_id int unsigned not null,
  manager_id int unsigned not null,
  primary key (owner_id, manager_id),
  foreign key(owner_id) references owner(id),
  foreign key(manager_id) references manager(id)
);

create table invoice (
  id int unsigned primary key auto_increment not null,
  description varchar(255) not null,
  amount decimal(10,2) not null,
  type ENUM('income', 'outcome') not null,
  category ENUM('siblu', 'manager', 'utilities', 'other') not null,
  date date not null,
  owner_id int unsigned not null,
  foreign key(owner_id) references owner(id)
);

insert into manager(id, name, firstname, email, telephone)
values
  (1, "Dupont", "Jean", "dupont@example.com", "06 12 34 56 78"),
  (2, "Martin", "Claire", "martin@example.com", "06 12 34 56 79");

insert into owner(id, name, email, password, isAdmin)
values
  (1, "Eric", "eric@example.com", "1234", true),
  (2, "Latifa", "latifa@example.com", "1234", false);

insert into mobilhome(id, name, owner_id, manager_id)
values
  (1, "Dunes de Contis", 1,1),
  (2, "Palavas", 2,2);

  insert into owner_manager (owner_id, manager_id)
values
  (1, 1),
  (2, 2);
