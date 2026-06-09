---
title: Pipeline Simulation
disable_toc: false
private: true
further_reading:
- link: "/observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
- link: "/observability_pipelines/configuration/live_capture/"
  tag: "Documentation"
  text: "Live Capture"
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

<div class="alert alert-info">Pipeline Simulation is in Preview. Reach out to your account manager to request access.</div>

## Overview

When you configure or edit a pipeline in Observability Pipelines, you often have to update filter queries, sampling rules, or Packs that transform your telemetry, which can impact downstream monitors, dashboards, and detection rules. It's important to test and validate how your changes affect your production data before you deploy those changes.

Use Pipeline Simulation to preview how your processors, volume control rules, and [Packs](observability_pipelines/packs/) modify your log data before deploying your pipeline configuration. This helps ensure your processors target the right data and modify your logs as expected. You can test your configuration with live logs sent through the pipeline or import your own sample data.

To use Pipeline Simulation:

1. [Capture a snapshot of your data](#capture-data-for-a-pipeline-simulation).
1. [Run a simulation with that data for your processor configuration](#run-a-pipeline-simulation).
1. Inspect the data that the processor group received and the modified data sent out after it was processed. Confirm that the processed data is as expected. If it is not, update your processors and run another simulation.
1. After you validate that the processed data is what you expect, deploy the changes to production.

The following example of Pipeline Simulation shows an unparsed log that a processor group receives (Entry) and the parsed output after the log is processed and tagged (Exit).

{{< img src="observability_pipelines/pipeline_simulation/pipeline_simulation_overview.png" alt="Pipeline Simulation showing an unparsed log in the Entry column and the parsed output in the Exit column" style="width:100%;" >}}

## Permissions

Only users with the `Observability Pipelines Live Capture Write` permission can set up captures. Users with the `Observability Pipelines Live Capture Read` permission can only view the events that have already been captured. See [Observability Pipelines Permissions][1] for a list of permissions for Observability Pipelines assets.

Admins have read and write permissions by default. Standard users only have read permission by default. See [Access Control][2] for more information about default Datadog roles and how to create custom roles.

### Add domains to firewall allowlist

If you want to use Pipeline Simulation and are using a firewall, you must add these domains to the allowlist:

- `api.{{< region-param key="dd_site" >}}`
- `obpipeline-intake.{{< region-param key="dd_site" >}}`
- `config.{{< region-param key="dd_site" >}}`

## Capture data for a pipeline simulation

Before running a simulation, you need a sample of log data to test against. Pipeline Simulation lets you capture live data from an active pipeline, re-use previously captured samples, or import your own data.

1. Navigate to [Observability Pipelines][3].
1. [Set up a pipeline][4] or select a pipeline and click **Edit Pipeline** on the top right side of the page.
1. On the pipeline's edit page, you can expand a processor in a processor group to view its read-only configuration. To edit any processors, capture data, and run a simulation, click **Edit** on a processor group.

{{< img src="observability_pipelines/pipeline_simulation/pipeline_simulation_edit_processor_group.png" alt="A pipeline's edit page with the Edit button on a processor group highlighted" style="width:100%;" >}}

The status of a pipeline determines whether a simulation can be run with live data, imported data, or both.

| Pipeline status | Simulation with imported data | Simulation with saved data | Simulation with live data |
| --------------- | ----------------------------- | -------------------------- | ------------------------- |
| Active          | ✔️                            | ✔️                         | ✔️                        |
| Inactive        | ✔️                            | ✔️                         |                           |
| Draft           | ✔️                            | ✔️                         |                           |

**Note**: For inactive pipelines or pipelines in draft mode, you must import data the first time you run a simulation for the pipeline.

### Capture live logs from your pipeline to run a simulation with production data

For active pipelines, Observability Pipelines automatically runs a Live Capture if a previously saved capture, whether from imported data or a live capture, is not available.

To run a capture for a specific set of data:

1. Click **Live Capture**.
1. (Optional) Enter a query to specify which events you want to capture. The default query is `*`.
    - Use a capture query, such as `service:cloudtrail env:prod`, to target a specific set of logs. This can help you distinguish between different sets of logs you use for your simulations. For example, the first set of logs captured can be for custom app logs and the second set for the [Cloudflare Pack][5].
    - For more information on creating queries, see [Search Syntax for Logs][6] or [Search Syntax for Metrics][7].
1. (Optional) Enter a capture duration (in seconds or minutes) for how long you want events to be captured.
    - Minimum duration (default, if no duration is specified): 30 seconds
    - Maximum duration: 300 seconds (5 minutes)
1. Click **Capture**.

### Import your own sample data to run a simulation with

To import sample data for your pipeline simulation:

1. For an inactive or draft pipeline, if the pipeline does not have saved data, click **Import Data**. Otherwise, click the down arrow next to **Live Capture** and select **Import Sample Data**.
1. In the modal, drop or browse for your sample data files, or click the **Paste** tab to paste your sample data. **Note**: Sample data must be in a JSON or JSONL file. See [Sample file import specifications](#sample-file-import-specifications) for more details.
1. Click **Confirm**.

#### Sample file import specifications

##### JSON sample data format

When you import sample data in JSON format, the data must be:

- Structured as a set of JSON objects wrapped in an array
- Comma separated between each log event

Below is an example set of logs in JSON you can import for a simulation:

```json
[
  {
    "id": "abcd",
    "content": {
      "timestamp": "2026-05-27T19:41:46.609Z",
      "tags": [
        "env:prod",
        "service:web-store",
        "source:ruby"
      ],
      "host": "123",
      "service": "web-store",
      "message": "UnhandledInternalServiceError: Payment service reported 500 error code.",
      "attributes": {
        "transaction_id": "abc123",
        "shopist": {
          "webstore": {
            "merchant": {
              "plan_type": "m2m",
              "tier": "enterprise",
              "store_name": "ElectroNova"
            }
          },
          "customer": {
            "name": "Pam Jones",
            "location": "San Francisco, California"
          }
        },
        "level": "error",
        "logger": {
          "name": "ShoppingCartController"
        },
        "status": "error"
      }
    }
  }
]
```

##### JSONL sample data format

A JSONL file must contain multiple JSON objects, where each object is one line and separated by a new line.

An example JSONL file you can import for a capture:

```json
{"name":"process_payload_ms.count","tags":{"host":"i-abcd123","version":"7.77.3"},"timestamp":"2026-05-08T20:16:10Z","interval_ms":10000,"kind":"incremental","counter":{"value":0.0}}
{"name":"max_eps.max_rate","tags":{"host":"i-efg123","version":"7.77.3"},"timestamp":"2026-05-08T20:16:10Z","interval_ms":10000,"kind":"absolute","gauge":{"value":200.0}}
{"name":"service_checks","tags":{"client_version":"5.8.3","host":"i-hijk123"},"timestamp":"2026-05-08T20:16:10Z","interval_ms":10000,"kind":"incremental","counter":{"value":0.0}}
{"name":"aggregated_context_by_type","tags":{"client_version":"5.8.1","xyz123":"macbook","metrics_type":"distribution"},"timestamp":"2026-05-08T20:16:10Z","interval_ms":10000,"kind":"incremental","counter":{"value":0.0}}
```

### Reuse previously saved data for your simulation

After using Live Capture to pull data from your pipeline, results are stored for 72 hours in the Datadog platform and can be used for simulations. To use previously captured data for your pipeline simulation:

1. Click the down arrow next to **Capture Again** and select **See Saved Samples**.
1. Click **Use as Sample Data** for the live capture or previously imported data you want to use.

{{< img src="observability_pipelines/pipeline_simulation/pipeline_simulation_saved_samples.png" alt="The Saved Samples view with the Use as Sample Data button for a previous capture" style="width:100%;" >}}

## Run a pipeline simulation

After you have captured data for your pipeline simulation, edit your pipeline processors and run a simulation.

1. Navigate to [Observability Pipelines][3].
1. Select your pipeline and click **Edit Pipeline** on the top right side of the page.
1. On the pipeline edit page, click **Edit** on a processor group to edit your pipeline and run a simulation.
1. On the left side of the Pipeline Simulation page, select the **Processor group** with the processors you want to update, test, and validate.
    - You can hover over the **Processor Group** to see a snapshot of where the processors are in the pipeline.
  {{< img src="observability_pipelines/pipeline_simulation/processor_group_map.mp4" alt="Hovering over a processor group shows a snapshot of where the processors are in the pipeline" video="true" width="60%" >}}
1. Add and make updates to your processors. You can update multiple processors for one simulation. **Note**: For a pipeline canvas, there is a limit of 25 processors groups and a total of 150 processors.
1. Choose a simulation scenario:
    - **Run a simulation up to a specific processor group**: Keep the **End-to-End Preview** toggle disabled to see the result of logs transformed by all processors in the current processor group and the prior processor groups. See [Run a simulation up to a specific processor group](#run-a-simulation-up-to-a-specific-processor-group) for more information.
    - **Run an end-to-end preview simulation**: Enable the **End-to-End Preview** toggle to run a simulation through all processor groups and see the data that is sent to the destination. See [End-to-end preview](#end-to-end-preview) for more information.
  {{< img src="observability_pipelines/pipeline_simulation/pipeline_simulation_end_to_end_toggle.png" alt="The End-to-End Preview toggle on the Pipeline Simulation page" style="width:100%;" >}}
1. Click **Preview** at the bottom of the processors panel to run the simulation.
  {{< img src="observability_pipelines/pipeline_simulation/pipeline_simulation_preview.png" alt="The Preview button at the bottom of the processors panel" style="width:60%;" >}}
1. After the simulation is complete, you can:
    - See the log data that the processor received and sent out.
    - Enter a free text search query to find specific logs that were captured. The query searches all attributes and tags in the logs.
    - Use the dropdown menu to show events based on status:
        - `Modified only` shows only modified events.
        - `Unmodified only` shows only unmodified events.
        - `Rerouted only` shows only logs rerouted to an overflow destination by the [Quota processor][8].
        - `Created only` shows only:
            - Metrics generated from logs with the [Generate Logs-Based Metrics][9] processor.
            - Logs created by the [Split Array][10] processor.
        - `Dropped only` shows only dropped events.
    - Use the dropdown menu to show `Logs only`, `Metrics only`, or `All telemetry` events. `Metrics only` shows events only from the [Generate Logs-Based Metrics][9] processor.
     {{< img src="observability_pipelines/pipeline_simulation/view_simulation.mp4" alt="The video shows the log data the processor received and sent out, the search bar, and the status and telemetry filter dropdowns" video="true" width="70%" >}}
1. Click **Save** at the bottom right side of the page to save your changes.
1. Click **Back to Pipeline** on the top right side of the page.
1. To deploy your updates to production, do one of the following:
    - **Deploy updates using the UI**: Click **Next: Deploy Changes** on the pipeline page.
    - **Use the API to deploy changes**: See [Export and Import Configuration][11] for information on exporting pipeline configurations to JSON.
    - **Use Terraform to deploy changes**: See [Export and Import Configuration][11] for information on exporting pipeline configurations to Terraform.

**Note**: For the Enrichment Table processor, only the Reference Table option supports Pipeline Simulation.

### Simulation scenarios

When you run a simulation, you can choose to send your data through to a specific processor group or through all processor groups to get an end-to-end preview.

#### Run a simulation up to a specific processor group

On the Simulation Pipeline page, you can choose which set of processors you want to test and validate. The simulation sends data through the previous processor groups and the selected group. For example, if you run a simulation for processor group 2, the processed data you see is the result from sending the logs through groups 1 and 2. Similarly, if you run a simulation for group 3, your result is after processing the data through processor groups 1, 2, and 3.

{{< img src="observability_pipelines/pipeline_simulation/pipeline_simulation_specific_processor_group.png" alt="The list of processor groups with groups 1,2, and 3 highlighted" style="width:40%;" >}}

#### End-to-end preview

When you toggle **End-to-End Preview** and run a simulation, the entry event shown is the log sent from the source before *any* processing is done. The exit log is the result after all processors have been applied and sent to the destination. This lets you visualize how a log is transformed after it goes through the entire pipeline.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#observability-pipelines
[2]: /account_management/rbac/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /observability_pipelines/configuration/set_up_pipelines/?tab=logs
[5]: /observability_pipelines/packs/cloudflare/
[6]: /observability_pipelines/search_syntax/logs
[7]: /observability_pipelines/search_syntax/metrics
[8]: /observability_pipelines/processors/quota/
[9]: /observability_pipelines/processors/generate_metrics/
[10]: /observability_pipelines/processors/split_array/
[11]: /observability_pipelines/configuration/export_and_import_pipeline_configurations/
