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
		<div className="osn-welcome-view">
			<div className="osn-welcome-panel">
				<h3>Quick Pseudo-Anonymous Attendee Poll</h3>
				<p>
					If you don't mind please scan this QR code and take this super quick two "question" survey so we can gauge the
					room's experience and roles related to the topic. We aren't storing the data outside of a server-side state
					object and you can provide a fake name!
				</p>
				<QRCodeSVG value={pollUrl} size={450} />
			</div>
			<div className="osn-welcome-panel">
				<h3>Poll Results</h3>
				<p>As y'all answer those questions we'll see the results over here.</p>
				<div className="ranking-frame">
					{pollAnswerCoordinates.map(({ sessionId, roleColor, xCoord, yCoord }) => {
						return (
							<div
								key={sessionId}
								className="marker"
								style={{
									top: yCoord,
									left: xCoord,
									backgroundColor: roleColor,
								}}
							/>
						);
					})}
					<img
						src="/initial-question-bg.jpg"
						alt="Empty quadrant graph showing Comfort on the x-axis and Experience on the y-axis"
					/>
				</div>
			</div>
		</div>
	);
}
