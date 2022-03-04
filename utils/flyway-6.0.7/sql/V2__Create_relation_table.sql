create table relation (
    relation_key int not null auto_increment primary key
   ,relation_description varchar(255)
   ,constraint UC_relation unique (relation_description)
);

-- relation (enum) data
insert into myfamily.relation (relation_description) values('parent');
insert into myfamily.relation (relation_description) values('sibling');
insert into myfamily.relation (relation_description) values('spouse');
insert into myfamily.relation (relation_description) values('child');
