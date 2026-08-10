---
title: Workboard
description: Use Studio's Workboard to track your coding agent sessions, pull requests, and tickets from a single view.
---

## Overview

Workboard brings together your [coding sessions][1], pull requests, and tickets in a single view, and shows when a session or pull request is blocked and waiting on you. If you use multiple coding agents, such as Claude Code or Codex, across Studio and your terminal, every session appears here without switching tools.

Workboard addresses three common problems for engineers working with coding agents:

- **Scattered sessions**: Coding agent sessions are spread across different agents and interfaces, making it hard to track what each one is working on.
- **Unclear blockers**: It isn't always clear when an agent needs your input or is blocked.
- **PR overhead**: Shipping across multiple repositories means time spent responding to PR feedback, resolving merge conflicts, and fixing failing CI jobs.

## Work items

Workboard organizes your work into *work items*. A work item can be:

- A coding agent session
- A pull request
- A ticket, such as a Jira issue or Linear ticket

Datadog Studio automatically imports your recent coding agent sessions, so your work items appear in Workboard without manual setup.

## Track when an agent needs your input

The **Needs Input** tab shows work items that are blocked and waiting on you. For example, a coding agent session might need your approval to proceed.

To resolve a blocked session:

1. Open the **Needs Input** tab.
2. Select the session to open it directly in Studio.
3. Review the decision or action the agent is waiting on. Related context, such as PR comments and status, appears alongside the session.
4. Approve or respond to unblock the session.

After you unblock a session, its status updates on your Workboard.

## Resolve pull request blockers

Workboard surfaces pull requests that need attention because of merge conflicts or failing CI checks.

### Merge conflicts

For a PR with conflicting files, you can:

- Resolve the conflict directly.
- Offload the conflict to an agent. This starts a coding agent session that works on resolving the merge conflict for you.

### Failing CI checks

For a PR with failing CI checks, you can:

- View the failing checks.
- Retry the pipeline if the failure is a known flaky check.
- Offload the failure to an agent to investigate and fix.

When an agent finishes working on a merge conflict or CI failure, its status updates in Workboard.

## Start a new coding session from Workboard

You can start a coding agent session directly from Workboard, without switching to another tool.

1. From Workboard, start a new session and select your preferred coding agent.
2. Enter a prompt that describes the task.
3. Select the target repository. Studio launches the session in a worktree against that repository.

As the session makes progress, Workboard reflects the updated status.

## View sessions across your team

Workboard also lists the coding agent sessions associated with your teammates. From this list, you can view session status and resume a session.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /studio/core_concepts/coding_sessions_and_trajectories/
