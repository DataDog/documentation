---
title: Migrating to the New Events Features
kind: documentation
aliases:
  /events/guides/migrating_from_stream_to_explorer
---

<div class="alert alert-warning">
  Use this guide to migrate from the legacy Events Stream to the Events Explorer. The Events Explorer is being automatically rolled out to all customers in Q1 and Q2 2022. If you see the <strong>Explorer</strong> option under <strong>Events</strong> in the left navigation bar, you have the new features. For legacy events information, see the <a href="/events/stream/">Event Stream</a>.</div>

The Events Explorer replaces the Event Stream, one of Datadog's oldest features. The new Event query syntax requires migration of Event monitors, dashboard widgets, and any other features that query Events. 

The introduction of the Events Explorer and its associated changes means that Event features work similarly to other Datadog products. Event query syntax, explorer and analytics views, processing pipelines and other features look like their counterparts in Logs or APM Traces. See [Events Explorer][1] for more details.

## What this means for your organization

* New events (after migration) are visible only in the [Events Explorer][2] or dashboard widgets and event overlays.

* Older events (before migration) continue to be visible in the [Event Stream][2] for the remainder of their retention period (13 months).

This guide describes how to migrate your organization’s event monitors and dashboard widgets so that you benefit from the new Events features. Following this guide ensures that you are ready when Datadog retires the legacy event stream and storage. This guide also provides [a detailed description of what's changed](#details-of-the-changes).

## Migration process

### Datadog migrates data stored in Datadog servers
<div class="alert alert-info">
You do not need to take any action for configuration stored directly in Datadog.
</div>

Datadog is responsible for migrating data stored in its servers. You do not need to take any action for configuration stored directly in Datadog. The changes to Event query syntax affect two Datadog features: monitors and dashboard widgets.

Datadog migrates monitors that query Events by doing the following:
- For each legacy Event monitor, create a duplicate and enable it.
- Add the prefix "legacy" to the legacy Event monitor, and mute it.
- Update SLO and downtime links to point to the new monitors.

When viewing monitors, you can filter which of the two monitor types you would like to see using the **Event Migration** facet. This facet has available values "Event Monitors V1" and "Event Monitors V2."

Datadog directly migrates dashboard widgets that use Event queries. Datadog does not create any new dashboards or widgets.

### Migrate data configured externally (Terraform, API)

<div class="alert alert-warning">
You must take action to migrate Datadog configuration you manage with Terraform or scripts.
</div>

If you manage your Datadog configuration with external, API-based scripts or tools such as Terraform, update your dashboard and monitor definitions in your configuration file. Otherwise, the old query syntax is applied again at the next deployment and overwrites updated queries. Review the syntax changes described below and use the [migration script][3] to see what converted queries look like. [Contact Support][4] for assistance at this stage.

## Post migration

### Access

You can access the new Explorer and other features through the Events menu in the main navigation, alongside the existing Stream.

{{< img src="events/guides/navigation.png" alt="Events navigation" style="width:100%;" >}}

### User impact

* Datadog automatically routes Event queries to the correct backend. Old queries continue to go to the old backend, and migrated queries go to the new backend, so you can migrate safely.
* Users may continue to create legacy monitors through the UI and API during the transition period. After the sunset date, which is still pending, users must create event monitors with the new query syntax.
* Event dashboard widgets must use the new query syntax.

## Details of the changes

### Event API
The [API endpoint to query events][5] does not use any query syntax. It instead uses parameters to include or exclude tags or sources. So, you don't have to change anything in your scripts that use it, unless they refer to status values, which have changed. See [Status remapping](#status-remapping).

### Event query syntax
The new events query uses the same search query syntax as other products (Logs, RUM), providing a standardized experience across products. The updated search query syntax provides support for more advanced querying through Boolean operators and wildcards. So, the query syntax of your existing event monitors and dashboard widgets must be modified.

#### Status remapping

Some status values have changed:

| Legacy status | New status |
|---------------|------------|
| success       | OK         |
| warning       | WARN       |
| info          | INFO       |
| error         | ERROR      |

#### Event query syntax examples before and after 

Show events from GitHub or Chef
: Legacy syntax</br>
`sources:github,chef`
: New syntax </br>
`source:(github OR chef)`

Show events tagged with `env-prod`
: Legacy syntax</br>
`tags:env-prod`
: New syntax </br>
`tags:env-prod`

Show events tagged with `#env-prod` or `#db`
: Legacy syntax</br>
`tags:env-prod,db`, `tags:env-prod OR db`
: New syntax </br>
`tags:(env-prod OR db)`

Show events tagged with `#security-group:sg-123` and `#role:common-node`
: Legacy syntax</br>
`tags:security-group:sg-123 AND role:common-node`
: New syntax </br>
`tags:(security-group:sg-123 AND role:common-node)`

Use wildcards to search for prefixes and suffixes
: Legacy syntax</br>
Not available
: New syntax </br>
`*web` matches all event messages ending with `web`</br>
`source:amazon*` matches all events that source starts with `amazon` 


### Event monitors
Event monitors have also been ported to use the same standardized set of features as other products (logs, RUM, traces) with new capabilities.

#### Event monitors query syntax

When you create event monitors, the new query search field has autocomplete, rather than the legacy fill-in-the-blank query:

**Before:**
{{< img src="events/guides/events-migration-monitor-legacy.png" alt="Legacy UI for monitor query syntax" style="width:100%;" >}}

**After:**
{{< img src="events/guides/events-migration-monitor-new.png" alt="New UI for monitor query syntax" style="width:100%;" >}}

This means you can use complex queries in event monitors with all the added capabilities listed above such as Boolean operators or wildcards.

#### Event monitors API syntax examples before and after

The [Event monitors API][6] has a new monitor query syntax (See "Event V2 Alert Query" section), with Average and Cardinality rollup methods and fewer required attributes. 

No Slack events in the past 24 hours
: Legacy syntax </br>
`events('priority:all sources:slack').rollup('count').last('1d') < 1`
: New syntax </br>
`events("source:slack").rollup("count").last("1d") < 1`

EC2 Instance marked for maintenance
: Legacy syntax </br>
`events('priority:all "Upcoming AWS maintenance event"').by('name,host').rollup('count').last('2d') >= 1`
: New syntax </br>
`events("Upcoming AWS maintenance event").rollup("count").last("2d") >= 1`

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


#### Other event monitor changes

* **The monitor evaluation window is limited to 48 hours.** Your monitors are not evaluated beyond a 48 hour window. If you need to use a longer evaluation window, you can generate custom metrics from events and use a metrics monitor, where the evaluation window can be up to one month.

* **To group results by tag, add the tag as a facet.** Create a facet from any tag. In the Events Explorer:
  1. Click **Add** at the top of the facet bar.
  2. Select the tag that you wish to add as a facet. 
  3. Click **Add**.

* **You can group by up to 4 facets.** (Previously: Unlimited groups) Top-values, the highest frequency values of a group, are limited based on the total number of groups. For example, if a monitor triggers more times than the facet limit, it sorts by top group and shows only the top N groups. For example N = 30 resulting hosts if 3 facets and one facet is `host`.
  * One facet results in a limit of 1000 top values. 
  * Two facets results in a limit of 30 top values per facet (at most 900 groups)
  * Three facets results in a limit of 10 top values per facet (at most 1000 groups)
  * Four facets results in a limit of five top values per group (at most 625 groups)

### Other deprecated events features

* **Event aggregations are no longer displayed in the UI**, but they are still available though the API.
* **Event comments are no longer supported in the UI.** Comments created using the API with `user_update` event type are displayed as normal events.
* **You can no longer create new events from the UI**, but you can still use the API for posting new events.

If you are using these features, [contact Support][4] to get help finding an alternative solution.


[1]: /events/explorer/
[2]: https://app.datadoghq.com/event/explorer
[3]: https://github.com/DataDog/events-v2-migration-script
[4]: /help/
[5]: /api/latest/events/#query-the-event-stream
[6]: /api/latest/monitors/#create-a-monitor
