---
title: Widget Public URLs
description: Copy widgets as images and share them outside of Datadog.
further_reading:
- link: "/dashboards/sharing/"
  tag: "Documentation"
  text: "Sharing"
- link: "/dashboards/widgets/configuration/#copy-and-paste-widgets"
  tag: "Documentation"
  text: "Copy and Paste Widgets"
---

## Overview

Widget Public URLs let you copy a dashboard widget as a static image and share it outside of Datadog. When you copy a widget with <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>C</kbd>, Datadog generates a publicly accessible link to a screenshot of the widget as it appears on your screen. This link is placed on your clipboard. When you paste outside of Datadog (for example, into Slack or Microsoft Teams) the link renders as a snapshot image of your widget.

**Note**: Widget Public URLs is separate from the [Datadog Clipboard][1], which copies widgets for use within Datadog (in dashboards, notebooks, and incidents). It is also unrelated to the [Snapshots API][2], which programmatically captures metric graph snapshots.

## Prerequisites

This feature requires the **Widget Public URLs** setting to be enabled in your organization. To enable it, navigate to [**Organization Settings > Public Sharing > Settings**][3].

When enabled, copying a widget generates a publicly accessible image link. Anyone with the link can view the snapshot, regardless of whether they have a Datadog account.

## Copy a widget as an image

1. On any dashboard, hover over the widget you want to share.
2. Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>C</kbd>, or click the share icon and select **Copy**.
3. Paste outside of Datadog using <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>.

In tools that support link previews (such as Slack or Microsoft Teams), the pasted link renders as a snapshot image of the widget.

## Disable Widget Public URLs

To stop generating publicly accessible widget image links, disable the **Widget Public URLs** setting in [**Organization Settings > Public Sharing > Settings**][3]. After disabling, copying a widget no longer generates a public image link.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/datadog_clipboard/
[2]: /api/latest/snapshots/
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings
