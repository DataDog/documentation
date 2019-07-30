const entries = [
// Scripts
	{
		name: '@babel/polyfill',
		path: '@babel/polyfill'
	},
	{
		name: 'main-dd-js',
		path: './scripts/index.js'
	},
	{
		name: 'main-dd-css',
		path: './styles/style.scss'
	}
];

// Given a name and a mode, include the needed utilities in the entry
const getEntry = (name) => {
	const entry = entries.find(entryPoint => entryPoint.name === name);

	const {path} = entry;

	return Object.assign({}, entry, {
		path
	});
};

module.exports = {
	entries,
	getEntry,
	getAllEntryNames: () => entries.map(entry => entry.name)
};