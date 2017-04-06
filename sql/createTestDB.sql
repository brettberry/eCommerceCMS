create database if not exists cms;

-- create user brett@localhost identified by 'password';
grant all privileges on cms.* to brett@localhost;
flush privileges;

use cms;

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
  priceAmount varchar(10) not null,
  priceDiscount varchar(10),
  description varchar(10000),
  category varchar(100) not null,
  id bigint auto_increment primary key
);
