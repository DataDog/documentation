---
title: Should I use anomaly detection for everything?
kind: faq
customnav: monitornav
---

No. Anomaly detection is designed to assist with visualizing and monitoring metrics that have predictable patterns. For example, `my_site.page_views{*}` might be driven by user traffic and thus vary predictably by time of day and day of week. If your metric does not have any sort of repeated/predictable pattern, then a simple chart overlay or threshold alert might be better than anomaly detection.

Also, anomaly detection requires historical data to make good predictions. If you have only been collecting a metric for a few hours or a few days, anomaly detection probably won't be very useful.

Take care when creating multi-alerts. A metric such as `service.requests_served{*}` could be a good candidate for anomaly detection, but `service.requests_served{*} by {host}`is probably not. If your hosts are load-balanced, then an [outlier monitor](/monitors/monitor_types/outlier/) will be better for detecting hosts that are behaving abnormally. If your service scales up, each new host won’t be monitored at all until there is a minimum amount of history for anomaly detection to kick in, and even then alerts might be noisy due to instability in the number of requests handled by those hosts.