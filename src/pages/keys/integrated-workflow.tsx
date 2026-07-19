import StandardLayout from "@/layouts/standard";

export default async function Pages__IntegratedWorkflow() {
	const breadcrumbs = [
		{
			href: "/keys",
			label: "Keys",
		},
		{
			label: "Integrated Workflow",
		},
	];

	return (
		<StandardLayout siteSection="keys" breadcrumbs={breadcrumbs}>
			<h2>Key 2: Integrated Workflow</h2>
			<p>
				Inevitably a successful product will require two or more (hopefully a lot more as you grow) teams. While it's
				pretty well agreed upon that one giant team is not a great plan, the default "break everyone up into self governed
				independent teams" has many flaws as well. Our suggested integrated workflow aims to propose a malleable middle
				ground where teams can remain managerially independent but can flex and shift how they align with other teams
				throughout the product maturity lifecycle.
			</p>
			<h3>Why it is important</h3>
			<p>
				In my own reflections following our initial conference talk about the golden keychain I came to think of this key
				as the "glue" that holds the other two keys together. That isn't to say this key isn't important on its own but
				without the other two an integrated workflow isn't going to get you very far. Conversely trying to have the other
				two without integrating workflows and you'll have a mess of unconnected cogs spinning wildly instead of a single
				machine running like clockwork.
			</p>
			<p>
				Defining how these workflows can (and perhaps cannot) be integrated across team boundaries allows the flexibility
				of independent teams while minimizing the friction of fully <em>isolated</em> teams. The specifics of the workflow
				integrations can be different for every organization but acknowledging the necessity of this key in your
				organization is crucial. Without those integration guidelines teams will invent their own and inevitably they
				won't mesh with each other as teams and the product mature and grow.
			</p>
			<h3>What it looks like</h3>
			<p>
				There is no specific formula or definition for what the integrated workflow looks like. Identifying it as
				important leads discussions and organization-specific definitions and models. Some guiding ideas and concepts for
				those discussions can be helpful, though, so here are some starting points and things to consider.
			</p>
			<ul>
				<li>Prototype run throughs — walk the other team through a design or build before it's finished</li>
				<li>
					UX Intention Discussions — designers explain the <em>why</em> behind a design decision, not just the what
				</li>
				<li>
					Dev Build Explanations — developers walk designers through implementation constraints early, not after the
					fact
				</li>
				<li>Cross-team paired programming — designers and developers working through a problem together</li>
			</ul>
			<p>
				A simple starting point: use the same project management and communication tools across teams (Jira, ADO, Slack,
				etc.). When designers and developers are working in the same tools, the workflow starts to integrate itself.
			</p>
			<h3>How you are doing</h3>
			<p>
				Part of our approach in the golden key talk and ongoing thought sharing is to apply a loose but meaningful rating
				system to the keys. These aren't intended to be rigid or judgemental but rather to inform areas for growth and
				maturing. To reinforce the non-binary and relative nature of these ratings we define each as a spectrum. Sometimes
				you'll move right and sometimes you'll move left, just remember: no judgment!
			</p>
			<p>For the integrated workflow the rating spectrum looks like this:</p>
			<p>
				<strong>Isolated</strong> — Linear &amp; Rigid · Little Communication Between Teams · Process for Process Sake ·
				Separated Environments
			</p>
			<p>
				<strong>Integrated</strong> — Cyclical &amp; Looping · Cross-team/Paired Programming · Iterative Collaboration ·
				Shared Environments
			</p>
			<p>Where are you on that spectrum right now?</p>
			<h3>Takeaways and perspectives</h3>
			<p>
				This key is essential to grow a product organization beyond a single team. What that looks like for you and your
				organization at your specific point in growth and maturity is going to be up to you to define. But defining it is
				the important part. Don't let it define itself or you'll have countless hours of meetings and rework to straighten
				it out retroactively.
			</p>
		</StandardLayout>
	);
}
