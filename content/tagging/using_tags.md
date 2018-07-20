---
title: Using tags
kind: documentation
aliases:
- /getting_started/tagging/using_tags
further_reading:
- link: "getting_started/tagging"
  tag: "Documentation"
  text: Getting started with tags
- link: "getting_started/tagging/assigning_tags"
  tag: "Documentation"
  text: Learn how to assign tags
---

After you have assigned tags at the host and [integration][1] level, you can start using them to filter and group in interesting ways. There are several places you can use tags:

- [Events List][2]
- [Dashboards][3]
- [Infrastructure List][4]
- [Host Map][5]
- [Monitors][6]

## Using tags in the Events List

The [Events List][2] shows you all the events that have occurred in your environment over the time period specified. This can be overwhelming so you can use tags to filter down the list based on the tags you have assigned. You can enter any text you want in the search box above the Event List and a full text search is performed. You can also enter `tags:` followed by a tag to see all the events that come from a host or [integration][1] with that tag. The example in the image is the tag `role:cassandra`. So the search text is `tags:role:cassandra`.

{{< img src="getting_started/tags/eventtags.png" alt="Events List and Tags" responsive="true" style="width:70%;">}}

## Using tags in Dashboards

You can use tags to narrow down the metrics to display on a [dashboard graph][7], or to create groups of metrics to display.
To narrow down the metrics to display, enter the tag in the `from:` textbox.

You are now looking at a chosen metric over all the hosts that have that particular tag assigned.

{{< img src="getting_started/tags/dashboardtags_1.png" alt="Tags in Dashboards from textbox" responsive="true" style="width:70%;">}}

To group using tags, enter the key part of the tag in the `avg by:` textbox.

For instance, if you have a time series graph showing a metric tagged by the reporting hosts roles —`role:database`, `role:frontend`, or `role:loadbalancer`— enter role in the **avg_by** textbox.
This causes the graph to show just one line for each tag value — `database`, `frontend`, and `loadbalancer`. Each line represents the average metric value across all hosts that share that role.

{{< img src="getting_started/tags/dashboardtags.png" alt="Tags in Dashboards avgby textbox" responsive="true" style="width:70%;">}}

You can also use tags to overlay events on the dashboard. This works in exactly the same way as in the [Events List][2].
Enter `tags:` followed by the tag and you see the corresponding events overlaid as vertical bars on each graph.

## Using tags in the Infrastructure List and the Host Map

To filter the list of hosts in the [Infrastructure list][4], enter a tag in the filter textbox at the top of the page. You can also group the hosts by entering the key portion of the tag in the group by textbox. So if you enter role in the group box, you see each role as a group heading followed by the hosts with that tag.  

{{< img src="getting_started/tags/infrastructuretags.png" alt="Tags in the Infrastructure List" responsive="true" style="width:70%;">}}

## Using tags in Monitors

When creating a [monitor][8]:

* Use tags in the `from:` textbox to limit the monitor scope to only metrics that have those tags.
{{< img src="getting_started/tags/monitortags.png" alt="from textbox tags in Monitors" responsive="true" style="width:70%;">}}

* Use tags in the `excluding:` textbox to remove the corresponding metrics of the monitor scope.
{{< img src="getting_started/tags/monitortags_1.png" alt="excluding textbox tags in Monitors" responsive="true" style="width:70%;">}}

* Use tags in the `avg by` textbox transform your monitor into a multi-alert monitor on each value of this tags.
{{< img src="getting_started/tags/monitortags_2.png" alt="excluding textbox tags in Monitors" responsive="true" style="width:70%;">}}
Tags on these events are related to the `avg by:` value. In order to have host-related tags (such as AWS integration tags), use `avg by: host`

## Tell me about tagging!

Tagging within Datadog is a powerful way to easily gather your metrics
and makes scaling your infrastructure a breeze.

For a quick example to demonstrate the power of tagging, perhaps you're
looking for a sum of two metrics, which you might normally define as follows:

```
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example.com")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example.com")
```

What we recommend doing is leaving off the hostname; it then defaults to the host that is sending that point, since they’re different hosts it's treated as different points:

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations
[2]: /graphing/event_stream/
[3]: /graphing/dashboards/
[4]: /graphing/infrastructure/
[5]: /graphing/infrastructure/hostmap
[6]: /monitors/
[7]: /graphing/dashboards
[8]: /monitors/monitor_types/
[9]: /integrations/amazon_web_services/
