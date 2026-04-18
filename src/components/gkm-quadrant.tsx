import type React from "react";

type GkmQuadrantProps = {
	yAxisTitle: string;
	xAxisTitle: string;
	yAxisInfinityLabel?: string;
	xAxisInfinityLabel?: string;
	sharedAxisZeroLabel?: string;
	children?: React.ReactNode;
	onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
	onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
};

export default function GkmQuadrant({
	yAxisTitle,
	xAxisTitle,
	yAxisInfinityLabel,
	xAxisInfinityLabel,
	sharedAxisZeroLabel,
	children,
	onPointerDown,
	onPointerMove,
}: GkmQuadrantProps) {
	return (
		<div className="gkm-quadrant">
			<div className="gkm-quadrant-y-axis">
				<div className="gkm-quadrant-y-axis-title">{yAxisTitle}</div>
				{yAxisInfinityLabel && <div className="gkm-quadrant-y-axis-infinity-label">{yAxisInfinityLabel}</div>}
			</div>
			<div className="gkm-quadrant-click-area" onPointerDown={onPointerDown} onPointerMove={onPointerMove}>
				{children}
			</div>
			<div className="gkm-quadrant-shared-axis">
				{sharedAxisZeroLabel && <div className="gkm-quadrant-shared-axis-zero-label">{sharedAxisZeroLabel}</div>}
			</div>
			<div className="gkm-quadrant-x-axis">
				<div className="gkm-quadrant-x-axis-title">{xAxisTitle}</div>
				{xAxisInfinityLabel && <div className="gkm-quadrant-x-axis-infinity-label">{xAxisInfinityLabel}</div>}
			</div>
		</div>
	);
}
