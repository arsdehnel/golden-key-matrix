"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";
import { useSyncedState } from "rwsdk/use-synced-state/client";

type Props = {
	sessionId: string | null;
	pollUrl: string;
};

export const QrPollClient = ({ sessionId, pollUrl }: Props) => {
	const [connectedSessions, setConnectedSessions] = useSyncedState<string[]>(
		[],
		"sessions",
		"dev-qr-poll",
	);
	const addedRef = useRef(false);
	const initialRenderRef = useRef(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: connectedSessions is intentionally a dependency — re-runs when server state syncs so we add our session ID after the full list is known
	useEffect(() => {
		if (!sessionId || addedRef.current) return;

		const addSelf = () => {
			addedRef.current = true;
			setConnectedSessions((prev) =>
				prev.includes(sessionId) ? prev : [...prev, sessionId],
			);
		};

		if (initialRenderRef.current) {
			initialRenderRef.current = false;
			// On first render, getState hasn't resolved yet so connectedSessions is still [].
			// Wait for it — if the server state is genuinely empty, connectedSessions won't
			// change and this effect won't re-run, so the timer handles that case.
			const timer = setTimeout(addSelf, 150);
			return () => clearTimeout(timer);
		}

		// connectedSessions changed because getState resolved — safe to add now.
		addSelf();
	}, [connectedSessions, sessionId, setConnectedSessions]);

	return (
		<div>
			<h1>QR Poll Test</h1>

			<h2>Scan to Join</h2>
			<QRCodeSVG value={pollUrl} size={256} />
			<p>
				<a href={pollUrl}>{pollUrl}</a>
			</p>

			<h2>Your Session ID</h2>
			<ul>
				<li>{sessionId ?? "No session yet — refresh the page"}</li>
			</ul>

			<h2>All Sessions on This Page</h2>
			<ul>
				{connectedSessions.length === 0 ? (
					<li>None yet</li>
				) : (
					connectedSessions.map((id) => <li key={id}>{id}</li>)
				)}
			</ul>
		</div>
	);
};
