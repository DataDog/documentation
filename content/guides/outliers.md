---
title: Outlier Detection
kind: guide
listorder: 16
sidebar:
  nav:
    - header: Outlier Detection
    - text: Show Outliers in Dashboards
      href: "#dashboards"
    - text: Alert on Outliers
      href: "#alerts"
    - text: Algorithms & Parameters
      href: "#algorithms"
---

Outlier Detection is an algorithmic feature that allows you to detect when some members of a group are behaving strangely compared to the others. For example, you could detect that one web server in a pool is processing an unusual number of requests, and hence should be a target for replacement. Or, you could get an early warning that significantly more 500s are happening in one AWS Availability Zone (AZ) than the others, which might indicate an issue brewing in that AZ.

<img src="/static/images/outliers/outliers-metric-alert.png" style="width:100%; border:1px solid #777777"/>

## How to Use Outlier Detection on Your Data

We’ve added a new query function called `outliers` to our query language. This function will return the usual results but outlier series will be marked.

You can use this function to display and alert on outliers in your data. To try it out, you’ll first need a metric for which a group of hosts (or availability zones, partitions, etc) should exhibit uniform behavior. For the function to work, be sure that there are at least 3 or more members in the group. Given that, here are two ways to use outlier detection on that group.


### 1. Show Outliers in Dashboards or Screenboards
{: #dashboards}

For example, here is a graph of gunicorn requests by host with outlier detection enabled:

<img src="/static/images/outliers/outliers-graph-dbscan-gunicorn.png" style="width:100%; border:1px solid #777777"/>

You can see that one of the series is an outlier: it is handling significantly lower traffic than the others for the time window in question.

To set up an outlier detection graph for your data you add a metric to the graph showing all series in the groups. You apply the outlier detection algorithm by adding `outliers` function on your data. After applying the function, outlier series will be colored with a bold, warm palette, while all other series will be colored with a lightweight, greyscale color palette.

To do so, create a new timeseries graph on your dashboard with your chosen metric. Your screen should look like:

<img src="/static/images/outliers/outliers-dash-choose-metrics-newer.png" style="width:100%; border:1px solid #777777"/>

Now, click on the + icon (Add functions and modifiers) on the right side of the second metrics line. In the "Modify your query" box, choose the "outliers" function:

<img src="/static/images/outliers/outliers-function-selector-newer.png" style="width:25%; border:1px solid #777777"/>

This will add the outliers function to your graph, and you’ll see any outliers in the group highlighted in bold, warm colors.

<img src="/static/images/outliers/outliers-algorithm-annotated-newer.png" style="width:100%; border:1px solid #777777"/>

There are several outlier detection algorithms you can choose. The default algorithm (DBSCAN) and parameter values should work for most scenarios. However, if you see too many or too few outliers identified, you can tune the algorithm or try an alternate algorithm. To learn more, see the "Outlier Algorithms and Parameters" section below.


### 2. Alert on Outliers
{: #alerts}

You can also define a monitor to alert when an outlier is detected in an important group.

<img src="/static/images/outliers/outliers-alert-snapshot.png" style="width:100%; border:1px solid #777777"/>

For example, to alert when a Cassandra host is abnormally loaded compared to the rest of the group, we’d [add a new outlier monitor](https://app.datadoghq.com/monitors#create/algorithm) for our metric:

<img src="/static/images/outliers/outliers-new-monitor-define-metric.png" style="width:100%; border:1px solid #777777"/>

You will select the metric and scope as with other metric-based monitors.

In the alert conditions you will select the grouping and timeframe.

You can also optionally select an algorithm to use for outlier detection. By default we have chosen DBSCAN with a tolerance value of 3 because this works for many cases. More information about the outlier functions and their parameters is available below.

<img src="/static/images/outliers/outliers-newer-monitor-set-conditions.png" style="width:100%; border:1px solid #777777"/>

To ensure that your alert is properly calibrated, you can set the time window at the top of the screen and use the reverse (<<) button to look back in time for when outliers would have be found and alerted. This is also a good way to tune the parameters to the specific outliers algorithm you’re using.

<img src="/static/images/outliers/outliers-new-monitor-graph-calibrate.png" style="width:100%; border:1px solid #777777"/>

## Reference: Outlier Algorithms and Parameters
{: #algorithms}


There are two different outlier detection algorithms you can use on your data: DBSCAN and Median Absolute Deviation (MAD). We recommend starting with the default algorithm, DBSCAN. If you have trouble detecting the right outliers, you can adjust the parameters to DBSCAN or try the alternate algorithm, MAD. Explanation of each algorithm and its parameters follows.

### DBSCAN

A natural way to group together hosts that are behaving similarly is to use a clustering algorithm. We use [DBSCAN](https://en.wikipedia.org/wiki/DBSCAN), a popular density-based clustering algorithm, for this purpose. DBSCAN works by greedily agglomerating points that are close to each other. Clusters with few points in them are considered outliers.

Traditionally, DBSCAN takes: 1) a parameter 𝜀 that specifies a distance threshold under which two points are considered to be close; and 2) the minimum number of points that have to be within a point’s 𝜀-radius before that point can start agglomerating. The image below shows an example of DBSCAN in action on points in the plane. There are two clusters. The large points had enough close neighbors to agglomerate those points, while the small colored points did no agglomerating themselves but are within the 𝜀-radius of a large point. The points in black are the outliers.

<img src="/static/images/outliers/outliers-dbscan-2d.png" style="width:100%; border:1px solid #777777"/>

#### Parameters

We use a simplified form of DBSCAN to detect outliers on time series. We consider each host to be a point in d-dimensions, where d is the number of elements in the time series. Any point can agglomerate, and any point that is not in the largest cluster will be considered an outlier.

We set the initial distance threshold as follows. We create a new median time series by taking the median of the values from the existing time series at every time point. Then we calculate the (Euclidean) distance between each host and the median series. The threshold is the median of those distances, multiplied by a normalizing constant

The only parameter we take is `tolerance`, the constant by which the initial threshold is multiplied to yield DBSCAN’s distance parameter 𝜀. Here is DBSCAN with a tolerance of 3.0 in action on a pool of Cassandra workers:

<img src="/static/images/outliers/outliers-dbscan-cassandra.png" style="width:100%; border:1px solid #777777"/>

You should set the tolerance parameter depending on how similarly you expect your group of hosts to behave—larger values allow for more tolerance in how much a host can deviate from its peers.

### Median Absolute Deviation (MAD)

The  [Median Absolute Deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation) is a robust measure of variability, and can be viewed as the robust analog for standard deviation. Robust statistics describe data in such a way that they are not unduly influenced by outliers.

For a given set of data D = {d<sub>1</sub>, ..., d<sub>n</sub>}, the deviations are the difference between each d<sub>i</sub> and median(D). The MAD is then the median of the absolute values of all the deviations. For example if D = {1, 2, 3, 4, 5, 6, 100}, then the median is 4, the deviations are {-3, -2, -1, 0, 1, 2, 96}, and the MAD is 2. (Note that the standard deviation by contrast is 33.8.)

#### Parameters

In our case, the data set is the set of all points in every time series. We take the MAD of all the points then multiply it by a normalizing constant and our first parameter, `tolerance`. The constant normalizes MAD so that it is comparable to the standard deviation of the normal distribution. The tolerance parameter then specifies how many “deviations” a point has to be away from the median for it to be considered an outlier.

Now to mark a time series as an outlier, we use the second parameter, `pct`. If more than pct% of a particular series’ points are considered outliers, then the whole series is marked to be an outlier. Here is MAD with a tolerance of 3 and pct of 20 in action when comparing the average system load by availability zone:

<img src="/static/images/outliers/outliers-mad-az.png" style="width:100%; border:1px solid #777777"/>

The tolerance parameter should be tuned depending on the expected variability of the data. For example, if the data is generally within a small range of values, then this should be small. On the other hand, if points can vary greatly, then you want a higher scale so these variabilities do not trigger a false positive.

### DBSCAN vs. MAD

So which algorithm should you use? For most outliers, both algorithms will perform well at the default settings. However, there are subtle cases where one algorithm is more appropriate than the other.

In the following image, we see a group of hosts flushing their buffers together while one host is flushing its buffer slightly later. DBSCAN picks this up as an outlier whereas MAD does not. This is a case where we would prefer to use MAD, as we don’t care about when the buffers get flushed. The synchronicity of the group is just an artifact of the hosts being restarted at the same time. On the other hand, if instead of flushed buffers, the metrics below represented a scheduled job that actually should be synchronized across hosts, DBSCAN would be the right choice.

<img src="/static/images/outliers/outliers-flushing.png" style="width:100%; border:1px solid #777777"/>

### Setting up alerts

When setting up an outlier alert, an important parameter is the size of the time window. If the window size is too large, by the time an outlier is detected, the bad behavior might have been going on for longer than one would like. If the window size is too short, the alerts will not be as resilient to unimportant, one-off spikes.

Both algorithms are set up to identify outliers that differ from the majority of metrics that are behaving similarly. If your hosts exhibit “banding” behavior as shown below (perhaps because each band represents a different shard), we recommend tagging each band with an identifier, and setting up outlier detection alerts on each band separately.

<img src="/static/images/outliers/outliers-banding.png" style="width:100%; border:1px solid #777777"/>
