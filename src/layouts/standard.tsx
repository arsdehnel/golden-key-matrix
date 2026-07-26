import { GitHubLogoIcon, GlobeIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import classnames from "classnames";
import { StrictMode } from "react";
import AfterTitleBreak from "@/components/after-title-break";
import FooterLinks from "@/components/footer-links";

export default function StandardLayout({
	siteSection,
	children,
	pageTitle,
	breadcrumbs,
}: {
	siteSection: string;
	children: React.ReactNode;
	pageTitle?: string;
	breadcrumbs?: {
		href?: string;
		label: string;
	}[];
}) {
	const navItems = [
		{
			key: "home",
			href: "/",
			label: "Home",
		},
		{
			key: "osn-2026",
			href: "/osn-2026",
			label: "OSN 2026",
		},
		{
			key: "keys",
			href: "/keys",
			label: "Keys",
		},
		{
			key: "outcomes",
			href: "/outcomes",
			label: "Outcomes",
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
					<AfterTitleBreak />
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
				{breadcrumbs && (
					<nav className="breadcrumbs">
						<ul>
							{breadcrumbs.map(crumb => (
								<li key={crumb.label}>
									{crumb.href ? <a href={crumb.href}>{crumb.label}</a> : <span>{crumb.label}</span>}
								</li>
							))}
						</ul>
					</nav>
				)}
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
			<div className="bg-blob bg-blob-mint" />
			<div className="bg-blob bg-blob-blue" />
		</StrictMode>
	);
}
