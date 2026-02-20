---
title: Scaling and Performance
disable_toc: false
---

As you scale your Observability Pipelines architecture to cover your different use cases:

- If you want to run multiple pipelines on a host so that you can send data from different sources, follow the instructions in [Run Multiple Pipelines on a Host][1].
- Observability Pipelines uses backpressure signals and buffering to handle situations where the system cannot process events immediately upon receiving them. See [Handling Load and Backpressure][2] for more information.
- When you scale Observability Pipelines Workers, each Worker operates independently. See [Best Practices for Scaling Pipelines][3] for the recommended aggregator architecture.

[1]: /observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
[2]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/
[3]: /observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/
