import { describe, expect, it, vi } from "vitest";

// Prevent module resolution error — osn-redirect.ts imports cloudflare:workers at the top level
vi.mock("cloudflare:workers", () => ({ env: {} }));

import { shouldOsnRedirect } from "./osn-redirect";

describe("shouldOsnRedirect", () => {
	it("redirects when flag is active and path is outside /osn", () => {
		expect(shouldOsnRedirect("true", "/")).toBe(true);
		expect(shouldOsnRedirect("true", "/matrix")).toBe(true);
		expect(shouldOsnRedirect("true", "/dev/osn-attendee-poll")).toBe(true);
	});

	it("does not redirect when already on an /osn path", () => {
		expect(shouldOsnRedirect("true", "/osn/welcome")).toBe(false);
		expect(shouldOsnRedirect("true", "/osn/host")).toBe(false);
		expect(shouldOsnRedirect("true", "/osn")).toBe(false);
	});

	it("does not redirect when flag is null (not set)", () => {
		expect(shouldOsnRedirect(null, "/")).toBe(false);
		expect(shouldOsnRedirect(null, "/matrix")).toBe(false);
	});

	it("does not redirect when flag is explicitly false", () => {
		expect(shouldOsnRedirect("false", "/")).toBe(false);
	});
});
