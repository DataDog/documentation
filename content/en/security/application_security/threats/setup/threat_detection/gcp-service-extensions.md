---
title: Enabling AAP for GCP Service Extensions
code_lang: gcp-service-extensions
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions'
      tag: "Source Code"
      text: "AAP Service Extension's source code"
    - link: 'https://cloud.google.com/service-extensions/docs/overview'
      tag: "Documentation"
      text: "Google Cloud Service Extensions overview"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
---

{{< callout url="#" btn_hidden="true" header="AAP Service Extensions is in Preview" >}}
To try the preview of AAP Service Extensions for GCP, follow the setup instructions below.
{{< /callout >}}

You can enable application security with GCP Service Extensions within GCP Cloud Load Balancing. The Datadog App and API Protection (AAP) Service Extensions integration has support for threat detection and blocking.

## Prerequisites

- The [Datadog Agent][1] is installed and configured for your application's operating system or container, cloud, or virtual environment.
- [Configure the Agent with Remote Configuration][2] to block attackers using the Datadog UI.
- In your GCP project, verify that you have either the project `owner` or `editor` role, or the relevant Compute Engine IAM roles: `compute.instanceAdmin.v1` (to spin up instances) and `compute.networkAdmin` (to set up load balancing).
- A GCP project with a Cloud Load Balancer configured with your services. Your Cloud Load Balancer must be one of the [Application Load Balancers that supports Traffic Callouts][3].
- Ensure that the Compute Engine API and Network Services API are enabled:
  
  ```bash
  gcloud services enable compute.googleapis.com networkservices.googleapis.com
  ```

## Enabling threat detection
### Get started

On your GCP project, multiple steps are needed to fully create a Service Extension. Google Cloud provides guides to create [a callout backend service][4] and [create a Service Extension as a traffic extension][5].

To integrate a Service Extension with AAP, do the following:

1. **Create a new VM Compute instance** using the Datadog Service Extensions Docker image. The image is available on the [Datadog Go tracer GitHub Registry][6].

   The Docker image exposes some settings:
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

2. **Add the VM to an unmanaged instance group.**

   Specify `http:80` and `grpc:443` (or any other previously configured values) for the port mappings of the instance group.

3. **Update the load balancer by creating a backend service and adding a backend.**

   Create a callout backend service that uses the HTTP/2 protocol and has an HTTP health check:
   - Protocol: `HTTP2`
   - Port name: `grpc`
   - Region: `us-west1`
   - Health check port number: `80` (or any other previously configured value)
  
   1. Add the instance group with the extension server as a backend to the backend service.

   2. Create a Traffic Service Extension callout.
    
      1. In the Google Cloud console, go to **Service Extensions** and create a new Service Extension.
      2. Select your load balancer type.
      3. Select `Traffic extensions` as the type.
      4. Select your forwarding rules.  
    </br>
   3. When creating a new Extension Chain, do the following:

      1. To send all traffic to the extension, insert `true` in the **Match condition**.
      2. For **Programability type**, select `Callouts`.
      3. Select the backend service you created in the previous step.
      4. Select all **Events** from the list where you want AAP to run detection.</br>
</br>
{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Datadog Go tracer and GCP Service Extensions

  <div class="alert alert-warning">
    <strong>Note:</strong> The GCP Service Extensions integration is built on top of the Datadog Go Tracer. It follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version.
  </div>

  The GCP Service Extensions integration uses the [Datadog Go Tracer][7] and inherits all environment variables from the tracer. You can find more information in [Configuring the Go Tracing Library][8] and [AAP Library Configuration][9].

## Limitations

The available functionality for GCP Service Extensions version `1.71.0` has the following important limitations:

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
