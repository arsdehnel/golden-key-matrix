"use client";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useSyncedState } from "rwsdk/use-synced-state/client";
import { hostCodeValidation } from "@/actions/host-code-validation";
import type { PollAnswer } from "@/types";

export default function OsnWelcomeClient({
	pollUrl,
	sessionId,
}: {
	pollUrl: string;
	sessionId: string | undefined;
}) {
	const [hostSessionId, setHostSessionId] = useSyncedState<string | null>(null, "hostSessionId");
	const [pollAnswerCoordinates, setPollAnswerCoordinates] = useSyncedState<PollAnswer[]>(
		[],
		"pollCoordinates",
	);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const code = new FormData(e.currentTarget).get("presenter-code") as string;
		const result = await hostCodeValidation(code);
		if (result.success && result.sessionId) {
			setHostSessionId(result.sessionId);
		} else {
			setError(result.message);
		}
	}

	const _recordPollAnswerr = (answer: PollAnswer) => {
		setPollAnswerCoordinates((prev) => [
			...prev.filter((a) => a.sessionId !== answer.sessionId),
			answer,
		]);
	};

	if (!hostSessionId) {
		return (
			<>
				<h1>Hey hosts, enter your code to get started</h1>
				<form onSubmit={handleSubmit}>
					<div>
						Presenter code: <input type="text" name="presenter-code" />
					</div>
					{error && <p>{error}</p>}
					<button type="submit">Start Poll</button>
				</form>
			</>
		);
	}

	if (hostSessionId === sessionId) {
		return (
			<>
				<h1>Host View</h1>
				<p>{JSON.stringify(pollAnswerCoordinates, null, 4)}</p>
				<QRCodeSVG value={pollUrl} size={256} />
			</>
		);
	}

	return (
		<>
			<h1>Attendee View</h1>
			<p>Answer me these questions three</p>
		</>
	);
}
