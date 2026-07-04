import Markdown from "react-markdown";
import StandardLayout from "@/layouts/standard";

export default async function Pages__Outcomes(): Promise<React.JSX.Element> {
	return (
		<StandardLayout siteSection="outcomes">
			<h2>Outcomes</h2>
			<Markdown>{markdown}</Markdown>
		</StandardLayout>
	);
}

const markdown = `While the keys define what to do to make a great product there are stakeholders and budget owners that need more than some keys. For those doing the day-to-day work of product making they keys are easy to agree with, support, and institute. An essential part of our approach is connecting those keys to tangible and meaningful outcomes for those that are paying for the product teams and guiding the organizational vision. 

## Outcome 1: Speed & Efficiency

- Quickness without Losing Depth
- Adaptability & Completeness

## Outcome 2: Maintainability & Scalability

- Cooperative Governance
- Vision for Future

## Outcome 3: Community & Passion

- Mutual Intention
- Common Vernacular & Language

`;
