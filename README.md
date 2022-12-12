# Slack Airtable Sales CRM Integration

This is a Slack app that integrates with Airtable to streamline sales workflow. It uses the [Bolt for JavaScript](https://slack.dev/bolt-js/tutorial/getting-started) framework.

## What it does

This app allows you to:

- Notify your team when a new opportunity is added to Airtable
- Notify your team when an oppotunity status is updated
- Slack commands to view and update opportunities

## Architecture

This app is built using the [Bolt for JavaScript](https://slack.dev/bolt-js/tutorial/getting-started) framework. It uses the [Airtable API](https://airtable.com/api) to read and write data to Airtable.

![Architecture Diagram](/assets/architecture.png?raw=true "Architecture Diagram")

#### Environment Variables
Before you can run the app, you'll need to store some environment variables.

1. Rename `.env.sample` to `.env`
2. Open your apps configuration page from [this list](https://api.slack.com/apps), click *OAuth & Permissions* in the left hand menu, then copy the *Bot User OAuth Token* into your `.env` file under `SLACK_BOT_TOKEN`
3. Click *Basic Information* from the left hand menu and follow the steps in the *App-Level Tokens* section to create an app-level token with the `connections:write` scope. Copy that token into your `.env` as `SLACK_APP_TOKEN`.

### Setup Your Local Project
```zsh
# Install dependencies
npm install

# Run Bolt server
npm start
```

#### Linting
```zsh
# Run eslint for code formatting and linting
npm run lint
```

## Project Structure

### `manifest.json`

`manifest.json` is a configuration for Slack apps. With a manifest, you can create an app with a pre-defined configuration, or adjust the configuration of an existing app.

### `app.js`

`app.js` is the entry point for the application and is the file you'll run to start the server. This project aims to keep this file as thin as possible, primarily using it as a way to route inbound requests.

### `/slack/listeners`

Every incoming request is routed to a "listener". Inside this directory, we group each listener based on the Slack Platform feature used, so `/slack//listeners/commands` contains all the listeners for Slack commands. Each listener is a function that takes a `payload` and `context` as arguments. The `payload` is the data sent from Slack, and the `context` is a set of utilities provided by Bolt.

### `/slack/user-interfaces`

This directory contains all the code for building Slack user interfaces.

### `/airtable`

This directory contains all the code for interacting with Airtable. It contains a `base.js` file that exports a configured Airtable base, and a `records.js` file that exports functions for interacting with Airtable records.

