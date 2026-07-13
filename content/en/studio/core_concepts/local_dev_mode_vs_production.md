---
title: Local dev mode compared to production
description: Understand the difference between Studio's local development mode and production, and when to use each.
---

Studio operates in two modes: local development mode, while you build on your machine, and production mode, after your code is deployed. Each mode determines where telemetry is routed, what data is available, and how Studio helps you work.

In **local development mode**, telemetry stays on your machine so you can build and debug with a fast, private feedback loop. In **production mode**, Studio connects to your Datadog environment to give you a unified operational view and track work from inception to production. Both modes capture [trajectories][1], so you can see how efficiently you and your coding agents are working in either environment.

## Local development mode

Studio is in local development mode while you actively build on your machine, before your code is committed or deployed. Telemetry stays on your local dev server rather than the Datadog platform, giving you a private, fast feedback loop.

Use local development mode to build and debug with live signals as you work. Because trajectories are captured in real time, you can catch problems early—such as an agent that loops unnecessarily or takes an inefficient path—and correct them before code is committed.

## Production

Studio is in production mode after your code is deployed and Studio is connected to your Datadog environment. Telemetry is ingested into Datadog to provide a unified operational view of how your code behaves for real users.

Use production mode to monitor live behavior and close the loop on your work. You can correlate coding sessions with production outcomes, triage regressions, and audit the long-term impact of agent-driven changes after the code is live.

## When to use each mode

| | Local development mode | Production |
|---|---|---|
| **When active** | While you build, before code is committed or deployed | After code is deployed and connected to Datadog |
| **Telemetry location** | Stays on your local dev server | Ingested into your Datadog environment |
| **Best for** | Building and debugging with a fast, private feedback loop | Monitoring live behavior and triaging production issues |

For details on the telemetry each mode collects, see [Telemetry and collection][2].

## Further reading

[2]: /studio/core_concepts/telemetry_and_collection/

[1]: /studio/core_concepts/coding_sessions_and_trajectories/#trajectories

{{< partial name="whats-next/whats-next.html" >}}
