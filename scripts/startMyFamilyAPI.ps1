Write-Output "[myfamilyapi] Preparing to Start"
Set-Location ..
dotnet build .\api\myfamily.sln
Start-Process -FilePath "dotnet" -NoNewWindow -ArgumentList "run --project .\api\myfamily\MyFamily.Api.csproj"
Write-Output "[myfamilyapi] Started"