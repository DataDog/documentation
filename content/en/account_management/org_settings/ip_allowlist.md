---
title: IP Allowlist
kind: documentation
---

{{< callout url="/help/" header="Get Started with IP Allowlist" >}}
The IP allowlist feature is available for enterprise-level customers only. Request access by contacting support.
{{< /callout >}}

## Overview

The IP allowlist controls which networks can be used to access your data in Datadog. By limiting allowed networks, you can protect your resources from data exfiltration and insider threats.

When the IP allowlist is enabled, only IP addresses or CIDR ranges in the allowlist can access the Datadog API and UI. 

### Blocked and allowed resources

If a user's IP is not contained in the IP allowlist, they are effectively blocked from accessing and using:

- Datadog's web UI
- Datadog's public [API][1], including both documented and unpublished endpoints
- Datadog's mobile apps (iOS, Android)
- Third-party applications that access Datadog through OAuth

The IP allowlist feature does not block access to the following:
- Data ingest endpoints to which the Agent sends data, such as metrics, traces, and logs
- The [validate API key][2] endpoint, which the Agent uses before submitting data
- [Public dashboards][3]

### Functionality

Only users with the **Org Management** permission can configure the IP allowlist.

With the IP allowlist API or UI, you can:
- Check the status of the IP allowlist. Whether the IP allowlist is on or off determines whether your organization is restricting requests by IP address allowlist membership.
- Turn the IP allowlist on and off.
- Show the IP addresses (as CIDR ranges) that are covered by your IP allowlist.
- Add IP addresses (IPv4 or IPv6) or CIDR ranges to the IP allowlist with an optional note.
- Edit the note for an IP address already in the IP allowlist.
- Delete a single entry from the IP allowlist.
- Replace the whole IP allowlist with new entries (only available through the API).

### Lockout prevention

When you enable or modify the IP allowlist, the system enforces constraints to make sure you can still access your data:
- At least one entry in the IP allowlist contains your current IP
- The allowlist contains at least one entry

## Managing the IP allowlist in the UI

**Note:** The IP allowlist page only appears in the UI if your Datadog organization has the feature turned on.

To find the [IP allowlist UI][4]:

1. Navigate to **Organization Settings** from your account menu.
1. Under **Access**, select **IP Allowlist**.

The IP allowlist table lists the CIDR ranges contained in the IP allowlist.

### Enable and disable the IP allowlist

A banner at the top of the page shows the enabled or disabled status of the IP allowlist. It also shows your IP and whether that IP is in the allowlist.

To toggle the IP allowlist status, click the **Enable** or **Disable** button.

### Add IP addresses or CIDR ranges

1. Click the **Add IP** button at the top right of the page. 
1. Enter a valid IP address or CIDR range.
1. Optionally, add a note, for example, to remind yourself why you are allowing access to certain addresses.
1. Click **Confirm**.

### Edit IP addresses or CIDR ranges

1. In the IP allowlist table, hover over the row you wish to edit. 
1. Click the pencil (**Edit**) icon. 
1. Change the descriptive **Note** text.
1. Click **Confirm**.

### Delete IP addresses or CIDR ranges

1. In the IP allowlist table, hover over the row you wish to delete. 
1. Click the trash can (**Delete**) icon and confirm you want to delete it. 

## Managing the IP allowlist programmatically

To manage the IP allowlist through the API, see the [public API documentation][5].

See the [`ip_allowlist` resource][6] to manage the IP allowlist in Terraform.


[1]: /api/latest/
[2]: /api/latest/authentication/#validate-api-key
[3]: /dashboards/sharing/
[4]: https://app.datadoghq.com/organization-settings/ip-allowlist
[5]: /api/latest/ip-allowlist/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ip_allowlist
