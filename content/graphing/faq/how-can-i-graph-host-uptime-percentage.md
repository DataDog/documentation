---
title: How can I graph host uptime percentage?
kind: faq
---

The following two graph definitions will generate the graphs on the dashboard in the image below. count returns the amount of timeseries that match the query. The way that these specific queries work are by checking to see whether or not a given metric (in this case system.load.1) has been reported during a specific moment in time using count. If the metric has reported, then the query will return 1, if not 0. Using this binary averaged across a time period will give the fraction of time that the metric itself has reported. Thus, host uptime!

## Hosts with Lowest % of Uptime for Scope (Toplist)

```
{
  "viz": "toplist",
  "requests": [
    {
      "q": "top((count:system.load.1{$scope} by {host} + count:system.load.1{*} * 0) / 1, 10, 'mean', 'asc')",
      "style": {
        "palette": "dog_classic"
      },
      "conditional_formats": []
    }
  ]
}
```

## Overall % of Uptime for Scope

```
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "( count:system.load.1{$scope} + ( count:system.load.1{*} / count:system.load.1{*} ) * 0 ) / ( count:system.load.1{$scope} + ( count:system.load.1{*} / count:system.load.1{*} ) * 0 )",
      "style": {
        "palette": "dog_classic"
      },
      "conditional_formats": [], 
      "type": "line",
      "aggregator": "avg"
    }
  ],
  "autoscale": true
}
```

{{< img src="graphing/faq/up_time.png" alt="up time" responsive="true" >}}

