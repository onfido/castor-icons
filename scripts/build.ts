import { spawnSync } from 'child_process';
import { loopWhile } from 'deasync';
import {
  appendFileSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { glob } from 'glob';
import { join, resolve } from 'path';
import SVGSpriter from 'svg-sprite';
import icons from '../src/icons.json';

const rootPath = resolve('.');

const distDest = join(rootPath, 'dist');
spawnSync('rm', ['-rf', distDest], { shell: true });
mkdirSync(distDest);

const svgDest = join(distDest, 'svg');
!existsSync(svgDest) && mkdirSync(svgDest);
const tsDest = join(distDest, 'ts');
!existsSync(tsDest) && mkdirSync(tsDest);

const publicDest = join(rootPath, 'public');
spawnSync('rm', ['-rf', publicDest], { shell: true });
mkdirSync(publicDest);

/**
 * Generates:
 * dist/svg/icon-*.svg
 *
 * Copies over all SVG assets listen in `icons.json` file, prefixes every icon
 * with `icon-`.
 */

const iconNames: string[] = Object.entries(icons).map(([name, path]) => {
  const src = join(rootPath, path as string);
  const dest = join(svgDest, `icon-${name}.svg`);

  copyFileSync(src, dest);

  return name;
});

/**
 * Generates:
 * dist/svg/icons.svg
 *
 * Creates the symbolic SVG sprite, removes prefix and file extension when
 * generating shape IDs.
 */

const spriter = new SVGSpriter({
  shape: {
    id: {
      generator: (fileName: string) => {
        const [, iconName] = fileName.match(
          /^icon-(.+)\.svg$/
        ) as RegExpMatchArray;

        return iconName;
      },
    },
  },
  mode: {
    symbol: {
      dest: svgDest,
      sprite: 'icons.svg',
      inline: true,
      example: {
        template: join(rootPath, 'templates', 'example.html'),
        dest: join(publicDest, 'index.html'),
      },
    } as SVGSpriter.DefsAndSymbolSpecificModeConfig,
  },
});

glob.sync('icon-*.svg', { cwd: svgDest }).forEach((fileName) => {
  const filePath = join(svgDest, fileName);
  const fileContent = readFileSync(filePath, { encoding: 'utf-8' });

  spriter.add(filePath, fileName, fileContent);
});

let compilationDone = false;
spriter.compile((error, result) => {
  if (error) throw error;

  for (const mode in result) {
    for (const type in result[mode]) {
      writeFileSync(result[mode][type].path, result[mode][type].contents);
      compilationDone = true;
    }
  }
});
loopWhile(() => !compilationDone);

/**
 * Generates:
 * dist/ts/*.tsx
 *
 * Creates React components out of the SVG assets.
 */

spawnSync('svgr', [`--out-dir=${tsDest}`, svgDest], { shell: true });

// 'react-jsx' factory workaround: for TypeScript users with other 'jsx'
// factories such as 'react', necessary until we introduce a breaking change
// that declares a dependency on that factory or find a more elegant solution
readdirSync(tsDest)
  .filter((f) => f !== 'index.ts')
  .forEach((file) =>
    appendFileSync(
      join(tsDest, file),
      `
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const React: unknown;
`
    )
  );

/**
 * Appends to:
 * dist/ts/index.ts
 *
 * Adds the list of icon names and the IconName type.
 */
const tsIndexFileContent = `
export const iconNames = [${iconNames.map(
  (iconName) => `'${iconName}'`
)}] as const;
export type IconName = typeof iconNames[number];
`;

appendFileSync(join(tsDest, 'index.ts'), tsIndexFileContent);

/**
 * Generates:
 * dist/js/*.js
 *
 * Compiles components (and an index) to JavaScript.
 */

spawnSync('tsc', ['-p tsconfig.generated.json'], { shell: true });

/**
 * Generates:
 * dist/package.json
 *
 * Reads the original `package.json` file, picks only needed entries, then adds
 * references to main file and types. Also, adds some additional entries that
 * are needed just for webpack bundler.
 */

const packageFileSrc = join(rootPath, 'package.json');
const packageFileDest = join(distDest, 'package.json');

const packageFileData = JSON.parse(readFileSync(packageFileSrc).toString());

writeFileSync(
  packageFileDest,
  JSON.stringify(
    {
      ...Object.fromEntries(
        Object.entries(packageFileData).filter(([key]) =>
          [
            'name',
            'version',
            'description',
            'author',
            'license',
            'repository',
            'bugs',
            'homepage',
            'main',
            'types',
            'module',
            'sideEffects',
            'peerDependencies',
          ].includes(key)
        )
      ),
      type: 'module',
    },
    null,
    2
  )
);

/**
 * Generates:
 * dist/CHANGELOG.md
 * dist/README.md
 *
 * Copies over the original `CHANGELOG.md` and `README.md` files.
 */

['CHANGELOG.md', 'README.md'].forEach((fileName) => {
  const fileSrc = join(rootPath, fileName);
  const fileDest = join(distDest, fileName);

  copyFileSync(fileSrc, fileDest);
});
