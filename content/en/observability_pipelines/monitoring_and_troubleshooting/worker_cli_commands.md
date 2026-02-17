---
title: Worker CLI Commands
disable_toc: false
aliases:
  - /observability_pipelines/install_the_worker/worker_commands/
further_reading:
- link: "observability_pipelines/configuration/install_the_worker/"
  tag: "Documentation"
  text: "Install the Worker"
---

## Run, tap, or top the Worker

Usage example: `observability-pipelines-worker <COMMAND>`

If you are using a containerized environment, use the `docker exec` or `kubectl exec` command to get a shell into the container to run the command. For example:

- For Kubernetes: `kubectl exec -it <pod_name> -- observability-pipelines-worker <opw_command>`
- For Docker: `docker exec -it <container_name> observability-pipelines-worker <opw_command>`

| Command   | Description                                                                                                           |
|-----------|-----------------------------------------------------------------------------------------------------------------------|
| `run`     | Run the observability pipeline worker.                                                                                |
| `tap`     | Tap a pipeline to observe events from source or transform components. See [tap options](#tap-options).                |
| `top`     | Lists the components of the pipeline and provides statistics such as input and output data rates for each component.  |

### Tap options

Usage example: `observability-pipelines-worker tap <OPTIONS> <COMPONENT_ID>`

You can use the [`top` command](#run-tap-or-top-the-worker) to find the ID of the component you want to `tap` into.

| Options                          | Descriptions                                                                                                   |
|----------------------------------|----------------------------------------------------------------------------------------------------------------|
| `-i`, `--interval <INTERVAL>`    | Interval to sample events at, in milliseconds (default: `500`).                                                |
| `-u`, `--url <URL>`              | GraphQL API server endpoint.                                                                                   |
| `-l`, `--limit <LIMIT>`          | Maximum number of events to sample each interval (default: `100`).                                             |
| `-f`, `--format <FORMAT>`        | Encoding format for events printed to screen.<br>default: `json`<br>possible values: `json`, `yaml`, `logfmt`  |
| `--outputs-of <OUTPUTS_OF>`      | Source or processor IDs whose outputs you want to observe (comma-separated; accepts glob patterns).            |
| `--inputs-of <INPUTS_OF>`        | Processor or destination IDs whose inputs you want to observe (comma-separated; accepts glob patterns).        |
| `-q`, `--quiet`                  | Quiet output includes only events.                                                                             |
| `-m`, `--meta`                   | Include metadata such as the event's associated component ID.                                                  |
| `-n`, `--no-reconnect`           | Whether to reconnect if the underlying API connection drops. By default, `tap` attempts to reconnect if the connection drops. |
| `-d`, `--duration-ms <DURATION_MS>` | Specifies a duration (in milliseconds) to sample logs (for example, specifying `10000` samples logs for 10 seconds then exits). |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
