@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Cai Dat Goi Ten Ngoi Sao

echo ========================================================
echo   DANG TIEN HANH CAI DAT "GOI TEN NGOI SAO"
echo ========================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0create_shortcuts.ps1"

echo.
echo ========================================================
echo   DA CAI DAT THANH CONG!
echo.
echo   Bieu tuong ung dung "Goi Ten Ngoi Sao" da duoc tao tai:
echo   [1] Man hinh Desktop
echo   [2] Menu Start cua may tinh
echo.
echo   Ban co the mo ung dung ngay bay gio tu Desktop!
echo ========================================================
echo.
pause
