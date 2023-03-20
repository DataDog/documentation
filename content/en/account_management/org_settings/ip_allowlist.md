---
title: IP Allowlist
kind: documentation
---

{{< callout url="/help/" header="Get Started with IP Allowlist" >}}
The IP allowlist feature is available for enterprise-level customers only. Request access by contacting support.
{{< /callout >}}

## Overview

The IP allowlist grants you control over which networks can be used to access your data in Datadog. By limiting allowed networks, you can protect your resources from data exfiltration and insider threats.

When the IP allowlist is enabled, only IP addresses or CIDR ranges in the allowlist can access the Datadog API and UI. 

### Blocked and allowed resources

The IP allowlist blocks access to specific resources if the user’s IP is not contained in the allowlist. 

The blocked resources include:
- Datadog’s web UI
- Datadog’s public [API][1], including both documented and unpublished endpoints
- Datadog’s mobile apps (iOS, Android)
- Third-party applications that access Datadog through OAuth

The IP allowlist feature does not block access to the following:
- Data ingest endpoints to which the Agent sends data, such as metrics, traces, and logs
- The [Validate API key][2] endpoint is excluded because it is often used by data ingestion
- [Public dashboards][3]

### Functionality

The IP allowlist supports the following capabilities through both the API and the UI:
- Checking the status of the IP allowlist. Whether the IP allowlist is on or off determines whether your organization is restricting requests by IP address allowlist membership.
- Toggling the IP allowlist on and off.
- Showing the IP addresses (as CIDR ranges) that are covered by your IP allowlist.
- Adding IP addresses (IPv4 or IPv6) or CIDR ranges to the IP allowlist with an optional note.
- Editing the note for an IP address already in the IP allowlist.
- Deleting a single entry from the IP allowlist.
- Wholly replacing the IP allowlist with new entries (only available through the API).

## Navigation

To find the [IP allowlist UI][4]:

1. Navigate to **Organization Settings** from your account menu.
1. Under **Access**, select **IP Allowlist**.

In a table in the center of the page, the IP allowlist UI lists the CIDR ranges contained in the IP allowlist.

### Enable and disable the IP allowlist

A banner at the top of the page shows the enabled or disabled status of the IP allowlist. It also shows your IP and whether that IP is in the allowlist. To toggle the IP allowlist status, click the **Enable** or **Disable** button.

### Add IP address or CIDR range

1. Click the **Add IP** button at the top right of the page. A dialog box appears.
1. Enter a valid IP address or CIDR range.
1. Optionally, add a note.
1. Click **Confirm**.

### Edit IP address or CIDR range

1. In the IP allowlist table, hover over the row you wish to edit. An action tray appears on the right.
1. Click the pencil (**Edit**) icon. A dialog box appears.
1. Change the descriptive **Note** text.
1. Click **Confirm**.

### Delete IP address or CIDR range

1. In the IP allowlist table, hover over the row you wish to delete. An action tray appears on the right.
1. Click the trash can (**Delete**) icon.
1. TODO: What else happens? Is there a confirmation dialog?

## API

See the IP allowlist [public API][2].

## Permissions

Only users with the **Org Management** permission can configure the IP allowlist.

[1]: /api/latest/
[2]: /api/latest/authentication/#validate-api-key
[3]: /dashboards/sharing/
[4]: TODO:
