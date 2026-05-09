import { QRCodeSVG } from "qrcode.react";
import GkmQuadrant from "@/components/gkm-quadrant";
import type { PollAnswer } from "@/types";

export default function HostWelcome({
	pollAnswerCoordinates,
	pollUrl,
}: {
	pollAnswerCoordinates: PollAnswer[];
	pollUrl: string;
}) {
	return (
		<div className="osn-view-host-welcome">
			<h2 className="page-title osn-host-view">
				Welcome to <span>The Golden Key to Badass Products</span>!
			</h2>
			<div className="osn-welcome-view">
				<div className="osn-welcome-panel">
					<h4>Quick survey about...</h4>
					<div className="osn-qr-container">
						<QRCodeSVG value={pollUrl} size={600} />
					</div>
				</div>
				<div className="osn-welcome-panel">
					<h4>...working with other teams</h4>
					<div className="osn-quadrant-container">
						<GkmQuadrant yAxisTitle="Experience" xAxisTitle="Comfort Level">
							{pollAnswerCoordinates.map(({ sessionId, roleColor, xPercent, yPercent }) => (
								<div
									key={sessionId}
									className="marker"
									style={{
										top: `calc(${yPercent}% - 10px)`,
										left: `calc(${xPercent}% - 10px)`,
										backgroundColor: roleColor,
									}}
								/>
							))}
						</GkmQuadrant>
					</div>
				</div>
			</div>
		</div>
	);
}
