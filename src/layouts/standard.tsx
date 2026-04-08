import { GitHubLogoIcon, GlobeIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';
import { StrictMode } from 'react';
import FooterLinks from '@/components/footer-links';

export default function StandardLayout({
	siteSection,
	children,
	pageTitle,
}: {
	siteSection: string;
	children: React.ReactNode;
	pageTitle?: string;
}) {
	return (
		<StrictMode>
			<div className="layout-standard">
				<header className="global-header">
					<h1>Golden Keys Matrix</h1>
					<nav className="primary-nav" aria-label="Primary">
						<ul>
							<li
								className={classnames({
									'nav-item': true,
									'nav-item-active': siteSection === 'home',
								})}
							>
								<a href="/">Home</a>
							</li>
							<li
								className={classnames({
									'nav-item': true,
									'nav-item-active': siteSection === 'osn',
								})}
							>
								<a href="/osn">Open Source North</a>
							</li>
						</ul>
					</nav>
				</header>
				<main className={classnames('main-content', `site-section-${siteSection}`)}>
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
									key: 'github',
									href: 'https://github.com/arsdehnel/golden-key-matrix',
									icon: GitHubLogoIcon,
								},
							]}
						/>
						<FooterLinks
							title="Dorothy Toth"
							linkCategory="dt"
							links={[
								{
									key: 'site',
									href: 'https://dorothytoth.com/',
									icon: GlobeIcon,
								},
								{
									key: 'github',
									href: 'https://github.com/DorothyToth',
									icon: GitHubLogoIcon,
								},
								{
									key: 'linkedin',
									href: 'https://www.linkedin.com/in/dorothy-toth/',
									icon: LinkedInLogoIcon,
								},
							]}
						/>
						<FooterLinks
							title="Adam Dehnel"
							linkCategory="ad"
							links={[
								{
									key: 'site',
									href: 'https://arsdehnel.com/',
									icon: GlobeIcon,
								},
								{
									key: 'github',
									href: 'https://github.com/arsdehnel',
									icon: GitHubLogoIcon,
								},
								{
									key: 'linkedin',
									href: 'https://www.linkedin.com/in/adamdehnel/',
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
