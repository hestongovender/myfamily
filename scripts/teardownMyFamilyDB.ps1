Write-Output "[myfamilydb] Teardown Started"
docker stop myfamilydb
docker rm myfamilydb
docker image rm myfamilydb/mysqldb
docker images
docker ps
Write-Output "[myfamilydb] Teardown Completed"