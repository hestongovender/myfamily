Write-Output "[myfamily-elasticsearch] Preparing to Start"
cd ..\docker_containers\elasticsearch\
docker-compose up -d
Write-Output "[myfamily-elasticsearch] Started"