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

[Audit Logs][1] are logged in Datadog as they occur. As an administrator or security team member, you can see who is using Datadog within your organization and the context in which they are using Datadog. As an individual, you can see a stream of your own actions within Datadog.

There are two types of events that occur within the Audit Events Explorer:

1. Request events that translate all requests made to Datadog’s API into a customer record
2. Product-specific events, such as the following:
    - What has changed within your organization or account. For example, if a user changes a dashboard, you are able to see who made the last change and at what time.
    - Who accessed and viewed certain information within your environment, for compliance audits.
    - A breaking event, such as seeing what API calls led up to the event.
    - An audit trail of information relating to user access. For example, if a user receives a policy denied warning.

## Setup

Audit Logs are self-service enabled. To enable, navigate to your [Organization Settings][2] and select Audit Logs Settings under Security. Click the Enable button next to Audit Logs disabled.

[Image TK]

## Configuration

### Event types

Audit Logs can also be enabled by Event Type. Enabled events are specific to actions that take place in the Datadog application. The following event types are supported for Audit Logs:

- Access Management: Managing access, such as roles and users
- Authentication: Successful and failed login attempts
- Dashboard: Additions, deletions, and changes to dashboard resources
- Log Management: Additions, deletions, and changes to log management resources
- Monitor: Additions, deletions, and changes to monitor resources
- Notebooks: Additions, deletions, and changes to notebook resources
- Request: All web requests
- Security Monitoring: Additions, deletions, and changes to security monitoring resources

### Archiving

Audit logs permit archiving as an optional feature. Use archiving to write to an S3 bucket and your SIEM system can read events from it. Archiving is a double-write feature that has variable write times, but on average all events are written to the S3 bucket within 15 minutes of generation.

If you require a more rapid approach to archiving, see the Create monitors on audit events documentation below. You can set up monitors that can alert to webhooks and other alerting paths.

### Retention

The default retention period is 7 days. You can set a retention period between 0 days and archive only, to 90 days.

[Image TK]

Note: Audit Logs are priced as retained logs, and there is not a cost for ingestion or archiving. See the [Log Management pricing page][3] for more information.

## Explore Audit Logs

To see your audit logs in the Audit Events Explorer, navigate to the Audit Logs section of your [Organizational Settings][2] in the Datadog app.

[Image TK]

Select Audit Logs to open the Audit Events Explorer.

The Audit Events Explorer has similar functionality to the [Logs Explorer][4]:

- Filter by facets to drill down into audit logs by `Status` (`Error`, `Warn`, `Inf`o) or `Method` (`POST`, `GET`, `DELETE`).
- For compliance audits, filter by `event_name` and select `authentication only` to see compliance-related events.
- Drill down into related audit logs by selecting a log and navigating to the event attributes tab. Select a specific attribute to filter by or exclude from your search, such as `http.method`, `usr.email`, `client.ip`, etc.

[Image TK]

## Create a Monitor

To create a monitor for an Audit Event, navigate to Monitors and select Audit Logs. For more information on Audit Logs monitors, see the Audit Logs monitor docs.

## Create a Dashboard

Give more visual context to your audit logs with Dashboards. To create a dashboard for Audit Logs:

1. Create a [New Dashboard][5] in Datadog
2. Select your visualization: an Audit Logs source can be queried for [Top Lists][6], [Time Series][7], and [Log Stream][8].

[Image TK]

3. [Graph your data][9]: Under edit, select Audit Logs as the data source, and create a query. Audit Logs are filtered by count, and can be grouped by the different facets. Select a facet and limit.
4. Set your display preferences and give your graph a title. Click the Save button to create the dashboard.

[Image TK]

[1]: https://app.datadoghq.com/audit/logs
[2]: https://app.datadoghq.com/organization-settings/
[3]: https://www.datadoghq.com/pricing/
[4]: https://docs.datadoghq.com/logs/explorer/
[5]: https://docs.datadoghq.com/dashboards/#overview
[6]: https://docs.datadoghq.com/dashboards/widgets/top_list/
[7]: https://docs.datadoghq.com/dashboards/widgets/timeseries/
[8]: https://docs.datadoghq.com/dashboards/widgets/log_stream/
[9]: https://docs.datadoghq.com/dashboards/querying/#choose-the-metric-to-graph
