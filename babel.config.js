module.exports = (api) => {
    api.cache(true);

    return {
        presets: [
            ['@babel/preset-env', { targets: '> 0.25%', useBuiltIns: 'usage', corejs: '3' }],
            ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
            ['@babel/preset-react']
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    };
};
