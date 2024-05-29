export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.6e6d3e03.js","app":"_app/immutable/entry/app.878e0b5e.js","imports":["_app/immutable/entry/start.6e6d3e03.js","_app/immutable/chunks/vendor.11e7d0cf.js","_app/immutable/chunks/singletons.df6c114d.js","_app/immutable/entry/app.878e0b5e.js","_app/immutable/chunks/vendor.11e7d0cf.js"],"stylesheets":[],"fonts":[]},
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
