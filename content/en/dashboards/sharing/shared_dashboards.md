---
title: Shared Dashboards
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


Shared dashboards allow external viewers or users who prefer not to log into Datadog to access them. You can manage access using different sharing types, each with specific configuration options.

Shared dashboards refresh every 30 seconds and this [refresh rate][1] cannot be customized.

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
5. Add the emails or email domains you want to grant access to. Add a domain to prevent public access and limit dashboard access to anyone with that domain address.  
6. Click **Share Dashboard** to generate a share URL and email an access link to specific invitees. Emails are only sent to specific email addresses. For email domains, you need to manually distribute the dashboard link, as no email is sent.

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

Shared dashboards must be shared by an active user within your organization. If the sharer is deactivated, the shared dashboard automatically enters a **Paused** state and cannot be reenabled until an active user claims it. The shared dashboard URL and configuration options are preserved during the paused state.

### Not all widget types are available

The following widget types are not supported on shared dashboards. Widgets of these types on shared dashboards will not display data.

* Topology Map  
* List Widget (all data sources)  
* Legacy treemap widget

### Limited timeframe options

Shared dashboards support a limited number of timeframe options and do not allow timeframe scrubbing or custom timeframes.

## Edit Shared Dashboards

<div class="alert alert-warning">Any changes to a dashboard's content or layout are instantly reflected in the shared version. Be cautious when editing to avoid unintentionally sharing private data.</div>

To make a change to the share type, configuration, or recipients of a shared dashboard:

1. Click the **Share** options in the upper right corner of the dashboard.   
2. Select **Edit shared dashboard**.  
3. Adjust the desired settings.  
4. Click **Save** for the changes to take effect.

You can temporarily pause or re-enable access to a shared dashboard from this menu.

## View All Shared Dashboards

View all shared dashboards in your organization and your settings on the [Shared Dashboards][2] page. From this page, you can filter dashboards by status and share type, and see and claim any unowned shared dashboards.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/#refresh-rate
[2]: https://app.datadoghq.com/dashboard/shared
