Write-Host "========================================" -ForegroundColor Green
Write-Host "  ONG STOP SIDA - Demarrage des services" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "[1/2] Demarrage de Strapi CMS..." -ForegroundColor Yellow
Set-Location "strapi-cms"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run develop" -WindowStyle Normal
Set-Location ".."

Write-Host "[2/2] Demarrage de l'application React..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Services demarres avec succes !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "URLs d'acces :" -ForegroundColor Cyan
Write-Host "- Application React : http://localhost:5173" -ForegroundColor White
Write-Host "- Strapi Admin : http://localhost:1337/admin" -ForegroundColor White
Write-Host "- API Strapi : http://localhost:1337/api" -ForegroundColor White
Write-Host ""
Write-Host "Appuyez sur une touche pour fermer cette fenetre..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 