---
title: Send Custom Pipelines to Datadog
aliases:
  - /continuous_integration/setup_pipelines/custom
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/guides/pipeline_data_model"
      tag: "Documentation"
      text: "Learn about the Pipeline Data Model and Execution Types"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"

---

## Overview

You can send custom pipelines through HTTP using the [public API endpoint][1]. For more information about how pipeline executions are modeled, see [Pipeline Data Model and Execution Types][2].

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Running pipelines][15] | Running pipelines | View pipeline executions that are running. |
| [Custom tags][5] [and measures at runtime][6] | Custom tags and measures at runtime | Configure [custom tags and measures][7] at runtime. |
| [Manual steps][8] | Manual steps | View manually triggered pipelines. |
| [Parameters][9] | Parameters | Set custom parameters when a pipeline is triggered. |
| [Partial retries][10] | Partial pipelines | View partially retried pipeline executions. |
| [Pipeline failure reasons][11] | Pipeline failure reasons | Identify pipeline failure reasons from error messages. |
| [Queue time][12] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |
| [Filter CI Jobs on the critical path][16] | Filter CI Jobs on the critical path | Filter by jobs on the critical path. |
| [Execution time][17] | Execution time  | View the amount of time pipelines have been running jobs. |


## Configure CI Visibility

To send pipeline events programmatically to Datadog, ensure that your [`DD_API_KEY`][14] is configured.

1. Set the headers of your HTTP request:

   - `DD-API-KEY`: Your [Datadog API key][14].
   - `Content-Type`: `application/json`.

2. Prepare the payload body by entering information about the [pipeline execution][2] in a cURL command:

   | Parameter Name | Description | Example Value |
   |---|---|---|
   | Unique ID | The UUID of the pipeline run. The ID has to be unique across retries and pipelines, including partial retries. | `b3262537-a573-44eb-b777-4c0f37912b05` |
   | Name | The name of the pipeline. All pipeline runs for the builds should have the same name. | `Documentation Build` |
   | Git Repository | The Git repository URL that triggered the pipeline. | `https://github.com/Datadog/documentation` |
   | Commit Author | The commit author email that triggered the pipeline. | `contributor@github.com` |
   | Commit SHA | The commit hash that triggered the pipeline. | `cf852e17dea14008ac83036430843a1c` |
   | Status | The final status of the pipeline. Allowed enum values: `success`, `error`, `canceled`, `skipped`, `blocked`, or `running`. | `success` |
   | Partial Retry | Whether or not the pipeline was a partial retry of a previous attempt. This field expects a boolean value (`true` or `false`). A partial retry is one which only runs a subset of the original jobs. | `false` |
   | Start | Time when the pipeline run started (it should not include any [queue time][12]). The time format must be RFC3339. | `2024-08-22T11:36:29-07:00` |
   | End | Time when the pipeline run finished. The time format must be RFC3339. The end time cannot be longer than 1 year after the start time. | `2024-08-22T14:36:00-07:00` |
   | URL | The URL to look at the pipeline in the CI provider UI. | `http://your-ci-provider.com/pipeline/{pipeline-id}` |

   For example, this payload sends a CI pipeline event to Datadog:

   {{< code-block lang="bash" >}}
   curl -X POST "https://api.datadoghq.com/api/v2/ci/pipeline" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <YOUR_API_KEY>" \
   -d @- << EOF
   {
     "data": {
       "attributes": {
         "provider_name": "<YOUR_CI_PROVIDER>",
         "resource": {
           "level": "pipeline",
           "unique_id": "b3262537-a573-44eb-b777-4c0f37912b05",
           "name": "Documentation Build",
           "git": {
             "repository_url": "https://github.com/Datadog/documentation",
             "author_email": "contributor@github.com",
             "sha": "cf852e17dea14008ac83036430843a1c"
           },
           "status": "success",
           "start": "2024-08-22T11:36:29-07:00",
           "end": "2024-08-22T14:36:00-07:00",
           "partial_retry": false,
           "url": ""
         }
       },
       "type": "cipipeline_resource_request"
     }
   }
   EOF
   {{< /code-block >}}

3. After sending your pipeline event to Datadog, you can integrate additional event types such as `stage`, `job`, and `step`. For more information, see the [Send Pipeline Event endpoint][1].

## Running pipelines
Pipeline events sent with the `status` set to `running` have the same `unique_id` as the final pipeline event. Running pipelines can be updated by adding more information while they are still running. A running pipeline consists of the following events:

1. The initial running pipeline event with the `status` set to `running`.
2. Optionally, `N` running pipeline events that update the pipeline with more information, with the same `unique_id` and the `status` set to `running`.
3. The final pipeline event **without** a `running` status and the same `unique_id`.

**Note**: The most recent value may not always be the one displayed in the UI when a field is updated. For example, if the tag `my_tag` is set to `value1` in the first running pipeline, and then is updated to `value2`, you may see `value1` instead of `value2` in the UI. It is recommended to only update running pipelines by adding more fields instead modifying existing ones.

## Visualize pipeline data in Datadog

The [**CI Pipeline List**][3] and [**Executions**][4] pages populate with data after the pipelines are accepted for processing.

The **CI Pipeline List** page shows data for only the default branch of each repository. For more information, see [Search and Manage CI Pipelines][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/ci-visibility-pipelines/#send-pipeline-event
[2]: /continuous_integration/guides/pipeline_data_model/
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /glossary/#custom-tag
[6]: /glossary/#custom-measure
[7]: /continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /glossary/#manual-step
[9]: /glossary/#parameter
[10]: /glossary/#partial-retry
[11]: /glossary/#pipeline-failure
[12]: /glossary/#queue-time
[13]: /continuous_integration/search/#search-for-pipelines
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: /glossary/#running-pipeline
[16]: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[17]: /glossary/#pipeline-execution-time
