import toCamelCase from './to-camel-case.js';

const toPascalCase = (str: string) => {
    const [first, ...rest] = toCamelCase(str);
    return first.toUpperCase() + rest.join('');
};

export default toPascalCase;