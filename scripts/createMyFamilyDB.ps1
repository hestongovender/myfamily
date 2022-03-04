Write-Output "[myfamilydb] Setup Started"
docker build -t myfamilydb/mysqldb ../docker_containers/myfamilydb/
docker run --name myfamilydb -p3306:3306 -d myfamilydb/mysqldb
docker ps
Write-Output "[myfamilydb] Setup Completed"