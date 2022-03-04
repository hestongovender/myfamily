create table relationship (
    relationship_key int not null auto_increment primary key
   ,user_id int not null
   ,relative_id int not null
   ,relation_key int not null
   ,constraint FK_user_id foreign key (user_id) references personal_profile(profile_id)
   ,constraint FK_relative_id foreign key (relative_id) references personal_profile(profile_id)
   ,constraint FK_relation_key foreign key (relation_key) references relation(relation_key)
);