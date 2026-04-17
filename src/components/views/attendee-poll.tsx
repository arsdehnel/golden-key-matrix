"use client";
import chroma from "chroma-js";
import { Slider } from "radix-ui";
import { useState } from "react";
import type { PollAnswer } from "@/types";

export default function AttendeePoll({
	recordPollAnswer,
	sessionId,
}: {
	recordPollAnswer: (answer: PollAnswer) => void;
	sessionId: string | undefined;
}) {
	const roleColorScale = chroma.scale(["#83d0f6", "#07363b"]);
	const defaultPollAnswer: PollAnswer = {
		sessionId: sessionId || "",
		roleColor: roleColorScale(0.5).hex(),
		xCoord: 0,
		yCoord: 0,
		quadrantHeight: 0,
		quadrantWidth: 0,
	};

	const [pollAnswer, setPollAnswer] = useState<PollAnswer>(defaultPollAnswer);

	if (!sessionId) {
		return <p>No session found</p>;
	}

	const handleRankingClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const { top, left, height, width } = e.currentTarget.getBoundingClientRect();
		recordPollAnswer({
			...pollAnswer,
			xCoord: e.clientX - left,
			yCoord: e.clientY - top,
			quadrantHeight: height,
			quadrantWidth: width,
		});
		setPollAnswer({
			...pollAnswer,
			xCoord: e.clientX - left,
			yCoord: e.clientY - top,
			quadrantHeight: height,
			quadrantWidth: width,
		});
	};

	const handleRoleChange = (val: number[]) => {
		const singleVal = val[0];
		recordPollAnswer({
			...pollAnswer,
			roleColor: chroma(roleColorScale(singleVal / 100)).hex(),
		});
		setPollAnswer({
			...pollAnswer,
			roleColor: chroma(roleColorScale(singleVal / 100)).hex(),
		});
	};

	return (
		<>
			<h2 className="page-title">Welcome!</h2>
			<p>Couple quick questions to see who we've got in the room today...</p>

			<h3>How would you describe your role?</h3>
			<p>Slide to a spot that feels the most accurate.</p>
			<div className="role-slider">
				<Slider.Root className="gkm-slider-root" defaultValue={[50]} max={100} step={1} onValueCommit={handleRoleChange}>
					<Slider.Track className="gkm-slider-track">
						<Slider.Range className="gkm-slider-range" />
					</Slider.Track>
					<Slider.Thumb className="gkm-slider-thumb" aria-label="role-rating" />
				</Slider.Root>
				<div className="role-markers">
					<div className="role">Developer</div>
					<div className="role">Somewhere in the middle</div>
					<div className="role">Designer</div>
				</div>
			</div>

			<h3>Tap to plot your role!</h3>
			<div className="gkm-quadrant">
				<div className="gkm-quadrant-y-axis">
					<div className="gkm-quadrant-y-axis-title">Experience</div>
					<div className="gkm-quadrant-y-axis-infinity-label">All the time</div>
				</div>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: click position is the data */}
				{/* biome-ignore lint/a11y/noStaticElementInteractions: see above */}
				<div className="gkm-quadrant-click-area" onClick={e => handleRankingClick(e)}>
					<div
						className="marker"
						style={{
							top: pollAnswer.yCoord - 10,
							left: pollAnswer.xCoord - 10,
							backgroundColor: pollAnswer.roleColor,
						}}
					/>
				</div>
				<div className="gkm-quadrant-shared-axis">
					<div className="gkm-quadrant-shared-axis-zero-label">None</div>
				</div>
				<div className="gkm-quadrant-x-axis">
					<div className="gkm-quadrant-x-axis-title">Comfort Level</div>
					<div className="gkm-quadrant-x-axis-infinity-label">Very Comfy</div>
				</div>
			</div>
			<h3>That's it!</h3>
			<p>Real-time results are displayed on the big screen. You can keep tweaking your answers -- and see them change!</p>
		</>
	);
}
