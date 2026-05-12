"use client";
import { RadioGroup, Slider } from "radix-ui";
import { useEffect, useState } from "react";
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

	// Listen for back/forward navigation to restore previous steps
	useEffect(() => {
		const onPopState = (e: PopStateEvent) => {
			console.log(e.state);
			setCurrentStep(e.state?.step ?? 0);
		};
		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, []);

	// on mount, restore from sessionStorage
	useEffect(() => {
		const saved = sessionStorage.getItem(`poll-${sessionId}`);
		if (saved) {
			const { step, answer, sliderX, sliderY, hasPlaced } = JSON.parse(saved);
			setCurrentStep(step);
			setPollAnswer(answer);
			setSliderX(sliderX);
			setSliderY(sliderY);
			setHasPlaced(hasPlaced);
		}
	}, [sessionId]);

	// write on every relevant state change
	useEffect(() => {
		sessionStorage.setItem(
			`poll-${sessionId}`,
			JSON.stringify({ step: currentStep, answer: pollAnswer, sliderX, sliderY, hasPlaced }),
		);
	}, [sessionId, currentStep, pollAnswer, sliderX, sliderY, hasPlaced]);

	if (!sessionId) {
		return <p>No session found</p>;
	}

	const handleRoleChange = (color: string) => {
		setPollAnswer(prev => ({ ...prev, roleColor: color }));
	};

	const handleRoleSubmit = () => {
		window.history.pushState({ step: 1 }, "");
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
		console.log(`Applying percents: x=${x} y=${y}`); // Debug log to verify values
		const percents = { xPercent: x, yPercent: y };
		setPollAnswer(prev => ({ ...prev, ...percents }));
		recordPollAnswer({ ...pollAnswer, ...percents });
	};

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		const { bottom, left, height, width } = e.currentTarget.getBoundingClientRect();
		applyPercents(((e.clientX - left) / width) * 100, ((bottom - e.clientY) / height) * 100);
	};

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.buttons === 0) return;
		const { bottom, left, height, width } = e.currentTarget.getBoundingClientRect();
		applyPercents(((e.clientX - left) / width) * 100, ((bottom - e.clientY) / height) * 100);
	};

	const handleSliderX = (value: number[]) => applyPercents(value[0], sliderY);
	const handleSliderY = (value: number[]) => applyPercents(sliderX, value[0]);

	const handleQuadrantSubmit = () => {
		window.history.pushState({ step: 2 }, "");
		setCurrentStep(2);
	};

	return (
		<div className="osn-view-attendee-poll">
			<h2 className="page-title">2-Question Audience Poll</h2>
			<Steps steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />

			{currentStep === 0 && (
				<>
					<h3>How would you best describe your role?</h3>
					<RadioGroup.Root
						className="role-options"
						value={pollAnswer.roleColor}
						onValueChange={handleRoleChange}
						aria-label="Your role"
					>
						{ROLE_OPTIONS.map(({ label, color }) => (
							<RadioGroup.Item
								key={label}
								value={color}
								className="role-option"
								style={{ "--role-color": color } as React.CSSProperties}
							>
								{label}
							</RadioGroup.Item>
						))}
					</RadioGroup.Root>
					<button type="button" className="quadrant-next" disabled={!pollAnswer.roleColor} onClick={handleRoleSubmit}>
						Next →
					</button>
				</>
			)}

			{currentStep === 1 && (
				<>
					<h3>Tap to plot your role!</h3>
					<p>Plot your experience and comfort level working with complementary/different teams.</p>
					<GkmQuadrant
						xAxisTitle="Comfort Level"
						yAxisTitle="Experience"
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
					>
						{hasPlaced && (
							<div
								className="marker"
								style={{
									bottom: `calc(${pollAnswer.yPercent}% - 10px)`,
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
					<button type="button" className="quadrant-next" onClick={handleQuadrantSubmit}>
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
		</div>
	);
}
