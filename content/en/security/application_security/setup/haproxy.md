---
title: Enabling App and API Protection for HAProxy
code_lang: haproxy
code_lang_weight: 40
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa'
      tag: "Source Code"
      text: "HAProxy integration's source code"
    - link: 'https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa'
      tag: "Container Image"
      text: "HAProxy SPOA Docker image"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
---

{{< callout url="#" btn_hidden="true" header="App and API Protection for HAProxy is in Preview" >}}
To try the preview of App and API Protection for HAProxy, use the following setup instructions.
{{< /callout >}}

You can enable App and API Protection for your HAProxy. The Datadog HAProxy integration leverages HAProxy's Stream Processing Offload Engine (SPOE) to inspect and protect traffic for threat detection at the edge of your infrastructure.

## Prerequisites

- The [Datadog Agent][1] is installed and configured for your environment (host, container, or orchestrator).
- [Configure the Agent with Remote Configuration][2] to block attackers using the Datadog UI.

## Enabling threat detection

### Get started

The App and API Protection HAProxy integration uses HAProxy's [Stream Processing Offload Engine][3] (SPOE) to call a Datadog Stream Processing Offload Agent (SPOA). The SPOA analyzes requests and responses.

### Install the Datadog HAProxy SPOA and configuration.

#### SPOA container

Use the Datadog HAProxy SPOA image from the Datadog GitHub Container Registry [here][4]. The SPOA listens for SPOE connections from HAProxy and sends security events to your Datadog Agent.

See [Configuration](#configuration) for configuration details about the SPOA container.

#### HAProxy configuration files (source of truth)

All required HAProxy configuration files live in the GitHub folder:

- [Configuration directory][8]
- [Configuration CHANGELOG][9]

Files you will install and reference:

- `spoe.cfg`: Core SPOE engine configuration
- `global-config.cfg`: Lines to add in your `global` section
- `frontend-config.cfg`: Lines to add at the top of each protected `frontend`
- `backend.cfg`: SPOA backend used by the SPOE engine
- `datadog_aap_blocking_response.lua`: Lua helper for custom blocking responses

Follow the per-file guidance below to install and customize as needed.

##### spoe.cfg

The `spoe.cfg` file is responsible for declaring the SPOE agent and its configuration. This file should be saved to disk, for example at `/usr/local/etc/haproxy/spoe.cfg`. The location of this file is referenced via the `DD_SPOA_SPOA_CONF_FILE` environment variable, which is configured within the `global` section.

It is important that no custom modifications are made to this file.

##### global-config.cfg

The `global-config.cfg` file loads the required Lua script and configures the necessary variables for the integration. Its contents should be incorporated into the `global` section of your `haproxy.cfg` configuration file.

You can adjust the values as needed for your environment. It is recommended to review the comments within the file for further guidance on each setting.

##### frontend-config.cfg

The `frontend-config.cfg` file attaches the SPOE filter to your frontend. This section should be placed at the very top of each `frontend` section you want to protect, before other filters and the router.

This section ensures that:
- Request and response events are sent to the SPOA
- Datadog tracing headers are injected when applicable
- The Lua helper is conditionally invoked for blocking

It is important that no custom modifications are made to this part of the configuration.

##### backend.cfg

The `backend.cfg` file defines the `spoa-backend` used by the SPOE engine and for health checks. This configuration should be appended near the end of your `haproxy.cfg` file.

Be sure to modify the `server spoa1 <host>:<port>` line so that it references your deployed SPOA container instance.

<div class="alert alert-info">
  <strong>Note:</strong> For high availability and redundancy, you can configure multiple SPOA agent servers by adding additional <code>server</code> lines (for example, <code>server spoa1 ...</code>, <code>server spoa2 ...</code>, etc.). HAProxy will automatically load-balance and fail over between these SPOA agents, ensuring continued protection even if one agent becomes unavailable.
</div>

##### datadog_aap_blocking_response.lua

The `datadog_aap_blocking_response.lua` script is responsible for sending a custom blocking response when the SPOA instructs HAProxy to block a request. This script should be stored in a location such as `/etc/haproxy/lua/datadog_aap_blocking_response.lua`, and the `lua-load` directive in the `global` section should reference this path.

It is important that no custom modifications are made to this file.

### Validation

<div class="alert alert-info">
  <strong>Note:</strong> This lua script is not invoked on every request processed by HAProxy. It is only invoked when a request is blocked by App and API Protection. This design ensures optimal performance by avoiding the overhead of running Lua code for all requests.
</div>

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Configuration

The Datadog HAProxy SPOA container supports the following configuration settings:

| Environment variable                | Default value | Description                                                                                                   |
|-------------------------------------|---------------|---------------------------------------------------------------------------------------------------------------|
| `DD_HAPROXY_SPOA_HOST`              | `0.0.0.0`     | Host on which the SPOA and HTTP health server listen.                                                         |
| `DD_HAPROXY_SPOA_PORT`              | `3000`        | Port used by the SPOA that accepts communication with HAProxy.                                                |
| `DD_HAPROXY_SPOA_HEALTHCHECK_PORT`  | `3080`        | Port used for the HTTP server for health checks.                                                              |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT` | `0`           | Maximum size of bodies to process in bytes. If `0`, bodies are not processed. Recommended: `10000000` (10MB). |
| `DD_SERVICE`                        | `spoa`        | Service name shown in the Datadog UI.                                                                         |

Configure the SPOA to send traces to your Datadog Agent using the following environment variables:

| Environment variable      | Default value | Description                              |
|---------------------------|---------------|------------------------------------------|
| `DD_AGENT_HOST`           | `localhost`   | Host of a running Datadog Agent.         |
| `DD_TRACE_AGENT_PORT`     | `8126`        | Port of a running Datadog Agent.         |

### Datadog Go Tracer and HAProxy integration

The HAProxy integration is built on top of the [Datadog Go Tracer][5] and inherits all of its environment variables. See [Configuring the Go Tracing Library][6] and [App and API Protection Library Configuration][7].

<div class="alert alert-info">
  <strong>Note:</strong> As the HAProxy SPOA is built on top of the Datadog Go Tracer, it generally follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version (for example, <code>v2.2.2</code>). In some cases, early release versions might be published between official tracer releases, and these images are tagged with a suffix such as <code>-docker.1</code>.
</div>

## Keeping your configuration up to date

Because HAProxy's SPOE integration involves both a runtime component (the SPOA container image) and HAProxy configuration, upgrades can require changes in both places.

<div class="alert alert-warning">
  <strong>Reference configuration and changelog:</strong> Datadog publishes the reference HAProxy configuration and a changelog you can monitor for updates:
  <ul>
    <li><a href="https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/">Reference HAProxy configuration directory</a> (SPOE engine, frontend/backend snippets, Lua)</li>
    <li><a href="https://github.com/DataDog/dd-trace-go/blob/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/CHANGELOG.md">Configuration CHANGELOG</a></li>
  </ul>
</div>

### Recommended upgrade practices

- Pin your SPOA image to a specific version and upgrade intentionally after reviewing the configuration changelog.
- Centralize the Datadog configuration so you easily update it.
- Track the reference configuration and changelog and compare your configuration to it when upgrading.

## Limitations

The HAProxy integration has the following limitations:

- Asynchronous (observability) mode is not currently supported.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://www.haproxy.com/blog/extending-haproxy-with-the-stream-processing-offload-engine
[4]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
[5]: https://github.com/DataDog/dd-trace-go
[6]: /tracing/trace_collection/library_config/go/
[7]: /security/application_security/policies/library_configuration/
[8]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/
[9]: https://github.com/DataDog/dd-trace-go/blob/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/CHANGELOG.md
