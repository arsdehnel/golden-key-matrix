import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { StrictMode } from 'react';

export default function StandardLayout({ children, pageTitle }: { children: React.ReactNode; pageTitle?: string }) {
	return (
		<StrictMode>
			<div className="layout-standard">
				<header className="global-header">
					<h1>Golden Keys Matrix</h1>
					<nav className="primary-nav" aria-label="Primary">
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/osn">Open Source North</a>
							</li>
						</ul>
					</nav>
				</header>
				<main className="main-content">
					{pageTitle && <h2 className="page-title">{pageTitle}</h2>}
					{children}
				</main>
				<footer className="global-footer">
					<nav className="footer-nav" aria-label="Footer">
						<ul>
							<li>
								<a href="https://github.com/arsdehnel/golden-key-matrix">
									<GitHubLogoIcon />
								</a>
							</li>
						</ul>
					</nav>
				</footer>
			</div>
		</StrictMode>
	);
}
