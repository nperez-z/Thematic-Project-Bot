# Discord Bot

## Overview
This is a Discord bot built with JavaScript using Node.js. The bot currently has an ai gamer personality and will reply with /ping.
## Prerequisites
To set up and run the bot, you will need the following:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Git](https://git-scm.com/) (Optional, but useful for version control)
- A Discord bot token (see setup guide below)
- The bot's `GUILD_ID` and `CLIENT_ID` (see setup guide below)
- **Gemini API Key** (see instructions below to obtain)

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/Kek-Lord/Thematic-Project-Bot
```

### 2. Install Dependencies
```sh
npm install
```

This will install all necessary packages listed in `package.json`.

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:

```
DISCORD_TOKEN=your-bot-token
GUILD_ID=your-guild-id
CLIENT_ID=your-client-id
GEMINI_API_KEY=your-gemini-api-key
```

Replace `your-bot-token`, `your-guild-id`, `your-client-id`, and `your-gemini-api-key` with actual values obtained from the Discord Developer Portal.

## Setting Up the Bot on Discord Developer Portal

### 1. Create a New Bot
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** and give it a name.
3. Navigate to **Bot** (left sidebar) and click **Add Bot**.
4. Click **Reset Token** and copy the **Discord Token** (save this for later).

### 2. Get the `CLIENT_ID`
1. In the **General Information** section, copy the **Application ID**—this is your `CLIENT_ID`.

### 3. Get the `GUILD_ID`
1. Open Discord and go to your server.
2. Enable **Developer Mode** in Discord: `User Settings` > `Advanced` > Enable **Developer Mode**.
3. Right-click on the server name and select **Copy ID**—this is your `GUILD_ID`.

### 4. Invite the Bot to Your Server
Use the following URL, replacing `CLIENT_ID` with your bot's actual client ID:

```
https://discord.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=8
```

If the above invite gives the error when running the command to deploy the slash commands "You are not authorized to perform this action on this application":
1. Open the [Discord Developer Portal](https://discord.com/developers/applications)
2. Navigate to OAuth2
3. Make sure the boxes are filled in: "bot", "application.commands"
4. Scroll down, and give administrator permissions for ensuring it will work.
5. Copy the URL and paste it into your browser. You may need to kick the bot, then re-invite it with the URL if this doesn't help. (also make sure to get the new client_id from the bot, as it will change if you kick and re-invite it)

## Getting the Gemini API Key (Free Version)

To use the Gemini API (free version) for generating responses with your Discord bot, follow these steps:

### 1. Sign Up for Google Cloud
- Visit the [Google Cloud Console](https://console.cloud.google.com/).
- If you don’t have a Google account, create one, and then sign in.

### 2. Create a New Project
- In the Google Cloud Console, click on the **Select a project** dropdown at the top.
- Click **New Project** and enter a name for your project.
- Click **Create**.

### 3. Enable the Gemini API
- In the **Google Cloud Console**, go to the **API & Services** > **Library**.
- Search for "Gemini API" or "Google Generative AI".
- Click on **Google Generative AI API** and then click **Enable**.

### 4. Side note:
- Do not enable billing or give any payment information as if you do, and use the incorrect version you could be charged.
- You do not need to enable billing to use the free tier for the api and I would not suggest doing so.

### 5. Get Your API Key
- In the **Google Cloud Console**, go to **APIs & Services** > **Credentials**.
- Click **Create Credentials** and select **API Key**.
- Your new API key will appear. Copy it and save it somewhere safe.

### 6. Add the API Key to Your Project
- Go to your project folder.
- In the `.env` file, add the following line, replacing `your-gemini-api-key` with the key you just copied:



## Running the Bot
Once everything is set up, start the bot with:
```sh
node index.js
```

## Deploying Slash Commands
To actually use the slash commands, you need to deploy them with the script below:
```sh
node deploy-commands.js
```

Side note: if the command isn't working, check which directory your terminal is in, and cd into the corresponding directory.

## Contributing
1. **Create a new branch** before making changes: `git checkout -b feature-name`
2. **Commit your changes**: `git commit -m "Added new feature"`
3. **Push to the repository**: `git push origin feature-name`
4. Open a **Pull Request** on GitHub for review.

## Final Notes
1. If you are having issues with your code editor giving you errors, you can just delete the eslint.config.js file from the workspace, although I'd recommend you keep it to keep code appearance consistent between updates.
2. It's useful to have this bot set up in your own "test" server for the bot development

## License
This project is open-source under the MIT License.

