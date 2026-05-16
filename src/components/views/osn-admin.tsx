"use client";
import { useState } from "react";
import { setOsnRedirect } from "@/actions/feature-flags";
import type { OsnRedirectMode } from "@/types";

export default function OsnAdmin({ initialRedirectMode }: { initialRedirectMode: OsnRedirectMode }) {
	const [redirectMode, setRedirectMode] = useState(initialRedirectMode);
	const [code, setCode] = useState("");
	const [message, setMessage] = useState<string | null>(null);

	async function handleModeChange(mode: OsnRedirectMode) {
		const result = await setOsnRedirect(code, mode);
		setMessage(result.message);
		if (result.success && result.mode !== undefined) {
			setRedirectMode(result.mode);
		}
	}

	return (
		<>
			<h2 className="page-title">Admin</h2>
			<div className="osn-admin-flag">
				<h3>OSN Redirect</h3>
				<p>Current mode: {redirectMode}</p>
				<div className="osn-admin-flag-controls">
					<label className="osn-admin-code-label">
						Code
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
					</div>
				</div>
				{message && <p className="osn-admin-message">{message}</p>}
			</div>
		</>
	);
}
