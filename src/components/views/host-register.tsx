import { useState } from 'react';
import { hostCodeValidation } from '@/actions/host-code-validation';

export default function HostRegister({ hostIdentified }: { hostIdentified: (sessionId: string) => void }) {
	const [error, setError] = useState<string | null>(null);
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const code = new FormData(e.currentTarget).get('presenter-code') as string;
		const result = await hostCodeValidation(code);
		if (result.success && result.sessionId) {
			hostIdentified(result.sessionId);
		} else {
			setError(result.message);
		}
	}

	return (
		<>
			<h3>Hey hosts, enter your code to get started</h3>
			<form onSubmit={handleSubmit}>
				<div>
					Code: <input type="text" name="presenter-code" />
				</div>
				{error && <p>{error}</p>}
				<button type="submit">Start Poll</button>
			</form>
		</>
	);
}
