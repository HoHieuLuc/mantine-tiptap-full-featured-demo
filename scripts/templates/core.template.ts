import toCamelCase from '../utils/to-camel-case.js';

const type = `export { };
`;

const service = `export default {

};
`;

const hook = (name: string) => {
    const camelCase = toCamelCase(name);
    return `import ${camelCase}Service from './${name}.service';

export default {

};
`;
};

const components = (name: string, componentName: string) => {
    const camelCase = toCamelCase(name);
    return `import ${camelCase}Hook from '../${name}.hook';

const ${componentName} = () => {
    return <div>${componentName}</div>;
};

export default ${componentName};
`;
};

const index = (name: string, baseComponentName: string, componentTypes: Array<string>) => {
    const camelCase = toCamelCase(name);
    return `${componentTypes.map(type => {
        const componentName = `${baseComponentName}${type}`;
        return `import ${componentName} from './components/${componentName}';`;
    }).join('\n')}

const ${baseComponentName} = () => <></>;

${componentTypes.map(type => {
        const componentName = `${baseComponentName}${type}`;
        return `${baseComponentName}.${type} = ${componentName};`;
    }).join('\n')}

export { default as ${camelCase}Hook } from './${name}.hook';
export { default as ${camelCase}Service } from './${name}.service';
export * from './${name}.type';
export default ${baseComponentName};
`;
};

export default {
    type,
    service,
    hook,
    components,
    index,
};