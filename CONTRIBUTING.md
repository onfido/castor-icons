# Contributing

When contributing to this repository, please read through and get familiarised with the processes of making a change to this package.

If you have further questions please discuss the change you wish to make with the owners of this repository.

## Get ready for development

You will need Node 14 running locally.

**1. Install Node**

Use [nvm](https://github.com/nvm-sh/nvm/) to manage the different Node versions and switch between them.

To install and switch to required version run:

    nvm install && nvm use

**2. Install local Node dependencies**

    npm install

## Make a change

1.  If an icon is to be added or removed, modify the alphabetical list in the `icons.json` file accordingly. For all new icons _do not_ include prefixes in entry keys used for naming those icons, also append "-solid" for all solid icon variations.

2.  Make sure that lint passes:

    `npm run lint`

3.  Commit according to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). We support these tools:

    - Commitizen, which runs automatically on a pre-commit Git hook thanks to Husky.

    - The [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits).

4.  When opening a pull request, provide as much details as possible for a reviewer to better understand the change.

5.  Check the change manually locally _before_ you assign reviewers.

6.  When a PR is approved - **do not merge** until acceptance testing is done, and the change is ready for a release.

### Build package locally

You can build a package by running:

    npm run build

It will execute the script `scripts/build.ts` with ts-node.

It also generates an example of all icons rendered on HTML page, preview it with:

    npm run preview

## Publish new version

Only maintainers of this repository are allowed to make releases.

[Semantic Versioning 2.0.0](https://semver.org) is automatically applied and the changelog is automatically generated.

Simply run this script in the root to cut a new release:

    npm run release

Optionally you can mark it as pre-release, e.g. `1.0.0-alpha.0`

    npm run release -- --prerelease alpha

If you need to override SemVer behavior (not recommended):

    npm run release -- --release-as 1.1.0

The last line of the script's log will give you the command you need to execute to push the commit and tag.

### Release a major version (example)

In the following example we assume that the version 2.0.0 is being released:

1.  Ensure your tree is clean and run `git checkout main && git pull`.

2.  Create a new branch `release/2.x.x`, push to origin.

3.  Run `npm run release`, then follow instructions to push.

4.  GitHub Actions will publish to registry automatically.

5.  Create a pull request to merge the major version bump back to `main`.

### Release a minor/patch version (example)

In the following example we assume that the version 1.0.1 is being released:

1.  Checkout branch `git checkout release/1.x.x`.

2.  Cherry-pick required fixes from `main`.

3.  Run `npm run release`, then follow instructions to push.

4.  GitHub Actions will publish to registry automatically.
