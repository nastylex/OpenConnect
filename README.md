# OpenConnect

OpenConnect is a text-only, command-line-style messaging app built with Next.js and Convex. Run the web interface locally, then use the terminal-style UI to send messages to everyone or directly to `lex`.

## Requirements

- Node.js 18.18 or newer
- npm 9 or newer
- Two terminal windows

## Setup with npm

1. Clone the repository and enter the project directory:

   ```bash
   git clone <your-repository-url>
   cd OpenConnect
   ```

2. Install the dependencies with npm:

   ```bash
   npm install
   ```

3. Start the Convex backend in the first terminal. Keep this terminal running:

   ```bash
   npx convex dev
   ```

   The first run may ask you to sign in to Convex or choose a project. Follow the prompts. Convex will generate the local connection configuration and sync backend changes live.

4. Open a second terminal window, return to the project directory, and start Next.js:

   ```bash
   cd OpenConnect
   npm run dev
   ```

5. Open the app in your browser:

   [http://localhost:3000](http://localhost:3000)

## Test sending and receiving messages

1. Open `http://localhost:3000` in your browser.
2. In the OpenConnect terminal, enter a public message and submit it. It should appear in the live message stream.
3. To send a direct message to the built-in second user, use the direct-message command shown by the terminal UI and address it to `lex`.
4. Open the app in a second browser tab or window to watch the Convex-powered stream update in real time.
5. Keep the `npx convex dev` and `npm run dev` terminals running while testing. Messages are stored in Convex and delivered through its live queries.

## Available npm commands

```bash
npm run dev    # Start the Next.js development server
npm run build  # Create a production build
npm run start  # Start the production server after npm run build
```

## Stop the local app

Press `Ctrl+C` in both terminal windows:

- First terminal: stop `npx convex dev`
- Second terminal: stop `npm run dev`

## Troubleshooting

- **`npm` is not recognized:** Install Node.js from [nodejs.org](https://nodejs.org), then reopen your terminal.
- **Convex is not connected:** Stop the process with `Ctrl+C`, run `npx convex dev` again, and complete the sign-in/project prompts.
- **Port 3000 is busy:** Start Next.js on another port with `npm run dev -- --port 3001`, then open `http://localhost:3001`.
- **The page does not update:** Confirm that both terminals are still running and check the Convex terminal for errors.

## Continue working in v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below:

[Continue working on OpenConnect in v0](https://v0.app/chat/projects/prj_SWJjHOyb32xTpYPfi3oDVDUDq27w)

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [v0 Documentation](https://v0.app/docs)
- [npm Documentation](https://docs.npmjs.com)
