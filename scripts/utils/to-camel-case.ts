const toCamelCase = (str: string) => {
    return str.toLowerCase()
        .replace(
            /[-_][a-z0-9]/g,
            (group) => group.slice(-1).toUpperCase()
        );
};

export default toCamelCase;