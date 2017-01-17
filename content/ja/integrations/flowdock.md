---
title: Datadog-Flowdock Integration
integration_title: Flowdock
kind: integration
doclevel: basic
---

Integrate with FlowDock to:

* be notified when someone posts on your stream
* get monitor alerts, integration status changes (and much more) directly in your flows

Datadog takes advantage on Flowdock's Threads to avoid polluting your flows with notifications: for a given flow, every notification will go in it's own Thread, further related notifications will go in that same thread (for instance if a given monitor alert is triggered and then resolved, the corresponding notifications will be grouped in Flowdock).

### Hands-off integration

Integrating flowdock is really straightforward. You just have to log into Flowdock on the Configuration tab. It will fetch all your opened flows. If you don't want to post to all of them, you can delete the ones you don't want to appear in the autocomplete list. You can then use @flowdock handles in any user message or monitor to post messages to your flows.

User messages and snapshots will go in the main thread of your flow while each alert will be posted in its own Flowdock thread. It prevents the main thread from being overpolluted with alerts and keeps your team chat clean and organized. On the other hand, you always have an immediate glance at the statuses of the monitors which reported recently on the Inbox view.
