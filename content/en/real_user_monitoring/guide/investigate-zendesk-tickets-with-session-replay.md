---
title: Investigate Zendesk Tickets with Session Replay
kind: guide
---

## Overview

When troubleshooting user-reported issues in Zendesk tickets, engineers often struggle to understand the context in which the problem occurred. With the Zendesk and Session Replay integration, teams can immediately reproduce the user's context from a Zendesk ticket with one click.

With this integration, support engineers can:
- Watch a Session Replay of the user's actions
- Examine related backend API calls
- Organize related Session Replays into one playlist

Support teams can troubleshoot more efficiently, which means customers receive solutions more quickly.

## Setup

To set up the Zendesk integration, complete the **How to install** section of the [Zendesk Marketplace page for Datadog RUM][2].

## How to use

As an engineer triaging a support ticket, you may go to open a ticket where a user spotted a problem, but there is minimal information available to begin a troubleshooting workflow.

As shown in the video below, you can, in one click, pivot to the associated Session Replays in Datadog from the exact user who complained on the ticket.

<!-- video -->

## Watch a Session Replay

The ability to jump from the user ticket to the Session Replay allows support teams to have the full context of what went wrong with the user when troubleshooting. The Session Replay shows each cursor movement the user took and where they got stumped. The visual tie to the exact problem of the ticket leaves no question unanswered as to what went wrong.

<!-- video -->

## Drill to backend data

In the Session Replay as well, users can drill down into the related backend API calls to eliminate if the root error is due to an issue on the frontend or backend.

<!-- screenshot -->

## Create playlists

When bugs arise, support engineers often see multiple tickets with issues all stemming from the same root problem. By using Session Replay, users can group together all related behavior into a playlist to save the Session Replays into a folder-like experience that stemmed from the bug:

<!-- screenshot -->

[1]: /integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f