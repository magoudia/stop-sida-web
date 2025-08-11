@echo off
echo ========================================
echo   ONG STOP SIDA - Demarrage des services
echo ========================================
echo.

echo [1/2] Demarrage de Strapi CMS...
cd strapi-cms
start "Strapi CMS" cmd /k "npm run develop"
cd ..

echo [2/2] Demarrage de l'application React...
start "React App" cmd /k "npm run dev"

echo.
echo ========================================
echo   Services demarres avec succes !
echo ========================================
echo.
echo URLs d'acces :
echo - Application React : http://localhost:5173
echo - Strapi Admin : http://localhost:1337/admin
echo - API Strapi : http://localhost:1337/api
echo.
echo Appuyez sur une touche pour fermer cette fenetre...
pause > nul 