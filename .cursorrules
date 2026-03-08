# AI SYSTEM RULES & SAFETY CONSTRAINTS

**CRITICAL SECURITY PROTOCOLS - DO NOT IGNORE**

1. **ZERO AUTO-COMMITS:** You are strictly forbidden from executing `git commit` or `git push` directly on behalf of the user. You may only suggest git commands or inform the user to commit when they are ready.
2. **NO BLANKET ADDS:** You must NEVER execute or suggest `git add .` under any circumstances. If files need staging, you must explicitly list every single filename (e.g., `git add frontend/page.tsx`).
3. **SECRET LEAK PREVENTION (The 100x Check):** Before suggesting any git command, you must verify absolutely that no environment variables, `.env` files, database URIs, API keys, or temporary test scripts (e.g., `test.ts`, `seed.js`) are being added to source control.
4. **NO LEFT-OVER SCRIPTS:** Any one-off scripts created for testing must be executed and immediately deleted. Never push or instruct the user to push a temporary debug script into the main source tree.
