"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { Fragment } from "react";

type Step = {
	code: string;
	label: string;
};

type StepsProps = {
	steps: Step[];
	currentStep: number; // 0-indexed
	onStepClick?: (index: number) => void;
};

function getStepState(index: number, currentStep: number): "upcoming" | "current" | "completed" {
	if (index < currentStep) return "completed";
	if (index === currentStep) return "current";
	return "upcoming";
}

export default function Steps({ steps, currentStep, onStepClick }: StepsProps) {
	return (
		<div className="gkm-steps">
			{steps.map((step, index) => {
				const state = getStepState(index, currentStep);
				const isNavigable = state === "completed" && onStepClick != null;
				const isLast = index === steps.length - 1;

				return (
					<Fragment key={step.code}>
						{isNavigable ? (
							<button
								type="button"
								className={`gkm-steps-item is-${state}`}
								onClick={() => onStepClick(index)}
								aria-label={`Go back to step ${index + 1}: ${step.label}`}
							>
								<div className="gkm-steps-item-circle">
									<CheckIcon />
								</div>
								<div className="gkm-steps-item-label">{step.label}</div>
							</button>
						) : (
							<div className={`gkm-steps-item is-${state}`}>
								<div className="gkm-steps-item-circle">{state === "completed" ? <CheckIcon /> : index + 1}</div>
								<div className="gkm-steps-item-label">{step.label}</div>
							</div>
						)}
						{!isLast && <div className={`gkm-steps-connector${state === "completed" ? " is-completed" : ""}`} />}
					</Fragment>
				);
			})}
		</div>
	);
}
