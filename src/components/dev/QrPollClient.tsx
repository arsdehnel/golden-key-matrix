"use client";

import { useSyncedState } from "rwsdk/use-synced-state/client";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";

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

	useEffect(() => {
		if (!sessionId) return;
		setConnectedSessions((prev) => {
			if (prev.includes(sessionId)) return prev;
			return [...prev, sessionId];
		});
	}, [sessionId, setConnectedSessions]);

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
