---
core_product:
- ci-cd
title: pipeline execution time
---
Pipeline execution time is the amount of time a pipeline has been actively running jobs.
For example, consider a pipeline with 3 jobs: A, B, and C. During the first minute both A and B are running, so that minute counts towards execution time. The next 30 seconds, A stops while B is still running, so that time also counts. Then, there is a gap until C starts running, so the execution time is not increased during this period since there are no jobs running. Finally, C runs for 15 seconds. The final execution time calculation is 1m30s + 15s = 1m30s.

This metric is available at the pipeline level only under the name `@ci.execution_time`.