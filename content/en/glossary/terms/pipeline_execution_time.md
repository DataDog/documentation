---
title: pipeline execution time
core_product:
  - ci-cd
---
Pipeline execution time is the amount of time a pipeline has been running jobs. For example:

{{< img src="ci/ci-execution-time-example.png" style="width:75%;" alt="Pipeline execution time" >}}

In this case the execution time would be 3 minutes 30 seconds. The pipeline has 3 jobs: Job A, B and C.  The first 2 minutes both A and B are running so it counts towards execution time. The next 30 seconds B is still running so it also counts. Then, there is a gap until C starts running so the execution time is not increased during this period since there are no jobs running. Finally, C takes a minute, making the execution time a total of: 2m30s + 1m = 3m30s.

This metric is available at pipeline level only under the name `ci.execution_time`.
