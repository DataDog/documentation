---
title: Enabling App and API Protection for Envoy
code_lang: envoy
code_lang_weight: 50
aliases:
  - /security/application_security/threats/setup/threat_detection/envoy
  - /security/application_security/threats_detection/envoy
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions'
      tag: "Source Code"
      text: "Envoy integration's source code"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
---

{{< callout url="#" btn_hidden="true" header="App and API Protection for Envoy is in Preview" >}}
To try the preview of App and API Protection for Envoy, follow the setup instructions below.
{{< /callout >}}

You can enable App and API Protection for the Envoy proxy. The Datadog Envoy integration has support for threat detection and blocking.

## Prerequisites

- The [Datadog Agent][1] is installed and configured for your application's operating system or container, cloud, or virtual environment.
- [Configure the Agent with Remote Configuration][2] to block attackers using the Datadog UI.

## Enabling threat detection
### Get started

The App and API Protection Envoy integration uses the Envoy external processing filter.

1. **Configure Envoy** to use the [external processing filter][3].
For example:

   ```yaml
   http_filters:
     # ... other filters
     - name: envoy.filters.http.ext_proc
       typed_config:
         "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
         config:
           grpc_service:
             envoy_grpc:
               cluster_name: datadog_ext_proc_cluster
               timeout: 1s

   clusters:
       # ... other clusters
       - name: datadog_ext_proc_cluster
         type: STRICT_DNS
         lb_policy: ROUND_ROBIN
         http2_protocol_options: {}
         transport_socket:
           name: envoy.transport_sockets.tls
           typed_config:
             "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
         load_assignment:
           cluster_name: datadog_ext_proc_cluster
           endpoints:
             - lb_endpoints:
                 - endpoint:
                     address:
                       socket_address:
                         address: Your Datadog image host from step 2
                         port_value: 443
   ```

    **Note**: you need to replace `Your Datadog image host from step 2` in the above example with the host where the Datadog Envoy docker image is running. You will configure this host next.

    You can find more configuration options available in the [Envoy external processor documentation][4].

2. **Run a new container with the Datadog Envoy Docker image.** The image is available on the [Datadog GitHub Registry][5].

   The Docker image exposes some settings specifically for the Envoy integration:
   | Environment variable                   | Default value   | Description                                                       |
   |----------------------------------------|-----------------|-------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST`            | `0.0.0.0`       | gRPC server listening address.                                    |
   | `DD_SERVICE_EXTENSION_PORT`            | `443`           | gRPC server port.                                                 |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80`            | HTTP server port for health checks.                               |

   Configure the Datadog Agent to receive traces from the integration using the following environment variables:
   | Environment variable                   | Default value | Description                                                           |
   |----------------------------------------|---------------|-----------------------------------------------------------------------|
   | `DD_AGENT_HOST`                        | `localhost`   | Hostname where your Datadog Agent is running.                         |
   | `DD_TRACE_AGENT_PORT`                  | `8126`        | Port of the Datadog Agent for trace collection.                       |

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Datadog Go Tracer and Envoy integration

  <div class="alert alert-warning">
    <strong>Note:</strong> The App and API Protection Envoy integration is built on top of the Datadog Go Tracer. It follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version.
  </div>

  The Envoy integration uses the [Datadog Go Tracer][6] and inherits all environment variables from the tracer. You can find more information in [Configuring the Go Tracing Library][7] and [App and API Protection Library Configuration][8].

## Limitations

The available functionality for Envoy version `1.71.0` has the following important limitations:

* The request body is not inspected, regardless of its content type.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_proc_filter
[4]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#extensions-filters-http-ext-proc-v3-externalprocessor
[5]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[6]: https://github.com/DataDog/dd-trace-go
[7]: https://docs.datadoghq.com/tracing/trace_collection/library_config/go/
[8]: https://docs.datadoghq.com/security/application_security/policies/library_configuration/
