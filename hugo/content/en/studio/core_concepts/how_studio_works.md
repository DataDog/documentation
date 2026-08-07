---
title: How Studio works
description: Learn how Datadog Studio connects your local development environment to production telemetry.
---

Datadog Studio connects your local development environment directly to your production telemetry. This provides a continuous feedback loop between the code you write and how it behaves in production.

## Overview

Most development environments are one-way: you write code locally, push it, and then switch to a browser to see how it performs in production. Datadog Studio connects your local development environment directly to your production telemetry, creating a continuous, closed feedback loop.

With this loop, you build, test, and iterate with live performance data instead of waiting until after you ship to learn how your code behaves.

## The local-to-production loop

The Studio workflow is a constant cycle between your local environment and production:

{{< img src="studio/how-studio-works-test.png" alt="Diagram of the Studio feedback loop: a local coding session flows into Datadog Studio, then to production telemetry, then to signals and fixes that feed back into the local session" style="width:100%;" >}}

1. **Local coding session**: Studio tracks your code changes and agent-driven work items.
2. **Datadog Studio**: Studio correlates your active coding sessions with incoming telemetry.
3. **Production telemetry**: As your code runs, Studio collects logs, metrics, and traces from your production environment.
4. **Signals and fixes**: Studio feeds insights, errors, and performance data back into your local workflow so you can iterate on fixes.

## The two key moments

Studio shapes your development workflow through two feedback moments.

### Context at startup

When you open Datadog Studio, the home page surfaces your inflight coding sessions. Studio tracks your work from inception to production, so you can pick up where you left off. You see the active agents, open pull requests, and tickets for your current task, without manually reopening your ticket tracker, IDE, and terminal tabs.

### Proactive surfacing of issues

As telemetry flows in, Studio monitors your production environment and cross-references the data with your work in progress. When an issue arises, such as a performance regression or an error spike, Studio surfaces the affected component with the root cause and the relevant code context. You can then fix the issue without leaving your development workflow.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
