import AfterTitleBreak from "@/components/after-title-break";
import GkmQuadrant from "@/components/gkm-quadrant";

export default function Pages__ThankYou() {
	return (
		<main className="thank-you-page">
			<h1>The Golden Key to Badass Products</h1>
			<AfterTitleBreak />
			<div className="talk-info">
				<div className="speaker-row">
					<div className="speaker-panel">
						<div className="speaker-content">
							<h2>Dorothy Toth</h2>
							<div className="title">User Experience Designer</div>
							<div className="company">BI WORLDWIDE</div>
						</div>
						<img
							src="/dorothy.png"
							alt="Headshot of Dorothy Toth"
							width={100}
							height={100}
							className="speaker-photo"
						/>
					</div>
					<div className="speaker-panel">
						<div className="speaker-content">
							<h2>Adam Dehnel</h2>
							<div className="title">Platform Engineer</div>
							<div className="company">IMPROVING</div>
						</div>
						<img src="/adam.png" alt="Headshot of Adam Dehnel" width={100} height={100} className="speaker-photo" />
					</div>
				</div>
				<div className="talk-thank-you">
					<p>
						The best architecture in the world will never solve for bad user experience. To build a truly powerful,
						dynamic, and efficient platform, the KEY is to align technical architecture with design architecture.
					</p>
					<p>
						We'll talk about ways to make this alignment happen, approaches that work (and some that fail), and
						illustrate organizational wins these practices can achieve.
					</p>
					<p className="details-link">
						<a href="https://opensourcenorth.com/presentations/The-Golden-Key-to-Badass-Products">
							View Talk Details
						</a>
					</p>
				</div>
			</div>
			<div className="matrix-info">
				<h2>Golden Key Matrix</h2>
				<p>
					These simple rating quadrants serve as a quick way to gauge progress. For now it can just be a page to
					reference in discussions or perhaps print out. In the future we're considering making a system of accounts and
					tracking progress for you and your team.
				</p>
				<div className="matrix-key">
					<h3>Key 1: Open Mindset</h3>
					<div className="matrix-key-contents-container">
						<div className="matrix-key-contents">
							<p>Creates trust in others, but also in yourself</p>
							<ul>
								<li>Receptive to new ideas, experiences, and perspectives</li>
								<li>Fuels adaptability & flexibility</li>
								<li>Embraces challenges as opportunities</li>
								<li>Respect for others</li>
								<li>Curious & asks questions</li>
								<li>Receives questions as ideas not criticism</li>
							</ul>
							<p>Sets yourself up to learn</p>
						</div>
						<div className="matrix-key-quadrant">
							<GkmQuadrant
								yAxisTitle="Development"
								xAxisTitle="Design"
								yAxisInfinityLabel="Expert"
								xAxisInfinityLabel="Expert"
								sharedAxisZeroLabel="Basic"
							/>
						</div>
					</div>
				</div>
				<div className="matrix-key">
					<h3>Key 2: Integrated Workflows</h3>
					<div className="matrix-key-contents-container">
						<div className="matrix-key-contents">
							<p>Ideas to get on the same wavelength!</p>
							<ul>
								<li>Prototype run throughs</li>
								<li>UX Intention Discussions</li>
								<li>Dev Build Explanations</li>
								<li>Cross-team paired programming</li>
							</ul>
							<p>Iteration, back-and-forth, and near-constant collaboration</p>
						</div>
						<div className="matrix-key-quadrant">
							<GkmQuadrant
								yAxisTitle="Development"
								xAxisTitle="Design"
								yAxisInfinityLabel="Expert"
								xAxisInfinityLabel="Expert"
								sharedAxisZeroLabel="Basic"
							/>
						</div>
					</div>
				</div>
				<div className="matrix-key">
					<h3>Key 3: Rich Ecosystem</h3>
					<div className="matrix-key-contents-container">
						<div className="matrix-key-contents">
							<p>Starting can be the hardest part</p>
							<ul>
								<li>Prioritize what's needed first</li>
								<li>Find the medium(s) that makes the most sense for your teams</li>
								<li>Consider timing/cadence</li>
								<li>Try, try again…</li>
								<li>Be accountable</li>
								<li>Set up Ownership</li>
							</ul>
							<p>Continue the effort…</p>
						</div>
						<div className="matrix-key-quadrant">
							<GkmQuadrant
								yAxisTitle="Development"
								xAxisTitle="Design"
								yAxisInfinityLabel="Expert"
								xAxisInfinityLabel="Expert"
								sharedAxisZeroLabel="Basic"
							/>
						</div>
					</div>
				</div>
				<p>
					Fill this out on a regular basis. Maybe it's a per-sprint item or every-other sprint but something that keeps
					it top of mind. And <strong>be honest</strong> because nobody will benefit from fake and insincere answers.
				</p>
			</div>
		</main>
	);
}
