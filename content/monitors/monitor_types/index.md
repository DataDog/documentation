---
title: Monitors Type
kind: documentation
autotocdepth: 3
hideguides: true
customnav: monitortypenav
aliases:
    - /monitoring
---

## Glossary

Here is a quick overview of the different terms used in this guide.

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one or more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: [host](#host-monitors)-, [metric](#metric-monitors)-, [integration](#integration-monitors)-, [process](#process-monitors)-, [network](#network-monitors)-, [event](#event-monitors)-based, and [custom](#custom-monitors). See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging](/guides/tagging) page for more details.



## Creating a Monitor

Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by highlighting the "Monitors" tab in the main menu and selecting the
"Create Monitors" sub-tab (depending on your chosen theme, the main menu may be at the top or on the left).  You will be presented with a list of monitor types
on the left. This document will walk through the configuration of each type.