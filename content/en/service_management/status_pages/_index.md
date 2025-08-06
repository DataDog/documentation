---
title: Status Pages
further_reading:
- link: "service_management/incident_management/"
  tag: "Documentation"
  text: "Learn more about Incident Management"
- link: "service_management/on-call/"
  tag: "Documentation"
  text: "Learn more about On-Call Scheduling"
---

{{< callout url="https://www.datadoghq.com/product-preview/status-pages/">}}
Status Pages is in Preview.
{{< /callout >}}

## Overview

{{< img src="service_management/status_pages/shopist_status_page_example.png" alt="Example status page showing service components with their current status and recent incident updates" style="width:100%;" >}}

Status Pages are part of Datadog's Incident Response suite, alongside On-Call and Incident Management. They let your team proactively communicate **service availability**, **incidents**, and **maintenance updates** with customers or internal stakeholders through a shareable web page.

Use Status Pages to:

* Share the availability of critical systems and features
* Communicate service disruptions clearly during incidents
* Reduce inbound support volume with proactive updates

## Configure permissions 

There are three RBAC permissions that are relevant to Status Pages. Users with the Datadog Admin Role have all the necessary permissions.

To create, update, or publish Status Pages, you must have `status_pages_settings_read`, `status_pages_settings_write`, and `status_pages_incident_write` RBAC permissions. For more information, see [Access Control][1].

| Name | Description | Default Role |
| :---- | :---- | :---- |
| Status Pages Settings Read (`status_pages_settings_read`) | View the list of Status Pages, the settings of each Status Pages, their Incidents, and launched Private Status Pages. | Datadog Read Only Role |
| Status Pages Settings Write (`status_pages_settings_write`) | Create and launch new Status Pages, and configure Status Pages settings. | Datadog Admin Role |
| Status Pages Incident Write (`status_pages_incident_write`) | Publish and update Incidents. | Datadog Admin Role |

## Create a status page

1. In Datadog, navigate to [**Service Management > Status Pages**][2].  
1. Click **Create Status Page** and follow the onboarding flow:

   | Field             | Description |
   | ----------------- | ----------- |
   | **Visibility**    | Choose who can access the page: <br>- **Public** - Anyone with the link can view <br>- **Private** - Only authenticated users within your Datadog organization can view |
   | **Page name**     | Displayed as the page header (if no logo is uploaded). <br>*Example: Acme Cloud Platform* |
   | **Domain Prefix** | Used as your status page subdomain prefix. <br>*Example: shopist → shopist.status.datadoghq.com* <br>- Must be **globally unique** <br>- Lowercase, alphanumeric, and hyphenated <br>- May affect links if changed later |
   | **Company logo or Favicon** *(optional)* | Upload a logo or favicon to personalize the appearance of your status page |
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
1. Create individual components or a group of related components. You can associate [incidents](#add-an-incident) with these components to reflect impact on your status page.  
1. Select a visualization type:  
   1. Bars and Uptime Percentage  
   1. Bars Only  
   1. Component Name Only  

## Publish your status page

After you save your status page settings, click **Launch Status Page** to make the page available at its URL.

If you selected:
- **Public**, the page is immediately accessible to all visitors.  
- **Private**, access is limited to authenticated Datadog users in your organization.

## Add an incident

<div class="alert alert-warning">Incidents published on Status Pages are not the same as incidents declared within Datadog Incident Management. Incidents on Status Pages are carefully crafted messages posted to a public website to communicate system status, and may encompass multiple internal Incident Management incidents.</div>

When an issue arises, you can communicate it clearly through your status page. 

1. From a status page, click **Publish Incident** to open a "Publish Status Page Incident" modal and provide:
   | Field | Description |
   | ---- | ---- |
   | **Title** | Short, clear description of the incident <br>*Example: Increased error rates on US region* |
   | **Status** | Current state of the incident: <br>- Investigating <br>- Identified <br>- Monitoring <br>- Resolved |
   | **Message** *(optional)* | Additional details for your users <br>*Examples: known cause, expected resolution time* |
   | **Affected Components** | One or more components impacted by the incident |
   | **Impact** | Level of impact per component: <br>- Operational <br>- Degraded Performance <br>- Partial Outage <br>- Major Outage |
1. Click **Publish Incident**.

{{< img src="/service_management/status_pages/publish_status_page_incident.png" alt="Screenshot of the Status Page Incident creation modal with fields filled out" style="width:70%;" >}}

After an incident is published, the incident:
- Appears on the Status Pages List under **Active Incidents**.
- Updates the uptime bars for impacted components.
- Is visible in the incident history timeline.

You can post **updates** over time to keep users informed, and then mark the incident as **Resolved**.

{{< img src="/service_management/status_pages/live_status_page_incident_history.mp4" alt="Video showing the incident history timeline on a live status page with published incidents and updates" video=true >}}

## Set a custom domain

To match your branding, you have the option to map your status page to a custom domain like `status.acme.com`.

1. From your status page, click **Settings**.  
1. Select **Custom Domain**.
1. Follow the instructions to enter your domain and add DNS records.  
1. Datadog automatically detects the DNS configuration and provisions an SSL certificate.  

<div class="alert alert-warning">Custom domains require access to your DNS provider to add a CNAME or A record.</div>

**Notes**:

- DNS propagation may take several minutes.
- You can revert to the default Datadog domain at any time.
- Ensure DNS changes are made by someone with access to your domain registrar.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: https://app.datadoghq.com/status-pages
