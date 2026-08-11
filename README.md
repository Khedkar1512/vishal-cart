# Vishal Cart

A premium, modern 60-second automatic cinematic e-commerce launch webpage. It functions like a high-energy advertising video commercial that runs automatically upon loading, featuring an elegant burgundy and champagne editorial theme.

## Live Deployment Link
👉 [https://vishal-cart.onrender.com](https://vishal-cart.onrender.com) *(Placeholder)*

## Technologies Used
- **React 18**: Frontend component architecture.
- **TypeScript**: Static typing for clean, maintainable code.
- **Framer Motion**: Drives the automatic 60-second animation timeline, parallax, and transitions.
- **Vite**: Ultra-fast build tool and development server.
- **Lucide React**: Premium icon pack.
- **Vanilla CSS**: Clean layout, glassmorphism panel styles, and global styling.
- **Google Fonts**: Custom typography (`Playfair Display` for elegance, `Dancing Script` for cursive branding, `Inter` for UI text).

---

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

---

## Deployment Steps on Render (Static Site)

Follow these steps to host **Vishal Cart** for free on [Render](https://render.com/):

### 1. Push Your Code to GitHub
1. Initialize a Git repository if you haven't already:
   ```bash
   git init
   ```
2. Add your files and commit them:
   ```bash
   git add .
   git commit -m "Initial commit - Vishal Cart"
   ```
3. Create a new repository on GitHub and link it:
   ```bash
   git remote add origin https://github.com/your-username/vishal-cart.git
   git branch -M main
   git push -u origin main
   ```

### 2. Connect to Render
1. Log in or sign up at [Render Dashboard](https://dashboard.render.com/).
2. Click the blue **New +** button in the top right and select **Static Site**.
3. Link your GitHub account and select your `vishal-cart` repository from the list.

### 3. Configure the Build Settings
Fill in the following fields on the configuration page:
- **Name**: `vishal-cart`
- **Region**: Select the region closest to your users.
- **Branch**: `main`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Plan**: Select **Free**.

### 4. Deploy
1. Click the **Create Static Site** button at the bottom of the page.
2. Render will download the code, install dependencies, compile the Vite app, and build your files.
3. Once the build log says `Publishing...`, your site will be live! Render will provide your URL (e.g. `https://vishal-cart.onrender.com`).
