import Markdown from "react-markdown";
import StandardLayout from "@/layouts/standard";

export default async function Pages__RichEcosystem() {
	const breadcrumbs = [
		{
			href: "/keys",
			label: "Keys",
		},
		{
			label: "Rich Ecosystem",
		},
	];

	return (
		<StandardLayout siteSection="keys" breadcrumbs={breadcrumbs}>
			<h2>Key 3: Rich Ecosystem</h2>
			<Markdown>{markdown}</Markdown>
		</StandardLayout>
	);
}

const markdown = `Before the product grows beyond just a few teams it is worth taking a step back and creating the seedling garden that will grow along with the customer-facing product into a rich ecosystem. This is very easy to deprioritize and assume it’ll just magically happen as the teams grow but it will not. Just like a seedling garden that isn’t attended to you’ll have a rogue weed take out entire features. 

### why it is important
Establishing the ecosystem behind your product gives you a place to build a common vernacular around how you’re approaching things as well as defining key technical, creative, and process building blocks that will solidify the entire organization. Without this each team, department, and division will inevitably (and sometimes unknowingly) create their own within a wiki or shared drive. This creates inconsistency and toil to scale beyond the necessary level and slow down that ever important feature release cadence. 

### what it looks like
Every ecosystem will have different constraints and every organization has decisions made outside of the product that will define things like tool selection and process documentation. While we certainly have our own opinions about some good (and some bad) choices for those things they are not required for a good product ecosystem. What is required is being smart about those choices knowing your teams and organization and then making those tools available to everyone and easy to integrate into daily life. Friction here will kill a good choice and fragment your ecosystem.

(Examples/bullets from slides)

### how you are doing
Part of our approach in the golden key talk and ongoing thought sharing is to apply a loose but meaningful rating system to the keys. These aren’t intended to be rigid or judgemental but rather to inform areas for growth and maturing. To reinforce the non-binary and relative nature of these ratings we define each as a spectrum. Sometimes you’ll move right and sometimes you’ll move left, just remember: no judgment!

For the rich ecosystem the rating spectrum looks like this:
(Pull spectrum from slides)

### takeaways and perspectives
Not everything has to be decided to call the initial seedling garden of your ecosystem ready to go. Establishing patterns, a well-defined location, and approaches to organization-wide problem solving are a great start. Including basic outlines of how to surface modifications and additions would also be a good thing to include right off the bat. `;
