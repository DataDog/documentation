---
title: Investigate Zendesk Tickets with Session Replay
kind: guide
---

## Overview

When troubleshooting user-reported issues in Zendesk tickets, engineers often struggle to understand the context in which the problem occurred. With the Zendesk and Session Replay integration, support teams can immediately reproduce the user's context from a Zendesk ticket with one click. This allows support teams to troubleshoot more efficiently and reduces the time it takes to provide solutions to customers.

With this integration, support engineers can:
- Watch a [Session Replay][3] of the user's actions
- Examine related backend calls
- Organize related Session Replays into one playlist


## セットアップ

To set up the Zendesk integration, complete the **How to install** section of the [Zendesk Marketplace page for Datadog RUM][2].

## Explore a Session Replay from Zendesk

To view the session replays associated with a Zendesk ticket:

1. Navigate to the ticket in Zendesk.
2. Click the Datadog icon in the right sidebar to view a list of session replays.
3. Click a session replay to view it in Datadog.

{{< img src="real_user_monitoring/guide/zendesk/zendesk-sr-demo.mp4" alt="Accessing a session replay from Zendesk" video=true >}}

From the replay page, you can view a list of the user's actions, along with the backend calls associated with each action. Hover over an event and click **Details** to view associated traces, errors, and more.

{{< img src="real_user_monitoring/guide/zendesk/session-replay-details-button.png" alt="Hover view of a session replay event with the Details button highlighted" style="width:60%;" >}}

You can also add the replay to a playlist to group related issues together for easier browsing and sharing. For more information, see the [Session Replay Playlists documentation][4].

[1]: /integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f
[3]: /real_user_monitoring/session_replay/browser/
[4]: /real_user_monitoring/session_replay/playlists