@echo off
git add .
git commit -m "Sync layout updates and fixes"
git pull origin main --rebase
git push origin main
