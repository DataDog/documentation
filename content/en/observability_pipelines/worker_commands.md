---
title: Worker Commands
disable_toc: false
further_reading:
- link: "observability_pipelines/install_the_worker/"
  tag: "Documentation"
  text: "Install the Worker"
---

## Run, tap, or top the Worker

Usage example: `observability-pipelines-worker <COMMAND>`

| Command   | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| `run`     | Run the observability pipeline worker.                                      |
| `tap`     | Tap a pipeline to observe events from source or transform components. See [tap options](#tap-options). |
| `top`     | Lists the components.                                                       |

### Tap options

Usage example: `observability-pipelines-worker tap <OPTIONS> <COMPONENT_ID>`

| Options                        | Descriptions                                                                                                   |
|--------------------------------|---------------------------------------------------------------------------------------------------------------|
| `-i`, `--interval <INTERVAL>`    | Interval to sample events at, in milliseconds (default: `500`)  .                                                |
| `-u`, `--url <URL>`              | GraphQL API server endpoint.                                                                                   |
| `-l`, `--limit <LIMIT>`          | Maximum number of events to sample each interval (default: `100`).                                               |
| `-f`, `--format <FORMAT>`        | Encoding format for events printed to screen.<br>default: `json`<br>possible values: `json`, `yaml`, `logfmt`            |
| `--outputs-of <OUTPUTS_OF>`    | Source or processor IDs whose outputs you want to observe (comma-separated; accepts glob patterns).         |
| `--inputs-of <INPUTS_OF>`      | Processor or destination IDs whose inputs you want to observe (comma-separated; accepts glob patterns).            |
| `-q`, `--quiet`                  | Quiet output includes only events.                                                                             |
| `-m`, `--meta`                   | Include metadata such as the event's associated component ID.                                                  |
| `-n`, `--no-reconnect`           | Whether to reconnect if the underlying API connection drops. By default, `tap` attempts to reconnect if the connection drops. |
| `-d`, `--duration-ms <DURATION_MS>` | Specifies a duration (in milliseconds) to sample logs (for example, specifying `10000` samples logs for 10 seconds then exits). |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}