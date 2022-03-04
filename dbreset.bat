cd scripts
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& './teardownMyFamilyDB.ps1'"
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& './createMyFamilyDB.ps1'"
PowerShell Start-Sleep -s 30
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& './migrateMyFamilyDB.ps1'"
