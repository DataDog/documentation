---
title: Why can't I use anomaly detection over groups in the dashboard?
kind: faq
customnav: monitornav
---

Looking at many separate timeseries in a single graph can lead to [spaghettification](https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101/), and the problem gets only worse once the anomaly detection visualization is added in.

{{< img src="monitors/monitor_types/anomaly/spaghetti.png" alt="spaghetti" responsive="true">}}

You can, however, add multiple series in a single graph one at a time. The gray envelope will only show up on mouseover.

{{< img src="monitors/monitor_types/anomaly/anomaly_multilines.png" alt="anomaly multilines" responsive="true">}}