---
title: Scaling and Performance
disable_toc: false
---

See [Advanced Worker Configuration][1] for information on bootstrapping options and how to enable the liveness and readiness probe.

If you want to run multiple pipelines on a host so that you can send logs from different sources, follow the instructions in [Run Multiple Pipelines on a Host][2].

Observability Pipelines uses backpressure signals and buffering to handle situations where the system cannot process events immediately upon receiving them. See [Handling Load and Backpressure][3] for more information.

When you scale Observability Pipelines Workers, each Worker operates independently. See [Best Practices for Scaling Pipelines][4] for the recommended aggregator architecture.

[1]: /observability_pipelines/scaling_and_performance/advanced_worker_configurations/
[2]: /observability_pipelines/scaling_and_performance/run_multiple_pipelines_on_a_host/
[3]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/
[4]: /observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/
