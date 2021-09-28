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

As an administrator or security team member, you can see who is using Datadog within your organization and the context in which they are using Datadog with [Audit Logs][1]. As an individual, you can see a stream of your own actions, too.

There are two types of events that can occur within an audit log:

1. Request events, which translate all requests made to Datadog’s API into a customer record
2. Product-specific events, such as:
    - What has changed within your organization or account. For example, if a user changes a dashboard, you are able to see who made the last change and at what time.
    - Who accessed and viewed certain information within your environment, for compliance audits.
    - A breaking event, such as seeing what API calls led up to the event.
    - An audit trail of information relating to user access. For example, if a user receives a policy denied warning.

## Setup

Audit Logs is self-service enabled. To enable, navigate to your [Organization Settings][2] and select *Audit Logs Settings* under *Security*. Click the **Enable** button.

{{< img src="account_management/audit_logs/setup.png" alt="Audit Logs setup in Datadog" style="width:100%;">}}

## Configuration

### Event types

Audit Logs is configurable by event type. Enabled events are specific to actions that take place in the Datadog application. The following event types are supported for Audit Logs:

- Access Management: Manage access, such as roles and users
- Authentication: Successful and failed login attempts
- Dashboard: Additions, deletions, and changes to dashboard resources
- Log Management: Additions, deletions, and changes to log management resources
- Monitor: Additions, deletions, and changes to monitor resources
- Notebooks: Additions, deletions, and changes to notebook resources
- Request: All web requests
- Security Monitoring: Additions, deletions, and changes to security monitoring resources

{{< img src="account_management/audit_logs/event-types.png" alt="Audit Logs event types setup in Datadog" style="width:70%;">}}

### Archiving

Archiving is an optional feature for Audit Logs. You can use archiving to write to Amazon S3, Google Cloud Storage, or Azure Storage and have your SIEM system read events from it. Archiving is a double-write feature that has variable write times, but on average all events are written within 15 minutes of generation.

To enable archiving for Audit Logs, navigate to your [Organization Settings][2] and select *Audit Logs Settings* under *Security*. Scroll down to Archiving and click the Store logs toggle to enable.

### Retention

Retaining logs is an optional feature for Audit Logs. To enable, navigate to your [Organization Settings][2] and select *Audit Logs Settings* under *Security*.  Scroll down to Retention and click the Retain logs toggle to enable.

The default retention period for an audit log is 7 days. You can set a retention period between 3 and 90 days.

{{< img src="account_management/audit_logs/retention.png" alt="Audit Logs Retention setup in Datadog" style="width:80%;">}}

Note: Audit Logs are priced as retained logs, and there is not a cost for ingestion or archiving. See the [Log Management pricing page][3] for more information.

## Explore Audit Logs

To explore an audit log, navigate to the [Audit Logs][1] section, also accessible from your [Organizational Settings][2] in the Datadog app.

{{< img src="account_management/audit_logs/explore-audit-logs.png" alt="Audit Logs in the Organization Settings menu" style="width:50%;">}}

Audit Logs have the same functionality as logs within the Datadog [Logs Explorer][4]:

- Filter by facets to drill down into audit logs by `Status` (`Error`, `Warn`, `Inf`o) or `Method` (`POST`, `GET`, `DELETE`).
- For compliance audits, filter by `event_name` and select `authentication only` to see compliance-related events.
- Drill down into related audit logs by selecting a log and navigating to the event attributes tab. Select a specific attribute to filter by or exclude from your search, such as `http.method`, `usr.email`, `client.ip`, etc.

{{< img src="account_management/audit_logs/attributes.png" alt="Audit Logs in the Organization Settings menu" style="width:50%;">}}

## Create a Monitor

To create a monitor on a type of audit log or by specific log attributes, see the [Audit Logs Monitor documentation][5].

## Create a Dashboard

Give more visual context to your audit logs with Dashboards. To create an Audit Logs dashboard:

1. Create a [New Dashboard][6] in Datadog.
2. Select your visualization: an Audit Logs source can be queried for [Top Lists][7], [Time Series][8], and [Log Stream][9].
3. [Graph your data][10]: Under edit, select Audit Logs as the data source, and create a query. Audit Logs are filtered by count, and can be grouped by the different facets. Select a facet and limit.
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
