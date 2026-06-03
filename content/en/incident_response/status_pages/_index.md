---
title: Status Pages
aliases:
- /service_management/status_pages/
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: Blog
  text: Keep stakeholders informed with Datadog Status Pages
- link: "/incident_response/incident_management/"
  tag: "Documentation"
  text: "Learn more about Incident Management"
- link: "/incident_response/on-call/"
  tag: "Documentation"
  text: "Learn more about On-Call Scheduling"
- link: "/incident_response/incident_management/integrations/status_pages"
  tag: "Documentation"
  text: "Integrate Datadog Status Pages with Incident Management"
---

## Overview

{{< img src="service_management/status_pages/shopist_status_page2.png" alt="Example status page showing service components with their current status and recent incident updates" style="width:100%;" >}}

Status Pages is part of Datadog's Incident Response suite, alongside On-Call and Incident Management. It lets your team proactively communicate **service availability**, **incidents**, and **planned maintenance** with customers or internal stakeholders through a shareable web page.

Use Status Pages to:

* Share the availability of critical systems and features
* Communicate service disruptions clearly during incidents
* Announce scheduled maintenance and planned downtime in advance
* Reduce inbound support volume with proactive email and Slack notifications

## Configure permissions

There are three RBAC permissions that are relevant to Status Pages. Users with the Datadog Admin Role have all the necessary permissions.

To create, update, or publish Status Pages, you must have `status_pages_settings_read`, `status_pages_settings_write`, and `status_pages_incident_write` RBAC permissions. For more information, see [Access Control][1].

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap;">Name</th>
      <th>Description</th>
      <th>Default Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;">Status Pages Settings Read<br><code style="white-space: nowrap;">status_pages_settings_read</code></td>
      <td>View the list of Status Pages, the settings of each Status Page, their Notices, and launched Internal Status Pages.</td>
      <td>Datadog Read Only Role</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages Settings Write<br><code style="white-space: nowrap;">status_pages_settings_write</code></td>
      <td>Create and launch new Status Pages, and configure Status Pages settings.</td>
      <td>Datadog Admin Role</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages Notice Write<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>Publish and update Incidents.</td>
      <td>Datadog Admin Role</td>
    </tr>
  </tbody>
</table>

## Create a status page

1. In Datadog, navigate to [**Status Pages**][2].
1. Click **Create Status Page** and follow the onboarding flow:

   | Field             | Description |
   | ----------------- | ----------- |
   | **Status Page Type**    | Choose who can access the page: <br>- **Public** - Anyone with the link can view <br>- **Internal** - Only authenticated users within your Datadog organization can view |
   | **Page name**     | Displayed as the page header (if no logo is uploaded). <br>*Example: Acme Cloud Platform* |
   | **Domain Prefix** | Used as your status page subdomain prefix. For more information on custom domains, see the [Set a custom domain](#set-a-custom-domain) section.<br>*Example: shopist → shopist.statuspage.datadoghq.com* <br>- Must be **globally unique** <br>- Lowercase, alphanumeric, and hyphenated <br>- May affect links if changed later |
   | **Subscriptions** *(optional)* | Let users receive notifications about status page updates by [email](#email-subscriptions) or [Slack](#slack-subscriptions). When subscriptions are enabled, visitors can sign up from the published page to get notified about new notices and updates. Email and Slack subscriptions can be turned on or off independently for each status page. **Note**: [Email subscriptions](#email-subscriptions) are double opt-in, email must be confirmed. |
   | **Company logo, Favicon, Email Header Image, or Slack App Icon** *(optional)* | Upload images to personalize the appearance of your status page and notifications. The Slack app icon is used as the sender avatar on [Slack notifications](#slack-subscriptions), alongside your page name. |
1. (Optional) [Add components](#add-components) to show the status of individual services.
1. Click **Save Settings**.
   <div class="alert alert-info">A status page <strong>is not Live</strong> after you save your settings. To make the page available, <a href="#publish-your-status-page">publish your status page</a>.</div>

## Add components

{{< img src="/service_management/status_pages/status_page_components.png" alt="Status page component configuration with live preview panel" style="width:100%;" >}}

Components are the building blocks of your status page. Each one represents a service or feature your users care about. Some examples of components include:
- API Gateway
- Web Dashboard
- Database Cluster
- US Region Services

You can add components to your status page either on initial setup or through the status page settings:

1. From your status page, click **Settings** and select the **Components** tab.
1. Create individual components or a group of related components. You can associate [notices](#add-a-notice) with these components to reflect impact on your status page.
1. Select a visualization type:
   1. Bars and Uptime Percentage
   1. Bars Only
   1. Component Name Only

### Component hierarchy

If multiple notices affect the same component, the notice with the greatest impact takes precedence:
Major Outage > Partial Outage > Degraded Performance > Maintenance > Operational

## Publish your status page

After you save your status page settings, click **Launch Status Page** to make the page available at its URL.

If you selected:
- **Public**, the page is immediately accessible to all visitors.
- **Internal**, access is limited to authenticated Datadog users in your organization.

## Add a notice

Notices are messages published to a status page to communicate system status. Status Pages support two types of notices: **degradations** for unplanned service impact and **maintenance windows** for planned downtime.

{{< img src="service_management/status_pages/select_notice_type_status_page.png" alt="Status page notice type selector with degradation and scheduled maintenance options" style="width:60%;" >}}

### Publish a degradation

{{< img src="service_management/status_pages/shopist_status_page_degradations.png" alt="Example status page showing service components experience degradation" style="width:100%;" >}}

Degradation notices communicate **unplanned service impact**, such as incidents or service disruptions. Use degradation notices to keep users informed as an issue is investigated, mitigated, and resolved.

From a status page, click **Publish Notice** and select **Degradation**, then provide:

| Field | Description |
| ---- | ---- |
| **Notice title** | Short, clear description of the issue <br>*Example: Increased error rates in US region* |
| **Status** | Current state of the issue: <br>- Investigating <br>- Identified <br>- Monitoring <br>- Resolved |
| **Message** | Additional details for your users <br>*Example: We are aware of the issue and are actively working on a fix.* |
| **Components impacted** | One or more components affected by the degradation |
| **Impact** | Impact level per component: <br>- Operational <br>- Degraded Performance <br>- Partial Outage <br>- Major Outage |
| **Notify subscribers** | Toggle to send updates to subscribed users |

{{< img src="service_management/status_pages/publish_status_page_degradation.png" alt="Example publish notice modal for degradations" style="width:60%;" >}}

After a degradation notice is reviewed and published, it:
- Appears on the **Status Pages List** under Active Notices.
- Updates the uptime bars for impacted components.
- Is visible in the notice history timeline.

You can publish updates over time and mark the notice as **Resolved** when the issue is fully mitigated.

### Backfill a degradation

Backfilled degradations allow you to retroactively document service disruptions that were not previously announced. Each update can be assigned its original timestamp, so the incident timeline appears accurately in your uptime history.

From a status page, select the dropdown next to **Publish Notice**, select **Publish Backfilled Notice** > **Degradation**, then provide:

| Field | Description |
| ---- | ---- |
| **Notice title** | Short, clear description of the incident <br>*Example: Increased error rates in US region* |
| **Updates** | Exactly two timestamped updates representing the start and end of the degradation. Each update requires a started at timestamp, status (Investigating or Resolved), description, and affected components. |

{{< img src="service_management/status_pages/publish_status_page_backfill_degradation.png" alt="Example publish backfilled notice modal for degradations" style="width:60%;" >}}

### Schedule a maintenance window

{{< img src="service_management/status_pages/shopist_maintenance_example.png" alt="Example status page showing service components undergoing maintenance" style="width:100%;" >}}

Maintenance windows allow you to proactively communicate planned downtime or service impact before it happens. Unlike degradations which are used for unplanned incidents, maintenance windows are scheduled in advance for infrastructure upgrades, system maintenance, database migrations, and other planned work. This allows you to keep customers informed and reduce support volume.

From the status page, click **Schedule Maintenance**, or click **Publish Notice** and select **Scheduled Maintenance**. Then, provide the following details:

| Field | Description |
| ---- | ---- |
| **Notice title** | Clear description of the maintenance activity <br>*Example: Database infrastructure upgrade* |
| **Maintenance window** | Scheduled start and end time for the maintenance |
| **Messages** | Messages that are automatically published as the maintenance progresses |
| **Components impacted** | Components affected during the maintenance window |
| **Notify subscribers** | Toggle to send advance notification to subscribers |

{{< img src="service_management/status_pages/publish_status_page_maintenance.png" alt="Example publish notice modal for maintenance windows" style="width:60%;" >}}

After reviewing and scheduling, the maintenance window:
- Appears under **Upcoming Maintenance** on the status page
- Automatically updates component status to **Maintenance** when the window begins
- Returns components to **Operational** when the window ends (unless manually overridden)

You can post updates if plans change or reschedule the maintenance window as needed.

### Backfill a maintenance window

Backfilled maintenance windows allow you to retroactively document planned downtime that was not previously announced. Each update can be assigned its original timestamp, so the maintenance timeline appears accurately in your uptime history.

From a status page, select the dropdown next to **Publish Notice**, select **Publish Backfilled Notice** > **Scheduled Maintenance**, then provide:

| Field | Description |
| ---- | ---- |
| **Notice title** | Clear description of the maintenance activity <br>*Example: Database infrastructure upgrade* |
| **Updates** | Exactly two timestamped updates representing the start and end of the maintenance window. Each update requires a started at timestamp, status (In Progress or Completed), description, and affected components. |

{{< img src="service_management/status_pages/publish_status_page_backfill_maintenance.png" alt="Example publish backfilled notice modal for maintenance windows" style="width:60%;" >}}

## Email subscriptions

Email subscriptions on status pages are **double opt-in**. After entering an email to subscribe, users receive a confirmation email and must click the confirmation link to activate their subscription. During this process, users can choose to receive notifications for the entire status page or select specific components they want to monitor. A preferred timezone can be configured for timestamp formatting within notifications. Users can manage their preferences and update their subscriptions at any time through the subscription management link included in notification emails.

For **internal** status pages, the subscription process is the same, but users must log in to the same Datadog organization to confirm their subscription and receive notifications.

{{< img src="/service_management/status_pages/status_pages_subscription_1.png" alt="Screenshot of the Status Page subscription modal with fields filled out" style="width:70%;" >}}

## Slack subscriptions

In addition to email, visitors can subscribe to status page updates in Slack. When a notice is published or updated for a component they follow, the **Datadog Status Pages** Slack app posts the update to their chosen Slack channel. Slack subscriptions are configured independently of email subscriptions, so you can offer either or both on a status page.

### Enable Slack subscriptions

1. From your status page, click **Settings**.
1. In the subscription settings, enable **Slack subscriptions**.
1. (Optional) Upload a Slack app icon. When set, status page notifications display your page name and this image as the sender in Slack.

{{< img src="service_management/status_pages/status_pages_enable_slack.png" alt="Status page settings showing the Enable Slack subscriptions toggle and the Slack App Icon upload" style="width:80%;" >}}

When Slack subscriptions are enabled, a **Slack** option appears in the subscribe modal on the published page. When disabled, the Slack option is removed from the subscribe modal.

### Subscribe in Slack

From a published status page with Slack subscriptions enabled:

1. Open the subscribe modal and select **Slack**.
1. (Optional) Choose specific components to follow, or subscribe to the entire page.

   {{< img src="service_management/status_pages/status_pages_slack_subscription_modal.png" alt="Subscribe to Updates modal with the Slack tab selected and a Subscribe via Slack button" style="width:70%;" >}}

1. Authorize the **Datadog Status Pages** Slack app and select the channel that should receive updates.

   {{< img src="service_management/status_pages/status_pages_slack_oauth.png" alt="Slack authorization screen granting the Datadog Status Pages app access to a workspace and channel" style="width:70%;" >}}

After authorization:

- For **public** channels, the app joins the channel automatically and posts a welcome message confirming the subscription.
- For **private** channels, the app cannot join on its own. It sends a direct message asking you to invite the app to the channel before it can post.
- Direct message (DM) channels are not supported.

For **internal** status pages, you must be logged in to the same Datadog organization to subscribe.

### Receive notifications

When a degradation or scheduled maintenance is published or updated with **Notify subscribers** enabled, the app posts a message to each subscribed channel for any impacted component it follows. Notifications display the status page name, and the Slack app icon if one is uploaded, as the sender.

### Manage a Slack subscription

Subscribers can change the components they follow or unsubscribe at any time using the **Manage Preferences** link at the bottom of any Slack notification. When a channel unsubscribes, the app posts a confirmation message and stops sending updates to that channel.

### Manage Slack subscribers

Status page owners can review and manage Slack subscribers from the status page settings. The subscribers view lists the subscribed Slack workspaces and channels. Removing a workspace unsubscribes all of its channels from the page, and each affected channel receives a message noting that an administrator unsubscribed it.

## Set a custom domain

To match your branding, you have the option to map your status page to a custom domain like `status.acme.com`.

1. From your status page, click **Settings**.
1. Select **Custom Domain**.
1. Follow the instructions to enter your domain and add DNS records.
1. Datadog automatically detects the DNS configuration and provisions an SSL certificate.

<div class="alert alert-warning">Custom domains require access to your DNS provider to add a CNAME or A record.</div>

**Note**:

- DNS propagation may take several minutes.
- You can revert to the default Datadog domain at any time.
- Ensure DNS changes are made by someone with access to your domain registrar.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: https://app.datadoghq.com/status-pages
