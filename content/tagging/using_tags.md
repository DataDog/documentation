---
title: Using tags
kind: documentation
aliases:
- /getting_started/tagging/using_tags
further_reading:
- link: "tagging"
  tag: "Documentation"
  text: Getting started with tags
- link: "tagging/assigning_tags"
  tag: "Documentation"
  text: Learn how to assign tags
---

After you have assigned tags at the host and [integration][1] level, you can start using them to filter and group in interesting ways.

## Events

The [Events Stream][2] shows you all the events that have occurred in your environment over the time period specified. This can be overwhelming so you can use tags to filter down the list based on the tags you have assigned. You can enter any text you want in the search box above the Event List and a full text search is performed. You can also enter `tags:` followed by a tag to see all the events that come from a host or [integration][1] with that tag. The example in the image is the tag `role:cassandra`. So the search text is `tags:role:cassandra`.

{{< img src="tagging/eventtags.png" alt="Events List and Tags" responsive="true" style="width:70%;">}}

## Dashboards

You can use tags to narrow down the metrics to display on a [dashboard graph][3], or to create groups of metrics to display.
To narrow down the metrics to display, enter the tag in the `from:` textbox.

You are now looking at a chosen metric over all the hosts that have that particular tag assigned.

{{< img src="tagging/dashboardtags_1.png" alt="Tags in Dashboards from textbox" responsive="true" style="width:70%;">}}

To group using tags, enter the key part of the tag in the `avg by:` textbox.

For instance, if you have a timeseries graph showing a metric tagged by the reporting hosts roles -`role:database`, `role:frontend`, or `role:loadbalancer`- enter role in the **avg_by** textbox.
This causes the graph to show just one line for each tag value - `database`, `frontend`, and `loadbalancer`. Each line represents the average metric value across all hosts that share that role.

{{< img src="tagging/dashboardtags.png" alt="Tags in Dashboards avgby textbox" responsive="true" style="width:70%;">}}

You can also use tags to overlay events on the dashboard. This works in exactly the same way as in the [Events List][2].
Enter `tags:` followed by the tag and you see the corresponding events overlaid as vertical bars on each graph.

## Infrastructure

{{< tabs >}}
{{% tab "Host Map" %}}

Host Map

{{% /tab %}}

{{% tab "Infrastructure List" %}}

To filter the list of hosts in the [Infrastructure list][1], enter a tag in the filter textbox at the top of the page. You can also group the hosts by entering the key portion of the tag in the group by textbox. So if you enter role in the group box, you see each role as a group heading followed by the hosts with that tag.  

{{< img src="tagging/infrastructuretags.png" alt="Tags in the Infrastructure List" responsive="true" style="width:70%;">}}

[1]: /graphing/infrastructure/

{{% /tab %}}

{{% tab "Containers" %}}

Containers

{{% /tab %}}

{{% tab "Processes" %}}

Processes

{{% /tab %}}
{{< /tabs >}}

## Monitors

{{< tabs >}}
{{% tab "Manage Monitors" %}}

Manage Monitors

{{% /tab %}}

{{% tab "Create Monitors" %}}

When creating a [monitor][1]:

Use tags in the `from:` textbox to limit the monitor scope to only metrics that have those tags.
{{< img src="tagging/monitortags.png" alt="from textbox tags in Monitors" responsive="true" style="width:70%;">}}

Use tags in the `excluding:` textbox to remove the corresponding metrics of the monitor scope.
{{< img src="tagging/monitortags_1.png" alt="excluding textbox tags in Monitors" responsive="true" style="width:70%;">}}

Use tags in the `avg by` textbox to transform your monitor into a multi-alert monitor on each value of this tags.
{{< img src="tagging/monitortags_2.png" alt="excluding textbox tags in Monitors" responsive="true" style="width:70%;">}}
Tags on these events are related to the `avg by:` value. In order to have host-related tags (such as AWS integration tags), use `avg by: host`

[1]: /monitors/monitor_types/

{{% /tab %}}
{{< /tabs >}}

## Metrics

{{< tabs >}}
{{% tab "Explorer" %}}

Explorer

{{% /tab %}}

{{% tab "Summary" %}}

Summary

{{% /tab %}}

{{% tab "Distribution Metrics" %}}

Distribution Metrics

{{% /tab %}}
{{< /tabs >}}

## APM

APM

## Notebooks

Notebooks

## Logs

Logs

## Tell me about tagging!

Tagging within Datadog is a powerful way to easily gather your metrics
and makes scaling your infrastructure a breeze.

For a quick example to demonstrate the power of tagging, perhaps you're
looking for a sum of two metrics, which you might normally define as follows:

```
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example.com")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example.com")
```

What we recommend doing is leaving off the hostname; it then defaults to the host that is sending that point, since they're different hosts it's treated as different points:

```
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

With these tags you can then do:

```
sum:page.views{domain:example.com}
```

which should give the desired result.

To get a breakdown by host, you can do:

```
sum:page.views{domain:example.com} by {host}
```

For information on AWS tagging, see [this tagging doc page][9].

## Examples from Index

Here is an example of tags using the time-series chart editor. For the first screenshot, no tags have been applied, and we're observing average CPU across all hosts:

{{< img src="tagging/Tags_1.png" alt="Tags_1" responsive="true" style="width:75%;">}}

In this next example, we've applied a tag (`region:eastus`) that enables Datadog to look at CPU across the US East Region. We've used region as an example, but you could use any arbitrary tag, including application, service, environment, etc.

{{< img src="tagging/Tags_2.png" alt="Tags_2" responsive="true" style="width:75%;">}}

In this last example, we've used the second empty field labeled as "everything" by option to show an individual timeseries line for each host. Now we're seeing server CPU for individual hosts running in the US East Region.

{{< img src="tagging/Tags_3.png" alt="Tags_3" responsive="true" style="width:75%;">}}

We can also add additional tags to narrow down the scope even further - for example, hosts in `region:eastus` and `env:production`. Tags are extremely powerful, and they are ubiquitous in Datadog. They can be applied to all core elements, including alerts and host maps.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations
[2]: /graphing/event_stream/
[3]: /graphing/dashboards/
[5]: /graphing/infrastructure/hostmap
[6]: /monitors/
[9]: /integrations/amazon_web_services/
