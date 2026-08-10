---
title: Out-of-the-box pages
description: Explore the out-of-the-box pages in Datadog Studio for app health, errors, user activity, and AI agents.
---

## Overview

Datadog Studio ships with a set of out-of-the-box pages. Each one gives you a starting point for understanding your app, without building a dashboard first, and answers one question:

| Page | Answers |
|---|---|
| [Home][1] | What changed that needs your attention? |
| App health | Is the app working? |
| Errors | What is broken, and how much does it matter? |
| User activity | How are people using the product? |
| Agents | How are your AI agents and models performing? |

[Bits AI][2] is available alongside every page, so you can ask follow-up questions about what you're looking at instead of switching tools.

## User activity

The user activity page shows how people use your product and where they drop off. It includes:

- **User counts**: total users, returning users, and new users.
- **AI-generated insights**: a summary of what happened with your users over the selected time frame.
- **Behavior breakdowns**: the number of sessions, top actions, and top views.
- **Top paths**: the routes users most commonly take through your app.

Select any user to open their details page.

### User details

The user details page shows a single user's experience:

- The user's sessions and the views they visited.
- The critical issues that user faced. Use this to confirm whether a user was affected by an issue you're investigating.
- A [Session Replay][3] of the user's session, so you can watch what they were doing leading up to a failure.

## App health, errors, and agents

These pages follow the same pattern as user activity: out-of-the-box charts and AI-generated insights, with Bits available for follow-up questions.

- **App health**: whether your app is working, so you can confirm a deploy is healthy or spot a regression.
- **Errors**: what is broken and which errors have the largest user impact.
- **Agents**: how your AI agents and models are performing as you build AI features.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /studio/home/
[2]: /studio/bits_ai/
[3]: /session_replay/
