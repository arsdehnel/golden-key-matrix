import type { IconProps } from '@radix-ui/react-icons/dist/types';
import classnames from 'classnames';

type FooterLink = {
	key: string;
	href: string;
	icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
};

export default function FooterLinks({
	title,
	linkCategory,
	links,
}: {
	title: string;
	linkCategory: string;
	links: FooterLink[];
}) {
	return (
		<nav className={classnames('footer-nav', `footer-nav-${linkCategory}`)} aria-label={title}>
			<div className="footer-nav-title">{title}</div>
			<ul>
				{links.map(l => {
					return (
						<li key={l.key}>
							<a href={l.href}>
								<l.icon />
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
