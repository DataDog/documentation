---
title: Advanced Worker Configurations
disable_toc: false
aliases:
  - /observability_pipelines/setup_opw/
  - /observability_pipelines/advanced_configurations/
further_reading:
- link: "/observability_pipelines/sensitive_data_redaction/"
  tag: "Documentation"
  text: "Redact data redaction with Observability Pipelines"
- link: "/observability_pipelines/configuration/update_existing_pipelines/"
  tag: "Documentation"
  text: "Update existing pipelines"
---

## Overview

This document explains [bootstrapping](#bootstrap-options) for the Observability Pipelines Worker and how to [enable the health check endpoint and the liveness and readiness probes](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes).

## Bootstrap Options

<div class="alert alert-danger">All configuration file paths specified in the pipeline need to be under <code>/DD_OP_DATA_DIR/config</code>.
Modifying files under that location while OPW is running might have adverse effects.
</div>

Bootstrap the Observability Pipelines Worker within your infrastructure before you set up a pipeline. These environment variables are separate from the pipeline environment variables. The location of the related directories and files:

- Default data directory: `var/lib/observability-pipelines-worker`
- Bootstrap file: `/etc/observability-pipelines-worker/bootstrap.yaml`
- Environment variables file: `/etc/default/observability-pipelines-worker`

**Note**: `DD_OP_DATA_DIR` can only be owned by a single Observability Pipelines Worker. If you have multiple Workers, you must use unique data directories.

To set bootstrap options, do one of the following:
- Use environmental variables.
- Create a `bootstrap.yaml` and start the Worker instance with `--bootstrap-config /path/to/bootstrap.yaml`.

The following is a list of bootstrap options, their related pipeline environment variables, and which variables have a higher precedence (priority).

`api`
: **Pipeline environment variable**: `DD_OP_API_ENABLED`
: **Priority**: `DD_OP_API_ENABLED`
: An example configuration:
: &nbsp;&nbsp;&nbsp;&nbsp;`api`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`address`: `"127.0.0.1:8686" # optional`
: Note: Setting `address` is optional. It is the network address to which the API should bind. If you're running the Worker in a Docker container, bind to `0.0.0.0`. Otherwise, the API is not exposed outside of the container.
: **Description**: Enable the Observability Pipelines Worker API so you can see the Worker's processes with the `tap` or `top` command. See [Run, tap, or top the Worker][8] for more information. If you are using the Helm charts provided when you [set up a pipeline][7], then the API has already been enabled. Otherwise, make sure the environment variable `DD_OP_API_ENABLED` is set to `true` in `/etc/observability-pipelines-worker/bootstrap.yaml`. This sets up the API to listen on `localhost` and port `8686`, which is what the CLI for `tap` is expecting.
<br><br>See [Enable liveness and readiness probe](#enable-liveness-and-readiness-probe) on how to expose the `/health` endpoint.

`api_key`
: **Pipeline environment variable**: `DD_API_KEY`
: **Priority**: `DD_API_KEY`
: **Description**: Create a [Datadog API key][1] for this environment variable. [Remote Configuration][6] must be enabled for the API key. See [Security considerations][11] for information on safeguards implemented for Remote Configuration.

`data_dir`
: **Pipeline environment variable**: `DD_OP_DATA_DIR`
: **Priority**: `DD_OP_DATA_DIR`
: **Description**: The data directory (optional, default: `/var/lib/observability-pipelines-worker`). This is the file system directory that the Observability Pipelines Worker uses for local state.

`pipeline_id`
: **Pipeline environment variable**: `DD_OP_PIPELINE_ID`
: **Priority**: `DD_OP_PIPELINE_ID`
: **Description**: Create an [Observability Pipelines pipeline ID][2] for this environment variable.

`proxy`
: **Pipeline environment variables**: `DD_PROXY_HTTP`, `DD_PROXY_HTTPS`, `DD_PROXY_NO_PROXY`
: Set proxy servers for the Observability Pipelines Worker. The proxy configuration for the Worker works in the same way as it does for the [Datadog Agent][4].
: **Priority**: The settings are applied to the entire Worker process. The HTTP proxy and HTTPS values are resolved in this order:
<br>&nbsp;&nbsp;&nbsp;1. `DD_PROXY_HTTP(S)`
<br>&nbsp;&nbsp;&nbsp;2. `HTTP(S)_PROXY`
<br>&nbsp;&nbsp;&nbsp;3. `proxy`
:
: An example proxy configuration:
: &nbsp;&nbsp;&nbsp;&nbsp;`proxy`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`https`: `https://foo.bar:3128`
: **Description**: The Observability Pipelines Worker can route external requests through forward proxies, such as Squid. Forward proxies forward client requests from the Observability Pipelines Worker to the internet. You might use them as a web firewall to forbid or allow certain domains, ports, or protocols. Forward proxies usually do not terminate SSL and therefore do not have access to the request content. They only pass packets back and forth between the client and the destination. [HTTP tunnels][5] are used to secure communication through a forward proxy.
: **Notes**:
: <li style="list-style-type: '- '">This option is available for Observability Pipelines Worker 2.1 and later.</li>
: <li style="list-style-type: '- '">The Observability Pipelines Worker cannot route external requests through reverse proxies, such as HAProxy and NGINX.</li>
: <li style="list-style-type: '- '">The <code>DD_PROXY_HTTP(S)</code> and <code>HTTP(S)_PROXY</code> environment variables need to be already exported in your environment for the Worker to resolve them. They cannot be prepended to the Worker installation script.</li>

`secret`
: **Pipeline environment variable**: None
: **Priority**: N/A
: **Description**: Connects the Worker to your secrets manager. See [Secrets Management][12] for configuration information.

`site`
: **Pipeline environment variable**: `DD_SITE`
: **Priority**: `DD_SITE`
: **Description**: Your Datadog site (optional, default: `datadoghq.com`).
: See [Getting Started with Sites][3] for more information.

`tags: []`
: **Pipeline environment variable**: `DD_OP_TAGS`
: **Priority**: `DD_OP_TAGS`
: **Description**: The tags reported with internal metrics and can be used to filter Observability Pipelines instances for Remote Configuration deployments.

`threads`
: **Pipeline environment variable**: `DD_OP_THREADS`
: **Priority**: `DD_OP_THREADS`
: **Description**: The number of threads to use for processing (optional, default: the number of available cores).

## Enable the health check endpoint and the liveness and readiness probes

Configure your load balancer's health check with the `/heath` endpoint to check that the Worker is up and running.

For Kubernetes, the liveness and readiness probes are already enabled in the [helm chart][9] and [values.yaml][10] file.

For other installations such as VM-based ones, you must set `DD_OP_API_ENABLED` to `true` and set `DD_OP_API_ADDRESS` to `0.0.0.0:8686` to expose the `/health` endpoint. An example configuration:

```
api:
  enabled: true
  address: "0.0.0.0.1:8686"
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /getting_started/site/
[4]: /agent/configuration/proxy/?tab=linux#environment-variables
[5]: https://en.wikipedia.org/wiki/HTTP_tunnel
[6]: /remote_configuration
[7]: /observability_pipelines/set_up_pipelines/
[8]: /observability_pipelines/install_the_worker/worker_commands/#run-tap-or-top-the-worker
[9]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L33-L40
[10]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L303-L329
[11]: /remote_configuration/#security-considerations
[12]: /observability_pipelines/configuration/secrets_management/