---
title: Enabling App and API Protection for Envoy
code_lang: envoy
code_lang_weight: 50
aliases:
  - /security/application_security/threats/setup/threat_detection/envoy
  - /security/application_security/threats_detection/envoy
  - /security/application_security/setup/threat_detection/envoy/
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
To try the preview of App and API Protection for Envoy, use the following setup instructions.
{{< /callout >}}

You can enable App and API Protection for the Envoy proxy. The Datadog Envoy integration has support for threat detection and blocking.

## Prerequisites

- The [Datadog Agent][1] is installed and configured for your application's operating system or container, cloud, or virtual environment.
- [Configure the Agent with Remote Configuration][2] to block attackers using the Datadog UI.

## Enabling threat detection
### Get started

The App and API Protection Envoy integration uses the Envoy external processing filter.

1. Deploy a new container with the Datadog External Processor Docker image. The image is available on the [Datadog GitHub Registry][5].

   This service is a gRPC server that Envoy communicates with to have requests and responses analyzed by App and API Protection.

   The Datadog External Processor exposes some settings:
   | Environment variable                      | Default value       | Description                                                                                                                              |
   |-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | gRPC server listening address.                                                                                                           |
   | `DD_SERVICE_EXTENSION_PORT`               | `443`               | gRPC server port.                                                                                                                        |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | HTTP server port for health checks.                                                                                                      |
   | `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | Maximum size of the bodies to be processed in bytes. If set to `0`, the bodies are not processed. The recommended value is `10000000` (10MB). (To fully enable body processing, the `allow_mode_override` option should also be set in the External Processing filter configuration) |
   | `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | Enable asynchronous analysis. This also disables blocking capabilities. (To fully enable observability mode, this option should also be set in the External Processing filter configuration) |
   | `DD_SERVICE`                              | `serviceextensions` | Service name shown in the Datadog UI.                                                                                                    |

   Configure the Datadog Agent to receive traces from the external processor using the following environment variables:

   | Environment variable                   | Default value | Description                                                                      |
   |----------------------------------------|---------------|----------------------------------------------------------------------------------|
   | `DD_AGENT_HOST`                        | `localhost`   | Hostname or IP of your Datadog Agent.                                            |
   | `DD_TRACE_AGENT_PORT`                  | `8126`        | Port of the Datadog Agent for trace collection.                                  |

2. Update your Envoy configuration to add the [external processing filter][3] to your `http_filters` list, and define the corresponding gRPC cluster in your `clusters` section. For example:

   #### Http filters section

   ```yaml
   http_filters:
     # This filter should be the first filter in the filter chain
     - name: envoy.filters.http.ext_proc
       typed_config:
         "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
         grpc_service:
           envoy_grpc:
             cluster_name: datadog_aap_ext_proc_cluster

           ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
           initial_metadata:
             - key: x-datadog-envoy-integration
               value: '1'

           ## A timeout configuration for the grpc connection exist but is not useful in our case.
           ## This timeout is for all the request lifetime. A timeout on the route is preferred.
           #timeout: 0s

         ## Optional: Enable fail open mode. Default is false.
         ## Normally, if the external processor fails or times out, the filter fails and Envoy
         ## returns a 5xx error to the downstream client. Setting this to true allows requests
         ## to continue without error if a failure occurs.
         failure_mode_allow: true # It won't cause 5xx error if an error occurs.

         ## Mandatory: Only enable the request and response header modes.
         ## If you want to enable body processing, please see the section below.
         processing_mode:
           request_header_mode: SEND
           response_header_mode: SEND

         ## Optional for headers analysis only but **mandatory** for body processing.
         ## The external processor can dynamically override the processing mode as needed instructing
         ## Envoy to forward request and response bodies to the external processor. Body processing is
         ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the external processor container.
         allow_mode_override: true

         ## Optional: Set a timeout by processing message. Default is 200ms.
         ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
         ## with body processing enabled.
         ## Note: This timeout also includes the data communication between Envoy and the external processor.
         ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
         ## the additional possible processing time. Larger payloads will require a longer timeout. 
         #message_timeout: 200ms

         ## Optional: Enable asynchronous mode analysis. Default is false.
         ## This mode will disable all blocking capabilities. The external processor should also be
         ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
         ## Beware, there is no flow control implemented in Envoy
         ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
         #observability_mode: true
         ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
         ## timeout starts when the http request is finished, to let the External Processor
         ## process all processing messages. Default is 5s.
         #deferred_close_timeout: 5s

     # ... other filters
   ```

   #### Clusters section

   ```yaml
   clusters:
       # ... other clusters
       - name: datadog_aap_ext_proc_cluster
         type: STRICT_DNS
         lb_policy: ROUND_ROBIN
         http2_protocol_options: {}
         transport_socket:
           name: envoy.transport_sockets.tls
           typed_config:
             "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
             sni: "localhost"
         load_assignment:
           cluster_name: datadog_aap_ext_proc_cluster
           endpoints:
             - lb_endpoints:
                 - endpoint:
                     address:
                       socket_address:
                         address: 12.0.0.1 # Replace with the host address of the Datadog External Processor docker image (configured in the next step)
                         port_value: 443
   ```

   **Note**: Please read the provided example configuration carefully and adapt it to match your infrastructure and environment. You can find more configuration options available in the [Envoy external processor documentation][4].

3. Validation.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Datadog Go Tracer and Envoy integration

The External Processor is built on top of the [Datadog Go Tracer][6] and inherits all of its environment variables. See [Configuring the Go Tracing Library][7] and [App and API Protection Library Configuration][8].

<div class="alert alert-info">
  <strong>Note:</strong> As the Datadog External Processor is built on top of the Datadog Go Tracer, it generally follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version (for example, <code>v2.2.2</code>). In some cases, early release versions might be published between official tracer releases, and these images are tagged with a suffix such as <code>-docker.1</code>.
</div>

## Limitations

The Envoy integration has the following limitations:

* Inspection of request and response bodies is supported when using the Datadog External Processor image version `v2.2.2` or later.

For additional details on the Envoy integration compatibilities, refer to the [Envoy integration compatibility page][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /tracing/guide/remote_config
[3]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_proc_filter
[4]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[5]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[6]: https://github.com/DataDog/dd-trace-go
[7]: /tracing/trace_collection/library_config/go/
[8]: /security/application_security/policies/library_configuration/
[9]: /security/application_security/setup/compatibility/envoy