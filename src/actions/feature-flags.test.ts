import { beforeEach, describe, expect, it, vi } from "vitest";

const mockKV = vi.hoisted(() => ({
	put: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
	get: vi.fn(),
	delete: vi.fn(),
	list: vi.fn(),
	getWithMetadata: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({
	env: { FEATURE_FLAGS: mockKV },
}));

import { setRedirectModeAction } from "./feature-flags";

describe("setRedirectModeAction", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("rejects an invalid code without writing to KV", async () => {
		const result = await setRedirectModeAction("wrong-code", "OSN");
		expect(result.success).toBe(false);
		expect(mockKV.put).not.toHaveBeenCalled();
	});

	it("changes redirect mode with the correct code", async () => {
		const result = await setRedirectModeAction("osn-2026-admin", "OSN");
		expect(result.success).toBe(true);
		expect(result.mode).toBe("OSN");
		expect(mockKV.put).toHaveBeenCalledWith("osn_redirect_mode", "OSN", {
			expirationTtl: 10800,
		});
	});

	it("changes redirect mode with the correct code", async () => {
		const result = await setRedirectModeAction("osn-2026-admin", "PRE_OSN");
		expect(result.success).toBe(true);
		expect(result.mode).toBe("PRE_OSN");
		expect(mockKV.put).toHaveBeenCalledWith("osn_redirect_mode", "PRE_OSN", {
			expirationTtl: 10800,
		});
	});
});
