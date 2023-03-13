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
- Data ingest endpoints to which Agents send data, such as logs, metrics and traces
- The [Validate API key][2] endpoint is excluded because it is often used by data ingestion
- [Public dashboards][3]

### Functionality

The IP allowlist supports the following functionalities through both the API and the UI:
- Checking the status of the IP allowlist. Whether the IP allowlist is on or off determines whether your organization is restricting requests by IP address allowlist membership.
- Toggling the IP allow list on and off.
- Showing the IP addresses (as CIDR ranges) that are covered by your IP allowlist.
- Adding IP addresses (IPv4 or IPv6) or CIDR ranges to the IP allowlist with an optional note.
- Editing the notes for an IP address already in the IP allowlist.
- Deleting a single entry from the IP allowlist.
- Wholly replacing the IP allowlist with new entries (only available through the API).

## Navigation

TODO: document UI functionality

## API

See the IP allowlist [public API][2].

## Permissions

Only users with the **Org Management** permission can configure the IP allowlist.

[1]: /api/latest/
[2]: /api/latest/authentication/#validate-api-key
[3]: /dashboards/sharing/
