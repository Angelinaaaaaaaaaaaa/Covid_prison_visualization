export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.aac78ef5.js","app":"_app/immutable/entry/app.e1ff2716.js","imports":["_app/immutable/entry/start.aac78ef5.js","_app/immutable/chunks/index.11e7d0cf.js","_app/immutable/chunks/singletons.eb6bc46e.js","_app/immutable/entry/app.e1ff2716.js","_app/immutable/chunks/index.11e7d0cf.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
