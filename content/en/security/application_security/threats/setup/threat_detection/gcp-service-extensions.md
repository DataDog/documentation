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

You can enable application security with GCP Service Extensions within GCP Cloud Load Balancing. The Datadog App and API Protection (AAP) Service Extensions integration provides threat detection and blocking capabilities directly in your GCP environment.

## Prerequisites

Before you begin, ensure you have:

- The [Datadog Agent][1] installed and configured for your application's operating system or container, cloud, or virtual environment.
- [Configured the Agent with Remote Configuration][2] to enable blocking attackers using the Datadog UI.
- In your GCP project, either the project `owner` or `editor` role, or the relevant Compute Engine IAM roles: `compute.instanceAdmin.v1` (to create instances) and `compute.networkAdmin` (to set up load balancing).
- A GCP project with a Cloud Load Balancer configured for your services. Your Cloud Load Balancer must be one of the [Application Load Balancers that supports Traffic Callouts][3].
- The Compute Engine API and Network Services API enabled:
  
  ```bash
  gcloud services enable compute.googleapis.com networkservices.googleapis.com
  ```

## Enabling Threat Detection

To set up the ASM Service Extension in your GCP environment, follow the instructions by either using the Google Cloud Console or Terraform scripts.

**Note**: Google Cloud provides guides to create [a callout backend service][4] 
and [create a Service Extension as a traffic extension][5].

{{< tabs >}}
{{% tab "Google Cloud Console" %}}

1. **Create a new VM Compute instance** using the Datadog Service Extensions Docker image. The image is available on the [Datadog Go tracer GitHub Registry][6].

   The Docker image supports the following configuration settings:
   | Environment variable                   | Default value   | Description                                                       |
   |----------------------------------------|-----------------|-------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST`            | `0.0.0.0`       | gRPC server listening address.                                    |
   | `DD_SERVICE_EXTENSION_PORT`            | `443`           | gRPC server port.                                                 |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80`            | HTTP server port for health checks.                               |

   Configure the container to send traces to your Datadog Agent using the following environment variables:
   | Environment variable                   | Default value | Description                                                           |
   |----------------------------------------|---------------|-----------------------------------------------------------------------|
   | `DD_AGENT_HOST`                        | `localhost`   | Hostname where your Datadog Agent is running.                         |
   | `DD_TRACE_AGENT_PORT`                  | `8126`        | Port of the Datadog Agent for trace collection.                       |

2. **Add the VM to an unmanaged instance group**

   Specify `http:80` and `grpc:443` (or your configured values) for the port mappings of the instance group.

3. **Create a backend service and add your instance group**

   Create a callout backend service with the following settings:
   - Protocol: `HTTP2`
   - Port name: `grpc`
   - Region: Select your region
   - Health check port number: `80` (or your configured value)
  
   Add the instance group with the extension server as a backend to this backend service.

4. **Configure the Traffic Service Extension callout**
    
   1. In the Google Cloud console, go to **Service Extensions** and create a new Service Extension
   2. Select your load balancer type
   3. Select `Traffic extensions` as the type
   4. Select your forwarding rules
   
5. **Create a new Extension Chain**

   1. To send all traffic to the extension, insert `true` in the **Match condition**
   2. For **Programability type**, select `Callouts`
   3. Select the backend service you created in the previous step
   4. Select all **Events** from the list where you want ASM to run detection (Request Headers and Response Headers are **required**)

{{% /tab %}}

{{% tab "Terraform" %}}

You can use Terraform to automate the deployment of the ASM GCP Service Extension. This simplifies the process of setting up the service extension to work with your existing load balancer.

### Prerequisites for Terraform deployment

- [Terraform][1] installed on your local machine (version 1.0.0 or later)
- GCP credentials with appropriate permissions
- A Datadog API key (that will be used to configure the Datadog Agent)
- An existing GCP Cloud Load Balancer for your application

### Deployment steps

#### 1. Create Terraform configuration files

Create the following files in your project directory:

```hcl
# main.tf

provider "google" {
  project     = var.project
  region      = var.region
  credentials = file(var.credentials_file)
}

# Firewall rule to allow the Service Extension to communicate with the Datadog Agent
resource "google_compute_firewall" "asm_se_firewall" {
  name    = "${var.prefix}-dd-agent-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["8126"]
  }

  source_tags = ["http-server"]
  target_tags = ["datadog-agent"]
}

# Datadog Agent VM using container module
module "gce-container-datadog-agent" {
  source = "terraform-google-modules/container-vm/google"

  container = {
    image = "public.ecr.aws/datadog/agent:latest"
    env = [
      {
        name  = "DD_API_KEY"
        value = var.datadog_api_key
      },
      {
        name  = "DD_ENV"
        value = "dev"
      }
    ]
  }
}

resource "google_compute_instance" "datadog_agent" {
  name         = "${var.prefix}-datadog-agent"
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
    subnetwork = var.vpc_subnetwork
  }

  metadata = {
    gce-container-declaration = module.gce-container-datadog-agent.metadata_value
    google-logging-enabled    = "true"
  }

  tags = ["datadog-agent"]
}

# Datadog ASM GCP Service Extension instance
module "gce-container-asm-service-extension" {
  source = "terraform-google-modules/container-vm/google"

  container = {
    image = "ghcr.io/datadog/dd-trace-go/service-extensions-callout:v1.72.0" # Replace with the latest version
    env = [
      {
        name  = "DD_AGENT_HOST"
        value = google_compute_instance.datadog_agent.network_interface.0.network_ip
      },
      {
        name  = "DD_APPSEC_WAF_TIMEOUT"
        value = "0.1s"
      }
    ]
  }
}

resource "google_compute_instance" "asm_service_extension" {
  name         = "${var.prefix}-service-extension"
  machine_type = "e2-medium"
  zone         = var.zone

  boot_disk {
    auto_delete = true
    initialize_params {
      image = module.gce-container-asm-service-extension.source_image
    }
  }

  network_interface {
    network    = "default"
    subnetwork = var.vpc_subnetwork
  }

  metadata = {
    gce-container-declaration = module.gce-container-asm-service-extension.metadata_value
    google-logging-enabled    = "true"
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = ["http-server", "https-server", "lb-health-check"]

  depends_on = [google_compute_instance.datadog_agent]
}

# Unmanaged Instance Group including the ASM Service Extension instance
resource "google_compute_instance_group" "asm_se_instance_group" {
  name        = "${var.prefix}-instance-group"
  description = "Unmanaged instance group for the ASM Service Extension"
  zone        = var.zone

  named_port {
    name = "http"
    port = 80
  }

  named_port {
    name = "grpc"
    port = 443
  }

  instances = [
    google_compute_instance.asm_service_extension.self_link
  ]
}

# Health Check for the Backend Service
resource "google_compute_health_check" "asm_se_health_check" {
  name                = "${var.prefix}-health-check"
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
resource "google_compute_region_backend_service" "se_backend_service" {
  name                  = "${var.prefix}-backend-service"
  region                = var.region
  port_name             = "grpc"
  protocol              = "HTTP2"
  timeout_sec           = 10
  health_checks         = [google_compute_health_check.asm_se_health_check.self_link]
  load_balancing_scheme = "INTERNAL_MANAGED"

  backend {
    group = google_compute_instance_group.asm_se_instance_group.self_link
    capacity_scaler = 1.0
  }
}

# GCP Service Extension configuration
resource "google_network_services_lb_traffic_extension" "default" {
  name        = "${var.prefix}-service-extension"
  description = "Datadog ASM Service Extension"
  location    = var.region

  load_balancing_scheme = "INTERNAL_MANAGED"
  forwarding_rules      = [var.load_balancer_forwarding_rule]

  extension_chains {
    name = "${var.prefix}-service-extension-chain"

    match_condition {
      cel_expression = "true" # Match all traffic
    }

    extensions {
      name      = "${var.prefix}-service-extension-chain-ext"
      authority = "datadoghq.com"
      service   = google_compute_region_backend_service.se_backend_service.self_link
      timeout   = "0.5s"
      fail_open = false # If the extension fails, the request is dropped

      supported_events = ["REQUEST_HEADERS", "REQUEST_BODY", "RESPONSE_HEADERS", "RESPONSE_BODY"]
    }
  }
}
```

```hcl
# variables.tf

variable "project" {
  description = "GCP project"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "zone" {
  description = "GCP zone"
  type        = string
}

variable "prefix" {
  description = "Prefix for all resources created by this configuration"
  type        = string
  default     = "datadog-asm"
}

variable "vpc_subnetwork" {
  description = "VPC subnetwork for the application"
  type        = string
}

variable "credentials_file" {
  description = "Path to the GCP credentials JSON file"
  type        = string
}

variable "datadog_api_key" {
  description = "Datadog API key"
  type        = string
  sensitive   = true
}

variable "load_balancer_forwarding_rule" {
  description = "Self link to the forwarding rule for the load balancer"
  type        = string
}
```

```hcl
# outputs.tf

output "service_extension_id" {
  description = "ID of the created service extension"
  value       = google_network_services_lb_traffic_extension.default.id
}
```

```hcl
# version.tf

terraform {
  required_version = ">= 1.0.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.0.0"
    }
  }
}
```

##### terraform.tfvars
Create a `terraform.tfvars` file with your specific values:

```hcl
# terraform.tfvars

project                      = "your-gcp-project"
region                       = "us-central1"
zone                         = "us-central1-a"
prefix                       = "datadog-asm"
vpc_subnetwork               = "your-subnet-name"
credentials_file             = "path-to-your-credentials.json"
datadog_api_key              = "your-datadog-api-key"
load_balancer_forwarding_rule = "projects/your-project/regions/us-central1/forwardingRules/your-lb-rule"
```

#### 2. Initialize and apply the Terraform configuration

```bash
terraform init
terraform plan
terraform apply
```

This deployment creates:
- A Datadog Agent VM for collecting security events
- A VM running the Datadog Service Extension Callout in a container
- A firewall rule allowing communication between the extension and the Agent
- An unmanaged instance group containing the Service Extension VM
- A backend service configured for HTTP/2 with health checks
- A service extension connected to your existing load balancer

The service extension will automatically inspect traffic passing through your load balancer for security threats.

#### 3. Cleaning up resources

To remove all resources created by this Terraform configuration:

```bash
terraform destroy
```

{{% /tab %}}
{{< /tabs >}}

## Verification and Monitoring

After deployment, you can verify that your service extension is functioning correctly by checking the following:

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Technical Details

### Datadog Go Tracer and GCP Service Extensions

<div class="alert alert-warning">
  <strong>Note:</strong> The GCP Service Extensions integration is built on top of the Datadog Go Tracer. It follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version.
</div>

The GCP Service Extensions integration uses the [Datadog Go Tracer][7] and inherits all environment variables from the tracer. You can find more configuration options in [Configuring the Go Tracing Library][8] and [ASM Library Configuration][9].

### Limitations

The GCP Service Extensions version `1.71.0` and all versions above currently have the following important limitations:

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