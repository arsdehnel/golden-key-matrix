"use client";
import { useState } from "react";
import { clearHostSession, setRedirectModeAction } from "@/actions/feature-flags";
import type { OsnRedirectMode } from "@/types";

export default function Admin({ initialRedirectMode }: { initialRedirectMode: OsnRedirectMode }) {
	const [redirectMode, setRedirectMode] = useState(initialRedirectMode);
	const [code, setCode] = useState("");
	const [message, setMessage] = useState<string | null>(null);

	async function handleModeChange(mode: OsnRedirectMode) {
		const result = await setRedirectModeAction(code, mode);
		setMessage(result.message);
		if (result.success && result.mode !== undefined) {
			setRedirectMode(result.mode);
		}
	}

	async function handleClearHostSession() {
		const result = await clearHostSession(code);
		setMessage(result.message);
	}

	return (
		<>
			<h2 className="page-title">Admin</h2>
			<div className="osn-admin-flag">
				<div className="osn-admin-flag-controls">
					<label className="osn-admin-code-label">
						Admin Code
						<input
							className="osn-admin-code-input"
							type="password"
							value={code}
							onChange={e => setCode(e.target.value)}
							autoComplete="off"
						/>
					</label>
					<div className="osn-admin-flag-buttons">
						<button
							type="button"
							className="osn-admin-btn"
							disabled={redirectMode === "PRE_OSN"}
							onClick={() => handleModeChange("PRE_OSN")}
						>
							Pre-OSN
						</button>
						<button
							type="button"
							className="osn-admin-btn"
							disabled={redirectMode === "OSN"}
							onClick={() => handleModeChange("OSN")}
						>
							OSN
						</button>
						<button
							type="button"
							className="osn-admin-btn"
							disabled={redirectMode === "POST_OSN"}
							onClick={() => handleModeChange("POST_OSN")}
						>
							Post-OSN
						</button>
						<button type="button" className="osn-admin-btn" onClick={() => handleClearHostSession()}>
							Clear Host Session
						</button>
					</div>
				</div>
				{message && <p className="osn-admin-message">{message}</p>}
			</div>
		</>
	);
}
