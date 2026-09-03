---
title: Widget Share URLs
description: Copy widgets as images to share outside of Datadog.
further_reading:
- link: "/dashboards/sharing/"
  tag: "Documentation"
  text: "Sharing"
- link: "/dashboards/widgets/configuration/#copy-and-paste-widgets"
  tag: "Documentation"
  text: "Copy and Paste Widgets"
---

## Overview

Widget Share URLs let you copy a dashboard widget as an image for use outside of Datadog. When you copy a widget with <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>C</kbd>, Datadog creates an image of the widget and generates a share URL. The URL behavior depends on your organization's Widget Share URLs setting.

Admins can choose how widget share links and previews work in [**Organization Settings > Public Sharing > Settings**][3]:

| Mode | Behavior |
| --- | --- |
| **Public** | Anyone with the share URL can view the widget image without a Datadog account. Third-party apps that support link previews, such as Slack or Microsoft Teams, can render a thumbnail of the widget. Viewing the source widget with live data still requires a Datadog account. |
| **Private** | Share URLs are available only to authenticated users in the same Datadog organization. Public image URLs stop serving widget images, so third-party apps cannot render public image previews. Private preview unfurling is supported only in Slack, and only for Slack workspaces connected to the same Datadog organization. |
| **Disabled** | Users cannot generate new Widget Share URLs. Existing share URLs and image endpoints are unavailable while the setting remains disabled, and Slack cannot generate new unfurls for those URLs. |

**Note**: Widget Share URLs is separate from the [Datadog Clipboard][1], which copies widgets for use within Datadog (in dashboards, notebooks, and incidents). It is also unrelated to the [Snapshots API][2], which programmatically captures metric graph snapshots.

## Prerequisites

This feature requires the **Widget Share URLs** setting to be set to **Public** or **Private** in your organization.

Admin changes to the Widget Share URLs mode apply immediately to existing share URLs.

## Copy a widget as a preview image

1. On any dashboard, hover over the widget you want to share.
2. Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>C</kbd>, or click the share icon and select **Copy**.
3. Paste outside of Datadog using <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>.

In tools that support link previews, the pasted link renders according to your organization's Widget Share URLs mode. In **Public** mode, the widget image is publicly accessible. In **Private** mode, public image previews are unavailable; Slack can render a private preview only when the Slack workspace is connected to the same Datadog organization.

## Disable Widget Share URLs

To stop users from generating widget share links and previews, disable the **Widget Share URLs** setting in [**Organization Settings > Public Sharing > Settings**][3]. After disabling, copying a widget no longer generates share links or previews, and previously shared URLs are no longer accessible. If the setting is later changed back to **Public** or **Private**, previously shared URLs resume functioning according to the selected mode.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/datadog_clipboard/
[2]: /api/latest/snapshots/
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings
