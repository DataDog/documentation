---
title: Shared Dashboards
description: Create public, invite-only, and embedded dashboards for external access with customizable timeframes and variables.
aliases:
    - /graphing/faq/is-there-a-way-to-share-graphs
    - /graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
    - /graphing/dashboards/shared_graph/
    - /dashboards/sharing/public_dashboards
further_reading:
- link: "https://www.datadoghq.com/blog/dashboard-sharing/"
  tag: "Blog"
  text: "Share dashboards securely with anyone outside of your organization"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Create Dashboards in Datadog"
- link: "/dashboards/template_variables/"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover Widgets for your Dashboard"
---

## Overview


Shared dashboards in Datadog allow external users or those who prefer not to log in to view your dashboards. You can create multiple shared dashboards, each with its own set of configuration options.

To share a dashboard, click **Share** then **Share dashboard** at the top-right of the dashboard page. To view or edit existing shared dashboards, click **Share** then **Manage shared dashboards**.

{{< img src="/dashboards/sharing/shared_dashboards/manage_modal.png" alt="Example of an manage shared dashboards modal" style="width:90%;" >}}

All shared dashboards in the organization and their public access settings are listed on the [Shared Dashboards page][2]. You can also add additional security configurations, such as disabling specific sharing types, or setting the Maximum Access Period for invitations on the [Public Sharing Settings page][3].

**Note**: When the shared dashboards feature is disabled, dashboards are no longer publicly accessible. However, their configurations remain viewable and editable. This feature operates independently of the `Active` or `Paused` status of individual dashboards, even `Active` shared dashboards become publicly inaccessible.

Shared dashboards refresh approximately every 60 seconds, and this [refresh rate][1] cannot be customized.

Viewers of Shared Dashboards see all telemetry data displayed in the Dashboard in accordance to the [creator's permissions][4]. Review your dashboard content before sharing to ensure no sensitive or confidential data is exposed.

## Share states

Shared dashboards can be in one of two share states:

**Active**
: The shared dashboard is assigned a specific URL and is available to viewers who are configured to access the dashboard.

**Paused**
: Viewers cannot access the shared dashboard, even if invited. However, the shared dashboard URL remains linked to the dashboard, and previous access is restored if the dashboard is reset to **Active**.

**Unsharing** a dashboard removes its share URL and deletes all shared configuration settings, making all links invalid. When you reshare the dashboard, it does not retain the previous share URL or settings.

## Invite-only shared dashboards

Invite-only dashboards allow you to share a dashboard with individual email addresses or specific email domains.

To share a dashboard with one or more email addresses:

1. Click the **Share** options in the upper right corner of the dashboard you want to share.
2. Select **Share Dashboard.**
3. Select **Invite only**.
4. Configure the desired options time, variable, and color options. For more details, see the [Configuration Options](#configuration-options).
5. Add the emails or email domains (case sensitive) you want to grant access to, and set the expiration date for each invite. Add a domain to prevent public access and limit dashboard access to anyone with that domain address.
6. Click **Share Dashboard** to generate a share URL and email an access link to specific invitees. Emails are only sent to specific email addresses. For email domains, you need to manually distribute the dashboard link, as no email is sent.

### Access Period

- Invited emails lose access at 12:00 a.m. local time on the expiration date.
- The Maximum Access Period of an invitation can be configured by an organization admin in [**Organization Settings > Public Sharing**][3]. By default, it is not configured.
- Maximum Access Period is enforced by exact timestamp. For example, with a Maximum Access Period of one day, an invitation created at Jan 1st 11:00AM must expire by Jan 2nd 11:00AM.

### Access an invite-only shared dashboard

Invitees to shared dashboards are sent an email with a limited-time access link. The email recipients need to click on the link within 1 hour to gain access to the shared dashboard.

{{< img src="/dashboards/sharing/shared_dashboards/invite_only_dashboard_link.png" alt="Example of an email invite with a private dashboard access link" style="width:90%;" >}}

After clicking the link, invitees can access the shared dashboard on the same computer and browser for 30 days before needing to renew access. You can continue renewing access as long as you remain a valid recipient and the dashboard is in an active state.

#### Get a new access link

Valid recipients can request a new access link at any time without needing approval from the sharer. If you visit the shared dashboard without active access, you are prompted to enter your email address to receive the new access link. Only valid recipients can receive this email.

### Revoke access to an invite-only shared dashboard

To revoke access to a shared dashboard, remove the desired email addresses from the recipient list and save the changes. These removed recipients no longer have access or the ability to request a new access link.

**Note**: The user who shares an invite-only dashboard remains a valid recipient and cannot be removed.

## Public shared dashboards

Public dashboards allow users to make a shared dashboard available to anyone on the internet with the link.

To share a public dashboard:

1. Click the **Share** options in the upper right corner of the dashboard you want to share.
2. Select **Share Dashboard**.
3. Select the **Public** option in the **Select a Share Type** step and acknowledge that you understand the dashboard will be accessible to anyone with the link.
4. Configure the desired options time, variable, and color options in the **Configure Dashboard** step.
5. Click **Share Dashboard** to create the share URL.

By default, public dashboards are accessible for one year before they expire and switch to a **Paused** state. You can turn off or adjust the expiration date in the **Select a Share Type** step.

## Embedded shared dashboards

You can embed shared dashboards into a website using an iframe. Access to these embedded dashboards is restricted to allowlisted request referrers.
This feature is not supported on Safari web browsers.

The HTTP request's referrer header is checked against the allowlisted entries for validation. In most cases, typing `window.location.origin` into your browser console should give you the expected referrer. However, if you have any special manipulation on browser headers (for example, browser privacy settings) you should check the actual network request. 

To share an embedded dashboard:

1. Click **Share** in the upper-right corner of the dashboard.
2. Select **Share Dashboard**.
3. Select the **Embed** option in the **Select a Share Type** step.
4. Configure the desired time, variable, and color options in the **Configure Dashboard** step.
5. Add the referrers that you want to allowlist.
6. Click **Share Dashboard** to create the share URL.

## Configuration Options

{{< img src="/dashboards/sharing/shared_dashboards/configure_shared_dashboard.png" alt="Configuration section to share a dashboard showing a default timeframe of Past 1 Hour, allowing viewers to change the timeframe, and a default Light theme" style="width:90%;" >}}

In the **Configure Dashboard** step, make changes to the shared dashboard.

**Note**: Configuration changes to shared dashboards may take up to 5 minutes to propagate to all viewers. If changes don't appear immediately, wait a few minutes and refresh the dashboard.

**Published Name**
: The published name will replace the dashboard title on the shared dashboard. This name is also the name the shared dashboard is listed under on the Shared Dashboard list page.

**Default Timeframe**
: This sets the default timeframe for viewers of the shared dashboard. If "Allow viewers to change the timeframe" is toggled off, this is the only available timeframe. Toggling it on provides viewers with a fixed set of timeframe options to choose from, though custom timeframes and timeframe scrubbing are not supported.

**Variables**
: This setting lets users specify which template variables on the dashboard are available to viewers. Setting the same default and available value for a template variable makes it unchangeable by viewers. <br>**Note**: This applies even if the values are set to a wildcard (\*). <br><br>By default, the shared dashboard inherits the selected and available values currently used by the sharer.

**Default Theme**
: This setting lets users choose whether the shared dashboard is displayed in light or dark mode by default. Viewers can override this option at any time.

## Restrictions on Shared Dashboards

### Dashboards cannot be shared by deactivated users

Shared dashboards must be shared by an active user within your organization. If the sharer is deactivated, the shared dashboard **no longer displays data** until an active user claims ownership of it. The shared dashboard URL and configuration options are preserved during this state.

### Not all widget types are available

The following widget types are not supported on shared dashboards. Widgets of these types on shared dashboards will not display data.

* Topology Map
* List Widget (all data sources)
* Legacy treemap widget

### Limited timeframe options

Shared dashboards support a limited number of timeframe options and do not allow timeframe scrubbing or custom timeframes.

## Edit Shared Dashboards

<div class="alert alert-danger">Any changes to a dashboard's content or layout are instantly reflected in the shared version. Be cautious when editing to avoid unintentionally sharing private data.</div>

To make a change to the share type, configuration, or recipients of a shared dashboard:

1. Click the **Share** options in the upper right corner of the dashboard.
2. Select **Edit shared dashboard**.
3. Adjust the desired settings.
4. Click **Save** for the changes to take effect.

You can temporarily pause or re-enable access to a shared dashboard from this menu.

## View All Shared Dashboards

View all shared dashboards in your organization and your settings on the [Shared Dashboards][2] page. From this page, you can query, filter, and sort dashboards by share type, last accessed, sharer, and more. You can also find and claim any unowned shared dashboards.

{{< img src="/dashboards/sharing/shared_dashboards/shared_search.png" alt="Example of shared dashboards list page" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/#refresh-rate
[2]: https://app.datadoghq.com/dashboard/shared
[3]: https://app.datadoghq.com/organization-settings/public-sharing
[4]: /account_management/rbac/data_access/#dashboards-and-notebooks
