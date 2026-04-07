import styles from '@/styles/global.less?url';

export const Document: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Golden Key Matrix</title>
			<link rel="modulepreload" href="/src/client.tsx" />
			<link rel="stylesheet" href={styles} />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			<link
				href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
				rel="stylesheet"
			/>
		</head>
		<body>
			{children}
			<script>import("/src/client.tsx")</script>
		</body>
	</html>
);
