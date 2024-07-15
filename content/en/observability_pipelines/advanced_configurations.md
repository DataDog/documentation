---
title: Advanced Configurations
disable_toc: false
aliases:
  - /observability_pipelines/setup_opw/
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

This document goes over [bootstrapping the Observability Pipelines Worker](#bootstrap-options) and [referencing files in Kubernetes](#referencing-files-in-kubernetes).

## Bootstrap Options

<div class="alert alert-warning">All configuration file paths specified in the pipeline need to be under <code>DD_OP_DATA_DIR/config</code>.
Modifying files under that location while OPW is running might have adverse effects.
</div>

Bootstrap the Observability Pipelines Worker within your infrastructure before you set up a pipeline. These environment variables are separate from the pipeline environment variables. The location of the related directories and files:

- Default data directory: `var/lib/observability-pipelines-worker`
- Bootstrap file: `/etc/observability-pipelines-worker/bootstrap.yaml`
- Environment variables file: `/etc/default/observability-pipelines-worker`

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

`proxy`
: This option is available for Observability Pipelines Worker 2.1 and later.
: env variables: `DD_PROXY_HTTP`, `DD_PROXY_HTTPS`, `DD_PROXY_NO_PROXY`
: Set proxy servers for the Observability Pipelines Worker. The proxy configuration for the Worker works in the same way as it does for the [Datadog Agent][4].
: The settings are applied to the entire Worker process. The HTTP proxy and HTTPS values are resolved in this order:
<br>&nbsp;&nbsp;&nbsp;1. `DD_PROXY_HTTP(S)`
<br>&nbsp;&nbsp;&nbsp;2. `HTTP(S)_PROXY`
<br>&nbsp;&nbsp;&nbsp;3. `proxy`
:
: An example proxy configuration:
: &nbsp;&nbsp;&nbsp;&nbsp;proxy:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled: true<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https: https://foo.bar:3128
: <b>Note</b>: The `DD_PROXY_HTTP(S)` and `HTTP(S)_PROXY` environment variables need to be already exported in your environment for the Worker to resolve them. They cannot be prepended to the Worker installation script.

## Referencing files in Kubernetes

If you are referencing files in Kubernetes for Google Cloud Storage authentication, TLS certificates for certain sources, or an enrichment table processor, you need to use `volumeMounts[*].subPath` to mount files from `configMap` or `secret`.

For example, if you have a `secret` defined as:

```
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  credentials1.json: bXktc2VjcmV0LTE=
  credentials2.json: bXktc2VjcmV0LTI=
```

Then you need to override `extraVolumes` and `extraVolumeMounts` in the `values.yaml` file to mount the secret files to Observability Pipelines Worker pods using `subPath`:

```
# extraVolumes -- Specify additional Volumes to use.
extraVolumes:
  - name: my-secret-volume
    secret:
      secretName: my-secret

# extraVolumeMounts -- Specify Additional VolumeMounts to use.
extraVolumeMounts:
  - name: my-secret-volume
    mountPath: /var/lib/observability-pipelines-worker/config/credentials1.json
    subPath: credentials1.json
  - name: my-secret-volume
    mountPath: /var/lib/observability-pipelines-worker/config/credentials2.json
    subPath: credentials2.json
```

**Note**: If you override the`datadog.dataDir` parameter, you need to override the `mountPath` as well.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /getting_started/site/
[4]: /agent/configuration/proxy/?tab=linux#environment-variables
