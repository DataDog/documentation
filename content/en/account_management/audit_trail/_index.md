---
title: Datadog Audit Trail
kind: documentation
aliases:
    - /account_management/audit_logs/
further_reading:
- link: "/account_management/audit_trail/events/"
  tag: "Documentation"
  text: "See the different Audit Trail events"
- link: "/account_management/org_settings/"
  tag: "Documentation"
  text: "Learn more about organization settings"
- link: "https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/"
  tag: "Blog"
  text: "Build compliance, governance, and transparency across your teams with Datadog Audit Trail"
---

## Overview

As an administrator or security team member, you can use [Datadog Audit Trail][1] to see who is using Datadog within your organization and the context in which they are using Datadog. As an individual, you can see a stream of your own actions, too.

There are two types of events that can occur within an audit trail: **request events**, which translate all requests made to Datadog’s API into customer records, or **product-specific events**.

For example, track **request events** so you can see what API calls led up to the event. Or, if you're an enterprise or billing admin, use audit trail events to track user events that change the state of your infrastructure.

In this circumstance, audit events are helpful when you want to know product-specific events such as:

  -  When someone changed the retention of an index because the log volume changed and, therefore, the monthly bill has changed.

  - Who modified processors or pipelines, and when they were modified, as a dashboard or monitor is now broken and needs to be fixed.

  - Who modified an exclusion filter because the indexing volume has increased or decreased and logs are unable to be found or your bill went up.

For security admins or InfoSec teams, audit trail events help with compliance checks and maintaining audit trails of who did what, and when, for your Datadog resources. For example, maintaining an audit trail:

- Of anytime someone updates or deletes critical dashboard, monitors, and other Datadog resources.

- For user logins, account, or role changes in your organization.

## Setup

To enable Datadog Audit Trail, navigate to your [Organization Settings][2] and select *Audit Trail Settings* under *Security*. Click the **Enable** button.

{{< img src="account_management/audit_logs/audit_enable.png" alt="Audit Trail setup in Datadog" style="width:100%;">}}

## Configuration

### Event types

Event types are a collection of audit events. For example, the Authentication event type contains all events related to authentication and the Dashboards event type contains all the events related to interacting with the dashboards product. To enable an event type, navigate to the *Audit Trail Settings* section of your [Organization Settings][2] and toggle on event types that are relevant to you.

{{< img src="account_management/audit_logs/audit_toggles.png" alt="Audit Trail event types setup in Datadog" style="width:50%;">}}

See [Audit Trail Events][3] for a list of different events.

### Archiving

Archiving is an optional feature for Audit Trail. You can use archiving to write to Amazon S3, Google Cloud Storage, or Azure Storage and have your SIEM system read events from it. After creating or updating your archive configurations, it can take several minutes before the next archive upload is attempted. Events are uploaded to the archive every 15 minutes, so check back on your storage bucket in 15 minutes to make sure the archives are successfully being uploaded from your Datadog account.

To enable archiving for Audit Trail, navigate to your [Organization Settings][2] and select *Audit Trail Settings* under *Compliance*. Scroll down to Archiving and click the Store Events toggle to enable.

### Retention

Retaining events is an optional feature for Audit Trail. Scroll down to *Retention* and click the *Retain Audit Trail Events* toggle to enable.

The default retention period for an audit trail event is seven days. You can set a retention period between three and 90 days.

{{< img src="account_management/audit_logs/retention_period.png" alt="Audit Trail Retention setup in Datadog" style="width:80%;">}}

## Explore audit events

To explore an audit event, navigate to the [Audit Trail][1] section, also accessible from your [Organization Settings][2] in Datadog.

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="Audit Trail in the Organization Settings menu" style="width:30%;">}}

Audit Trail events have the same functionality as logs within the [Log Explorer][4]:

- Filter to inspect audit trail events by Event Names (Dashboards, Monitors, Authentication, etc), Authentication Attributes (Actor, API Key ID, User email, etc), `Status` (`Error`, `Warn`, `Info`), Method (`POST`, `GET`, `DELETE`), and other facets.

- Inspect related audit trail events by selecting an event and navigating to the event attributes tab. Select a specific attribute to filter by or exclude from your search, such as `http.method`, `usr.email`, `client.ip`, etc.

{{< img src="account_management/audit_logs/attributes.png" alt="Audit Trail in the Organization Settings menu" style="width:50%;">}}

## Create a monitor

To create a monitor on a type of audit trail event or by specificTrail attributes, see the [Audit Trail Monitor documentation][5]. For example, set a monitor that triggers when a specific user logs in, or set a monitor for anytime a dashboard is deleted.

## Create a dashboard or a graph

Give more visual context to your audit trail events with dashboards. To create an audit dashboard:

1. Create a [New Dashboard][6] in Datadog.
2. Select your visualization. You can visualize Audit events as [top lists][7], [timeseries][8], and [lists][9].
3. [Graph your data][10]: Under edit, select *Audit Events* as the data source, and create a query. Audit events are filtered by count and can be grouped by different facets. Select a facet and limit.
{{< img src="account_management/audit_logs/audit_graphing.png" alt="Set Audit Trail as a data source to graph your data" style="width:100%;">}}
4. Set your display preferences and give your graph a title. Click the *Save* button to create the dashboard.

## Out-of-the-box dashboard

Datadog Audit Trail comes with an [out-of-the-box dashboard][11] that shows various audit events, such as index retention changes, log pipeline changes, dashboard changes, etc. Clone this dashboard to customize queries and visualizations for your auditing needs.

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="Audit Trail dashboard" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: https://app.datadoghq.com/organization-settings/
[3]: /account_management/audit_trail/events/
[4]: /logs/explorer/
[5]: /monitors/create/types/audit_trail/
[6]: /dashboards/
[7]: /dashboards/widgets/top_list/
[8]: /dashboards/widgets/timeseries/
[9]: /dashboards/widgets/list/
[10]: /dashboards/querying/#choose-the-metric-to-graph/
[11]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true
