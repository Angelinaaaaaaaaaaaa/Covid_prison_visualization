export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "Covid_visualization/_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.cb219528.js","app":"_app/immutable/entry/app.f6f02668.js","imports":["_app/immutable/entry/start.cb219528.js","_app/immutable/chunks/vendor.11e7d0cf.js","_app/immutable/chunks/singletons.9c7ae916.js","_app/immutable/entry/app.f6f02668.js","_app/immutable/chunks/vendor.11e7d0cf.js"],"stylesheets":[],"fonts":[]},
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
