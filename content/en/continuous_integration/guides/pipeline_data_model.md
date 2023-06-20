---
title: Pipeline Data Model And Execution Types 
kind: guide
description: Learn how Pipelines are modeled and what execution types are supported by CI Visibility
---

## Data Model

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

Pipeline executions are modeled as traces, similar to an [APM distributed trace][1], where spans represent the execution of different parts of the pipeline. The CI Visibility data model for representing pipeline executions consists of four levels:

| Level Name | Description |
| ---------- | ----------- |
| Pipeline   | The top-level root span that contains all other levels as children. It represents the overall execution of a pipeline from start to finish. This level is sometimes called build or workflow in some CI providers. |
| Stage      | Serves as a grouping of jobs under a user-defined name. Many CI providers do not have this level. |
| Job        | The smallest unit of work where commands are executed. All tasks at this level should be performed on a single node. |
| Step       | In some CI providers, this level represents a shell script or an action executed within a job. |

When a pipeline, stage, job, or step finishes, its execution data should be sent to Datadog. See the list of [supported CI providers][2] to set up your pipeline visibility. If your CI provider or workflow is not supported, you can use the [public API endpoint][3] to send your pipeline executions to CI Visibility.

{{< img src="ci/ci-pipeline-execution.png" alt="Example of a pipeline execution trace" style="width:100%;">}}

### Pipeline Unique IDs

All pipeline executions within a level must have a unique identifier. Providing repeated IDs will result in undefined behavior in CI Visibility.

## Pipeline Execution Types

### Normal Run

The normal run of a pipeline execution follows the flow depicted below:

{{< img src="ci/ci-pipeline-normal-execution-flow.png" alt="Depiction of a normal pipeline execution" style="width:100%;">}}

Note that depending on the provider, some levels may be missing. For example, stages might not exist, and jobs may run in parallel or sequence, or a combination of both.

After the completion of each component, a payload must be sent to Datadog with all the necessary data to represent the execution. Datadog will process this data, store it as pipeline events, and display it as traces in the CI Visibility product.

### Full Retries

Full retries of a pipeline must have different pipeline unique IDs. 

In the public API endpoint, you can populate the `previous_attempt` field to link to previous retries. Retries will be treated as separate pipeline executions in Datadog, and the start and end time should only encompass that retry.

### Partial Retries

When retrying a subset of jobs within a pipeline, you must send a new pipeline event with a new pipeline unique ID, and the payload for any new jobs must be linked to the new pipeline unique ID. To link them to the previous retry, you can provide the `previous_attempt` field. Partial retries will be treated as separate pipelines as well. The start and end time must not include the time of the original retry. For a partial retry, do not send payloads for jobs that ran in the previous attempt. Also, set the `partial_retry` field to `true` on partial retries to exclude them from aggregation when calculating run times.

For example, a pipeline named `P` has three different jobs, namely `J1`, `J2`, and `J3`, executed sequentially. In the first run of `P`, only `J1` and `J2` are executed, and `J2` fails. Therefore, you need to send a total of three payloads:

1. Job payload for `J1`, with ID `J1_1` and pipeline ID `P_1`.
2. Job payload for `J2`, with ID `J2_1` and pipeline ID `P_1`.
3. Pipeline payload for `P`, with ID `P_1`.

Now, suppose there is a partial retry of the pipeline starting from `J2`, where all the remaining jobs succeed. You need to send three additional payloads:

1. Job payload for `J2`, with ID `J2_2` and pipeline ID `P_2`.
2. Job payload for `J3`, with ID `J3_1` and pipeline ID `P_2`.
3. Pipeline payload for `P`, with ID `P_2`.

The actual values of the IDs are not important. What matters is that they are correctly modified based on the pipeline run, as specified in the paragraph above.

### Blocked Pipelines

If a pipeline is indefinitely blocked due to requiring manual intervention, a pipeline event payload must be sent as soon as the pipeline reaches the blocked state. The pipeline status must be set to `blocked`. The remaining pipeline data must be sent in separate payloads with a different pipeline unique ID. This second pipeline should have `is_resumed` set to `true`.

{{< img src="ci/ci-pipeline-blocked-pipelines-execution.png" alt="Flow of a blocked pipeline execution" style="width:90%;">}}

### Downstream Pipelines

If a pipeline is triggered as a child of another pipeline, the `parent_pipeline` field should be populated with details of the parent pipeline.

### Manual Pipelines

If a pipeline is triggered manually, the `is_manual` field must be set to true.

## Git Information

Payloads must contain Git information as specified in the public API endpoint [specification][3], if it can be retrieved.

In cases where Git information is not accessible (for example, if the CI provider cannot access the Git information on manually triggered pipelines), the `user` field can be populated instead with the user name and email.

[1]: /tracing/glossary/#trace
[2]: /continuous_integration/pipelines/#setup
[3]: /api/latest/ci-visibility-pipelines/#send-pipeline-event