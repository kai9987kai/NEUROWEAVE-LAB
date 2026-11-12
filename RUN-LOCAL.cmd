@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "NEUROWEAVE LAB" http://localhost:8000
  py -m http.server 8000
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    start "NEUROWEAVE LAB" http://localhost:8000
    python -m http.server 8000
  ) else (
    echo Python was not found. You can open index.html directly, but microphone access may require localhost.
    pause
  )
)
