---
title: Enabling App and API Protection for GCP Service Extensions
code_lang: gcp-service-extensions
code_lang_weight: 50
aliases:
  - /security/application_security/threats/setup/threat_detection/gcp-service-extensions
  - /security/application_security/threats_detection/gcp-service-extensions
  - /security/application_security/setup/gcp-service-extensions
  - /security/application_security/setup/gcp/alb
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions'
      tag: "Source Code"
      text: "App and API Protection Service Extension's source code"
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

{{< callout url="#" btn_hidden="true" header="App and API Protection Service Extensions is in Preview" >}}
To try the preview of App and API Protection Service Extensions for GCP, use the following setup instructions.
{{< /callout >}}

You can enable App and API Protection with GCP Service Extensions within GCP Cloud Load Balancing. The Datadog App and API Protection Service Extensions integration provides threat detection and blocking capabilities directly in your GCP environment.

## Prerequisites

- The [Datadog Agent][1] is installed and configured for your application's operating system or container, cloud, or virtual environment.
- [Remote Configuration][2] is configured to enable blocking attackers through the Datadog UI.
- In your GCP project, you have either the project `owner` or `editor` role, or the relevant Compute Engine IAM roles: `compute.instanceAdmin.v1` (to create instances) and `compute.networkAdmin` (to set up load balancing).
- A GCP project with a Cloud Load Balancer is configured for your services. The Cloud Load Balancer must be one of the [Application Load Balancers that supports Traffic Callouts][3].
- Compute Engine API and Network Services API are enabled:
  
  ```bash
  gcloud services enable compute.googleapis.com networkservices.googleapis.com
  ```

## Enabling threat detection

To set up the App and API Protection Service Extension in GCP, use the Google Cloud Console with VM Compute Engine or Terraform scripts, and complete the following steps.

**Note:** Google Cloud provides guides for creating [a callout backend service][4] and [configuring a Service Extension as a traffic extension][5]. The following steps use the same general setup but include custom configurations specific to Datadog's App and API Protection integration.

{{< tabs >}}
{{% tab "VM Compute Engine" %}}

1. Create a VM Compute Engine instance using the [Datadog App and API Protection Service Extensions Callout][1] container image.

    See [Configuration](#configuration) for available environment variables when setting up your VM instance.

    <div class="alert alert-info">
      <strong>Note:</strong> Be sure to update your Firewall rules to allow the Load Balancer and Datadog agent to communicate with the Callout VM instance.
    </div>

2. Add the VM to an unmanaged instance group.
  
    Specify `http:80` and `grpc:443` (or your configured values) for the port mappings of the instance group.

3. Create a backend service with the following settings:
    - Protocol: `HTTP2`
    - Port name: `grpc`
    - Region: select your region
    - Health check port number: `80` (or your configured value)

4. Add the instance group with the service extension VM as a backend to this backend service.

5. Configure the Traffic Service Extension callout:
    1. In the Google Cloud console, go to **Service Extensions** and create a new Service Extension.
    2. Select your load balancer type.
    3. Select `Traffic extensions` as the type.
    4. Select your forwarding rules.
  <br><br>

6. Create an Extension Chain

    1. To send all traffic to the extension, insert `true` in the **Match condition**.
    2. For **Programability type**, select `Callouts`.
    3. Select the backend service you created in the previous step.
    4. In **Events**, select **only** `Request Headers` and `Response Headers`. These are required. Do not select the bodies events. These are supported out-of-the-box by configuring the Service Extension callout with the body processing size limit.
    5. Optionally, enable the `fail_open` to still allow the traffic to pass through if the service extension fails or times out.

    <br>
    <div class="alert alert-danger">
      <strong>Note:</strong> By default, if the service extension fails or times out, the proxy will return a 5xx error. To prevent this, enable the <code>fail_open</code> setting. When enabled, request or response processing continues without error even if the extension fails, ensuring your application remains available.
    </div>

    <div class="alert alert-info">
      <p>
        <strong>Note:</strong> When body processing is enabled, the service extension decides based on its configuration whether to receive the request body, the response body, or both, along with the headers which are always included. This decision is made separately for requests and responses. Receiving body content can increase processing time, especially for large payloads. If you enable body processing, make sure to <strong>adjust your timeout settings</strong> to allow for the additional processing time required for body inspection and transfer.
      </p>
    </div>
</br>

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

[1]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
{{% /tab %}}

{{% tab "Terraform" %}}

You can use Terraform to automate the deployment of the App and API Protection GCP Service Extension. This simplifies the process of setting up the service extension to work with your existing load balancer.

### Prerequisites for Terraform deployment

- [Terraform][1] installed on your local machine (version 1.0.0 or later)
- GCP credentials with appropriate permissions
- A Datadog API key (used to configure the Datadog Agent)
- An existing GCP Cloud Load Balancer for your application

### Infrastructure Overview

The Terraform deployment will create the following components:
- A Datadog Agent VM for collecting traces with security events
- A VM running the Datadog Service Extension Callout in a container
- A firewall rule allowing communication between the extension and the Agent
- An unmanaged instance group containing the Service Extension VM
- A backend service configured for HTTP/2 with health checks
- A service extension connected to your existing load balancer

### Deployment Steps

The App and API Protection Service Extension deployment requires several components that work together. We'll create a Terraform module that encapsulates all these components, making the deployment process repeatable and easier to maintain.

1. Create a new directory and the necessary Terraform files:

    ```bash
    mkdir gcp-aap-service-extension && cd gcp-aap-service-extension
    touch main.tf variables.tf
    ```

2. Add the following code to your `main.tf` file. This file defines all the infrastructure components needed for the App and API Protection Service Extension, including network rules, VM instances, and load balancer configuration:

   ```hcl
   # main.tf

   #----------------------------------------------------------
   # Network Configuration
   #----------------------------------------------------------

   # Firewall rule to allow the Service Extension to communicate with the Datadog Agent
   resource "google_compute_firewall" "aap_se_firewall" {
     name    = "${var.project_prefix}-dd-agent-firewall"
     network = "default"

     allow {
       protocol = "tcp"
       ports    = ["8126"]
     }

     source_tags = ["http-server"]
     target_tags = ["datadog-agent"]
   }

   #----------------------------------------------------------
   # Datadog Agent Configuration
   #----------------------------------------------------------

   # Datadog Agent container configuration
   module "gce-container-datadog-agent" {
     source = "terraform-google-modules/container-vm/google"

     container = {
       image = "public.ecr.aws/datadog/agent:latest"
       env = [
         {
           name = "DD_API_KEY",
           value = var.datadog_agent_api_key,
         },
         {
           name = "DD_ENV",
           value = "dev",
         },
       ]
     }
   }

   # Datadog Agent VM instance that collects traces from the Service Extension
   resource "google_compute_instance" "datadog_agent" {
     name         = "${var.project_prefix}-datadog-agent"
     machine_type = "e2-medium"
     zone         = var.zone

     boot_disk {
       auto_delete = true

       initialize_params {
         image = module.gce-container-datadog-agent.source_image
       }

     }

     network_interface {
       network    = "default"
       subnetwork = var.application_vpc_subnetwork
     }

     metadata = {
       gce-container-declaration = module.gce-container-datadog-agent.metadata_value
       google-logging-enabled    = "true"
     }

     lifecycle {
       create_before_destroy = true
     }

     tags = ["datadog-agent"]
   }

   #----------------------------------------------------------
   # Service Extension Callout Container Configuration
   #----------------------------------------------------------

   # Datadog App and API Protection GCP Service Extension container configuration
   module "gce-container-aap-service-extension" {
     source = "terraform-google-modules/container-vm/google"

     container = {
       image = "ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.2.2" # Replace with the latest version
       env = [
         {
           name = "DD_AGENT_HOST",
           value = google_compute_instance.datadog_agent.network_interface.0.network_ip,
         },
         # Enable the body processing by uncommenting the following lines. Set accordingly the body processing size limit.
         # {
         #   name = "DD_APPSEC_BODY_PARSING_SIZE_LIMIT",
         #   value = "10000000" # Body processing size limit in bytes. (10MB)
         # }
       ]
     }
   }

   # Service Extension VM instance (callout instance)
   resource "google_compute_instance" "default" {
     name         = "${var.project_prefix}-instance"
     machine_type = "e2-medium"
     zone         = var.zone

     boot_disk {
       auto_delete = true

       initialize_params {
         image = module.gce-container-aap-service-extension.source_image
       }

     }

     network_interface {
       network    = var.application_vpc_network
       subnetwork = var.application_vpc_subnetwork
     }

     metadata = {
       gce-container-declaration = module.gce-container-aap-service-extension.metadata_value
       google-logging-enabled    = "true"
     }

     lifecycle {
       create_before_destroy = true
     }

     # http-server: Allow access on the http server for health checks
     # https-server: Allow access on the 443 port for the AAP Service Extension
     tags = ["http-server", "https-server", "lb-health-check"]
   }

   #----------------------------------------------------------
   # Load Balancer Integration
   #----------------------------------------------------------

   # Unmanaged Instance Group including the App and API Protection Service Extension instance
   resource "google_compute_instance_group" "aap_se_instance_group" {
     name        = "${var.project_prefix}-instance-group"
     description = "Unmanaged instance group for the App and API Protection Service Extension"
     zone        = var.zone

     named_port {
       name = "http"
       port = 80
     }

     named_port {
       name = "grpc"
       port = "443"
     }

     instances = [
       google_compute_instance.default.self_link
     ]
   }

   # Health Check for the Backend Service
   resource "google_compute_health_check" "aap_se_health_check" {
     name                = "${var.project_prefix}-health-check"
     check_interval_sec  = 5
     timeout_sec         = 5
     healthy_threshold   = 2
     unhealthy_threshold = 2

     http_health_check {
       port         = 80
       request_path = "/"
     }
   }

   # Backend Service that points to the Service Extension instance group
   resource "google_compute_backend_service" "se_backend_service" {
     name                  = "${var.project_prefix}-backend-service"
     port_name             = "grpc"
     protocol              = "HTTP2"
     timeout_sec           = 10
     health_checks         = [google_compute_health_check.aap_se_health_check.self_link]
     load_balancing_scheme = "EXTERNAL_MANAGED"

     backend {
       group = google_compute_instance_group.aap_se_instance_group.self_link
     }
   }

   #----------------------------------------------------------
   # GCP Service Extension
   #----------------------------------------------------------

   # GCP Service Extension configuration for traffic interception
   resource "google_network_services_lb_traffic_extension" "default" {
     name        = "${var.project_prefix}-service-extension"
     description = "Datadog App and API Protection Service Extension"
     location    = "global"

     load_balancing_scheme = "EXTERNAL_MANAGED"
     forwarding_rules      = [var.load_balancer_forwarding_rule]

     extension_chains {
       name = "${var.project_prefix}-service-extension-chain"

       match_condition {
         cel_expression = "true" # Match all traffic
       }

       extensions {
         name      = "${var.project_prefix}-service-extension-chain-ext"
         service   = google_compute_backend_service.se_backend_service.self_link

         # Required: Please set your application hostname.
         authority = "datadoghq.com"

         # By default, if the service extension fails or times out, the proxy will return a 500 error.
         # To prevent this, enable the fail_open setting.
         # When enabled, the request processing is stopped when an error occurs but the request is not dropped, ensuring the availability of the application.
         fail_open = true

         # Mandatory, do not touch: Only set the Request and Response Headers events.
         # If bodies events are selected, the service extension will transfer and analyze the bodies for every request without applying relevant selection rules.
         # Please use the DD_APPSEC_BODY_PARSING_SIZE_LIMIT environment variable on the callout container to enable body processing.
         supported_events = ["REQUEST_HEADERS", "RESPONSE_HEADERS"]

         # Adjust your timeout settings depending of your processing needs (e.g. with body processing)
         # Note: This is the same option as the "message_timeout" for an Envoy ext_proc configuration.
         timeout   = "0.5s"
       }
     }
   }
   ```

3. Add the following content to the `variables.tf` file. This file defines all the required input variables for your Terraform configuration:

   ```hcl
   # variables.tf

   variable "region" {
     description = "The GCP region where resources will be created (e.g., us-central1)"
     type        = string
     validation {
       condition     = length(var.region) > 0
       error_message = "Region cannot be empty."
     }
   }

   variable "zone" {
     description = "The GCP zone where zonal resources will be created (e.g., us-central1-a)"
     type        = string
     validation {
       condition     = length(var.zone) > 0
       error_message = "Zone cannot be empty."
     }
   }

   # Project configuration
   variable "project_prefix" {
     description = "Prefix for the project. All resource names will be prefixed with this value"
     type        = string
     validation {
       condition     = length(var.project_prefix) > 0
       error_message = "Project prefix cannot be empty."
     }
   }

   # Network configuration
   variable "application_vpc_network" {

     description = "Name of the VPC network for the application"
     type        = string
     validation {
       condition     = length(var.application_vpc_network) > 0
       error_message = "VPC network name cannot be empty."
     }
   }

   variable "application_vpc_subnetwork" {

     description = "Name of the VPC subnetwork for the application"
     type        = string
     validation {
       condition     = length(var.application_vpc_subnetwork) > 0
       error_message = "VPC subnetwork name cannot be empty."
     }
   }

   # Authentication and API keys
   variable "datadog_agent_api_key" {
     description = "Datadog API key"
     type        = string
     sensitive   = true
     validation {
       condition     = length(var.datadog_agent_api_key) > 0
       error_message = "Datadog API key cannot be empty."
     }
   }

   # Load balancer configuration
   variable "load_balancer_forwarding_rule" {
     description = "Self link to the forwarding rule for the load balancer"
   }
   ```

4. Include the module in your main Terraform project. This example shows how to reference the module you created above:

   ```hcl
   # main.tf

   module "service_extension" {
     source                        = "./gcp-aap-service-extension"
     zone                          = "us-central1-a"
     region                        = "us-central1"
     project_prefix                = "datadog-aap"
     application_vpc_subnetwork    = "your-subnet-name"
     datadog_agent_api_key         = "your-datadog-api-key"
     load_balancer_forwarding_rule = "projects/your-project/regions/us-central1/forwardingRules/your-lb-rule" # or with a self link on your resource
   }
   ```

5. Deploy the infrastructure by running these commands in the directory where your Terraform files are located:

   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

### Post-deployment validation

The service extension automatically inspects all traffic passing through your load balancer for security threats.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

[1]: https://www.terraform.io/
{{% /tab %}}
{{< /tabs >}}

## Configuration

The Datadog App and API Protection Service Extension Docker image supports the following configuration settings:

| Environment variable                    | Default value       | Description                                                                                                                              |
|-----------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`             | `0.0.0.0`           | gRPC server listening address.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`             | `443`               | gRPC server port.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT` | `80`                | HTTP server port for health checks.                                                                                                      |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`     | `0`                 | Maximum size of the bodies to be processed in bytes. If set to `0`, the bodies are not processed. (Recommended value: `10000000` (10MB)) |
| `DD_SERVICE`                            | `serviceextensions` | Service name shown in the Datadog UI.                                                                                                    |

Configure the container to send traces to your Datadog Agent using the following environment variables:

| Environment variable                   | Default value | Description                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Hostname or IP of your Datadog Agent.                                            |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Port of the Datadog Agent for trace collection.                                  |

The App and API Protection GCP Service Extensions integration is built on top of the [Datadog Go Tracer][6] and inherits all of its environment variables. See [Configuring the Go Tracing Library][7] and [App and API Protection Library Configuration][8].

<div class="alert alert-danger">
  <strong>Note:</strong> As the App and API Protection GCP Service Extensions integration is built on top of the Datadog Go Tracer, it generally follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version (for example, <code>v2.2.2</code>). In some cases, early release versions might be published between official tracer releases, and these images are tagged with a suffix such as <code>-docker.1</code>.
</div>

## Limitations

The GCP Service Extensions integration has the following limitations:

* Inspection of request and response bodies is supported when using service extension callout image version `v2.2.2` or later.
* Currently, GCP Service Extensions does not support an asynchronous (observability) mode.

For additional details on the GCP Service Extensions integration compatibilities, refer to the [GCP Service Extensions integration compatibility page][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://cloud.google.com/service-extensions/docs/lb-extensions-overview#supported-lbs
[4]: https://cloud.google.com/service-extensions/docs/configure-callout-backend-service
[5]: https://cloud.google.com/service-extensions/docs/configure-traffic-extensions
[6]: https://github.com/DataDog/dd-trace-go
[7]: /tracing/trace_collection/library_config/go/
[8]: /security/application_security/policies/library_configuration/
[9]: /security/application_security/setup/compatibility/gcp-service-extensions