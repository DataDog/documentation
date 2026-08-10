---
title: What is Studio?
description: Learn how Datadog Studio connects your local development environment to production telemetry.
---

Most coding tools help you build locally but stop there, leaving you to guess how your code performs after it's live. Datadog Studio connects your local development environment directly to your production telemetry. It provides a continuous feedback loop that helps you ship with confidence and helps confirm that what you build locally works as intended in production.

Studio helps you with three things:

- **Make sure your app works, and fix what's broken.** Find what's failing, get to a root cause, and ship a fix.
- **Understand how people use your product.** See which features users reach and where they drop off.
- **Understand how your AI features perform.** As you build with agents and models, see how they behave.

Studio is agent-agnostic, so it integrates with your existing tools, such as Claude Code, Cursor, GitHub Copilot, or any other agent you prefer. You gain Datadog observability without being locked into a single workflow.

Studio organizes your development workflow, from tracking coding sessions to identifying production issues. It bundles the core tools you need: Error Tracking, Metrics, Logs, Product Analytics, and Session Replay. With its built-in AI agent, you can chat directly with your workspace to manage your workflow, debug issues, and iterate on your product.

{{< img src="studio/studio-overview-dark.png" alt="Datadog Studio overview showing the workspace interface" style="width:100%;" >}}

## The Studio app

The Studio desktop app has three main pieces:

- **[Out-of-the-box pages][2]**: pages for app health, errors, user activity, and AI agents that give you a starting point for understanding your app, without building a dashboard first. The [home page][3] shows what changed and what needs your attention.
- **[Bits AI][4]**: an AI agent that lives alongside every page. Ask questions about what you're looking at, run an investigation on a problem, and act on the result by staging a code fix.
- **[Loops][5]**: background automations that watch your app on your behalf. Studio ships with Loops turned on that monitor user activity and traffic, and you can create your own in plain language through Bits.

To see how these fit together, follow [Investigate an issue from a signal][6].

## Get started

1. [Download and install][1] the Studio desktop app.
2. [Connect your first app][7], so telemetry flows into Studio.
3. Open Studio and review the signals on the [home page][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /studio/download_and_install
[2]: /studio/pages/
[3]: /studio/home/
[4]: /studio/bits_ai/
[5]: /studio/loops/
[6]: /studio/guide/investigate_an_issue/
[7]: /studio/quickstart/
