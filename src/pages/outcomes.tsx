import StandardLayout from "@/layouts/standard";

export default async function Pages__Outcomes(): Promise<React.JSX.Element> {
	return (
		<StandardLayout siteSection="outcomes">
			<h2>Outcomes</h2>
			<p>
				The three keys each operate at a different scale: Open Mindset is personal, Integrated Workflow is a team-level
				practice, and Rich Ecosystem is about the broader community you build around your product. Together they unlock
				outcomes that matter whether you're a designer, a developer, an engineering manager, a quality assurance
				specialist, or an executive signing off on the roadmap.
			</p>
			<p>
				The people doing the day-to-day work will find the keys easy to agree with and institute. But connecting those
				keys to tangible outcomes is what makes this land for the stakeholders, business leaders, and budget holders who
				need more than a philosophy.
			</p>
			<h3>Outcome 1: Speed & Efficiency</h3>
			<p>Moving fast is easy when you cut corners. Moving fast *and* well is what aligned teams can do.</p>
			<ul>
				<li>
					**Quickness without Losing Depth:** Open mindsets and integrated workflows reduce friction and rework, so you
					move faster without sacrificing the quality of what you're building.
				</li>
				<li>
					**Adaptability & Completeness:** When requirements shift (and they will), teams with these habits adapt
					without falling apart and they finish what they start because they're not constantly undoing misaligned work.
				</li>
			</ul>
			<h3>Outcome 2: Maintainability & Scalability</h3>
			<p>
				A product that can't grow with the organization is a liability. These outcomes are about building something that
				holds up.
			</p>
			<ul>
				<li>
					**Cooperative Governance:** Shared ownership structures that emerge from integrated workflows and a rich
					ecosystem hold up as teams grow, instead of collapsing into whoever shouts loudest.
				</li>
				<li>
					**Vision for Future:** The shared understanding built across teams through these keys makes long-term
					decisions possible not just surviving the next sprint.
				</li>
			</ul>
			<h3>Outcome 3: Community & Passion</h3>
			<p>The part that's easy to dismiss as "soft" is often what separates teams that thrive from teams that churn.</p>
			<ul>
				<li>
					**Mutual Intention:** People do their best work when they understand why. The keys create alignment around
					shared purpose, not just shared deliverables.
				</li>
				<li>
					**Common Vernacular & Language:** Design and development often talk past each other because they use different
					words for the same things.
				</li>
			</ul>
			<p>
				A rich ecosystem and an open mindset converge on shared language, which makes everything else faster and less
				frustrating.
			</p>
		</StandardLayout>
	);
}
