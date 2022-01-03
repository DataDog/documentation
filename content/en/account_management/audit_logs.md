---
title: Audit Logs
kind: documentation
further_reading:
- link: "/account_management/org_settings/"
  tag: "Documentation"
  text: "Learn more about organization settings"
---

<div class="alert alert-warning">This feature is in public beta. Contact <a href="https://www.datadoghq.com/support/">Datadog support</a> for more information.</div>

## Overview

As an administrator or security team member, you can use [Audit Logs][1] to see who is using Datadog within your organization and the context in which they are using Datadog. As an individual, you can see a stream of your own actions, too.

There are two types of events that can occur within an audit log: **request events**, which translate all requests made to Datadog’s API into customer records, or **product-specific events**.

For example, track **request events** such as breaking events so you can see what API calls led up to the event. Or, if you're an enterprise or billing admin, use audit logs to track user events that change the state of your infrastructure.

In this circumstance, audit logs are helpful when you want to know product-specific events such as:

  -  When someone changed the retention of an index because the log volume changed and, therefore, the monthly bill has changed.

  - Who modified processors or pipelines, and when they were modified, as a dashboard or monitor is now broken and needs to be fixed.

  - Who modified an exclusion filter because the indexing volume has increased or decreased and logs are unable to be found or your bill went up.

For security admins or InfoSec teams, audit logs help with compliance checks and maintaining audit trails of who did what, and when, for your Datadog resources. For example, maintaining an audit trail:

- Of anytime someone updates or deletes critical dashboard, monitors, and other Datadog resources.

- For user logins, account, or role changes in your organization.

## Setup

To enable Audit Logs, navigate to your [Organization Settings][2] and select *Audit Logs Settings* under *Security*. Click the **Enable** button.

{{< img src="account_management/audit_logs/setup.png" alt="Audit Logs setup in Datadog" style="width:100%;">}}

## Configuration

### Event types

Event types are a collection of audit events. For example, the Authentication event type contains all logs related to authentication and the Dashboards event type contains all the logs related to interacting with the dashboards product. To enable an event type, navigate to the *Audit Logs Settings* section of your [Organization Settings][2] and toggle on event types that are relevant to you.

{{< img src="account_management/audit_logs/event-types.png" alt="Audit Logs event types setup in Datadog" style="width:70%;">}}

### Archiving

Archiving is an optional feature for Audit Logs. You can use archiving to write to Amazon S3, Google Cloud Storage, or Azure Storage and have your SIEM system read events from it. After creating or updating your archive configurations, it can take several minutes before the next archive upload is attempted. Logs are uploaded to the archive every 15 minutes, so check back on your storage bucket in 15 minutes to make sure the archives are successfully being uploaded from your Datadog account.

To enable archiving for Audit Logs, navigate to your [Organization Settings][2] and select *Audit Logs Settings* under *Security*. Scroll down to Archiving and click the Store logs toggle to enable.

### Retention

Retaining logs is an optional feature for Audit Logs. To enable, navigate to your [Organization Settings][2] and select *Audit Logs Settings* under *Security*. Scroll down to Retention and click the Retain logs toggle to enable.

The default retention period for an audit log is seven days. You can set a retention period between three and 90 days.

{{< img src="account_management/audit_logs/retention.png" alt="Audit Logs Retention setup in Datadog" style="width:80%;">}}

Note: Audit Logs are priced as retained logs, and there is no cost for ingestion or archiving. See the [Log Management pricing page][3] for more information.

## Explore Audit Logs

To explore an audit log, navigate to the [Audit Logs][1] section, also accessible from your [Organizational Settings][2] in Datadog.

{{< img src="account_management/audit_logs/explore-audit-logs.png" alt="Audit Logs in the Organization Settings menu" style="width:50%;">}}

Audit Logs have the same functionality as logs within the Datadog [Logs Explorer][4]:

- Filter to inspect audit logs by Event Names (Dashboards, Monitors, Authentication, etc), Authentication Attributes (Actor, API Key ID, User email, etc), `Status` (`Error`, `Warn`, `Info`), Method (`POST`, `GET`, `DELETE`), and other facets.

- Inspect related audit logs by selecting a log and navigating to the event attributes tab. Select a specific attribute to filter by or exclude from your search, such as `http.method`, `usr.email`, `client.ip`, etc.

{{< img src="account_management/audit_logs/attributes.png" alt="Audit Logs in the Organization Settings menu" style="width:50%;">}}

## Create a monitor

To create a monitor on a type of audit log or by specific log attributes, see the [Audit Logs Monitor documentation][5]. For example, set a monitor that triggers when a specific user logs in, or set a monitor for anytime a dashboard is deleted.

## Create a dashboard

Give more visual context to your audit logs with dashboards. To create an Audit Logs dashboard:

1. Create a [New Dashboard][6] in Datadog.
2. Select your visualization. You can query an Audit Logs source for [top lists][7], [timeseries][8], and [log streams][9].
3. [Graph your data][10]: Under edit, select *Audit Logs* as the data source, and create a query. Audit logs are filtered by count and can be grouped by different facets. Select a facet and limit.
{{< img src="account_management/audit_logs/graph-your-data.png" alt="Set Audit Logs as a data source to graph your data" style="width:100%;">}}
4. Set your display preferences and give your graph a title. Click the *Save* button to create the dashboard.

{{< img src="account_management/audit_logs/dashboard.png" alt="An Audit Logs dashboard" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit/logs
[2]: https://app.datadoghq.com/organization-settings/
[3]: https://www.datadoghq.com/pricing/
[4]: /logs/explorer/
[5]: /monitors/create/types/audit_logs/
[6]: /dashboards/
[7]: /dashboards/widgets/top_list/
[8]: /dashboards/widgets/timeseries/
[9]: /dashboards/widgets/log_stream/
[10]: /dashboards/querying/#choose-the-metric-to-graph/
