import type { JSX } from "react";
import type { RequestInfo } from "rwsdk/worker";
import RootErrorHandler from "./components/RootErrorHandler";

/**
 * Top-level error handler for the render tree. Exported for unit testing.
 *
 * Branches on request type, not error class:
 * - Server action requests (identified by the __rsc_action_id query param that
 *   rwsdk stamps on every action call) always get a JSON ActionState response
 *   so the form layer can surface the error.
 * - Page navigation requests always get the React RootErrorHandler component.
 */
export function handlePageError(error: unknown, { request }: RequestInfo): Response | JSX.Element {
	const isActionRequest = new URL(request.url).searchParams.has("__rsc_action_id");

	if (isActionRequest) {
		const message = error instanceof Error ? error.message : "An unexpected error occurred";
		return Response.json({ success: false, code: 500, errors: { _form: [message] } }, { status: 500 });
	}

	console.error("Unhandled error:", error);
	return <RootErrorHandler error={error as Error} />;
}
