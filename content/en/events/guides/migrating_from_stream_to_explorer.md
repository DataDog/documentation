---
title: Migrating from the Event Stream to the Events Explorer
kind: documentation
---


## Request beta access

<div class="alert alert-warning">
  The Events Explorer is in private beta. To request access, contact <a href="/help/">Datadog Support</a>. If you are looking for legacy events information, see the <a href="/events/stream/">Event Stream documentation</a>.</div>

With the beta enabled, you have access to these events features:

- [Events Explorer][1]
- [Event Analytics][2]
- Events to Metrics
- Events Pipelines
- [Event as a new source in Dashboards widgets][3]
- Event monitors API v2

You can continue to access the Event Stream from the navigation menu alongside the new features:

{{< img src="events/guides/navigation.png" alt="The events explorer alongside the event stream in the Datadog app navigation." style="width:50%;" >}}

## Migrate existing event monitors and dashboard widgets

You can still edit your existing event monitors and widgets. However, new event monitors and widgets use the new event monitor query syntax. You also may want to migrate existing event stream, event timeline, or event overlay monitors and widgets. To migrate, update the search query to match the new one. You can do this by manually recreating your existing monitors following these examples:

|                           Description                           |                                                    Legacy syntax                                                   |                                              New Syntax                                             |
|:---------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------:|
| No Slack events in the past 24 hours.                           | `events('priority:all sources:slack').rollup('count').last('1d') < 1`                                              | `events("source:slack").rollup("count").last("1d") < 1`                                             |
| EC2 Instance marked for maintenance                             | `events('priority:all "Upcoming AWS maintenance event"').by('name,host').rollup('count').last('2d') >= 1`          | `events("Upcoming AWS maintenance").rollup("count").last("1d") < 1`                                 |
| Zabbix or Prometheus has triggered an alert for a service today | `events('tags:service priority:all status:error sources:prometheus sources:zabbix).rollup('count').last(‘1d’) > 0` | `events("source:(prometheus OR zabbix) status:error").rollup("count").by("service").last("1d") > 0` |
| No events received in a datacenter for service ‘datadog-agent’  | Legacy Event Monitors do not support cardinality rollup.                                                           | `events("service:datadog-agent").rollup("cardinality", "datacenter").by("service").last("15m") < 1` |

If you use the API, Terraform, or other third party solution to manage your monitors, manually update your code using the syntax described above.

**Note:** If you have SLOs based on event monitors, be sure to update their definitions to point to the new ones.

## Sunset legacy events

When you have successfully migrated your monitors and dashboards, Datadog automatically stops writing events to the previous intake, so it's good to have a plan in place to sunset using the legacy events in favor of the new events. The Event Stream continues to be accessible for viewing your event history.

[1]: /events/explorer/
[2]: /events/explorer/#event-analytics
[3]: /dashboards/widgets/event_stream/
