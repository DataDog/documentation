---
title: pipeline execution time
core_product:
  - ci-cd
---
Pipeline execution time is the amount of time a pipeline has been running jobs.
For example, consider a pipeline with 3 jobs: A, B, and C. During the first two minutes both A and B are running, so those two minutes count towards execution time. The next 30 seconds, A stops while B is still running, so that time also counts. Then, there is a gap until C starts running, so the execution time is not increased during this period since there are no jobs running. Finally, C runs for one minute. The final execution time calculation is 2m30s + 1m = 3m30s.

This metric is available at the pipeline level only under the name `ci.execution_time`.
