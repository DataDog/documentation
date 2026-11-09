---
title: Status Pages
description: Communicate service availability, incidents, and planned maintenance with customers or internal stakeholders through a shareable status page.
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

{{< img src="incident_response/status_pages/shopist_status_page3.png" alt="Example status page showing service components with their current status and recent incident updates" style="width:100%;" >}}

Status Pages is part of Datadog's Incident Response suite, alongside On-Call and Incident Management. It lets your team proactively communicate **service availability**, **incidents**, and **planned maintenance** with customers or internal stakeholders through a shareable web page.

Use Status Pages to:

* Share the availability of critical systems and features
* Communicate service disruptions clearly during incidents
* Announce scheduled maintenance and planned downtime in advance
* Reduce inbound support volume with proactive email, Slack, Microsoft Teams, and RSS feed notifications

Use the following pages to set up and run your status pages:

- [Components][5]: Represent the services and features your users rely on.
- [Notices][6]: Publish degradations and schedule maintenance windows.
- [Notice Templates][7]: Reuse notice titles, messages, and components.
- [Subscriptions][8]: Notify subscribers by email, Slack, or Microsoft Teams, or publish an RSS or Atom feed.

## Configure permissions

To create, update, or publish Status Pages, you must have the appropriate RBAC permissions. For more information, see [Access Control][1].

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
      <td>Create new Status Pages, and configure Status Pages settings.</td>
      <td>Datadog Admin Role</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages Notice Write<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>Publish and update Incidents.</td>
      <td>Datadog Admin Role</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages Public Page Publish<br><code style="white-space: nowrap;">status_pages_public_page_publish</code></td>
      <td>Publish and unpublish public Status Pages.</td>
      <td>None</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages Internal Page Publish<br><code style="white-space: nowrap;">status_pages_internal_page_publish</code></td>
      <td>Publish and unpublish internal Status Pages.</td>
      <td>Datadog Admin Role</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages Private Page Publish<br><code style="white-space: nowrap;">status_pages_private_page_publish</code></td>
      <td>Publish and unpublish private Status Pages.</td>
      <td>None</td>
    </tr>
  </tbody>
</table>

### Granular access control

By default, access to a status page is unrestricted within your organization. Use [granular access controls][2] to restrict an individual status page by team, role, user, or service account.

| Access level | Capabilities |
|---|---|
| **Viewer** | View the status page. |
| **Responder** | View the status page and publish or update notices. |
| **Manager** | View and respond to the status page, edit its settings, and manage its access. |

Granular access control only restricts access and does not grant RBAC permissions. Users must also have the corresponding Status Pages permissions described above.

Configuring granular access requires the **Status Pages Settings Write** permission. If the status page is already restricted, you must also have **Manager** access to it.

To restrict access:

1. Navigate to [Status Pages][3] and select a status page.
1. Click **Settings**, then select **Access**.
1. Click **Edit Access**, then click **Restrict Access**.
1. Add teams, roles, users, or service accounts and assign each an access level.
1. Click **Save**.

**Note**: Access restrictions apply to users in your Datadog organization. They do not change who can view a published public or private status page.

## Create a status page

1. In Datadog, navigate to [**Status Pages**][3].
1. Click **Create Status Page** and follow the onboarding flow:

   | Field             | Description |
   | ----------------- | ----------- |
   | **Status Page Type**    | Choose who can access the page: <br>- **Public** - Anyone with the link can view <br>- **Internal** - Only authenticated users within your Datadog organization can view <br>- **Private** - Visitors enter an email address. If it matches the page's email rules, Datadog sends them a secure link to view the page. Visitors do not need a Datadog account. |
   | **Page name**     | Displayed as the page header (if no logo is uploaded). <br>*Example: Acme Cloud Platform* |
   | **Domain Prefix** | Used as your status page subdomain prefix. For more information on custom domains, see the [Set a custom domain](#set-a-custom-domain) section.<br>*Public page example: shopist → shopist.statuspage.datadoghq.com*<br>*Private page example: shopist → shopist.private.statuspage.datadoghq.com* <br>- Must be **globally unique** <br>- Lowercase, alphanumeric, and hyphenated <br>- May affect links if changed later |
   | **Subscriptions** *(optional)* | Let users receive notifications about status page updates by [email][9], [Slack][10], [Microsoft Teams][11], or an [RSS or Atom feed][14]. For email, you can let visitors subscribe from the published page or [add subscribers][12] yourself. Email, Slack, and Microsoft Teams subscriptions can be turned on or off independently for each status page. Private status pages support email subscriptions only. **Note**: [Email subscriptions][9] are double opt-in; the email address must be confirmed. |
   | **Company logo, Favicon, Email Header Image, or Slack App Icon** *(optional)* | Upload images to personalize your status page and notifications. The Slack app icon appears as the sender avatar in Slack notifications, alongside your page name. |
1. (Optional) [Add components][5] to show the status of individual services.
1. Click **Save Settings**.
   <div class="alert alert-info">A status page <strong>is not Live</strong> after you save your settings. To make the page available, <a href="#publish-your-status-page">publish your status page</a>.</div>

## Configure visitor access for a private status page

Private status pages let you share status updates with external visitors without requiring a Datadog account. Visitors enter an email address, and if it matches the page's email rules, they receive a secure link to view the page.

You can configure email rules while creating a private status page. For an existing page, click **Settings**, select **General**, and go to **Email Rules**.

You can separate multiple entries with commas.

1. In **Allow**, add individual email addresses or domains. Format domains with a leading `@`, for example `@example.com`.
1. (Optional) In **Deny**, add individual email addresses that should be blocked. Deny rules take precedence over Allow rules.
1. Click **Save**.

{{< img src="/incident_response/status_pages/private_status_page_email_rules.png" alt="Private status page settings with Email Rules that allow a domain and email address and deny an individual email address" style="width:100%;" >}}

An email address can access the page only if it matches an Allow rule and does not match a Deny rule.

Configuring email rules requires the **Status Pages Settings Write** permission. If access to the status page is restricted with granular access controls, you must also have **Manager** access.

## Publish your status page

After you save your status page settings, click **Launch Status Page** to make the page available at its URL.

If you selected:
- **Public**, the page is immediately accessible to all visitors.
- **Internal**, access is limited to authenticated Datadog users in your organization.
- **Private**, access is limited to visitors whose email address matches the page's [email rules](#configure-visitor-access-for-a-private-status-page).

## Set a custom domain

For public and private status pages, you can map the status page URL to a custom domain like `status.example.com`. This is separate from [configuring a custom email sender domain][13], which controls the from address on subscription emails.

1. From your status page, click **Settings**, then select **Custom Domain** under **General**.
1. Follow the instructions to enter your domain and add DNS records.
1. Datadog automatically detects the DNS configuration and provisions an SSL certificate.

<div class="alert alert-warning">Custom domains require access to your DNS provider to add a CNAME or A record.</div>

**Note**:

- DNS propagation may take several minutes.
- You can revert to the default Datadog domain at any time.
- DNS changes must be made by someone with access to your domain registrar.

## Manage status pages with Terraform
You can use Terraform to create or manage your status pages. For details on the resources available, see Datadog's [Terraform registry][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: /account_management/rbac/granular_access/
[3]: https://app.datadoghq.com/status-pages
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/status_page
[5]: /incident_response/status_pages/components/
[6]: /incident_response/status_pages/notices/
[7]: /incident_response/status_pages/templates/
[8]: /incident_response/status_pages/subscriptions/
[9]: /incident_response/status_pages/subscriptions/#email-subscriptions
[10]: /incident_response/status_pages/subscriptions/#slack-subscriptions
[11]: /incident_response/status_pages/subscriptions/#microsoft-teams-subscriptions
[12]: /incident_response/status_pages/subscriptions/#add-or-import-subscribers
[13]: /incident_response/status_pages/subscriptions/#configure-a-custom-email-sender-domain
[14]: /incident_response/status_pages/subscriptions/#rss-and-atom-feeds
