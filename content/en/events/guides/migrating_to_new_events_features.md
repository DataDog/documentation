---
title: Migrating to the New Events Features
kind: documentation
aliases:
  /events/guides/migrating_from_stream_to_explorer
---

<div class="alert alert-warning">
  On <strong>June 30, 2022</strong>, we will retire Datadog's existing event stream and event monitors. We are migrating all customers to a new and improved events experience. This page contains important information about this migration and steps to take before the retirement date to ensure that your existing event visualizations and monitors continue to work properly.</div>

## Why the migration?

Launched more than 10 years ago, Datadog's event stream is one of our earliest features. Our new events experience includes many new features that allow you to get even more value from your events. These include event analytics, the ability to generate metrics from your events, and a much friendlier and more intuitive query syntax that is better aligned with other Datadog products, such as Log Management and APM.

## What is the migration timeline?

<strong>March 5, 2022</strong> - The new Events Explorer and analytics were made available. We began to migrate customer dashboards and monitors not managed using our API.

<strong>April 30, 2022</strong> - The event stream will be retired.

<strong>May 15, 2022</strong> - Starting on this date, while Datadog will continue to evaluate event monitors that have not been migrated, they will no longer be editable. New event monitors must use the new syntax.

<strong>June 30, 2022</strong> - On this date, Datadog will stop evaluating event monitors that have not been migrated.

## What action do I need to take?

If you do <strong>not</strong> manage your dashboard or monitors using external API-based tools (such as Terraform or scripts), <strong>then no action is required on your end</strong>. Datadog will migrate your dashboards and monitors before April 30, 2022. We will leave your old monitors in place but they will be muted and Datadog will stop evaluating them on June 30, 2022.

<strong>If you use Terraform or other API-based scripts</strong> to manage all or some of your <strong>dashboards</strong>, Datadog will migrate queries in your event widgets and overlays to the new syntax, but you will need to update your scripts to keep them in sync before June 30, 2022.

<strong>If you use Terraform or other API-based scripts</strong> to manage all or some of your <strong>monitors</strong>, you have until June 30, 2022, to update them. After this date, Datadog will create new versions of any non-migrated monitors and mute the existing monitors to ensure that you continue to have alerting.

Datadog can also assist you with migrating your monitors by suggesting updates or by applying the updates to your monitors.

## Details of the changes

### Events Creation
The API to create events will <strong>not</strong> change. You can continue to send events from the agent, API or events via email as you do now.

### Event query syntax
The new events query uses the same search query syntax as other products (Logs, RUM), providing a standardized experience across products. The updated search query syntax provides support for more advanced querying through Boolean operators and wildcards. So, the query syntax of your existing event monitors and dashboard widgets <strong>must</strong> be modified.

#### Status remapping

Some status values have changed:

| Legacy status | New status |
|---------------|------------|
| success       | OK         |
| warning       | WARN       |
| info          | INFO       |
| error         | ERROR      |

#### Source remapping

Many Event source names changed. See the full list of affected source names [here][1].

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

The [Event monitors API][2] has a new monitor query syntax (See "Event V2 Alert Query" section), with Average and Cardinality rollup methods and fewer required attributes.

No Slack events in the past 24 hours
: Legacy syntax </br>
`events('priority:all sources:slack').rollup('count').last('1d') < 1`
: New syntax </br>
`events("source:slack").rollup("count").last("1d") < 1`

EC2 Instance marked for maintenance
: Legacy syntax </br>
`events('priority:all "Upcoming AWS maintenance event"').by('name,host').rollup('count').last('2d') >= 1`
: New syntax </br>
`events('"Upcoming AWS maintenance event"').rollup("count").by("name,host").last("2d") >= 1`

Zabbix or Prometheus has triggered an alert for a service today
: Legacy syntax </br>
`events('tags:service priority:all status:error sources:prometheus sources:zabbix).rollup('count').last(‘1d’) > 0`
: New syntax </br>
`events("source:(prometheus OR zabbix) status:error tags:service").rollup("count").last("1d") > 0`


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

[1]: /events/guides/new_events_sources/
[2]: /api/latest/monitors/#create-a-monitor
[3]: /help/
