---
title: False spikes sometimes appear on my sum graph
kind: faq
---

We have identified a specific scenario where unexpected spikes (often twice the normal value you expect) are displayed on a graph.

Datadog engineering team has worked on a solution that works on specific accounts only and strongly reduce the presence of these artifacts. We are working on improving this fix and hope to generalize it soon.

For a diagnosis, read this article, and reach out to [us][1] with a precise reference of the dashboard, the graph and the timeframe at which this problem occurs.

## The scenario

A gauge metric for which your graph displays:

* the sum across sources (i.e. `sum:gauge_metric{*}`)
* the problem occurs only on large timeframe.
* the false spikes problem corresponds to a tag transition.

## The reason

In our backend we record each source of the same metric separately (we consider it a new source when the metric is reported with a different set of tags/ from a different host).

Unfortunately at the moment, when tags are changed (for instance if you change/add/remove a host tag from a host submitting the metric), our system considers the old and the new source as being both active during a short transition period.

While this doesn't impact graphs where the `avg` or the `max` value across sources has been selected, this affects graphs where the `sum` value if displayed: things are counted twice and you see a false spike on your graph.

## Example

Let's consider metric `player.count` submitted with tag `map:1` up until time=t1, then with `map:2` starting from time=t2. Datadog stores separately data coming from these 2 different sources.

When querying `sum:player.count{*}`, Datadog detects all sources (i.e. all set of tags with which the metric has been submitted) and combine their data together (using `sum`) into a single line for your graph.

However on large timeframes, Datadog cannot send all data stored for your metric back to your browser, nor display them on a widget that occupies a small portion of your screen (for instance, with a datapoint every few seconds, one-week of data is hundreds of thousands of datapoints). Thus our backend always proceeds to time-aggregation, i.e. for each source detected, our system summarizes the long serie of points into a shorter serie where each datapoint is a local aggregate accounting for X minutes of data.

So what our system actually does is:

1. Slice the time-frame into ~300 time buckets. Reduce each source to a serie of ~300 X-min local aggregates (each local aggregate accounts for all values of 1 time-bucket).
2. Merge all these aggregate series together by sum

More explanation about our graphing system in this [excellent article][2]:

Back to our example, if you look at a few minutes of data, the graph is as expected. But when zooming out, the local aggregates for each source inevitably accounts for X minutes of data. As you zoom out, X grows, and at some point, data from t1 and t2 get aggregated together. Thus values from source `map:1` and from source `map:2`, that didn't occur at the same time fall nonetheless in the same time-bucket, therefore, when summing sources together, these datapoints that didn't occur simultaneously are summed up together: the result may be twice the value as expected.

## Other workarounds

In addition to the feature we may apply to your account, here are 3 workarounds you may apply:

* **Zoom on the graph**: The issue is a side-effect of the time-aggregation that occurs for graphs on large time-frames; zooming in makes the spike disappear, and you'll know it's not a legitimate spike and you can ignore it.

* **Turn-off interpolation**: Our interpolation feature sometimes intensifies the impact of this issue. You may apply the fill(null,0) function with the graph visual editor to disable it and improve your graph display. Syntax for the json tab: sum:your_metric{scope}.fill(null,0) or sum:your_metric{scope} by {tag_key}.fill(null,0)

* **Submit the metric without the changing tags**: The obvious drawback are the disparities between the levels of detail provided by this tag, but you'll get accurate results on your graphs. Thus we would recommend continuing to send the metric as you do right now (to enjoy this level of detail) and in addition submit the same data under a slightly different name `<your.metric>.no_tag_<tag_name>` without this tag for graphing global queries without the spikes otherwise caused by `<tag_name>`.

[1]: /help
[2]: /graphing/functions
