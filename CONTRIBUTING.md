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

### Release the latest version

You will need `main` branch push permissions.

```sh
# ensure tree is clean - WARNING: will delete pending changes
git reset --hard

# get all latest changes from remote
git fetch --all --prune

# checkout latest 'main'
git checkout main
git pull

# use automated release script
npm run release

# push to let newly created tag trigger 'publish' GitHub Action
git push --follow-tags
```

### Release a non-latest minor/patch version (example)

You will need `release/*.x.x` branch push permissions.

In the following example we assume that:

- the latest version is 2.0.1
- the version 1.2.1 is being released
- we'll cherry-pick hotfixes from 2.0.1 onto 1.2.0

```sh
# ensure tree is clean - WARNING: will delete pending changes
git reset --hard

# get all latest changes from remote
git fetch --all --prune

# checkout latest available version tag
git checkout v1.2.0

# create release branch according to format
git branch release/1.x.x

# cherry-pick required fixes from `main`
git cherry-pick c6da29b
# pick appropriate commit hashes and repeat as needed

# use automated release script
npm run release

# push to trigger 'publish' GitHub Action
git push --follow-tags -u origin release/1.x.x
```
