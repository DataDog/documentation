---
title: pipeline breakdown execution time
core_product:
  - ci-cd
---
For the CI jobs on the critical path, the total amount of time dedicated to executing tasks.

The sum of all the pipeline breakdown metrics is equal to the pipeline duration (`@duration`).

Note that this metric is different from the overall [pipeline execution time][1] since this metric only takes into account the jobs on the critical path, while the overall pipeline execution time includes all jobs in the pipeline.

Tag: `@ci.pipeline.critical_path.execution_time`.

[1]: /glossary/#pipeline-execution-time
