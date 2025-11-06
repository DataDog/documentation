---
title: Status Pages
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: Blog
  text: Keep stakeholders informed with Datadog Status Pages
- link: "service_management/incident_management/"
  tag: "Documentation"
  text: "Learn more about Incident Management"
- link: "service_management/on-call/"
  tag: "Documentation"
  text: "Learn more about On-Call Scheduling"
- link: "service_management/incident_management/integrations/status_pages"
  tag: "Documentation"
  text: "Integrate Datadog Status Pages with Incident Management"
---

## Overview

{{< img src="service_management/status_pages/shopist_status_page.png" alt="Example status page showing service components with their current status and recent incident updates" style="width:100%;" >}}

Status Pages is part of Datadog's Incident Response suite, alongside On-Call and Incident Management. It lets your team proactively communicate **service availability** and **incidents** with customers or internal stakeholders through a shareable web page.

Use Status Pages to:

* Share the availability of critical systems and features
* Communicate service disruptions clearly during incidents
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

1. In Datadog, navigate to [**Service Management > Status Pages**][2].
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

## Publish your status page

After you save your status page settings, click **Launch Status Page** to make the page available at its URL.

If you selected:
- **Public**, the page is immediately accessible to all visitors.
- **Internal**, access is limited to authenticated Datadog users in your organization.

## Add a notice

Notices on Status Pages are carefully crafted messages posted to a public website to communicate system status. When an issue arises, you can communicate it clearly through your status page.

1. From a status page, click **Publish Notice** to open a "Publish Status Page Notice" modal and provide:
   | Field | Description |
   | ---- | ---- |
   | **Title** | Short, clear description of the incident <br>*Example: Increased error rates on US region* |
   | **Status** | Current state of the incident: <br>- Investigating <br>- Identified <br>- Monitoring <br>- Resolved |
   | **Message** *(optional)* | Additional details for your users <br>*Examples: known cause, expected resolution time* |
   | **Components impacted** | One or more components impacted by the incident |
   | **Impact** | Level of impact per component: <br>- Operational <br>- Degraded Performance <br>- Partial Outage <br>- Major Outage |
   | **Notify Subscribers** | Toggle to send the notice to subscribers |
1. Click **Publish Notice**.

{{< img src="/service_management/status_pages/publish_status_page_incident_1.png" alt="Screenshot of the Status Page Notice creation modal with fields filled out" style="width:70%;" >}}

After a notice is published, the notice:
- Appears on the Status Pages List under **Active Notices**.
- Updates the uptime bars for impacted components.
- Is visible in the notice history timeline.

You can post **updates** over time to keep users informed, and then mark the notice as **Resolved**.

## Email subscriptions

Email subscriptions on status pages are **double opt-in**: users must confirm their email address before they are added as subscribers. After entering an email to subscribe, a confirmation email is sent, and the subscription is only activated after the user clicks the confirmation link.

For **internal** status pages, the subscription process is the same, but users must log in to the same Datadog organization to confirm their subscription and receive notifications.

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
