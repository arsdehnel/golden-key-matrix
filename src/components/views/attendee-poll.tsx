"use client";
import { useState } from "react";
import type { PollAnswer } from "@/types";
import Steps from "../steps";

const STEPS = [
	{ code: "role", label: "Your Role" },
	{ code: "experience", label: "Your Experience" },
	{ code: "done", label: "Done" },
];

const ROLE_OPTIONS = [
	{ label: "Developer / Engineer", color: "#6ad1fa" }, // @color_blue
	{ label: "Designer / UX", color: "#30e8b0" }, // @color_mint
	{ label: "I work with both", color: "#07363b" }, // @color_darkteal
];

export default function AttendeePoll({
	recordPollAnswer,
	sessionId,
}: {
	recordPollAnswer: (answer: PollAnswer) => void;
	sessionId: string | undefined;
}) {
	const [currentStep, setCurrentStep] = useState(0);
	const [pollAnswer, setPollAnswer] = useState<PollAnswer>({
		sessionId: sessionId || "",
		roleColor: "",
		xCoord: 0,
		yCoord: 0,
		quadrantHeight: 0,
		quadrantWidth: 0,
	});

	if (!sessionId) {
		return <p>No session found</p>;
	}

	const handleRoleSelect = (color: string) => {
		const updated = { ...pollAnswer, roleColor: color };
		setPollAnswer(updated);
		recordPollAnswer(updated);
		setCurrentStep(1);
	};

	const handleRankingClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		const { top, left, height, width } = e.currentTarget.getBoundingClientRect();
		const updated = {
			...pollAnswer,
			xCoord: e.clientX - left,
			yCoord: e.clientY - top,
			quadrantHeight: height,
			quadrantWidth: width,
		};
		setPollAnswer(updated);
		recordPollAnswer(updated);
		setCurrentStep(2);
	};

	return (
		<>
			<h2 className="page-title">Welcome!</h2>

			<Steps steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />

			{currentStep === 0 && (
				<>
					<h3>How would you describe your role?</h3>
					<p>Pick whichever feels most like you.</p>
					<div className="role-options">
						{ROLE_OPTIONS.map(({ label, color }) => (
							<button
								key={label}
								type="button"
								className="role-option"
								style={{ "--role-color": color } as React.CSSProperties}
								onClick={() => handleRoleSelect(color)}
							>
								{label}
							</button>
						))}
					</div>
				</>
			)}

			{currentStep === 1 && (
				<>
					<h3>Tap to plot your role!</h3>
					<p>Plot your experience and comfort level working with complementary/different teams.</p>
					<div className="ranking-frame">
						{pollAnswer.xCoord > 0 && (
							<div
								className="marker"
								style={{
									top: pollAnswer.yCoord - 10,
									left: pollAnswer.xCoord - 10,
									backgroundColor: pollAnswer.roleColor,
								}}
							/>
						)}
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: need to add keyboard option */}
						<img
							onClick={e => handleRankingClick(e)}
							src="/initial-question-bg.jpg"
							alt="Empty quadrant graph showing Comfort on the x-axis and Experience on the y-axis"
						/>
					</div>
				</>
			)}

			{currentStep === 2 && (
				<>
					<h3>That's it!</h3>
					<p>
						Real-time results are displayed on the big screen. You can keep tweaking your answers — and see them
						change!
					</p>
				</>
			)}
		</>
	);
}
