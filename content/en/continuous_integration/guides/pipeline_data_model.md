---
title: Pipeline Data Model And Execution Types 
description: Learn how Pipelines are modeled and what execution types are supported by CI Visibility.
further_reading:
  - link: "/continuous_integration/pipelines"
    tag: "Documentation"
    text: "Learn about Pipeline Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

This guide describes how to programmatically set up pipeline executions in CI Visibility and defines the types of pipeline execution that CI Visibility supports. 

This guide applies to pipelines created using the [public CI Visibility Pipelines API][3]. Integrations with other CI providers may vary.

## Data model

Pipeline executions are modeled as traces, similar to an [APM distributed trace][1], where spans represent the execution of different parts of the pipeline. The CI Visibility data model for representing pipeline executions consists of four levels:

| Level Name | Description |
| ---------- | ----------- |
| Pipeline (required)  | The top-level root span that contains all other levels as children. It represents the overall execution of a pipeline from start to finish. This level is sometimes called `build` or `workflow` in some CI providers. |
| Stage      | Serves as a grouping of jobs under a user-defined name. Some CI providers do not have this level. |
| Job        | The smallest unit of work where commands are executed. All tasks at this level should be performed on a single node. |
| Step       | In some CI providers, this level represents a shell script or an action executed within a job. |

When a pipeline, stage, job, or step finishes, execution data is sent to Datadog. To set up Pipeline Visibility, see the list of [supported CI providers][2]. If your CI provider or workflow is not supported, you can use the [public API endpoint][3] to send your pipeline executions to CI Visibility.

{{< img src="ci/ci-pipeline-execution.png" alt="Example of a pipeline execution trace" style="width:100%;">}}

Stages, jobs, and steps are expected to have the exact same pipeline name as their parent pipeline. In the case of a mismatch, some pipelines may be missing stage, job, and step information. For example, missing jobs in the job summary tables.

### Pipeline unique IDs

All pipeline executions within a level must have an unique identifier. For example, a pipeline and a job may have the same unique ID, but not two pipelines.

When sending repeated IDs with different timestamps, the user interface may exhibit undesirable behavior. For example, flame graphs may display span tags from a different pipeline execution. If duplicate IDs with the same timestamps are sent, only the values of the last pipeline execution received are stored.

## Pipeline execution types

### Normal run

The normal run of a pipeline execution follows the flow depicted below:

{{< img src="ci/pipeline-normal-execution-flow.png" alt="Depiction of a normal pipeline execution" style="width:100%;">}}

Depending on the provider, some levels may be missing. For example, stages may not exist, and jobs may run in parallel or sequence, or a combination of both.

After the completion of each component, a payload must be sent to Datadog with all the necessary data to represent the execution. Datadog processes this data, stores it as a pipeline event, and displays it in [CI Visibility][2]. Pipeline executions must end before sending them to Datadog.

### Full retries

Full retries of a pipeline must have different pipeline unique IDs. 

In the public API endpoint, you can populate the `previous_attempt` field to link to previous retries. Retries are treated as separate pipeline executions in Datadog, and the start and end time should only encompass that retry.

### Partial retries

When retrying a subset of jobs within a pipeline, you must send a new pipeline event with a new pipeline unique ID. The payload for any new jobs must be linked to the new pipeline unique ID. To link them to the previous retry, add the `previous_attempt` field. 

Partial retries are treated as separate pipelines as well. The start and end time must not include the time of the original retry. For a partial retry, do not send payloads for jobs that ran in the previous attempt. Also, set the `partial_retry` field to `true` on partial retries to exclude them from aggregation when calculating run times.

For example, a pipeline named `P` has three different jobs, namely `J1`, `J2`, and `J3`, executed sequentially. In the first run of `P`, only `J1` and `J2` are executed, and `J2` fails. 

Therefore, you need to send a total of three payloads:

1. Job payload for `J1`, with ID `J1_1` and pipeline ID `P_1`.
2. Job payload for `J2`, with ID `J2_1` and pipeline ID `P_1`.
3. Pipeline payload for `P`, with ID `P_1`.

Suppose there is a partial retry of the pipeline starting from `J2`, where all the remaining jobs succeed. 

You need to send three additional payloads:

1. Job payload for `J2`, with ID `J2_2` and pipeline ID `P_2`.
2. Job payload for `J3`, with ID `J3_1` and pipeline ID `P_2`.
3. Pipeline payload for `P`, with ID `P_2`.

The actual values of the IDs are not important. What matters is that they are correctly modified based on the pipeline run as specified above.

### Blocked pipelines

If a pipeline is indefinitely blocked due to requiring manual intervention, a pipeline event payload must be sent as soon as the pipeline reaches the blocked state. The pipeline status must be set to `blocked`. 

{{< img src="ci/pipeline-blocked-pipeline-execution.png" alt="Flow of a blocked pipeline execution" style="width:100%;">}}

The remaining pipeline data must be sent in separate payloads with a different pipeline unique ID. In the second pipeline, you can set `is_resumed` to `true` to signal that the execution was resumed from a blocked pipeline.

### Downstream pipelines

If a pipeline is triggered as a child of another pipeline, the `parent_pipeline` field should be populated with details of the parent pipeline.

### Manual pipelines

If a pipeline is triggered manually, the `is_manual` field must be set to true.

## Git information

Providing Git information of the commit that triggered the pipeline execution is strongly encouraged. Pipeline executions without Git information don't appear on the [Recent Code Changes page][4]. At a minimum, the repository URL, commit SHA, and author email are required. For more information, see the [public API endpoint specification][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#trace
[2]: /continuous_integration/pipelines/#setup
[3]: /api/latest/ci-visibility-pipelines/#send-pipeline-event
[4]: https://app.datadoghq.com/ci/commits
