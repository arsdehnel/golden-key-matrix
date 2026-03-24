"use client";
import { useSyncedState } from "rwsdk/use-synced-state/client";
import InitialQuestionHostView from "@/components/dev/initial-question-host-view";
import RoomTemperatureQuestion from "@/components/dev/room-temperature-question";

export type PollAnswer = {
	sessionId: string;
	roleColor: string;
	xCoord: number;
	yCoord: number;
};

export default function HostViewClient({
	pollUrl,
	sessionId,
}: {
	pollUrl: string;
	sessionId: string | null;
}) {
	const [pollAnswerCoordinates, setPollAnswerCoordinates] = useSyncedState<PollAnswer[]>(
		[],
		"pollCoordinates",
	);

	const recordPollAnswer = (answer: PollAnswer) => {
		setPollAnswerCoordinates((prev) => [
			...prev.filter((a) => a.sessionId !== answer.sessionId),
			answer,
		]);
	};

	return (
		<div className="dev-initial-question">
			<InitialQuestionHostView
				pollUrl={pollUrl}
				pollAnswerCoordinates={pollAnswerCoordinates}
			/>
			<RoomTemperatureQuestion recordPollAnswer={recordPollAnswer} sessionId={sessionId} />
		</div>
	);
}
