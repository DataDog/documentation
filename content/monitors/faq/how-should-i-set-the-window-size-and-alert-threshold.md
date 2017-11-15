---
title: How should I set the window size and alert threshold?
kind: faq
customnav: monitornav
---

Smaller window sizes will lead to faster alerts, however, with very small windows (<= 10 minutes), metrics often appear noisy, making it difficult to visualize the difference between anomalies and noise.

Note that setting the window size to X minutes doesn't require an anomaly to last X minutes before an alert is triggered. You can tune the threshold to control how long an anomaly must last to trigger an alert. For example, with the window size set to 30 minutes, you can get alerted when an anomaly lasts for just five minutes by setting the threshold to 5/30 = 17%. That said, we have found that anomaly alerts are most reliable when the window size is between 15 minutes and an hour and the threshold is on the higher side (> 40%).