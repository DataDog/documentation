---
title: Setup
disable_toc: false
further_reading:
- link: "/observability_pipelines/log_volume_control/"
  tag: "Documentation"
  text: "Log volume control with Observability Pipelines"
- link: "/observability_pipelines/dual_ship_logs/"
  tag: "Documentation"
  text: "Dual ship logs with Observability Pipelines"
- link: "/observability_pipelines/archive_logs/"
  tag: "Documentation"
  text: "Archive logs with Observability Pipelines"
- link: "/observability_pipelines/split_logs/"
  tag: "Documentation"
  text: "Split logs with Observability Pipelines"
- link: "/observability_pipelines/sensitive_data_redaction/"
  tag: "Documentation"
  text: "Redact data redaction with Observability Pipelines"
- link: "/observability_pipelines/update_existing_pipelines/"
  tag: "Documentation"
  text: "Update existing pipelines"
---

## Overview

<div class="alert alert-warning">All configuration file paths specified in the pipeline need to be under <code>DD_OP_DATA_DIR/config</code>.
Modifying files under that location while OPW is running might have adverse effects.
</div>

Bootstrap the Observability Pipelines Worker within your infrastructure before you set up a pipeline. These environment variables are separate from the pipeline environment variables. The location of the related directories and files:

- Default data directory: `var/lib/observability-pipelines-worker`
- Bootstrap file: `/etc/observability-pipelines-worker/bootstrap.yaml`
- Environment variables file: `/etc/default/observability-pipelines-worker`

## Bootstrap Options

To set bootstrap options, do one of the following:
- Use environmental variables.
- Create a `bootstrap.yaml` and start the Worker instance with `--bootstrap-config /path/to/bootstrap.yaml`.

`api_key`
: env var: `DD_API_KEY`
: Create a [Datadog API key][1] for this environment variable.

`pipeline_id`
: env var: `DD_OP_PIPELINE_ID`
: Create an [Observability Pipelines pipeline ID][2] for this environment variable.

`site`
: env var: `DD_SITE`
: Your Datadog site (optional, default: `datadoghq.com`).
: See [Getting Started with Sites][3] for more information.

`data_dir`
: env var: `DD_OP_DATA_DIR`
: The data directory (optional, default: `/var/lib/observability-pipelines-worker`). This is the file system directory that the Observability Pipelines Worker uses for local state.

`tags: []`
: env var: `DD_OP_TAGS`
: The tags reported with internal metrics and can be used to filter Observability Pipelines instances for Remote Configuration deployments.

`threads`
: env var: `DD_OP_THREADS`
: The number of threads to use for processing (optional, default: the number of available cores).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /getting_started/site/
