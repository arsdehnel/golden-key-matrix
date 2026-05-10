import { GitHubLogoIcon, GlobeIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import classnames from "classnames";
import { StrictMode } from "react";
import FooterLinks from "@/components/footer-links";

export default function StandardLayout({
	siteSection,
	children,
	pageTitle,
}: {
	siteSection: string;
	children: React.ReactNode;
	pageTitle?: string;
}) {
	const navItems = [
		{
			key: "home",
			href: "/",
			label: "Home",
		},
		{
			key: "osn",
			href: "/osn",
			label: "Open Source North",
		},
		{
			key: "matrix",
			href: "/matrix",
			label: "Matrix",
		},
	];

	return (
		<StrictMode>
			<div className={classnames("layout-standard", `layout-standard-site-section-${siteSection}`)}>
				<header className="global-header">
					<h1>The Golden Key to Badass Products</h1>
					<nav className="primary-nav" aria-label="Primary">
						<ul>
							{navItems.map(i => {
								return (
									<li
										key={i.key}
										className={classnames({
											"nav-item": true,
											"nav-item-active": siteSection === i.key,
										})}
									>
										<a href={i.href}>{i.label}</a>
									</li>
								);
							})}
						</ul>
					</nav>
				</header>
				<main className={classnames("main-content", `site-section-${siteSection}`)}>
					{pageTitle && <h2 className="page-title">{pageTitle}</h2>}
					{children}
				</main>
				<footer className="global-footer">
					<div className="footer-links-container">
						<FooterLinks
							title="Golden Key Matrix"
							linkCategory="gkm"
							links={[
								{
									key: "github",
									href: "https://github.com/arsdehnel/golden-key-matrix",
									icon: GitHubLogoIcon,
								},
							]}
						/>
						<FooterLinks
							title="Dorothy Toth"
							linkCategory="dt"
							links={[
								{
									key: "site",
									href: "https://dorothytoth.com/",
									icon: GlobeIcon,
								},
								{
									key: "github",
									href: "https://github.com/DorothyToth",
									icon: GitHubLogoIcon,
								},
								{
									key: "linkedin",
									href: "https://www.linkedin.com/in/dorothy-toth/",
									icon: LinkedInLogoIcon,
								},
							]}
						/>
						<FooterLinks
							title="Adam Dehnel"
							linkCategory="ad"
							links={[
								{
									key: "site",
									href: "https://arsdehnel.com/",
									icon: GlobeIcon,
								},
								{
									key: "github",
									href: "https://github.com/arsdehnel",
									icon: GitHubLogoIcon,
								},
								{
									key: "linkedin",
									href: "https://www.linkedin.com/in/adamdehnel/",
									icon: LinkedInLogoIcon,
								},
							]}
						/>
					</div>
				</footer>
			</div>
		</StrictMode>
	);
}
