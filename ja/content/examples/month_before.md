---
last_modified: 2015/03/31
translation_status: progress
language: ja
title: Using month_before() function
kind: example
examples:
    - "Graphing Functions"
    - Dashboards
    - JSON Editing
    - "AWS Metrics"
summary: week_before()は、現在のDataに1ヶ月前のDataを重ねて表示するためのファンクションです。
---
On the [Graphing Primer](http://docs.datadoghq.com/graphing/) page you will find a list of functions you can apply to a graph. There is a set of functions there of the pattern &lt;timeperiod&gt;_before(). These functions will display the values from the corresponding time period on the graph. On their own, they may not be of high value, but together with the current values they may provide useful insight into the performance of your application.

Here is an example of aws.ec2.cpuutilization with the month_before value shown as a thin, solid line.

{{< img src="examples/month_before/simple_month_before_example.png" >}}

For now, using functions like month_before is out of scope for the graphical editor so you have to use the JSON editor. Here is the JSON for this graph:

{{< highlight json >}}
{
  "requests": [
    {
      "q": "avg:aws.ec2.cpuutilization{*}",
      "type": "line",
      "style": {
        "palette": "cool",
        "width": "normal",
        "type": "dotted"
      }
    },
    {
      "q": "month_before(avg:aws.ec2.cpuutilization{*})",
      "type": "line",
      "style": {
        "width": "thin"
      }
    }
  ],
  "viz": "timeseries"
}
{{< /highlight >}}