create database if not exists cms;

-- create user brett@localhost identified by 'password';
grant all privileges on cms.* to brett@localhost;
flush privileges;

use cms;

-- Product Tables --

create table media (
  url varchar(1000) not null,
  id bigint auto_increment primary key
);

create table tag (
  tagName varchar(100) not null,
  pathName varchar(100) not null,
  id bigint auto_increment primary key
);

create table product_tag (
  productId bigint,
  tagId bigint,
  unique key product_tag_key(productId, tagId),
  foreign key fk_tag(tagId) references tag(id)
);

create table product_media (
  productId bigint,
  mediaId bigint,
  unique key product_media_key(productId, mediaId),
  foreign key fk_media(mediaId) references media(id)
);

create table product (
  fullName varchar(100) not null unique,
  pathName varchar(100) not null unique,
  priceAmount decimal(6, 2) not null,
  priceDiscount decimal(6, 2),
  description varchar(10000),
  category varchar(100) not null,
  id bigint auto_increment primary key
);

-- Addresses Tables --

create table billing_address (
  firstName varchar(100) not null,
  lastName varchar(100) not null,
  addressLine1 varchar(1000) not null,
  addressLine2 varchar(1000),
  city varchar(100) not null,
  state varchar(100) not null,
  zip varchar(10) not null,
  phone varchar(100) not null,
  email varchar(100) not null,
  id bigint auto_increment primary key,
  userId bigint
);

create table shipping_address (
  firstName varchar(100) not null,
  lastName varchar(100) not null,
  addressLine1 varchar(1000) not null,
  addressLine2 varchar(1000),
  city varchar(100) not null,
  state varchar(100) not null,
  zip varchar(10) not null,
  id bigint auto_increment primary key,
  userId bigint
);

-- Order Tables --

create table `order` (
  userId bigint,
  created timestamp,
  updated timestamp,
  total decimal(6, 2) not null,
  id bigint auto_increment primary key
);

create table ordered_product (
  productId bigint not null,
  orderId bigint not null,
  price decimal(6, 2) not null,
  quantity int not null,
  id bigint auto_increment primary key,
  foreign key fk_order(orderId) references `order`(id),
  foreign key fk_product(productId) references product(id)
);
