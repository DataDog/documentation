---
title: Anomaly Detection (BETA)
kind: documentation
sidebar:
  nav:
    - header: Anomaly Detection
    - text: Visualize Anomalies in Dashboards
      href: "#dashboards"
    - text: Alert on Anomalies
      href: "#alerts"
---

Anomaly detection is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account day-of-week and time-of-day patterns. It's well suited for metrics with recurring patterns that are hard or impossible to monitor with threshold-based alerting. For example, anomaly detection can help you discover when your web traffic is unusually low on a weekday afternoon - even though that same level of traffic would be perfectly normal later in the evening.

## How to Use Anomaly Detection on Your Data

We've added a new query function called `anomalies` to our query language. When you apply this function to series, it returns the usual results along with an expected "normal" range.

Keep in mind that `anomalies` uses the past to predict what is expected in the future, so using `anomalies` on a new metric, for which you have just started collecting data, may yield poor results.

### 1. Visualize Anomalies in Dashboards
{: #dashboards}

The chart below shows a dashboard chart that uses anomaly detection. The grey band represents the region where the metric is expected to be based on past behavior. The blue and red line is the actual observed value of the metric; the line is blue when within the expected range and red when it is outside of the expected range.

<img src="/static/images/anomalies/dashboard_graph.png" style="width:100%; border:1px solid #777777"/>

To create an anomaly detection graph, start by adding a timeseries graph to your dashboard. As shown below, be sure to select "Timeseries" as the visualization type and select "lines" from the Display menu. Other visualization types do not yet support anomaly detection. In the chart editor window, you should see something like this:

<img src="/static/images/anomalies/initial_editor.png" style="width:100%; border:1px solid #777777"/>

Now, click on the + icon (Add functions and modifiers) on the right side of your expression. In the “Modify your query” box, choose the “anomalies” function:

<img src="/static/images/anomalies/function_menu.png" style="width:225px; border:1px solid #777777"/>

This will add anomaly detection to your expression, and you should immediately see the preview update to include the grey band. The function has two parameters. The first parameter is for selecting which algorithm will be used. The second parameter is labeled `bounds`, and you can tune this to change the width of the grey band. After successfully adding `anomalies`, your editor should show something like this:

<img src="/static/images/anomalies/final_editor.png" style="width:100%; border:1px solid #777777"/>

### 2. Alert on Anomalies
{: #alerts}

In addition to viewing anomalies in dashboards, you may create monitors that trigger when metrics behave anomalously.

Start by navigating to the [New Monitor](https://app.datadoghq.com/monitors#/create) page and selecting Metric. Define the metric in step (1) just like you would for any other metric alert. In step (2), select "Anomaly Alert".

<img src="/static/images/anomalies/monitor_options.png" style="width:100%; border:1px solid #777777"/>

You should now see something like what's shown above, with a handful of selections that will help determine how sensitive you monitor is to different types of anomalies.

<ol type="a">
  <li>This number is equivalent to the <code>bounds</code> parameter used in the <code>anomalies</code> function in dashboards; it controls the width of the grey band.</li>
  <li>The "average distance" option will result in the monitor triggering faster for anomalies far outside of the expected band than for anomalies closer to the expected band. (Thresholds between 2 and 3 generally perform well.) The "percentage" option treats all observations outside of the expected band equally. </li>
  <li>If you only care about unusually high or unusually low values, you can choose to only alert on values above or below the bounds.</li>
  <li>As with other alerts, smaller time windows lead to faster alerting but can yield more false positives.</li>
  <li>You can change the anomaly detection algorithm used here.</li>
</ol>

Continue with steps (3) and (4) as you would for any other monitor.


### 3. Anomaly Detection Algorithms

We currently offer two different anomaly detection algorithms. Both algorithms will follow the seasonal pattern of the series, and
will not have their predictions be affected by short anomalies.

* Robust: This algorithm is very stable and its predictions will remain constant even through longer-term anomalies. On the other hand, it will take longer to respond to intended level shifts (e.g., if the level of a metric shifts due to a code change.) This algorithm uses more data and can take longer to load the first time it is run.

* Adaptive: This algorithm is more dynamic and will adjust its predictions to a metric's changes much more readily. On the other hand, it can be prone to following a metric too closely, which could lead to false negatives.
