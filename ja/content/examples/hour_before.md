---
last_modified: 2015/03/31
translation_status: progress
language: ja
title: Using hour_before() function
kind: example
examples:
    - "Graphing Functions"
    - Dashboards
    - JSON Editing
    - "OS Metrics"
summary: week_before()は、現在のDataに1時間前のDataを重ねて表示するためのファンクションです。
---
On the [Graphing Primer](http://docs.datadoghq.com/graphing/) page you will find a list of functions you can apply to a graph. There is a set of functions there of the pattern &lt;timeperiod&gt;_before(). These functions will display the values from the corresponding time period on the graph. On their own, they may not be of high value, but together with the current values they may provide useful insight into the performance of your application.

Here is an example of system.load.1 with the hour_before value shown as a dotted line. In this particular example, you can see the machine was started at 6:30am and the hour_before values show up at the 7:30 mark. Of course this example was created specifically so you can see the hour_before values match up with the actual values.

{{< img src="examples/hour_before/simple_hour_before_example.png" >}}

For now, using functions like hour_before is out of scope for the graphical editor so you have to use the JSON editor. Here is the JSON for this graph:

{{< highlight json >}}
{ "viz": "timeseries",
  "requests": [
    {
      "q": "avg:system.load.1{host:MyMachine.local}",
      "style": {
        "width": "thin",
        "palette": "cool",
        "type": "solid"
      },
      "type": "area"
    },
    {
      "q": "hour_before(avg:system.load.1{host:MyMachine.local})",
      "style": {
        "width": "thin",
        "palette": "warm",
        "type": "dashed"
      },
      "type": "line"
    }
  ],
  "events": []
}
{{< /highlight >}}