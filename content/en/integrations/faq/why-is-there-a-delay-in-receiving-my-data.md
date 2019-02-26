---
title: Why is there a delay in receiving my data?
kind: faq
---

If you receive 5-minute metrics from CloudWatch, there can be up to ~15-20 min delay in receiving your metrics. This is because CloudWatch makes your data available with a 5-10 minute latency, and we run the crawler every 10 minutes.

In addition, queuing and CloudWatch API limitations can add up to another 5 minutes. If you receive 1-minute metrics with CloudWatch, then their availability delay is about 2 minutes so total latency to view your metrics may be ~12-15 minutes.

