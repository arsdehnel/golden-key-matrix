"use client";
import AttendeePoll from "@/components/views/attendee-poll";
import StandardLayout from "@/layouts/standard";
import type { PollAnswer } from "@/types";

export default function Pages__Dev__OsnAttendeePoll() {
	const recordPollAnswer = (answer: PollAnswer) => {
		console.log(`Dev OSN Attendee Poll answer: ${JSON.stringify(answer, null, 4)}`);
	};

	const sessionId = "my-dev-session-id";

	return (
		<StandardLayout pageTitle="Welcome" siteSection="osn">
			<AttendeePoll sessionId={sessionId} recordPollAnswer={recordPollAnswer} />
		</StandardLayout>
	);
}
