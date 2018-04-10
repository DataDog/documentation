---
last_modified: 2015/03/31
translation_status: progress
language: ja
title: Using day_before() function
kind: example
examples:
    - "Graphing Functions"
    - Dashboards
    - JSON Editing
    - "Nginx Metrics"
summary: week_before()は、現在のDataに1時間前のDataを重ねて表示するためのファンクションです。
---
On the [Graphing Primer](http://docs.datadoghq.com/graphing/) page you will find a list of functions you can apply to a graph. There is a set of functions there of the pattern &lt;timeperiod&gt;_before(). These functions will display the values from the corresponding time period on the graph. On their own, they may not be of high value, but together with the current values they may provide useful insight into the performance of your application.

Here is an example of nginx.net.connections with the day_before value shown as a lighter, thinner line. In this example, you can see a week's worth of data which makes the day_before data easy to identify.

{{< img src="examples/day_before/simple_day_before_example.png" >}}

For now, using functions like day_before is out of scope for the graphical editor so you have to use the JSON editor. Here is the JSON for this graph:

{{< highlight json >}}
{
  "requests": [
    {
      "q": "day_before(avg:nginx.net.connections{*})",
      "type": "line",
      "style": {
        "palette": "cool",
        "width": "thin"
      }
    },
    {
      "q": "avg:nginx.net.connections{*}",
      "style": {
        "palette": "warm"
      }
    }
  ],
  "viz": "timeseries"
}
{{< /highlight >}}