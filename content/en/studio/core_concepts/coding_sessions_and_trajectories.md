---
title: Coding sessions and trajectories
description: Learn how Studio tracks coding sessions and trajectories to organize your development workflow.
---

## Overview

Studio organizes your development workflow around two related concepts, so you can track your work from local changes through to production behavior:

- A **coding session** is the unit of work Studio tracks, from inception to production. It groups the code changes, agent activity, pull requests, and tickets for a single task, so you can pick up where you left off and follow that work as it ships.
- A **trajectory** is the record of a coding agent's actions within that work: its reasoning, tool calls, and the steps it takes as you build.

Coding sessions tell you *what* you are working on; trajectories tell you *how* you and your agents got there. Together, they connect the code you write to how it behaves in production.

## Coding sessions

A coding session represents a single task you are working on, tracked from inception to production. Rather than scattering the context for a task across your ticket tracker, IDE, and terminal, Studio groups it into one session that follows the work as it ships.

A coding session brings together:

- **Code changes**: the local edits and commits you make for the task.
- **Agent activity**: the coding agents working on the task and the [trajectories](#trajectories) they produce.
- **Pull requests**: the open PRs associated with the work.
- **Tickets**: the issues or tickets that scope the task.

When you open Studio, the home page surfaces your inflight coding sessions, so you can pick up where you left off without manually reopening each tool. As your code moves toward production, Studio correlates the session with incoming telemetry, connecting the work you did to how it behaves for real users.

## Trajectories

A *trajectory* is the recorded sequence of a coding agent's actions during a task: its reasoning, tool calls, and the steps it takes as you build. Trajectory analysis is the study of these records.

Trajectory analysis is distinct from application telemetry. Application telemetry (such as APM, RUM, and logs) answers whether your software is healthy—its latency, errors, and user impact. Trajectory analysis answers a different question: how efficiently you and your coding agents are working. It surfaces the reasoning, tool usage, and roadblocks that occur during development, so you can monitor the building process, not only the final application.

### Local and production trajectories

- **Local development mode**: Trajectories are captured in real time on your machine, so you can debug your agent's logic as you build. If an agent is stuck, loops unnecessarily, or takes an inefficient path, you can identify and correct the issue before code is committed.
- **Production and connected mode**: Trajectories are persisted and linked to deployment outcomes, so you can evaluate the long-term effectiveness of your coding agents. You can correlate specific agent sessions with production stability, identify which agents or coding patterns lead to regressions, and audit the cost and performance impact of agent-driven work after the code is live.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
