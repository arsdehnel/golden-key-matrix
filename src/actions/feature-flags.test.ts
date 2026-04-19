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

import { setOsnRedirect } from "./feature-flags";

describe("setOsnRedirect", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("rejects an invalid code without writing to KV", async () => {
		const result = await setOsnRedirect("wrong-code", true);
		expect(result.success).toBe(false);
		expect(mockKV.put).not.toHaveBeenCalled();
	});

	it("enables the redirect with the correct code", async () => {
		const result = await setOsnRedirect("osn-2026-admin", true);
		expect(result.success).toBe(true);
		expect(result.active).toBe(true);
		expect(mockKV.put).toHaveBeenCalledWith("osn_redirect_active", "true");
	});

	it("disables the redirect with the correct code", async () => {
		const result = await setOsnRedirect("osn-2026-admin", false);
		expect(result.success).toBe(true);
		expect(result.active).toBe(false);
		expect(mockKV.put).toHaveBeenCalledWith("osn_redirect_active", "false");
	});
});
