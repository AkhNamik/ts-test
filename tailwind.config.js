/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        fontFamily: {
            'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
            'mono': ['Roboto Mono', 'ui-monospace', 'SFMono-Regular'],
        },
        fontWeight: {
            'regular': 400,
            'medium': 500,
            'bold': 700,
        },
        extend: {
            backgroundColor: {
                'card-default': 'var(--bg-card-default)',
                'card-light': 'var(--bg-card-light)',
                'light-action': 'var(--bg-light-action)',
                'main-40': 'var(--bg-main-40)',
                'main-100': 'var(--bg-main-100)',
                'gradient-main': 'var(--bg-gradient-main)',
                'white-10': 'var(--white-10)',
                'white-100': 'var(--white-100)',
                'white-7': 'var(--white-7)',
                'black-20': 'var(--black-20)',
                'accent-100': 'var(--accent-100)',
                'accent-hover': 'var(--accent-hover)',
            },
            textColor: {
                'black-100': 'var(--black-100)',
                'black-70': 'var(--black-70)',
                'black-50': 'var(--black-50)',
                'black-40': 'var(--black-40)',
                'black-30': 'var(--black-30)',
                'black-20': 'var(--black-20)',
                'black-10': 'var(--black-10)',
                'white-100': 'var(--white-100)',
                'white-80': 'var(--white-80)',
                'white-60': 'var(--white-60)',
                'white-30': 'var(--white-30)',
                'white-20': 'var(--white-20)',
                'white-15': 'var(--white-15)',
                'white-10': 'var(--white-10)',
                'white-7': 'var(--white-7)',
                'white-5': 'var(--white-5)',
                'accent-100': 'var(--accent-100)',
                'accent-light-100': 'var(--accent-light-100)',
                'accent-hover': 'var(--accent-hover)',
                'green-100': 'var(--green-100)',
                'orange-100': 'var(--orange-100)',
                'red-100': 'var(--red-100)',
                'wear-FN': 'var(--wear-FN)',
                'wear-MW': 'var(--wear-MW)',
                'wear-FT': 'var(--wear-FT)',
                'wear-WW': 'var(--wear-WW)',
                'wear-BS': 'var(--wear-BS)',
            },
            colors: {
                'green-100': 'var(--green-100)',
                'white-20': 'var(--white-20)',
                'white-10': 'var(--white-10)',
                'accent-100': 'var(--accent-100)',
                'accent-light-100': 'var(--accent-light-100)',
                'red-100': 'var(--red-100)',
            }
        }
    },
    plugins: [],
}

