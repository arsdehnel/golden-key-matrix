import { QRCodeSVG } from "qrcode.react";
import type { PollAnswer } from "@/types";

export default function HostWelcome({
	pollAnswerCoordinates,
	pollUrl,
}: {
	pollAnswerCoordinates: PollAnswer[];
	pollUrl: string;
}) {
	return (
		<>
			<h2 className="page-title osn-host-view">Welcome!</h2>
			<div className="osn-welcome-view">
				<div className="osn-welcome-panel">
					<h3>Take Our 5-Second Poll</h3>
					<p>
						<strong>2 Questions • 5 Seconds • 100% Anonymous</strong>
					</p>
					<p>Scan the QR code and help us gauge the room's experience and roles.</p>
					<QRCodeSVG value={pollUrl} size={520} />
				</div>
				<div className="osn-welcome-panel">
					<h3>See Live Results</h3>
					<p>
						<strong>As y'all answer the questions, results will display here.</strong>
					</p>
					<p>Just simple server-side state object storage :)</p>
					<div className="gkm-quadrant">
						<div className="gkm-quadrant-y-axis">
							<div className="gkm-quadrant-y-axis-title">Experience</div>
							<div className="gkm-quadrant-y-axis-infinity-label">All the time</div>
						</div>
						<div className="gkm-quadrant-click-area">
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
						</div>
						<div className="gkm-quadrant-shared-axis">
							<div className="gkm-quadrant-shared-axis-zero-label">None</div>
						</div>
						<div className="gkm-quadrant-x-axis">
							<div className="gkm-quadrant-x-axis-title">Comfort Level</div>
							<div className="gkm-quadrant-x-axis-infinity-label">Very Comfy</div>
						</div>
					</div>
					<table className="coords-table">
						<thead>
							<tr>
								<th>Session ID</th>
								<th>Color</th>
								<th>X%</th>
								<th>Y%</th>
							</tr>
						</thead>
						<tbody>
							{pollAnswerCoordinates.map(({ sessionId, roleColor, xPercent, yPercent }) => (
								<tr key={sessionId}>
									<td>{sessionId}</td>
									<td>{roleColor}</td>
									<td>{xPercent.toFixed(1)}</td>
									<td>{yPercent.toFixed(1)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
