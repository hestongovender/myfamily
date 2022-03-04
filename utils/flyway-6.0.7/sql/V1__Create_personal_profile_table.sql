create table personal_profile (
    profile_id int not null auto_increment primary key
   ,firstname varchar(255)
   ,surname varchar(255)
   ,maiden_name varchar(255)
   ,identity_number varchar(255)
   ,gender varchar(255)
   ,email_address varchar(255)
   ,cellphone_number varchar(255)
   ,home_number varchar(255)
   ,work_number varchar(255)
   ,constraint uc_personal_profile unique (identity_number)
);