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
- link: "https://www.datadoghq.com/blog/status-pages/"
  tag: "Blog"
  text: "Keep stakeholders informed with Datadog Status Pages"
---

## Overview

{{< img src="service_management/status_pages/shopist_status_page.png" alt="Example status page showing service components with their current status and recent incident updates" style="width:100%;" >}}

Status Pages is part of Datadog's Incident Response suite, alongside On-Call and Incident Management. It lets your team proactively communicate **service availability**, **incidents**, and **planned maintenance** with customers or internal stakeholders through a shareable web page.

Use Status Pages to:

* Share the availability of critical systems and features
* Communicate service disruptions clearly during incidents
* Announce scheduled maintenance and planned downtime in advance
* Reduce inbound support volume with proactive email notifications

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
      <td>View the list of Status Pages, the settings of each Status Pages, their Incidents, and launched Internal Status Pages.</td>
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
   | **Subscriptions** *(optional)* | Enable users to receive email notifications about status page updates. When subscriptions are enabled, users can sign up to get notified about new notices and updates. You can turn subscriptions on or off for each status page. **Note**: [Email subscriptions](#email-subscriptions) are double opt-in, email must be confirmed. |
   | **Company logo, Favicon, or Email Header Image** *(optional)* | Upload a logo, favicon, or image to personalize the appearance of your status page and email notifications. |
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

You can add components to your status page either on intial setup or through the status page settings:

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


### Publish a degradation

Degradation notices communicate **unplanned service impact**, such as incidents or service disruptions. Use degradation notices to keep users informed as an issue is investigated, mitigated, and resolved.

From a status page, click **Publish Notice** and select **Degradation**, then provide:

| Field | Description |
| ---- | ---- |
| **Notice title** | Short, clear description of the issue <br>*Example: Increased error rates in US region* |
| **Status** | Current state of the issue: <br>- Investigating <br>- Identified <br>- Monitoring <br>- Resolved |
| **Message** | Additional details for your users, such as known cause or next steps <br>*Examples: known cause, expected resolution time*|
| **Components impacted** | One or more components affected by the degradation |
| **Impact** | Impact level per component: <br>- Operational <br>- Degraded Performance <br>- Partial Outage <br>- Major Outage |
| **Notify subscribers** | Toggle to send updates to subscribed users |

After a degradation notice is reviewed and published, it:
- Appears on the **Status Pages List** under Active Notices.
- Updates the uptime bars for impacted components.
- Is visible in the notice history timeline.

You can publish updates over time and mark the notice as **Resolved** when the issue is fully mitigated.

### Schedule a maintenance window
<!-- Image placeholder
{{< img src="#" alt="Status page showing a scheduled maintenance window for upcoming infrastructure work" style="width:100%;" >}}-->

Maintenance windows allow you to proactively communicate planned downtime or service impact before it happens. Unlike degredations which are used for unplanned incidents, maintenance windows are scheduled in advance for infrastructure upgrades, system maintenance, database migrations, and other planned work. Proactively communicate scheduled downtime so you can keep your customers informed and lessen the load on the support team.

1. From the status page, click **Schedule Maintenance**, or click **Publish Notice** and select **Scheduled Maintenance**.
1. Provide the following details:

| Field | Description |
| ---- | ---- |
| **Notice title** | Clear description of the maintenance activity <br>*Example: Database infrastructure upgrade* |
| **Maintenance window** | Scheduled start and end time for the maintenance |
| **Messages** | Messages that are automatically published as the maintenance progresses |
| **Components impacted** | Components affected during the maintenance window |
| **Notify subscribers** | Toggle to send advance notification to subscribers |

After reviewing and scheduling, the maintenance window:
- Appears under **Upcoming Maintenance** on the status page
- Automatically updates component status to **Maintenance** when the window begins
- Returns components to **Operational** when the window ends (unless manually overridden)

You can post updates if plans change or reschedule the maintenance window as needed.

## Email subscriptions

Email subscriptions on status pages are **double opt-in**. After entering an email to subscribe, users receive a confirmation email and must click the confirmation link to activate their subscription. During this process, users can choose to receive notifications for the entire status page or select specific components they want to monitor. Users can manage their preferences and update their subscriptions at any time through the subscription management link included in notification emails.

For **internal** status pages, the subscription process is the same, but users must log in to the same Datadog organization to confirm their subscription and receive notifications.

{{< img src="/service_management/status_pages/status_pages_subscription.png" alt="Screenshot of the Status Page subscription modal with fields filled out" style="width:70%;" >}}

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
