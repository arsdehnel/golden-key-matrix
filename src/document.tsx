import styles from "@/styles/global.less?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link
				rel="preload stylesheet"
				as="style"
				href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap"
			/>
			<title>Golden Key Matrix</title>
			<link rel="modulepreload" href="/src/client.tsx" />
			<link rel="stylesheet" href={styles} />
		</head>
		<body>
			{children}
			<script>import("/src/client.tsx")</script>
		</body>
	</html>
);
