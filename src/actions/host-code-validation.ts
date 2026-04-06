'use server';
import { getRequestInfo } from 'rwsdk/worker';

const PRESENTER_CODE = 'osn-2026-badass';

export async function hostCodeValidation(code: string): Promise<{ success: boolean; message: string; sessionId?: string }> {
	if (code !== PRESENTER_CODE) {
		return { success: false, message: 'Invalid code' };
	}
	const { ctx } = getRequestInfo();
	if (!ctx.session) {
		return { success: false, message: 'No session established' };
	}
	return { success: true, message: 'Poll started', sessionId: ctx.session?.sessionId };
}
