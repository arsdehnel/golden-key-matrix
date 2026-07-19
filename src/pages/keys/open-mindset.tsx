import StandardLayout from "@/layouts/standard";

export default async function Pages__OpenMindset() {
	const breadcrumbs = [
		{
			href: "/keys",
			label: "Keys",
		},
		{
			label: "Open Mindset",
		},
	];

	return (
		<StandardLayout siteSection="keys" breadcrumbs={breadcrumbs}>
			<h2>Key 1: Open Mindset</h2>
			<p>
				While it can seem cliche to "have an open mind" it is often overlooked in the day-to-day work environment. Having
				an open or growth mindset opens you up to learning new things, solving problems in new ways, and being a better
				teammate.
			</p>
			<h3>Why it is important</h3>
			<p>
				It is entirely possible to build a product without an open mindset. I'd even suggest you could build one (or at
				least start one) <em>faster</em> with a closed mindset. But it won't be a great product, last as long, or be as
				fun to work on that way.
			</p>
			<p>
				Open mindsets foster creativity, engagement, and group problem solving. While it's entirely possible to let this
				lead to a quagmire of paralysis analysis, the avoidance of these things guarantees a failure on a fundamental
				level (even if surface indicators show otherwise).
			</p>
			<h3>What it looks like</h3>
			<p>
				While the term open mindset is thrown around a lot it may be useful to review what it means and how to bring it
				into daily life.
			</p>
			<ul>
				<li>Receptive to new ideas, experiences, and perspectives</li>
				<li>Fuels adaptability &amp; flexibility</li>
				<li>Embraces challenges as opportunities</li>
				<li>Respect for others</li>
				<li>Curious &amp; asks questions</li>
				<li>Receives questions as ideas, not criticism</li>
			</ul>
			<p>
				A concrete example: a developer reaching out with questions and suggestions about UX flow — offering a perspective
				that no one else (stakeholders, users, product) would know to bring. That exchange made the flow better for both
				users and the dev team. That's an open mindset in action.
			</p>
			<h3>How you are doing</h3>
			<p>
				Part of our approach in the golden key talk and ongoing thought sharing is to apply a loose but meaningful rating
				system to the keys. These aren't intended to be rigid or judgemental but rather to inform areas for growth and
				maturing. To reinforce the non-binary and relative nature of these ratings we define each as a spectrum. Sometimes
				you'll move right and sometimes you'll move left, just remember: no judgment!
			</p>
			<p>For the open mindset the rating spectrum looks like this:</p>
			<p>
				<strong>Closed</strong> — Empty Criticism · Definitive Answers · Rejecting Feedback · No Grey
			</p>
			<p>
				<strong>Open</strong> — Questions &amp; Suggestions · Curiosity · Learning · All Gray
			</p>
			<p>Where are you on that spectrum right now? Where is your team?</p>
			<h3>Takeaways and perspectives</h3>
			<p>
				From an individual perspective this is the foundational key. It's entirely under control of each individual
				working on the product. Keeping this in mind and working to approach each problem, conversation, workday, or
				feature release with an open mind will make for a better product and get you to have more fun along the way!
			</p>
			<p>
				For the team, department, and product management perspectives it's important the managers at those levels bring an
				open mindset but also that they facilitate and encourage open mindedness throughout the organization. Not only
				will this foster positive healthy relationships but it will drive the engagement of members of the organization as
				well.
			</p>
		</StandardLayout>
	);
}
