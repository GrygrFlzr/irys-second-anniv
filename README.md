# IRyS Second Anniversary Project

Managed by IRyS' Stage community members.
Join us on the Discord server's `#2nd-anniversary-project` channel and the Programming thread inside it!

## Preparing

Make sure to have the following:

- Node 18
- git
- pnpm (replaces npm as a node package manager)

You can install pnpm via npm:

```bash
npm i -g pnpm
```

And then install the project dependencies:

```bash
pnpm i
```

It is recommended to use VS Code with the following extensions:

- Svelte for VS Code (`svelte.svelte-vscode`)
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier - Code formatter (`esbenp.prettier-vscode`)

Additionally, enabling **Format on save** (`editor.formatOnSave`) will avoid having to run Prettier manually (`pnpm format`).

It is _highly_ recommended to run the following commands to configure git for this repository:

```sh
git config merge.conflictstyle diff3
git config pull.rebase true
```

This makes merging much easier for git-based projects.

## Developing

To run a development server:

```sh
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev --open
```

## Building

To create a production version of the app:

```sh
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Contributing

Request access by pinging `@grygrflzr` in the IRyS Stage Discord server.
Push changes to either a branch or a fork and make a Pull Request when you are ready to get it reviewed.
The `main` branch should almost never be directly pushed to.

## License

[MIT](https://github.com/GrygrFlzr/irys-second-anniv/blob/main/LICENSE.md)
