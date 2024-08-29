// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono:wght@400;500;700&display=swap'
                }
            ]
        }
    },
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-icons',
        '@nuxt/image',
        '@pinia/nuxt'
    ],
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
