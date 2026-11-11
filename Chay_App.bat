@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Goi Ten Ngoi Sao

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python server.py
) else (
    echo Khong tim thay Python, dang mo truc tiep index.html trong trinh duyet...
    start "" "index.html"
)
