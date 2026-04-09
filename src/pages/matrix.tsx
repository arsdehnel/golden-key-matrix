import StandardLayout from '@/layouts/standard';

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
					</div>
					<img
						src="/dev-design-quadrant.jpg"
						alt="Empty quadrant graph showing Design on the x-axis and Development on the y-axis"
					/>
				</div>
			</div>
			<div className="matrix-key">
				<h3>Key 2: Integrated Workflows</h3>
				<div className="matrix-key-contents-container">
					<div className="matrix-key-contents">
						<p>Iteration, back-and-forth, and near-constant collaboration</p>
					</div>
					<img
						src="/empty-quadrant.jpg"
						alt="Empty quadrant graph showing Design on the x-axis and Development on the y-axis"
					/>
				</div>
			</div>
			<div className="matrix-key">
				<h3>Key 3: Document & Share</h3>
				<div className="matrix-key-contents-container">
					<div className="matrix-key-contents">
						<p>Documentation, microsites, videos, tutorials, and word-of-mouth</p>
					</div>
					<img
						src="/empty-quadrant.jpg"
						alt="Empty quadrant graph showing Design on the x-axis and Development on the y-axis"
					/>
				</div>
			</div>
		</StandardLayout>
	);
}
