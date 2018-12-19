---
title: Outlier monitor
kind: documentation
aliases:
    - /guides/outliers
description: "Alert on members of a group behaving differently than the others"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Consult your monitor status"
---

Outlier Detection is an algorithmic feature that allows you to detect when some members of a group are behaving strangely compared to the others. For example, you could detect that one web server in a pool is processing an unusual number of requests, and hence should be a target for replacement. Or, you could get an early warning that significantly more 500s are happening in one AWS Availability Zone (AZ) than the others, which might indicate an issue brewing in that AZ.

{{< img src="monitors/monitor_types/outliers/outliers-metric-alert.png" alt="outliers metric alert" responsive="true" style="width:80%;">}}

## How to Use Outlier Detection on Your Data

The `outliers` query function, when applied to your query, returns the usual results but with outliers series marked.

You can use this function to display and alert on outliers in your data. To try it out, you'll first need a metric for which a group of hosts (or availability zones, partitions, etc) should exhibit uniform behavior. For the function to work, be sure that there are at least 3 or more members in the group. Given that, here are two ways to use outlier detection on that group.

### Show Outliers in Dashboards or Screenboards

Here's a graph of Gunicorn requests by host with outlier detection enabled.

{{< img src="monitors/monitor_types/outliers/outliers-graph-dbscan-gunicorn.png" alt="outliers graph dbscan Gunicorn" responsive="true" style="width:80%;">}}

You can see that one of the series is an outlier: it is handling significantly lower traffic than the others for the time window in question.

To set up an outlier detection graph for your data add a metric to the graph showing all series in the groups. Then apply the outlier detection algorithm by adding the `outliers` function on your data. After applying the function, any outlier series is colored with a bold, warm palette, while all other series are colored with a lightweight, greyscale color palette.

First create a new timeseries graph on your dashboard with your chosen metric.

{{< img src="monitors/monitor_types/outliers/outliers-dash-choose-metrics-updated.png" alt="outliers dash choose metrics updated" responsive="true" style="width:80%;">}}

To enable outlier detection, click on the `+` icon on the right side of the metrics line. Choose **Algorithms** from the function categories, then pick one of the four outlier algorithms.

{{< img src="monitors/monitor_types/outliers/outliers-algorithm-selector.png" alt="outliers algorithm selector" responsive="true" style="width:80%;">}}

This applies the outliers function to your graph, and you'll see any outliers in the group highlighted in bold, warm colors.

{{< img src="monitors/monitor_types/outliers/outliers-algorithm-annotated-newer.png" alt="outliers algorithm annotated newer" responsive="true" style="width:80%;">}}

There are several outlier detection algorithms you can choose. The default algorithm (DBSCAN) and parameter values should work for most scenarios. However, if you see too many or too few outliers identified, you can tune the algorithm or try an alternate algorithm. To learn more, see the "Outlier Algorithms and Parameters" section below.

### Alert on Outliers

You can also define a monitor to alert when an outlier is detected in an important group.

{{< img src="monitors/monitor_types/outliers/outliers-alert-snapshot.png" alt="outliers alert snapshot" responsive="true" style="width:80%;">}}

For example, to alert when a Cassandra host is abnormally loaded compared to the rest of the group, you can [add a new outlier monitor][1] for the metric.

Navigate to the [New Monitor][2] page and click **Outlier**. Then fill out the **Define the metric** section just as you would for any other monitor.

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-define-metric.png" alt="outliers new monitor define metric" responsive="true" style="width:80%;">}}

In the [alert conditions][3], select the grouping and timeframe. Then select an algorithm and parameter values to use for outlier detection.

{{< img src="monitors/monitor_types/outliers/outliers-newer-monitor-set-conditions.png" alt="outliers newer monitor set condition" responsive="true" style="width:80%;">}}

To ensure that your alert is properly calibrated, you can set the time window at the top of the screen and use the reverse (<<) button to look back in time for when outliers would have be found and alerted. This is also a good way to tune the parameters to the specific outliers algorithm you're using.

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-graph-calibrate.png" alt="outliers new monitor graph calibrate" responsive="true" style="width:80%;">}}

## Reference: Outlier Algorithms and Parameters

There are two different types of outlier detection algorithms you can use on your data: DBSCAN/ScaledDBSCAN and MAD/ScaledMAD. Datadog recommends starting with the default algorithm, DBSCAN. If you have trouble detecting the right outliers, you can adjust the parameters to DBSCAN or try the alternate algorithm, MAD. If you have metrics on a larger scale that look to be closely clustered but the DBSCAN/MAD algorithms are identifying some as outliers, try the scaled algorithms. Our [blog post on outlier detection][4] has more detailed information.

### DBSCAN

[DBSCAN][5] (density-based spatial clustering of applications with noise) is a popular clustering algorithm. Traditionally, DBSCAN takes: 1) a parameter 𝜀 that specifies a distance threshold under which two points are considered to be close; and 2) the minimum number of points that have to be within a point's 𝜀-radius before that point can start agglomerating. 

Datadog uses a simplified form of DBSCAN to detect outliers on timeseries. Datadog considers each host to be a point in *d*-dimensions, where *d* is the number of elements in the timeseries. Any point can agglomerate, and any point not in the largest cluster is considered an outlier. The initial distance threshold is set by creating a new median timeseries by taking the median of the values from the existing timeseries at every time point. The Euclidean distance between each host and the median series is calculated. The threshold is set as the median of these distances, multiplied by a normalizing constant.

This implementation of DBSCAN takes one parameter, `tolerance`, the constant by which the initial threshold is multiplied to yield DBSCAN's distance parameter 𝜀.

{{< img src="monitors/monitor_types/outliers/outliers-dbscan-config.png" alt="outliers dbscan configuration" responsive="true" style="width:80%;">}}

Here is DBSCAN with a tolerance of 3.0 in action on a pool of Cassandra workers:

{{< img src="monitors/monitor_types/outliers/outliers-dbscan-cassandra.png" alt="outliers dbscan cassandra" responsive="true" style="width:80%;">}}

Set the tolerance parameter according to how similarly you expect your hosts to behave—larger values allow for more tolerance in how much a host can deviate from its peers.

### MAD

The [Median Absolute Deviation][6](MAD) is a robust measure of variability, and can be viewed as the robust analog for standard deviation. Robust statistics describe data in such a way that they are not unduly influenced by outliers.

To use MAD for your outlier monitor, configure two parameters: 

- `tolerance`: which specifies how many "deviations" a point has to be away from the median for it to be considered an outlier
- `pct`: if more than this percentage of a particular series' points are considered outliers, then the whole series is marked to be an outlier.

{{< img src="monitors/monitor_types/outliers/outliers-mad-config.png" alt="outliers mad configuration" responsive="true" style="width:80%;">}}

Here is MAD with a tolerance of 3 and pct of 20 in action when comparing the average system load by availability zone:

{{< img src="monitors/monitor_types/outliers/outliers-mad-az.png" alt="outliers mad az" responsive="true" style="width:80%;">}}

The tolerance parameter should be tuned depending on the expected variability of the data. For example, if the data is generally within a small range of values, then this should be small. On the other hand, if points can vary greatly, then you want a higher scale so these variabilities do not trigger a false positive.

### DBSCAN vs. MAD

So which algorithm should you use? For most outliers, any algorithm performs well at the default settings. However, there are subtle cases where one algorithm is more appropriate.

In the following image, a group of hosts is flushing their buffers together, while one host is flushing its buffer slightly later. DBSCAN picks this up as an outlier whereas MAD does not. This is a case where you might prefer to use MAD, as you don't care about when the buffers get flushed.  

The synchronization of the group is just an artifact of the hosts being restarted at the same time. On the other hand, if instead of flushed buffers, the metrics below represented a scheduled job that actually should be synchronized across hosts, DBSCAN would be the right choice.

{{< img src="monitors/monitor_types/outliers/outliers-flushing.png" alt="outliers flushing" responsive="true" style="width:80%;">}}

#### Scaled vs. Regular Algorithms

DBSCAN and MAD have scaled versions, called ScaledDBSCAN and ScaledMAD, respectively. In most situations, the scaled algorithms behaves the same as their regular counterparts. However, if DBSCAN/MAD algorithms are identifying outliers within a closely clustered group of metrics, and you would like the outlier detection algorithm to scale with the overall magnitude of the metrics, try the scaled algorithms.

Here is a comparison of DBSCAN and ScaledDBSCAN with tolerances of 3 on field data size in a group of Elasticsearch nodes:

{{< img src="monitors/monitor_types/outliers/outliers-scaled-dbscan-es.png" alt="outliers scaled dbscan es" responsive="true" style="width:80%;">}}

Here is an example of MAD and ScaledMAD algorithms for comparing the usable memory in Cassandra hosts. Both have tolerances of 3 and pct of 20:

{{< img src="monitors/monitor_types/outliers/outliers-scaled-mad-cassandra.png" alt="outliers scaled mad Cassandra" responsive="true" style="width:80%;">}}

### Setting up alerts

When setting up an outlier alert, an important parameter is the size of the time window. If the window size is too large, by the time an outlier is detected, the bad behavior might have been going on for longer than one would like. If the window size is too short, the alerts are not as resilient to unimportant, one-off spikes.

Both algorithms are set up to identify outliers that differ from the majority of metrics that are behaving similarly. If your hosts exhibit "banding" behavior as shown below (perhaps because each band represents a different shard), we recommend tagging each band with an identifier, and setting up outlier detection alerts on each band separately.

{{< img src="monitors/monitor_types/outliers/outliers-banding.png" alt="outliers banding" responsive="true" style="width:80%;">}}

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/outlier
[2]: https://app.datadoghq.com/monitors#/create
[3]: /monitors/monitor_types/#define-the-conditions
[4]: https://www.datadoghq.com/blog/outlier-detection-algorithms-at-datadog
[5]: https://en.wikipedia.org/wiki/DBSCAN
[6]: https://en.wikipedia.org/wiki/Median_absolute_deviation
