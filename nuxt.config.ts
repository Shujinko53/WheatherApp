// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
	modules: [
		'@nuxt/image',
		'nuxt-icons',
		['@nuxtjs/google-fonts', {
			families: {
				Roboto: true,
				Lato: {
					wght: [300, 400, 700],
					ital: [300]
				},
			},
		}],
	],
	css: ['~/assets/scss/bundle.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					additionalData: '@use "~/assets/scss/shared/_variables.scss" as *;',
				}
			}
		}
	},
})
