---
last_modified: 2015/03/31
translation_status: progress
language: ja
title: Using week_before() function
kind: example
examples:
    - "Graphing Functions"
    - Dashboards
    - JSON Editing
    - "Cassandra Metrics"
summary: week_before()は、現在のDataに1週間前のDataを重ねて表示するためのファンクションです。
---
On the [Graphing Primer](http://docs.datadoghq.com/graphing/) page you will find a list of functions you can apply to a graph. There is a set of functions there of the pattern &lt;timeperiod&gt;_before(). These functions will display the values from the corresponding time period on the graph. On their own, they may not be of high value, but together with the current values they may provide useful insight into the performance of your application.

Here is an example of cassandra.db.read_count with the week_before value shown as a dotted line. In this example, you can see about three weeks' worth of data which makes the week_before data easy to identify.

{{< img src="examples/week_before/simple_week_before_example.png" >}}

For now, using functions like week_before is out of scope for the graphical editor so you have to use the JSON editor. Here is the JSON for this graph:

{{< highlight json >}}
{
  "requests": [
    {
      "q": "week_before(avg:cassandra.db.read_count{*})",
      "type": "line",
      "style": {
        "palette": "cool",
        "width": "normal",
        "type": "dotted"
      }
    },
    {
      "q": "avg:cassandra.db.read_count{*}",
      "style": {
        "palette": "orange"
      },
      "type": "line"
    }
  ],
  "viz": "timeseries"
}
{{< /highlight >}}