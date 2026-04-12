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
	const roleColorScale = chroma.scale(["#8400ff", "#049e02"]);
	const [roleColor, setRoleColor] = useState(roleColorScale(0.5).hex());
	const [clickCoordinates, setClickCoordinatess] = useState([50, 50]);

	const handleRankingClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		if (!sessionId) {
			return;
		}
		const { top, left } = e.currentTarget.getBoundingClientRect();
		const newCoordinates = [e.clientX - left, e.clientY - top];
		setClickCoordinatess(newCoordinates);
		recordPollAnswer({
			sessionId,
			roleColor,
			xCoord: newCoordinates[0],
			yCoord: newCoordinates[1],
		});
	};

	const handleRoleChange = (val: number[]) => {
		if (!sessionId) {
			return;
		}
		const singleVal = val[0];
		setRoleColor(chroma(roleColorScale(singleVal / 100)).hex());
		recordPollAnswer({
			sessionId,
			roleColor,
			xCoord: clickCoordinates[0],
			yCoord: clickCoordinates[1],
		});
	};

	return (
		<>
			<p>Couple quick questions to see who we've got in the room today.</p>
			<h3>How would you describe your role?</h3>
			<p>
				We put this on a slider because all companies, roles, and humans are different. Slide it to a spot that feels
				right for you!
			</p>
			<div className="role-slider">
				<Slider.Root
					className="gkm-slider-root"
					defaultValue={[50]}
					max={100}
					step={1}
					onValueCommit={handleRoleChange}
					orientation="vertical"
				>
					<Slider.Track className="gkm-slider-track">
						<Slider.Range className="gkm-slider-range" />
					</Slider.Track>
					<Slider.Thumb className="gkm-slider-thumb" aria-label="role-rating" />
				</Slider.Root>
				<div className="role-markers">
					<div className="role">Developer</div>
					<div className="role">Dev with an eye</div>
					<div className="role">Somewhere in the middle</div>
					<div className="role">Technical Designer</div>
					<div className="role">Designer</div>
				</div>
			</div>

			<h3>Click to plot your ranking on these two scales</h3>
			<p>What is your experience and comfort level with "the other side"?</p>
			<div className="ranking-frame">
				<div
					className="marker"
					style={{
						top: clickCoordinates[1],
						left: clickCoordinates[0],
						backgroundColor: roleColor,
					}}
				></div>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: need to add keyboard option */}
				<img
					onClick={e => handleRankingClick(e)}
					src="/initial-question-bg.jpg"
					alt="Empty quadrant graph showing Comfort on the x-axis and Experience on the y-axis"
				/>
			</div>

			<p>
				No submit here, we're collecting results in real-time and you can keep tweaking your answers -- and see them
				change on the board!
			</p>
		</>
	);
}
