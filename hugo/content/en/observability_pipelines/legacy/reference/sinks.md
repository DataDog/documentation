---
title: Sinks
legacy: true
aliases:
  - /observability_pipelines/reference/sinks/
---

A sink is a destination for events. Each sink's design and transmission method is determined by the downstream service with which it interacts. For example, the `socket` sink streams individual events, while the `aws_s3` sink buffers and flushes data.
