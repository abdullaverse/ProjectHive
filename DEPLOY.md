# 🚀 ProjectHive Deployment Guide

Deploying your project means making it live so anyone can visit it on the internet. We will use **GitHub** and **Vercel** because they are free and easy.

---

### 📂 What your GitHub should look like:
When you open your project on GitHub, it **MUST** look like this:
- `backend/` (Folder)
- `frontend/` (Folder)
- `.gitignore` (File)
- `DEPLOY.md` (File)
- `package.json` (Inside frontend folder)

**Do NOT upload the `node_modules` folder.** It will break the hosting!

---

### 📂 How to Upload Folders (The Right Way)
GitHub's "Upload Files" button **does not work** for folders. To upload your `backend` and `frontend` folders correctly, you **MUST** use [GitHub Desktop](https://desktop.github.com/).

### 🏹 Should I use One or Two Repositories?
You have two choices. Choose the one that feels easier for you:

#### Option A: Two Separate Repos (Easier for Beginners)
1. **Repo 1**: Create a repository named `ProjectHive-Frontend` and upload ONLY the contents of your `frontend` folder.
2. **Repo 2**: Create a repository named `ProjectHive-Backend` and upload ONLY the contents of your `backend` folder.
*This makes it easier to connect to Vercel (Frontend) and Render (Backend) separately.*

#### Option B: One Single Repo (Monorepo)
- Keeps everything in one place (what we currently have).
- Requires setting the "Root Directory" to `frontend` or `backend` in your hosting settings.

---

### Step 1: Put your code on GitHub 📁
GitHub is like a "Cloud Storage" for your code.
1. Download and install [GitHub Desktop](https://desktop.github.com/).
2. Open it and click **"Add Existing Repository"**.
3. Choose your `ProjectHive` folder.
4. Click **"Publish Repository"**. 
5. *Important:* Make sure "Keep this code private" is **checked** if you don't want others to see your database keys.

---

### Step 2: Make the Website Live with Vercel 🌐
Vercel will take your code from GitHub and give you a real link (like `projecthive.vercel.app`).
1. Go to [Vercel.com](https://vercel.com) and sign up with your GitHub account.
2. Click **"Add New" > "Project"**.
3. Import your `ProjectHive` repository.
4. In the settings, add your **Environment Variables** (copy them from your `.env` file).
5. Click **"Deploy"**.

---

### 💡 Why two steps?
- **GitHub** = Your "Save Game" (keeps your code safe).
- **Vercel** = Your "Console" (runs the game for others to play).

---

### 🚂 THE EASIEST WAY: Railway.app (All-in-One)
If Vercel feels too split up, you can use **Railway.app**. It handles both Frontend and Backend in ONE place.
1. Go to [Railway.app](https://railway.app/) and sign in with GitHub.
2. Click **"New Project" > "Deploy from GitHub repo"**.
3. It will auto-detect everything. 
4. Just add your **Environment Variables** (from `.env`) in the "Variables" tab.
5. It will give you a single link for your whole project!

---

### 🌐 Custom Domain (on GitHub / Vercel)
If you bought a domain (like `www.projecthive.in`), here is how to link it:

#### If using Vercel (Recommended):
1. In Vercel, go to **Settings > Domains**.
2. Type your domain and click **Add**.
3. Copy the "DNS Record" value Vercel gives you and paste it into your domain provider's dashboard (like GoDaddy).

#### If using GitHub Pages:
1. Go to your GitHub Repository **Settings**.
2. Click **Pages** on the left menu.
3. Under **Custom domain**, type your domain and click **Save**.
4. You will also need to add "A Records" or a "CNAME" in your domain provider's dashboard using GitHub's IP addresses.

---

### 🛠️ How to "Start Fresh" (Fix the Error)
If your GitHub is messy and has `node_modules`, do this:
1. **GitHub.com**: Go to your repository settings and **Delete the Repository** (at the very bottom).
2. **Local Folder**: 
   - Right-click and **Delete** the `.git` folder (it might be hidden).
   - Ensure the `.gitignore` file I made is still there.
3. **New Start**:
   - Create a brand new repository on GitHub.
   - Use **GitHub Desktop** to "Add Existing Repository" and publish it again. 
   - *Result:* GitHub Desktop will automatically skip all the "bad" folders and only push the clean code!

---

### Need help?
If you get stuck on any specific button, just take a screenshot and show me! 🐝
