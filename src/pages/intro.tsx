export default function Pages__Intro() {
	return (
		<div className="intro-page">
			<h1>The Golden Key to Badass Products</h1>
			<p className="date-line">May 28, 2026</p>
			<div className="speaker-row">
				<div className="speaker-panel">
					<div className="speaker-content">
						<h2>Dorothy Toth</h2>
						<div className="title">User Experience Designer</div>
						<div className="company">BI WORLDWIDE</div>
					</div>
					<img src="/dorothy.png" alt="Headshot of Dorothy Toth" width={100} height={100} className="speaker-photo" />
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
			<div className="talk-intro">
				<p>
					The best architecture in the world will never solve for bad user experience. To build a truly powerful,
					dynamic, and efficient platform, the KEY is to align technical architecture with design architecture.
				</p>
				<p>
					We'll talk about ways to make this alignment happen, approaches that work (and some that fail), and illustrate
					organizational wins these practices can achieve.
				</p>
				<p className="details-link">
					<a href="https://opensourcenorth.com/presentations/The-Golden-Key-to-Badass-Products">View Talk Details</a>
				</p>
			</div>
		</div>
	);
}
