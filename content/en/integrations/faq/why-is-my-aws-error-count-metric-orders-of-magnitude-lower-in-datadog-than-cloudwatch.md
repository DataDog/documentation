---
title: Why is my AWS error count metric orders of magnitude lower in Datadog than Cloudwatch?
kind: faq
---

An error count metric provided to Datadog from Cloudwatch is a number of errors per minute. Because all Datadog metrics are stored at a 1s resolution, we divide this by 60 during our post-processing.

To get closer to the value you are expecting, you can append .as_count() * 60 to your query. Note that you may not see the exact numbers you see on Cloudwatch, because Cloudwatch only makes data available every 5-10 minutes, and our AWS crawler runs every 5 minutes.

