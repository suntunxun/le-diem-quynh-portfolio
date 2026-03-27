import { config, collection, fields } from '@keystatic/core';

export default config({
	storage: {
		kind: 'github',
		repo: 'suntunxun/le-diem-quynh-portfolio',
	},
	collections: {
		works: collection({
			label: 'Works',
			slugField: 'title',
			path: 'src/content/works/*',
			format: { contentField: 'body' },
			schema: {
				title: fields.slug({
					name: { label: 'Title' },
				}),
				year: fields.number({
					label: 'Year',
					validation: { isRequired: true },
				}),
				category: fields.select({
					label: 'Category',
					options: [
						{ label: 'Film', value: 'film' },
						{ label: 'Music Video', value: 'music-video' },
						{ label: 'Commercial', value: 'commercial' },
					],
					defaultValue: 'film',
				}),
				role: fields.text({
					label: 'Role',
					validation: { isRequired: true },
				}),
				client: fields.text({
					label: 'Client / Artist',
				}),
				duration: fields.text({
					label: 'Duration',
				}),
				thumbnail: fields.text({
					label: 'Thumbnail URL (16:9)',
				}),
				videoUrl: fields.text({
					label: 'Video URL (YouTube / Vimeo)',
				}),
				stills: fields.array(
					fields.text({ label: 'URL' }),
					{
						label: 'Stills',
						itemLabel: (props) => props.value || 'Still URL',
					}
				),
				description: fields.text({
					label: 'SEO Description',
					multiline: true,
					validation: { isRequired: true },
				}),
				featured: fields.checkbox({
					label: 'Featured',
					defaultValue: false,
				}),
				pubDate: fields.date({
					label: 'Publication Date',
					validation: { isRequired: true },
				}),
				body: fields.markdoc({
					label: 'Content',
				}),
			},
		}),
	},
});
