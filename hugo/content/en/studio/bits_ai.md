---
title: Bits AI in Studio
description: Ask questions, run investigations, and act on findings with Bits AI in Datadog Studio.
---

## Overview

Bits AI is the AI agent built into Datadog Studio. It lives alongside every page you look at, so you can ask questions about the data in front of you without switching tools.

Use Bits to:

- Ask questions about what you're seeing on any Studio page.
- Investigate a [signal][1] on the home page.
- Act on a finding by staging a code fix or exporting the investigation context.
- Create a [Loop][2] in plain language to keep watching something.

## Investigations

An investigation is a Bits session focused on a single problem, such as a dip in a key event or a spike in errors.

To start an investigation, select a signal card on the home page, or ask Bits about a problem directly. Bits then pulls in data across logs, error events, and user activity to determine what went wrong.

Investigations run in the background. You can close the investigation panel and keep working on other pages while Bits continues; reopen it later to see what it found.

### Evidence behind each claim

Every claim Bits makes is backed by data. Each finding shows the data Bits pulled in to support it, so you can confirm the conclusion yourself instead of taking it at face value.

### Workspace view

To go deeper on an investigation, open it in the full workspace view. The workspace gives the investigation more room and is where you act on what Bits found.

## Act on a finding

From an investigation, you have two ways to move from diagnosis to fix:

- **Ask Bits for a code fix**: Bits proposes code changes and stages a pull request. Review the code changes, then review and approve the pull request after it opens.
- **Copy the investigation context as a prompt**: take the full context into whatever environment you prefer, such as your IDE or terminal-based coding agent.

## Create a Loop from an investigation

After you fix an issue, you often want to keep an eye on the area that caused it. Ask Bits in plain language, for example:

```text
Watch errors on the AI Suggestions feature weekly, and let me know if the error rate spikes.
```

Bits creates a Loop, sets the schedule, and delivers results to the home page when there's something worth your attention. You don't need to configure a monitor, define thresholds, or build a dashboard. See [Loops][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /studio/home/
[2]: /studio/loops/
