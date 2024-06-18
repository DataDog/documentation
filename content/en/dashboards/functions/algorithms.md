---
title: Algorithms
algolia:
  tags: ['anomaly', 'anomaly graph']
aliases:
    - /graphing/functions/algorithms/
---

## Anomalies

| Function      | Description                                                                                | Example                                                    |
| :----         | :-------                                                                                   | :---------                                                 |
| `anomalies()` | Overlay a gray band on the metric showing the expected behavior of a series based on past. | `anomalies(<METRIC_NAME>{*}, '<ALGORITHM>', <BOUNDS>)` |

The `anomalies()` function has two parameters:

* `ALGORITHM`: Methodology used to detect anomalies.
* `BOUNDS`: Width of the gray band. `bounds` can be interpreted as the standard deviations for your algorithm; a value of 2 or 3 should be large enough to include most "normal" points.

**Note**: If you are using the agile or robust anomaly detection algorithms with weekly or daily seasonality, you can update your anomaly detection monitor to account for a local timezone using both the API and the UI.

Here's a two-minute video walkthrough:

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/188833506/rendition/1080p/file.mp4?loc=external&signature=96eacc46a18438ce0f45d5b57952cd924482f8f18e011ceb7b76b6ce1b4587a2" poster="/images/poster/algorithms.png" >}}

**Seasonality**: By default, the `robust` and `agile` algorithms use [weekly seasonality][4], which requires three weeks of historical data to compute the baseline.

See the [Anomaly Monitor][1] page for more info.

## Outliers

| Function     | Description                | Example                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `outliers()` | Highlight outliers series. | `outliers(<METRIC_NAME>{*}, '<ALGORITHM>', <TOLERANCE>, <PERCENTAGE>)` |

The `outliers()` function has three parameters:

* `ALGORITHM`: The outliers algorithm to use.
* `TOLERANCE`: The tolerance of the outliers algorithm.
* `PERCENTAGE`: The percentage of outlying points required to mark a series as an outlier (available only for MAD and scaledMAD algorithms)

{{< img src="dashboards/functions/algorithms/outlier.mp4" alt="outlier detection" video="true" width="70%" >}}

See the [Outlier Monitor][2] page for more info.

## Forecast

| Function     | Description                | Example                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `forecast()`  | Predicts where a metric is heading in the future. | `forecast(<METRIC_NAME>{*}, '<ALGORITHM>', <DEVIATIONS>)` |

The `forecast()` function has two parameters:

* `ALGORITHM`: The forecasting algorithm to use - select `linear` or `seasonal`. For more information about these algorithms, see the [Forecast Algorithms][3] section.
* `DEVIATIONS`: The width of the range of forecasted values. A value of 1 or 2 should be large enough to forecast most "normal" points accurately.

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /monitors/types/anomaly/
[2]: /monitors/types/outlier/
[3]: /monitors/types/forecasts/?tab=linear#algorithms
[4]: /monitors/types/anomaly/?s=anomaly%20algorithm#seasonality
