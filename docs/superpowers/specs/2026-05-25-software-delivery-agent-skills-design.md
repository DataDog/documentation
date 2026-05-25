# Design: Document triage-flaky-test and unblock-pr Agent Skills

**Date:** 2026-05-25
**Jira:** SDCT-405
**Epic:** SDCT-240

## Summary

Add an "Agent skills" section to `content/en/getting_started/software_delivery_mcp_tools/_index.md` documenting the `triage-flaky-test` and `unblock-pr` skills. Structure mirrors `llm_observability/mcp_server.md#agent-skills`.

## Skills Being Documented

### triage-flaky-test

Source: `dd-source/domains/mcp_services/libs/go/mcp/tools/skills/datadog/triage-flaky-test/SKILL.md`

- Investigates a specific flaky test
- Pulls 30-day failure history, top error messages, blast radius across pipelines
- Surfaces AI-generated fix (CodeGen) if `attempt_to_fix_id` is present; otherwise proposes agent-native fix from flaky category + stack trace
- Produces a structured triage brief: test name, category, failure rate, duration lost, codeowners, blast radius, recommendation (fix / quarantine / escalate)
- Quarantine actions require explicit user approval before calling `update_datadog_flaky_test_states` (reversible)
- Required toolsets: `core`, `software-delivery`

### unblock-pr

Source: `dd-source/domains/mcp_services/libs/go/mcp/tools/skills/datadog/unblock-pr/SKILL.md`

- Investigates a failing PR CI pipeline
- Runs blame guard per failing job: checks if job was already failing on default branch or other branches
- Classifies each job failure as **flaky**, **infra**, or **regression**
- Produces a triage brief with per-job classification, evidence, confidence, and recommended action
- For flaky: chains into `triage-flaky-test`; for infra: offers CI retry via `gh run rerun`; for regression: prompts user to investigate their changes
- Required toolsets: `core`, `software-delivery`

## Page Change

**File:** `content/en/getting_started/software_delivery_mcp_tools/_index.md`

**Placement:** New `## Agent skills` section added after `## Setup`, before `## Further reading`.

### Section structure

```
## Agent skills

[intro paragraph — skills available automatically via MCP; npx for slash commands]

### Install

[zero-install path first, then npx optional]

### Available skills

[summary table: Skill | Invoke with | What it does]

### Triage flaky test

[description, approval gate callout, usage examples]

### Unblock PR

[description, chains into triage-flaky-test, usage examples]
```

### Skill set name

Placeholder `dd-software-delivery` — to be confirmed when skills are added to `datadog-labs/agent-skills`.

### Key content decisions

- **Lead with MCP-native (zero-install)**: Skills are loaded automatically by the MCP server when the prompt matches. The `npx` install is optional and enables explicit slash command invocation.
- **Approval gate callout for quarantine**: `triage-flaky-test` can call `update_datadog_flaky_test_states`; must note that quarantine requires explicit user approval and is reversible.
- **unblock-pr chains into triage-flaky-test**: Document this relationship so users understand flaky failures trigger a deeper investigation automatically.

## What Is Not Changing

- No new pages (Option A — single page addition)
- No changes to the Setup section or existing tools reference
- No guide page (can be added later if content grows)
- Translated content is managed externally — English only
