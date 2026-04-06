import { QRCodeSVG } from "qrcode.react";
import type { RequestInfo } from "rwsdk/worker";

export default function Pages__OSN__ThankYou({ request }: RequestInfo) {
	const thankYouUrl = new URL("/osn/thank-you", request.url).href;
	return (
		<>
			<h1>Thank You</h1>
			<p>Thank you for participating!</p>
			<h2>Dorothy Toth</h2>
			<ul>
				<li>
					<a href="https://dorothytoth.com" target="_blank" rel="noopener noreferrer">
						dorothytoth.com
					</a>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/in/dorothy-toth/"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn @dorothy-toth
					</a>
				</li>
				<li>
					<a
						href="https://github.com/DorothyToth"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub @DorothyToth
					</a>
				</li>
			</ul>
			<h2>Adam Dehnel</h2>
			<ul>
				<li>
					<a href="https://adamdehnel.com" target="_blank" rel="noopener noreferrer">
						adamdehnel.com
					</a>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/in/adamdehnel/"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn @adamdehnel
					</a>
				</li>
				<li>
					<a
						href="https://github.com/arsdehnel"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub @arsdehnel
					</a>
				</li>
			</ul>
			<h2>Adam Dehnel</h2>
			<QRCodeSVG value={thankYouUrl} size={256} />
		</>
	);
}
