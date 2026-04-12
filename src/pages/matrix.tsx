import StandardLayout from "@/layouts/standard";

export default function Pages__Matrix() {
	return (
		<StandardLayout siteSection="matrix" pageTitle="Matrix Review">
			<p>
				These simple rating quadrants serve as a quick way to gauge progress. For now it can just be a page to reference
				in discussions or perhaps print out. In the future we're considering making a system of accounts and tracking
				progress for you and your team.
			</p>
			<div className="matrix-key">
				<h3>Key 1: Open Mindset</h3>
				<div className="matrix-key-contents-container">
					<div className="matrix-key-contents">
						<p>Being open to learning about the other side is key</p>
						<ul>
							<li>Bullet about open mindset</li>
							<li>Another bullet about open mindset</li>
							<li>Another bullet about open mindset</li>
							<li>Another bullet about open mindset</li>
							<li>Another bullet about open mindset</li>
							<li>Another bullet about open mindset</li>
						</ul>
						<p>Wrap up words about open mindset</p>
					</div>
					<div className="matrix-key-quadrant">
						<img
							src="/dev-design-quadrant.jpg"
							alt="Empty quadrant graph showing Design on the x-axis and Development on the y-axis"
						/>
					</div>
				</div>
			</div>
			<div className="matrix-key">
				<h3>Key 2: Integrated Workflows</h3>
				<div className="matrix-key-contents-container">
					<div className="matrix-key-contents">
						<p>Iteration, back-and-forth, and near-constant collaboration</p>
					</div>
					<div className="matrix-key-quadrant">
						<img
							src="/dev-design-quadrant.jpg"
							alt="Empty quadrant graph showing Design on the x-axis and Development on the y-axis"
						/>
					</div>
				</div>
			</div>
			<div className="matrix-key">
				<h3>Key 3: Document & Share</h3>
				<div className="matrix-key-contents-container">
					<div className="matrix-key-contents">
						<p>Documentation, microsites, videos, tutorials, and word-of-mouth</p>
					</div>
					<div className="matrix-key-quadrant">
						<img
							src="/dev-design-quadrant.jpg"
							alt="Empty quadrant graph showing Design on the x-axis and Development on the y-axis"
						/>
					</div>
				</div>
			</div>
			<p>
				Fill this out on a regular basis. Maybe it's a per-sprint item or every-other sprint but something that keeps it
				top of mind. And <strong>be honest</strong> because nobody will benefit from fake and insincere answers.
			</p>
		</StandardLayout>
	);
}
