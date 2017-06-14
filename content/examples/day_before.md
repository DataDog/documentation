---
title: Using day_before() function
kind: example
examples:
    - "Graphing Functions"
    - Dashboards
    - JSON Editing
    - "Nginx Metrics"
summary: The day_before() function allows you to overlay data from the previous day on your current data.
---
On the [Graphing Primer](http://docs.datadoghq.com/graphing/) page you will find a list of functions you can apply to a graph. There is a set of functions there of the pattern &lt;timeperiod&gt;_before(). These functions will display the values from the corresponding time period on the graph. On their own, they may not be of high value, but together with the current values they may provide useful insight into the performance of your application.

Here is an example of nginx.net.connections with the day_before value shown as a lighter, thinner line. In this example, you can see a week's worth of data which makes the day_before data easy to identify.

{{< img src="simple_day_before_example.png" >}}

For now, using functions like day_before is out of scope for the graphical editor so you have to use the JSON editor. Here is the JSON for this graph:


    #!json
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
