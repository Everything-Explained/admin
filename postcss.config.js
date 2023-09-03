export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    parser: 'postcss-scss',
    plugins: {
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
    },
};
