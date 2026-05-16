export type PollAnswer = {
	sessionId: string;
	roleColor: string;
	xPercent: number; // 0–100, relative to quadrant click-area width
	yPercent: number; // 0–100, relative to quadrant click-area height
};

export type OsnRedirectMode = "PRE_OSN" | "OSN" | "POST_OSN";
