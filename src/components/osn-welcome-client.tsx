"use client";
import { useSyncedState } from "rwsdk/use-synced-state/client";
import type { PollAnswer } from "@/types";
import AttendeePoll from "./views/attendee-poll";
import HostRegister from "./views/host-register";
import HostWelcome from "./views/host-welcome";

export default function OsnWelcomeClient({ pollUrl, sessionId }: { pollUrl: string; sessionId: string | undefined }) {
	const [hostSessionId, setHostSessionId] = useSyncedState<string | null>(null, "hostSessionId");
	const [pollAnswerCoordinates, setPollAnswerCoordinates] = useSyncedState<PollAnswer[]>([], "pollCoordinates");

	const recordPollAnswer = (answer: PollAnswer) => {
		setPollAnswerCoordinates(prev => [...prev.filter(a => a.sessionId !== answer.sessionId), answer]);
	};

	const hostIdentified = (sessionId: string) => {
		setHostSessionId(sessionId);
	};

	if (!hostSessionId) {
		return <HostRegister hostIdentified={hostIdentified} />;
	}

	if (hostSessionId === sessionId) {
		return <HostWelcome pollAnswerCoordinates={pollAnswerCoordinates} pollUrl={pollUrl} />;
	}

	return <AttendeePoll sessionId={sessionId} recordPollAnswer={recordPollAnswer} />;
}
