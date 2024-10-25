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

Shared Dashboards enable Datadog users to provide access to a dashboard to viewers outside their organization or who do not want to log into Datadog to view the dashboard.

There are multiple sharing types that can be used to manage access to the shared version of the dashboard. Selecting the share type will display the configuration options that are available for that share type.

Shared dashboards refresh every 30 seconds and this [refresh rate][1] cannot be customized.

## Share states

Shared dashboards can be in one of two share states:

**Active**
: The shared dashboard has been assigned a specific URL and is available to viewers who are configured to access the dashboard. 

**Paused**
: No viewers can access the shared dashboard, even if they have been invited. However the shared dashboard URL is still assigned to the dashboard and all previous access will be restored if the dashboard state is reset to **Active**.

**Unsharing** a dashboard will remove the share URL from the dashboard and delete all shared dashboard configuration settings, causing all links to the dashboard to become invalid. Resharing the dashboard in the future will not restore the previous share URL nor the previous shared dashboard configuration settings.

## Invite-only shared dashboards

Invite-only dashboards allow users to share a dashboard with individual email addresses or specific email domains. 

To share a dashboard with one or more email addresses:

1. Click the **Share** options in the upper right corner of the dashboard you want to share.  
2. Select **Share Dashboard.**  
3. Select **Invite only**.  
4. Configure the desired options time, variable, and color options. For more details, see the [Configuration Options](#configuration-options).   
5. Add the emails or email domains you want to grant access to. Add a domain to prevent public access and limit dashboard access to anyone with that domain address.  
6. Click **Share Dashboard** to create the share URL and send invitees an email with an access link to the dashboard. An email with the access link is sent only to individual email addresses. For email domains, no email is sent and you will need to share a link to the shared dashboard with the intended recipients. 

### Access an invite-only shared dashboard

Anyone invited to access a shared dashboard is sent an email with a limited-time access link. The email recipient needs to click on the link within 1 hour to gain access to the shared dashboard.   

{{< img src="/dashboards/sharing/shared_dashboards/invite_only_dashboard_link.png" alt="Example of an email invite with a private dashboard access link" style="width:90%;" >}}

Once you (the recipient) click the link you are able to access the shared dashboard using the same computer and browser for 30 days before needing to renew your access. You can continue renewing access to the shared dashboard as long as you are configured as a valid recipient of that dashboard and the shared dashboard is in an active state.

#### Get a new access link

Valid recipients can request a new access link at any time without requiring approval from the sharer. If you navigate to the shared dashboard and do not have active access, you will be prompted to enter your email address to receive an email with the new access link. Only valid recipients can receive an email with the access link.

### Revoke access to an invite-only shared dashboard

To revoke sharing a dashboard with one or more email addresses, remove the email from the list of recipients for the shared dashboard and save the new configuration to apply the changes. Removed recipients are no longer able to access the dashboard nor request a new access link.

**Note**: The user who shares an invite only dashboard is always on the list of valid recipients and cannot be removed. 

## Public shared dashboards

Public dashboards allow users to make a shared dashboard available to anyone on the internet with the link.

To share a public dashboard:

1. Click the **Share** options in the upper right corner of the dashboard you want to share.  
2. Select **Share Dashboard**.  
3. Select the **Public** option in the **Select a Share Type** step and acknowledge that you understand the dashboard will be accessible to anyone with the link.   
4. Configure the desired options time, variable, and color options in the **Configure Dashboard** step.  
5. Click **Share Dashboard** to create the share URL. 

By default, public dashboards are accessible for 1 year before the dashboard expires and is switched to a **Paused** state. The expiration date can be turned off or adjusted in the **Select a Share Type** step. 

## Configuration Options

{{< img src="/dashboards/sharing/shared_dashboards/configure_shared_dashboard.png" alt="Configuration section to share a dashboard showing a default timeframe of Past 1 Hour, allowing viewers to change the timeframe, and a default Light theme" style="width:90%;" >}}

In the **Configure Dashboard** step, make changes to the shared dashboard.

**Note**: It may take up to 5 minutes for configuration changes to already shared dashboards to be propagated to all viewers. If a configuration change does not appear immediately, wait a few minutes and then refresh the shared dashboard.

**Published Name**  
: The published name will replace the dashboard title on the shared dashboard. This name is also the name the shared dashboard is listed under on the Shared Dashboard list page. 

**Default Timeframe**  
: This sets the default timeframe for viewers of the shared dashboard. If the toggle for “Allow viewers to change the timeframe” is off, this is the only timeframe available on the shared dashboard. <br><br> Toggling “Allow viewers to change the timeframe” provides viewers with a fixed set of timeframe options to select from on the shared dashboard. Custom timeframes and timeframe scrubbing are not supported on shared dashboards.

**Variables**  
: This setting allows users to specify which of the template variables in use on the dashboard are usable by the viewers of the shared dashboard. Setting the same, single default and available value for a template variable makes that value unchangeable by viewers of the shared dashboard. <br>**Note**: This also applies if you set the default and available values to the wildcard (\*). <br><br> By default the shared dashboard inherits the selected and available values that are currently in use on the dashboard by the sharer. 

**Default Theme**  
: This setting allows users to specify if the shared dashboard should be displayed in light or dark mode by default to viewers. Viewers can choose to override this option on the shared dashboard at any time. 

## Restrictions on Shared Dashboards

### Dashboards cannot be shared by deactivated users

Shared dashboards must be shared by an active user within your org. If the sharer is deactivated, the shared dashboard is automatically put into a **Paused** state and cannot be reenabled until an active user claims the shared dashboard. The shared dashboard URL and configuration options are preserved while the dashboard is in a Paused state. 

### Not all widget types are available

The following widget types are not supported on shared dashboards. Widgets of these types on shared dashboards will not display data.

* Topology Map  
* List Widget (all data sources)  
* Legacy treemap widget

### Limited timeframe options

Shared dashboards support a limited number of timeframe options and do not allow timeframe scrubbing or custom timeframes.

## Edit Shared Dashboards

<div class="alert alert-warning">Any changes made to the content or layout of a dashboard is immediately reflected in the shared dashboard. Use caution when editing a shared dashboard to avoid unintentionally sharing private data.</div>

To make a change to the share type, configuration, or recipients of a shared dashboard:

1. Click the **Share** options in the upper right corner of the dashboard.   
2. Select **Edit shared dashboard**.  
3. Adjust the desired settings.  
4. Click **Save** for the changes to take effect.

You can temporarily pause or re-enable access to a shared dashboard from this menu.

## View All Shared Dashboards

View all the shared dashboards in your organization as well as information about your settings on the [Shared Dashboards][2] page.

From here, shared dashboards can be filtered by status and share type, and you can see and claim unowned shared dashboards. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/#refresh-rate
[2]: https://app.datadoghq.com/dashboard/shared
