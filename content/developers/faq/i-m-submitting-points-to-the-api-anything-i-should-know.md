---
title: I'm submitting points to the API- anything I should know?
kind: faq
customnav: developersnav
---

We store metric points at the 1 second resolution, but we’d prefer if you only
submitted points every 15 seconds. Any metrics with fractions of a second timestamps will get rounded to the nearest second, and if any points have the same timestamp, the latest point will overwrite the previous ones.

We have a soft limit of 100 time series per host, where a time series is
defined as a unique combination of metric name and tag.