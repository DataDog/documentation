---
title: Migrating to the New Events Features
kind: documentation
aliases:
  /events/guides/migrating_from_stream_to_explorer
---

<div class="alert alert-warning">
  The Events Explorer is in private beta. If you are looking for legacy events information, see the <a href="/events/stream/">Event Stream documentation</a>.</div>

The Event Stream is one of Datadog’s oldest features. The introduction of the Events Explorer and its associated changes means that Event query syntax, explorer and analytics views, processing pipelines, and other features work the same way they do for other Datadog products such as Logs. See [Events Explorer][1] for more details. 

## What this means for your organization

* New events (after migration) are visible only in the [Events Explorer][2] or dashboard widgets and event overlays.

* Older events (before migration) continue to be visible in the [Event Stream][2] for the remainder of their retention period (13 months).

This guide describes how to migrate your organization’s event monitors and dashboard widgets so that you benefit from the new Events features, and so that you're ready when the legacy event stream and storage are sunset. It also provides [a detailed description of what's changed](#details-of-the-changes).

## Migration process

1. **Request early access.** Events Explorer is in private beta. [Contact support][3] to request access for your organization. The support team sends you a notification when Events Explorer is enabled for your organization. You can access the new Explorer and other features through the Events menu in the main navigation, alongside the existing Stream.

   {{< img src="events/guides/navigation.png" alt="Events navigation" style="width:100%;" >}}

   <div class="alert alert-warning">Don't stop here! To create event monitors and dashboard widgets for Events using the new query syntax, Datadog support must enable the new feature for your organization, and you must migrate your existing event monitors and dashboard widgets to the new syntax, as described in the following steps.</div>

2. **Contact Support to enable the new Events feature.** [Ask Support][3] to switch your organization to the new query syntax. Datadog automatically routes queries to the correct backend. Old queries continue to go to the old backend, and migrated queries go to the new backend, so you can migrate safely. When the switch is enabled, you can no longer create monitors or dashboard widgets with the legacy query syntax, so calls to the legacy API fail with an error, but your existing monitors and dashboards remain reporting.

3. **Migrate data stored in Datadog servers.** Because the new events have a new query syntax and different monitor features (see below for detailed changes), event monitors and event dashboard widgets definitions that contain event queries must be updated. Use this [open source migration script][4] that connects to your account using your API key, and converts the data. [Contact Support][3] if you prefer for Datadog to run it for you.

4. **Migrate data configured externally (Terraform, API).** If you manage your Datadog configuration with external, API-based scripts or tools such as Terraform, update your dashboard and monitor definitions in your configuration file. Otherwise the old query syntax is applied again at next deployment and overwrites updated queries. Review the syntax changes described below and use the [migration script][4] to see what converted queries look like. [Contact Support][3] for assistance at this stage.

5. **If you have SLOs based on event monitors**, update their definitions to point to the new monitors.

6. **Contact Support to disable the old pipeline.** [Let Support know][3] that you have finished migrating, and the old pipeline will be turned off. After that, all queries are routed to the new backend, and old-style queries return errors.

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

If you are using these features, [contact Support][3] to get help finding an alternative solution.


[1]: /events/explorer/
[2]: https://app.datadoghq.com/event/explorer
[3]: /help/
[4]: https://github.com/DataDog/events-v2-migration-script
[5]: /api/latest/events/#query-the-event-stream
[6]: /api/latest/monitors/#create-a-monitor
