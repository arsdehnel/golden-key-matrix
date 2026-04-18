"use client";
import { Slider } from "radix-ui";
import { useRef, useState } from "react";
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
	const [sliderX, setSliderX] = useState(50);
	const [sliderY, setSliderY] = useState(50);
	const quadrantRef = useRef<HTMLDivElement>(null);

	if (!sessionId) {
		return <p>No session found</p>;
	}

	const handleRoleSelect = (color: string) => {
		const updated = { ...pollAnswer, roleColor: color };
		setPollAnswer(updated);
		recordPollAnswer(updated);
		setCurrentStep(1);
	};

	// Applies new coordinates from either pointer events or sliders.
	// Spreads coords last so stale xCoord/yCoord from the closure are always overridden.
	const applyCoords = (rawX: number, rawY: number, width: number, height: number) => {
		const x = Math.max(0, Math.min(rawX, width));
		const y = Math.max(0, Math.min(rawY, height));
		setSliderX((x / width) * 100);
		setSliderY((y / height) * 100);
		const coords = { xCoord: x, yCoord: y, quadrantWidth: width, quadrantHeight: height };
		setPollAnswer(prev => ({ ...prev, ...coords }));
		recordPollAnswer({ ...pollAnswer, ...coords });
	};

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		const { top, left, height, width } = e.currentTarget.getBoundingClientRect();
		applyCoords(e.clientX - left, e.clientY - top, width, height);
	};

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.buttons === 0) return;
		const { top, left, height, width } = e.currentTarget.getBoundingClientRect();
		applyCoords(e.clientX - left, e.clientY - top, width, height);
	};

	const handleSliderX = (value: number[]) => {
		if (!quadrantRef.current) return;
		const { width, height } = quadrantRef.current.getBoundingClientRect();
		applyCoords((value[0] / 100) * width, (sliderY / 100) * height, width, height);
	};

	const handleSliderY = (value: number[]) => {
		if (!quadrantRef.current) return;
		const { width, height } = quadrantRef.current.getBoundingClientRect();
		applyCoords((sliderX / 100) * width, (value[0] / 100) * height, width, height);
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
					<div className="gkm-quadrant">
						<div className="gkm-quadrant-y-axis">
							<div className="gkm-quadrant-y-axis-title">Experience</div>
							<div className="gkm-quadrant-y-axis-infinity-label">All the time</div>
						</div>
						<div
							ref={quadrantRef}
							className="gkm-quadrant-click-area"
							onPointerDown={handlePointerDown}
							onPointerMove={handlePointerMove}
						>
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
						</div>
						<div className="gkm-quadrant-shared-axis">
							<div className="gkm-quadrant-shared-axis-zero-label">None</div>
						</div>
						<div className="gkm-quadrant-x-axis">
							<div className="gkm-quadrant-x-axis-title">Comfort Level</div>
							<div className="gkm-quadrant-x-axis-infinity-label">Very Comfy</div>
						</div>
					</div>
					{/* Sliders provide keyboard-accessible positioning; the dot on the quadrant is the visual indicator */}
					<div className="quadrant-sliders">
						<Slider.Root
							className="gkm-slider-root"
							value={[sliderX]}
							min={0}
							max={100}
							step={1}
							onValueChange={handleSliderX}
							aria-label="Horizontal position on quadrant"
						>
							<Slider.Track className="gkm-slider-track">
								<Slider.Range className="gkm-slider-range" />
							</Slider.Track>
							<Slider.Thumb className="gkm-slider-thumb" />
						</Slider.Root>
						<Slider.Root
							className="gkm-slider-root"
							value={[sliderY]}
							min={0}
							max={100}
							step={1}
							onValueChange={handleSliderY}
							aria-label="Vertical position on quadrant"
						>
							<Slider.Track className="gkm-slider-track">
								<Slider.Range className="gkm-slider-range" />
							</Slider.Track>
							<Slider.Thumb className="gkm-slider-thumb" />
						</Slider.Root>
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
