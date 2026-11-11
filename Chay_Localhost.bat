@echo off
chcp 65001 >nul
cd /d "%~dp0"
title May Chu Localhost - Goi Ten Ngoi Sao

echo ========================================================
echo   🌟 DANG KHOI DONG MAY CHU LOCALHOST (PORT 8000)
echo ========================================================
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python server.py
) else (
    echo Khong tim thay Python tren may!
    echo Dang mo truc tiep index.html trong trinh duyet...
    start "" "index.html"
)
pause
