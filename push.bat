@echo off
git add .
git commit -m "Revert to dark orange festival theme and add responsive mobile menu"
git pull origin main --rebase
git push origin main
