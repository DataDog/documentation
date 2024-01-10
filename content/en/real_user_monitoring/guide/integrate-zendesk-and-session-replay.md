---
title: Integrate Zendesk and Session Replay
kind: guide
---

## Overview

When troubleshooting support issues from Zendesk tickets, it's often hard to understand what the user actually did. Teams jump from Zendesk tickets to many tools to try to figure out the root of the issue. With the Zendesk and Session Replay integration, teams can now look at a support ticket in Zendesk and immediately reproduce the context by watching a Session Replay from that exact user.

## Configuration

To get started setting up the integration, check out the [Datadog documentation][1] along with the [Zendesk Marketplace tile][2].

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

## In summary
With this integration, support engineers' jobs are made easier with the following business benefits:
- Happier customers: With a quicker mean time to resolution on support tickets, customers can get their problems solved faster and thus feel more satisfied with service.
- Improved productivity: Support engineers can spend less time troubleshooting and searching through tool-to-tool for telemetry data when all of it can be found in one view in Datadog.

[1]: /integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f