---
title: timeline view
core_product:
  - code profiling
---

A <a href="/profiler/profile_visualizations/#timeline_view">timeline view</a> is the equivalent of a flame graph, with a distribution over time. 

Each lane represents a **thread** (or a **goroutine** for Go applications). In contrast to the flame graph, you can use the timeline view to:
- Isolate spiky methods
- Investigate complex interactions between threads
- Surface runtime activity impacting the process