---
title: Enabling ASM for GCP Service Extensions
code_lang: gcp-service-extensions
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security_platform/application_security/getting_started/gcp-service-extensions
  - /security/application_security/getting_started/gcp-service-extensions
  - /security/application_security/enabling/tracing_libraries/threat_detection/gcp-service-extensions/
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions'
      tag: "Source Code"
      text: "ASM Service Extension's source code"
    - link: 'https://cloud.google.com/service-extensions/docs/overview'
      tag: "Documentation"
      text: "Google Cloud Service Extensions overview"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Management Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Management"
---

You can enable application security with GCP Service Extension within GCP Cloud Load Balancing. The Datadog ASM Service Extensions has support for threat detection and blocking.

## Prerequisites

- The [Datadog Agent][1] is installed and configured for your application's operating system or container, cloud, or virtual environment.
- [Configure the Agent with Remote Configuration][2] to be able to block attackers from the Datadog UI.
- In your GCP Project, verify that you have either the project owner or editor role, or else the relevant Compute Engine IAM roles: `compute.instanceAdmin.v1` (to spin up instances) and `compute.networkAdmin` (to set up load balancing).
- A GCP project with a Cloud Load Balancer configured with your services. Your Cloud Load Balancer must be one of the [Application Load Balancer that supports Traffic Callouts][3].
- Ensure that the Compute Engine API and Network Services API are enabled:
```bash
gcloud services enable compute.googleapis.com networkservices.googleapis.com
```

## Enabling threat detection
### Get started

On your GCP project, multiple steps are needed to fully create a Service Extension. Google Cloud provides guides to create [a callout backend service][4] and [create a Service Extension as a traffic extension][5].

You can find a the important steps to create a Service Extension with ASM below:

1. **Create a new VM Compute instance** using the Datadog Service Extension docker image. The image is available on the [Datadog Go tracer GitHub Registry][6].

   **Note**: The ASM Service Extension is done using the [Datadog Go Tracer][7], the image is tagged with the same version as the tracer. The docker image is updated in the same release process as the tracer.

   The docker image expose some configuration specifically for the ASM Service Extension:
   | Environment variable                   | Default value   | Description                                                       |
   |----------------------------------------|-----------------|-------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST`            | `0.0.0.0`       | gRPC server listening address.                                    |
   | `DD_SERVICE_EXTENSION_PORT`            | `443`           | gRPC server port.                                                 |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80`            | HTTP server port for health checks.                               |


   As the integration is using the Datadog Go Tracer, it inherits all environment variables from the tracer. You can find more information in [Configuring the Go Tracing Library][8] and [ASM Library Configuration][9].

   The Datadog Agent needs to be configured to receive traces from the Service Extension:
   | Environment variable                   | Default value | Description                                                           |
   |----------------------------------------|---------------|-----------------------------------------------------------------------|
   | `DD_AGENT_HOST`                        | `localhost`   | Hostname where your Datadog Agent is running.                         |
   | `DD_TRACE_AGENT_PORT`                  | `8126`        | Port of the Datadog Agent for trace collection.                       |

2. **Add the VM to an unmanaged instance group.**

   Specify `http:80` and `grpc:443` (or any other previously configured values) for the Port mappings of the instance group.

3. **Update the load balancer by creating a backend service and adding a backend.**

   Create a callout backend service that uses the HTTP/2 protocol and has an HTTP health check:
   - Protocol: HTTP2
   - Port name: `grpc`
   - Region: us-west1
   - Health check port number: `80` (or any other previously configured value)
   - Finally add the instance group with the extension server as a backend to the backend service

   4. **Create a Traffic Service Extension callout.**

   In the Google Cloud console, go to the Service Extensions page and create a new Service Extension.
   - Correcly select the type of load balancer you are using
   - Select `Traffic extensions` as the type
   - Select your forwarding rules

   When creating a new Extension Chain:
     - Insert `true` in the **Match condition** to send all traffic to the extension
     - Select `Callouts` as the **Programability type**
     - Select the backend service you created in the previous step
     - Select all **Events** from the list where you want ASM to run detection on

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Limitations

As of version `1.71.0` the available functionality has the following important limitations:

* The request body is not inspected, regardless of its content type.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://cloud.google.com/service-extensions/docs/lb-extensions-overview#supported-lbs
[4]: https://cloud.google.com/service-extensions/docs/configure-callout-backend-service
[5]: https://cloud.google.com/service-extensions/docs/configure-traffic-extensions
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: https://docs.datadoghq.com/tracing/trace_collection/library_config/go/
[9]: https://docs.datadoghq.com/security/application_security/threats/library_configuration/
