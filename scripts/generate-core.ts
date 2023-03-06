import fs from 'fs-extra';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import coreTemplate from './templates/core.template.js';

const argv = await yargs(hideBin(process.argv))
    .option('name', {
        type: 'string',
        description: `feature's name`,
        alias: 'n',
        demandOption: true,
    })
    .option('replace', {
        type: 'boolean',
        description: 'delete existing feature',
        alias: 'r',
    })
    .option('output', {
        type: 'string',
        description: 'output folder',
        alias: 'o',
        demandOption: true,
    })
    .example([
        ['npm run gen:core -n my-feature']
    ]).parseAsync();

const name = argv.name.toLowerCase();
const outputDir = argv.output;
const replace = argv.replace;

const dir = `${outputDir}/${name}`;
if (replace) {
    await fs.remove(dir);
}

const componentsDir = `${dir}/components`;
const baseComponentName = name.split('-')
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join('');

await fs.ensureDir(componentsDir);
// typescript types
await fs.writeFile(`${dir}/${name}.type.ts`, coreTemplate.type);
// services
await fs.writeFile(`${dir}/${name}.service.ts`, coreTemplate.service);
// hooks
await fs.writeFile(`${dir}/${name}.hook.ts`, coreTemplate.hook(name));
// generate components
const componentTypes = ['List', 'Create', 'Edit', 'Delete', 'Details', 'Form'];
const genComponentsPromises = componentTypes.map(type => {
    const componentName = `${baseComponentName}${type}`;
    return fs.writeFile(
        `${componentsDir}/${componentName}.tsx`,
        coreTemplate.components(name, componentName)
    );
});
await Promise.all(genComponentsPromises);

// index file
await fs.writeFile(
    `${dir}/index.tsx`,
    coreTemplate.index(name, baseComponentName, componentTypes)
);

console.log(`${dir} created successfully`);