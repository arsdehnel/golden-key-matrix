import type { RouteMiddleware } from 'rwsdk/router';

const wwwRedirect: RouteMiddleware = ({ request }) => {
	const url = new URL(request.url);

	if (url.hostname.startsWith('www.')) {
		url.hostname = url.hostname.slice(4);
		return Response.redirect(url.toString(), 301);
	}
};

export default wwwRedirect;
