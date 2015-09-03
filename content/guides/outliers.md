---
title: Outlier Detection
kind: documentation
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

Outlier Detection is a beta feature. It allows you to detect when some members of a group are behaving strangely compared to the others. For example, you could detect that one web server in a pool is processing an unusual number of requests, and hence should be a target for replacement. Or, you could get an early warning that significantly more 500s are happening in one AWS Availability Zone (AZ) than the others, which might indicate an issue brewing in that AZ.

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

<img src="/static/images/outliers/outliers-dash-choose-metrics.png" style="width:100%; border:1px solid #777777"/>

Now, click on the + icon (Add functions and modifiers) on the right side of the second metrics line. In the "Modify your query" box, choose the "outliers" filter function:

<img src="/static/images/outliers/outliers-function-selector.png" style="width:25%; border:1px solid #777777"/>

This will add the outliers function to your graph, and you’ll see any outliers in the group highlighted in bold, warm colors.

<img src="/static/images/outliers/outliers-algorithm-annotated.png" style="width:100%; border:1px solid #777777"/>

There are several outlier detection algorithms you can choose. The default algorithm (DBSCAN) and parameter values should work for most scenarios. However, if you see too many or too few outliers identified, you can tune the algorithm or try an alternate algorithm. To learn more, see the "Outlier Algorithms and Parameters" section below.


### 2. Alert on Outliers
{: #alerts}

You can also define a monitor to alert when an outlier is detected in an important group.

<img src="/static/images/outliers/outliers-alert-snapshot.png" style="width:100%; border:1px solid #777777"/>

For example, to alert when a Cassandra host is abnormally loaded compared to the rest of the group, we’d [add a new outlier monitor](https://app.datadoghq.com/monitors#create/algorithm) for our metric:

<img src="/static/images/outliers/outliers-new-monitor-define-metric.png" style="width:100%; border:1px solid #777777"/>

You will select the metric and scope as with other metric-based monitors.

In the alert conditions you will select the grouping and timeframe.

You can also optionally select an algorithm to use for outlier detection. By default we have chosen DBSCAN with an alpha value of 3 because this works for many cases. More information about the outlier functions and their parameters is available below.

<img src="/static/images/outliers/outliers-new-monitor-set-conditions.png" style="width:100%; border:1px solid #777777"/>

To ensure that your alert is properly calibrated, you can set the time window at the top of the screen and use the reverse (<<) button to look back in time for when outliers would have be found and alerted. This is also a good way to tune the parameters to the specific outliers algorithm you’re using.

<img src="/static/images/outliers/outliers-new-monitor-graph-calibrate.png" style="width:100%; border:1px solid #777777"/>

## Reference: Outlier Algorithms and Parameters
{: #algorithms}


There are two different outlier detection algorithms you can use on your data: DBSCAN and Median Absolute Deviation (MAD). We recommend starting with the default algorithm, DBSCAN. If you have trouble detecting the right outliers, you can adjust the parameters to DBSCAN or try the alternate algorithm, MAD. Explanation of each algorithm and its parameters follows.

### DBSCAN

[DBSCAN](https://en.wikipedia.org/wiki/DBSCAN) is a popular density-based clustering algorithm that greedily creates clusters by agglomerating points that are close to each other. Clusters with few points in them are considered outliers.

We use a simplified form of DBSCAN to detect outliers; any point that is not in the largest cluster will be considered an outlier. We consider each host to be a d-dimensional vector, where d is the number of values in the time series. Any hosts that are within a distance of `alpha x threshold` of each other will get clustered together.

The threshold is calculated as follows. We create a new median time series by taking the median of the values from the existing time series at every time point. Then we calculate the distance between each host and the median series. The threshold is the median of those distances.

In pseudocode:

~~~ python
    median_series = pointwise_median(series_list)
    dists = [dist(series,median_series) for series in series_list]
    threshold = median(dists)
~~~

#### Parameters

DBSCAN accepts the following parameters:

* **alpha** *(default: 3.0)*: Sets the constant by which the threshold is multiplied.

For example, to use DBSCAN with an alpha of 3 on system load for a pool of Cassandra workers, we'd use:

~~~  python
    outliers(avg:system.load.norm.15{role:cassandra} by {host}, 'dbscan', 3)
~~~

Given how the threshold is defined, setting alpha to 1.0 will always lead to half the hosts being classified as outliers. In practice we find that the threshold is robust enough that setting alpha to 3.0 or 4.0 is good enough to catch outliers without leading to false positives.

For the typical use case where all the hosts should be exhibiting similar behavior, there should not be much need to tune the parameter. However, if your hosts exhibit "banding" behavior as shown below, some tuning might be required.

The following graphs show a set of hosts where there are several distinct groups. A low setting of alpha marks both the host handling significantly less traffic and the group of hosts that are handling more traffic than the majority as outliers.

<img src="/static/images/outliers/outliers-dbscan-banding.png" style="width:100%; border:1px solid #777777"/>

Meanwhile a higher setting of alpha only identifies the host handling significantly less traffic as an outlier.

<img src="/static/images/outliers/outliers-dbscan-no-banding.png" style="width:100%; border:1px solid #777777"/>

### Median Absolute Deviation (MAD)

The [Median Absolute Deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation) (MAD) algorithm is a robust method of calculating variability among data. It is designed to be usable for both normal and non-normal distributions.

We use MAD to calculate an *outlier_factor* which we will compare to points from a series. If the percentage of points in the series that are above the *outlier_factor* is greater than some given threshold, then that series will be considered an outlier.

The calculation of the outlier_factor is as such:

~~~ python
    # Calculate the MAD across all series.
    series_values = flatten_series(series_list)
    median = median(all_values)
    deviations = abs(x - median for x in series_values)
    mad = median(deviations)

    # Outlier factor is calculated from the scale and standard error.
    # We divide by a normalization constant of 0.6745 to make the scale
    # 1.0, 2.0, 3.0 represent standard deviations for metrics drawn from a normal
    # distribution.
    outlier_factor = (scale * mad) / 0.6745
~~~

#### Parameters

MAD accepts the following parameters:

* **scale** *(default: 2)*: How the MAD should be scaled to calculate the outlier factor. This parameter is tuned depending on expected variability of the data. For example if data is generally within a small range of values then this should be small. On the other hand if points can vary greatly then you want a higher scale so these variabilities do not trigger a false positive.
* **pct** *(default: 10)*: The percentage of points from a series that are outside the *outlier_factor* for the whole series to be considered an outlier.

For example, to use MAD with a scale of 2 and a pct of 10 on system load for a pool of Cassandra workers, we'd use:

~~~  python
    outliers(avg:system.load.norm.15{role:cassandra} by {host}, 'mad', 2, 10)
~~~
