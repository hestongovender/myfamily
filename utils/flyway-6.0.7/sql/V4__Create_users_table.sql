create table users (
    user_id int not null auto_increment primary key
   ,profile_id int not null
   ,username varchar(255)
   ,display_name varchar(255)
   ,password varchar(255)
   ,constraint FK_profile_id foreign key (profile_id) references personal_profile(profile_id)
   ,constraint UC_users unique (username)
);