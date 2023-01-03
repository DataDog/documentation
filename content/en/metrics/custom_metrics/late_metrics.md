---
title: Late Metrics
kind: documentation
aliases:
  - /guides/metrics/late_metrics
  - /developers/metrics/custom_metrics/late_metrics
  - /getting_started/custom_metrics/late_metrics
  - /developers/metrics/late_metrics
further_reading:
- link: "/developers/dogstatsd/"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "/developers/community/libraries/"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
---

## Overview

Traditionally, Datadog has not accepted any metric submissions that contain timestamps that were older than one hour from realtime. 

(this is to ensure points are processed in order). However, as more companies adopt hybrid cloud solutions, the demand for Datadog to support late metrics data ingestion has grown. 
