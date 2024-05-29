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
		client: {"start":"_app/immutable/entry/start.c9ede6ed.js","app":"_app/immutable/entry/app.6caa868b.js","imports":["_app/immutable/entry/start.c9ede6ed.js","_app/immutable/chunks/index.11e7d0cf.js","_app/immutable/chunks/singletons.f0130853.js","_app/immutable/entry/app.6caa868b.js","_app/immutable/chunks/index.11e7d0cf.js"],"stylesheets":[],"fonts":[]},
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
