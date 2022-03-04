# Family Tree

Keep track of all your immediate Family's health, education and achievement records .

# Development Notes

## Database Setup (MySQL)

The MySQL database is hosted in a docker container. 
The steps followed to setup the container are as follows:

**Standard Docker MySQL DB Image:**

```docker
docker pull mysql:latest
docker images
docker run --name ftdb -d -e MYSQL_ROOT_PASSWORD=admin -p 3306:3306 mysql:latest
```

**Custom Docker MySQL DB Image:**

*create_myfamilydb.sql*
```sql
	create table users (user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, firstname TEXT, surname TEXT, id_number INT, cellphone TEXT, email TEXT);
	insert into users (firstname, surname, id_number, cellphone, email) values('Peter', 'Parker', '6208100015084', '+27845276776', 'peter.parker@gmail.com');
	insert into users (firstname, surname, id_number, cellphone, email) values('Ben', 'Parker', '2208100015084', '+27731238763', 'ben.parker@yahoo.com');
```
*Dockerfile*
```docker
	FROM mysql:latest
	ENV MYSQL_ROOT_PASSWORD admin
	ENV MYSQL_DATABASE users
	ENV MYSQL_USER admin
	ENV MYSQL_PASSWORD admin
	ADD create_myfamilydb.sql /docker-entrypoint-initdb.d
	EXPOSE 3306
```
*Creating and running the docker image*
```docker
docker build -t myfamilydb/mysqldb .
docker images
docker run --name myfamilydb -p3306:3306 -d myfamilydb/mysqldb
```
*Connecting to the docker container*
```docker
docker exec -it myfamilydb /bin/bash
```
**Accessing the MySQL database with custom user credentials:**
```sh
mysql -uadmin -padmin
show databases;
use myfamily;
select * from users;
```

ConnectionString:
```
Data Source=localhost;Initial Catalog=myfamily;Persist Security Info=True;User ID=admin;Password=admin;
```

## Database Migration with Flyway

Flyway enables easy Database migrations with SQL scripts. 

**Website:** https://flywaydb.org/

**Get Started:** https://flywaydb.org/getstarted/firststeps/commandline

**Installation:** https://flywaydb.org/documentation/commandline/#download-and-installation

**Flyway as a Docker Container:** https://hub.docker.com/r/flyway/flyway/ executes once-off with config as sql scripts in a volume