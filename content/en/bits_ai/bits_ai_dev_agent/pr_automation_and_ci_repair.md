---
title: Pull Request Automation and CI Repair
---

## Overview

Dev Agent creates high-quality pull requests (PRs) and iterates on them until CI passes, so you can review and merge with confidence.

## Pull request generation

When creating a PR, the Bits AI Dev Agent does the following:

- **Branch and commits**
  - Creates a feature or fix branch with a readable, deterministic name.
  - Produces clear, minimal commits with concise messages.
  - Avoids force pushes and preserves history.
- **PR title generation**
  - Generates a concise, action-oriented title.
  - Optionally follows conventions (for example, feat:, fix:, chore:) if your repo uses them.
- **PR description and template compliance**
  - Detects and fills your repository's PR template, populating sections such as Summary, Motivation/Context, Implementation Details, Testing Plan, Risks and Mitigations, Rollback Plan, and Release Notes.
  - Converts the change rationale into user-readable language and links to related issues, tickets, or Datadog signals when available.
- **Metadata and governance**
  - Applies labels, milestones, and assignees if configured.
  - Requests reviews from CODEOWNERS and relevant teams.
  - Respects branch protection rules and required checks.
- **Code quality alignment**
  - Adheres to repository coding conventions, lint rules, and formatting guides.
  - Adds or updates tests when appropriate and avoids suppressing failing tests.

### Restrictions

The Dev Agent does not:
- Merge automatically unless explicitly configured to do so in your workflow.
- Introduce dependencies unless necessary, in which case the Dev Agent notes this in the PR description. 
- Disable tests or relax required checks. If a fix is infeasible, the Dev Agent explains why and proposes next steps.

## Continuous integration monitoring and repair

After creating a PR, the Dev Agent continues to monitor it through the CI pipeline, automatically diagnosing and fixing any failures that occur during testing. This ensures your PRs are not only well-crafted but also ready to merge without manual intervention. 

### Prerequisites

To use the Dev Agent's CI functionality, you must:
1. [Enable required permissions][1].
1. Send CI logs to Datadog so they can be passed to the Dev Agent for context when fixing a CI failure.
1. [Enable Auto-Push][2].

### How CI monitoring works

The Dev Agent does the following:
- Watches PR status checks and test runs. Collects failing job names, error summaries, and stack traces where available.
- Diagnoses common failure classes (unit/integration test failures, linter/formatter issues, type errors, missing imports, flaky assertions).
- Pushes follow-up commits to fix root causes.
- Updates tests when behavior is intentionally changed.
- Updates or adds a PR comment with history of changes.
- Retries CI after each fix and continues until checks are green or limits are reached.

### CI monitoring safeguards

The Dev Agent does the following to ensure safe and responsible CI repair:
- Honors a bounded number of fix attempts and time windows.
- Does not mute tests, weaken lint rules, or bypass protections.
- If failures are infra-related or non-deterministic, the agent retries safely and summarizes next 
steps instead of forcing changes.


[1]: /bits_ai/bits_ai_dev_agent/setup#step-2-configure-github-permissions
[2]: /bits_ai/bits_ai_dev_agent/setup#step-4-optional-enable-auto-push