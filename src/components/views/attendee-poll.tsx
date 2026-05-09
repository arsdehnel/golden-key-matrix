"use client";
import { Slider } from "radix-ui";
import { useState } from "react";
import GkmQuadrant from "@/components/gkm-quadrant";
import type { PollAnswer } from "@/types";
import Steps from "../steps";

const STEPS = [
	{ code: "role", label: "Your Role" },
	{ code: "experience", label: "Your Experience" },
	{ code: "done", label: "Done" },
];

const ROLE_OPTIONS = [
	{ label: "Developer / Engineer", color: "magenta" }, // @color_blue
	{ label: "Designer / User Experience", color: "yellow" }, // @color_mint
	{ label: "Other", color: "lime" }, // @color_darkteal
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
		xPercent: 0,
		yPercent: 0,
	});
	const [sliderX, setSliderX] = useState(50);
	const [sliderY, setSliderY] = useState(50);
	const [hasPlaced, setHasPlaced] = useState(false);

	if (!sessionId) {
		return <p>No session found</p>;
	}

	const handleRoleSelect = (color: string) => {
		setPollAnswer(prev => ({ ...prev, roleColor: color }));
		setCurrentStep(1);
	};

	// Converts 0–100 percentages from either pointer events or sliders into stored state
	// and syncs to the host view. Spreads percents last so stale values from the closure
	// are always overridden.
	const applyPercents = (xPct: number, yPct: number) => {
		const x = Math.max(0, Math.min(xPct, 100));
		const y = Math.max(0, Math.min(yPct, 100));
		setSliderX(x);
		setSliderY(y);
		setHasPlaced(true);
		const percents = { xPercent: x, yPercent: y };
		setPollAnswer(prev => ({ ...prev, ...percents }));
		recordPollAnswer({ ...pollAnswer, ...percents });
	};

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		const { top, left, height, width } = e.currentTarget.getBoundingClientRect();
		applyPercents(((e.clientX - left) / width) * 100, ((e.clientY - top) / height) * 100);
	};

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.buttons === 0) return;
		const { top, left, height, width } = e.currentTarget.getBoundingClientRect();
		applyPercents(((e.clientX - left) / width) * 100, ((e.clientY - top) / height) * 100);
	};

	const handleSliderX = (value: number[]) => applyPercents(value[0], sliderY);
	const handleSliderY = (value: number[]) => applyPercents(sliderX, value[0]);

	return (
		<>
			<h2 className="page-title">Welcome!</h2>
			<p>2-Question Audience Poll</p>
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
					<GkmQuadrant
						xAxisTitle="Comfort Level"
						xAxisInfinityLabel="High"
						yAxisTitle="Experience"
						yAxisInfinityLabel="Lots"
						sharedAxisZeroLabel="None"
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
					>
						{hasPlaced && (
							<div
								className="marker"
								style={{
									top: `calc(${pollAnswer.yPercent}% - 10px)`,
									left: `calc(${pollAnswer.xPercent}% - 10px)`,
									backgroundColor: pollAnswer.roleColor,
								}}
							/>
						)}
					</GkmQuadrant>
					{/* Sliders provide keyboard-accessible positioning; the dot on the quadrant is the visual indicator */}
					<div className="quadrant-sliders">
						<div className="quadrant-slider">
							<span className="quadrant-slider-label">Comfort Level</span>
							<Slider.Root
								className="gkm-slider-root"
								value={[sliderX]}
								min={0}
								max={100}
								step={1}
								onValueChange={handleSliderX}
								aria-label="Horizontal position on quadrant indicating your comfort level with the 'other' team"
							>
								<Slider.Track className="gkm-slider-track">
									<Slider.Range className="gkm-slider-range" />
								</Slider.Track>
								<Slider.Thumb className="gkm-slider-thumb" />
							</Slider.Root>
						</div>
						<div className="quadrant-slider">
							<span className="quadrant-slider-label">Experience</span>
							<Slider.Root
								className="gkm-slider-root"
								value={[sliderY]}
								min={0}
								max={100}
								step={1}
								onValueChange={handleSliderY}
								aria-label="Vertical position on quadrant indicating your level of experience with the 'other' team"
							>
								<Slider.Track className="gkm-slider-track">
									<Slider.Range className="gkm-slider-range" />
								</Slider.Track>
								<Slider.Thumb className="gkm-slider-thumb" />
							</Slider.Root>
						</div>
					</div>
					<button type="button" className="quadrant-next" onClick={() => setCurrentStep(2)}>
						Next →
					</button>
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
