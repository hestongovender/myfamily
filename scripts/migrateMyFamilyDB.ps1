Write-Output "[myfamilydb] Migration to latest version Started"
cd ..\utils\flyway-6.0.7\
.\flyway migrate
Write-Output "[myfamilydb] Migration to latest version Completed"