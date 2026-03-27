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
			<h1>Host View</h1>
			<QRCodeSVG value={pollUrl} size={256} />
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
		</>
	);
}
