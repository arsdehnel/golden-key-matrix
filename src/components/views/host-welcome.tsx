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
			<h2 className="page-title">Welcome!</h2>
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
					<div className="ranking-frame">
						{pollAnswerCoordinates.map(({ sessionId, roleColor, xCoord, yCoord }) => {
							return (
								<div
									key={sessionId}
									className="marker"
									style={{
										top: yCoord - 10,
										left: xCoord - 10,
										backgroundColor: roleColor,
									}}
								/>
							);
						})}
						<img
							src="/initial-question-bg.jpg"
							alt="Empty quadrant graph showing Comfort on the x-axis and Experience on the y-axis"
						/>
						<table className="coords-table">
							<thead>
								<tr>
									<th>Session ID</th>
									<th>Color</th>
									<th>X</th>
									<th>Y</th>
									<th>Height</th>
									<th>Width</th>
								</tr>
							</thead>
							<tbody>
								{pollAnswerCoordinates.map(coord => {
									return (
										<tr key={coord.sessionId}>
											<td>{coord.sessionId}</td>
											<td>{coord.roleColor}</td>
											<td>{coord.xCoord}</td>
											<td>{coord.yCoord}</td>
											<td>{coord.quadrantHeight}</td>
											<td>{coord.quadrantWidth}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
