@echo off
git init
git add .
git commit -m "Initial commit - Vishal Cart"
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Khedkar1512/vishal-cart.git
git push -u origin main
