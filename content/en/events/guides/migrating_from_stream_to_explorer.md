---
title: Migrating from the Event Stream to the Events Explorer
kind: documentation
---

<div class="alert alert-warning">
  The Events Explorer is in private beta. If you are looking for legacy events information, see the <a href="/events/stream/">Event Stream documentation</a>.</div>

The Events Stream is one of Datadog’s oldest features. The introduction of the Events Explorer and its associated changes means that Event query syntax, explorer and analytics views, processing pipelines, and other features work the same way they do for other Datadog products such as Logs. See [Events Explorer][1] for more details. 

## What this means for your organization

* New events (from October 2021 onwards) are visible only in the [Events Explorer][2] or dashboard widgets and event overlays.

* Older events (before October 2021) continue to be visible in the [Events Stream][2] for the remainder of their retention period (13 months).

This guide describes how to migrate your organization’s event monitors and dashboard widgets so that you benefit from the new Events features, and so that you're ready when the legacy event stream and storage are sunset in fourth quarter 2021.

## Migration process

1. **Request early access.** Events Explorer is in private beta. [Contact support][3] to request access for your organization. The support team sends you a notification when Events Explorer is enabled for your organization. You can access the new Explorer and other features through the Events menu in the main navigation, alongside the existing Stream.

   {{< img src="events/guides/navigation.png" alt="Events navigation" style="width:100%;" >}}

   <div class="alert alert-warning">Don't stop here! To create event monitors and dashboard widgets for Events using the new query syntax, you must migrate your existing event monitors and dashboard widgets to the new syntax, and Datadog support must enable the new query syntax for your organization, as described in the following steps.</div>

2. **Migrate data stored in Datadog servers.** Because the new events have a new query syntax and different monitor features (see below for detailed changes), event monitors and event dashboard widgets definitions that contain event queries must be updated. Use this [open source migration script][4] that connects to your account using your API key, and converts the data. [Contact Support][3] if you prefer we run it for you.

3. **Migrate data configured externally (Terraform, API).** If you manage your Datadog configuration with external, API-based scripts or tools such as Terraform, update your dashboard and monitor definitions in your configuration file. Otherwise the old query syntax will be applied again at next deployment and overwrite updated queries. Review the syntax changes described below and use the [migration script][4] to see what converted queries look like. [Contact Support][3] for assistance at this stage.

4. **Contact Support to enable the new query syntax.** After all your dashboard and monitor configurations are migrated, [ask Support][3] to switch your organization to the new query syntax. When this switch is enabled, you can no longer create monitors or dashboard widgets with the legacy query syntax, so calls to the legacy API fail with an error.

<!-- Previous: 
When you have successfully migrated your monitors and dashboards, Datadog automatically stops writing events to the previous intake, so it's good to have a plan in place to sunset your legacy events in favor of the new events. The Event Stream continues to be accessible for viewing your event history.
-->

5. If you have SLOs based on event monitors, update their definitions to point to the new monitors.

## Details of the changes

### Event API: No changes
The [API endpoint to query events][5] does not use any query syntax. It instead uses parameters to include or exclude tags or sources. So, you don't have to change anything in your scripts that use it.

### New event query syntax
The new events query uses the same search query syntax as other products (Logs, RUM), providing a standardized experience across products. The updated search query syntax provides support for more advanced querying through Boolean operators and wildcards. So, the query syntax of your existing event monitors and dashboard widgets must be modified.

#### Event query syntax before and after examples

<!-- TO DO TO DO 
x
: Legacy syntax</br>
` `
: New syntax </br>
` `
-->

### Search query in event monitors
Event monitors have also been ported to use the same standardized set of features as other products (logs, RUM, traces) with new capabilities.

When you create event monitors, the new query search field has autocomplete, rather than the legacy fill-in-the-blank query:

**Before:**
{{< img src="events/guides/events-migration-monitor-legacy.png" alt="Legacy UI for monitor query syntax" style="width:100%;" >}}

**After:**
{{< img src="events/guides/events-migration-monitor-new.png" alt="New UI for monitor query syntax" style="width:100%;" >}}

This means you can use complex queries in event monitors with all the added capabilities listed above such as Boolean operators or wildcards.

### Event monitor query syntax and event monitors API

The Event monitors API has a new monitor query syntax, with Average and Cardinality rollup methods and fewer required attributes.

No Slack events in the past 24 hours
: Legacy syntax </br>
`events('priority:all sources:slack').rollup('count').last('1d') < 1`
: New syntax </br>
`events("source:slack").rollup("count").last("1d") < 1`

EC2 Instance marked for maintenance
: Legacy syntax </br>
`events('priority:all "Upcoming AWS maintenance event"').by('name,host').rollup('count').last('2d') >= 1`
: New syntax </br>
`events("Upcoming AWS maintenance").rollup("count").last("1d") < 1`

Zabbix or Prometheus has triggered an alert for a service today
: Legacy syntax </br>
`events('tags:service priority:all status:error sources:prometheus sources:zabbix).rollup('count').last(‘1d’) > 0`
: New syntax </br>
`events("source:(prometheus OR zabbix) status:error").rollup("count").by("service").last("1d") > 0`

No events received in a datacenter for service `datadog-agent`
: Legacy syntax </br>
Legacy Event Monitors do not support cardinality rollup.
: New syntax </br>
`events("service:datadog-agent").rollup("cardinality", "datacenter").by("service").last("15m") < 1`

### Other event monitor changes

<!-- TO DO TO DO 
Continue from document 
-->

[1]: /events/explorer/
[2]: https://app.datadoghq.com/event/explorer
[3]: /help/
[4]: https://github.com/DataDog/events-v2-migration-script
[5]: /api/latest/events/#query-the-event-stream
