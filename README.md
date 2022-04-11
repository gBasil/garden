# 🪴 Garden

A simple web archive.

![Home page](/media/home.png)
[Moar screenshots!](/screenshots.md)

## What is it?

Garden is a (somewhat) simple web archiver I wrote in a weekend, in part to toy around with Prisma and Geist UI. I chose the name "Garden" because of the feeling one gets when growing a collection.

## Features

- ✨ Modern. Powered by Next.js, Express, Geist UI, Tailwind.
- 📄 Minimal. It serves one purpose, so it should do it well.

## Installation

The only prerequisites are `wget`, as it's the magical ingredient that powers Garden, and `yarn`, which is my package manager of choice.

```bash
# Clone the repo
git clone https://github.com/gBasil/garden
cd garden

# Install dependencies, build, and run
# If you aren't using yarn, you should. It has emojis.
yarn
yarn prisma db push
yarn build
yarn start
```

Configuring Garden is pretty simple, as there isn't too much to configure. The instructions are located in the `config.js` file in the root directory, and assumes you posses at least a somewhat basic technical knowledge of computers.

## Why not just use [ArchiveBox](https://archivebox.io)?

I tried it, but I have several bones ripe for picking with ArchiveBox.

For one, you have to install a global CLI tool. I don't find myself needing to archive things often, so I don't really have a need for that, though you could argue the same about this project.

Second, it just feels like overkill. I didn't touch most of the options given to me, and the wget website downloader was the only one that seemed to work. The only thing I really care about and the only reason I'm using a website archiver in the first place is to, well, *archive websites*.
<!-- Thou art as fat as butter -->

Third, and this is just a personal preference, I don't like using things with (in my humble opinion) old interfaces.

If ArchiveBox seems like a better fit for you, go ahead and use it. It is much more mature and better than my homegrown solution.

## Structure

**Dashboard** - [Next.js](https://nextjs.org) with [Geist UI](https://geist-ui.dev) and [Tailwind CSS](https://tailwindcss.com) server running on port `3000`.

**File Server** - [Express](https://expressjs.com) server on port `3001`.

[Prisma](https://www.prisma.io) is used by both of these to interface with a SQLite database.

## Drawbacks

- No authentication.
- Exclusively developed and test on a MacBook.

If any of these are dealbreakers for you, use [ArchiveBox](https://archivebox.io) or tweak Garden yourself and submit a pull request.
