"use client";
import { useState } from "react";
import { setOsnRedirect } from "@/actions/feature-flags";

export default function OsnAdmin({ initialActive }: { initialActive: boolean }) {
	const [active, setActive] = useState(initialActive);
	const [code, setCode] = useState("");
	const [message, setMessage] = useState<string | null>(null);

	async function handleToggle(enable: boolean) {
		const result = await setOsnRedirect(code, enable);
		setMessage(result.message);
		if (result.success && result.active !== undefined) {
			setActive(result.active);
		}
	}

	return (
		<>
			<h2 className="page-title">Admin</h2>
			<div className="osn-admin-flag">
				<h3>OSN Redirect</h3>
				<p className={`osn-admin-flag-status is-${active ? "active" : "inactive"}`}>
					{active
						? "Enabled — all non-/osn traffic is redirected to /osn/welcome"
						: "Disabled — site routing is normal"}
				</p>
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
						<button type="button" className="osn-admin-btn" disabled={active} onClick={() => handleToggle(true)}>
							Enable
						</button>
						<button type="button" className="osn-admin-btn" disabled={!active} onClick={() => handleToggle(false)}>
							Disable
						</button>
					</div>
				</div>
				{message && <p className="osn-admin-message">{message}</p>}
			</div>
		</>
	);
}
