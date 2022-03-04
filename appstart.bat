@echo off
cd scripts
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& './startMyFamilyDB.ps1'"
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& './startElasticsearch.ps1'"
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& './migrateMyFamilyDB.ps1'"
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& './startMyFamilyAPI.ps1'"

echo "Starting My Family Application"
cd ..\app\myfamily-angularApp
npm start