---
title: Managing DatadogPodAutoscaler with Terraform
aliases:
  - /containers/guide/manage-datadogpodautoscaler-with-terraform
further_reading:
  - link: 'https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/'
    tag: 'Blog'
    text: 'Kubernetes autoscaling guide: determine which solution is right for your use case'
  - link: "https://docs.datadoghq.com/containers/monitoring/autoscaling/"
    tag: "Documentation"
    text: "Datadog Kubernetes Autoscaling"
  - link: "https://docs.datadoghq.com/agent/cluster_agent/"
    tag: "Documentation"
    text: "Datadog Cluster Agent"
  - link: "https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs"
    tag: "External Site"
    text: "Terraform Kubernetes Provider documentation"
  - link: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/"
    tag: "External Site"
    text: "Kubernetes Horizontal Pod Autoscaling documentation"
---

## Overview

The [DatadogPodAutoscaler (DKA)][1] is a Kubernetes custom resource definition (CRD) that enables autoscaling of Kubernetes workloads based on Datadog metrics. This guide demonstrates how to manage DatadogPodAutoscaler resources using Terraform and Hashicorp's kubernetes provider to deploy an autoscaling configurations.

## Prerequisites

Before you begin, ensure you have the following:

- **Kubernetes Cluster**: A working Kubernetes cluster with access via `kubectl`
- **Terraform**: Terraform installed (version 0.13 or later recommended)
- **Datadog API Credentials**: Valid Datadog API and Application keys

## Project Structure

This guide uses a multi-stage deployment approach to ensure proper dependency creation for Terraform

```
.
├── providers.tf              # Provider configurations
├── variables.tf              # Input variables
├── main.tf                   # Stage 1: Datadog secret and operator (CRDs)
├── terraform.tfvars          # Example variable values
├── datadogagent/             # Stage 2: DatadogAgent CRD resource
│   └── main.tf               # DatadogAgent manifest
├── nginx-dka/                # Stage 3: Nginx application with DKA
│   └── main.tf               # Nginx namespace, deployment, and DKA
```

## Deployment Stages

A multi-stage deployment approach is essential when working with Kubernetes Custom Resource Definitions (CRDs) and Terraform. Here's why this approach is necessary:

Kubernetes CRDs must be installed in the cluster before you can create custom resources that use them. The DatadogPodAutoscaler CRD is created when you install the Datadog Operator in Stage 1. Terraform needs to know about these CRDs before it can manage resources that depend on them.

The Terraform Kubernetes provider discovers available resource types at initialization time. If you try to create a DatadogPodAutoscaler resource before the CRD is installed, Terraform will fail because it doesn't recognize the custom resource type.

1. **Stage 1 (Datadog Operator and CRDs)**: Creates Datadog secret and operator and CRD
   - Datadog operator via Helm (creates CRDs)
2. **Stage 2 (Datadog Agent)**: Deploys the Datadog Agent configured for Datadog Kuberentes Autoscaling
   - Datadog API and APP secrets
   - DatadogAgent custom resource with Cluster Agent enabled
   - Requires Stage 1 to complete first
3. **Stage 3 (Autoscaled workload)**: Deploys application with DatadogPodAutoscaler
   - Nginx namespace and deployment
   - DatadogPodAutoscaler resource for autoscaling the Nginx deployment

### Stage 1: Datadog Operator and CRDs

#### providers.tf

```hcl
provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes = {
    config_path = "~/.kube/config"
  }
}
```

#### main.tf

```hcl
resource "helm_release" "datadog_operator" {
  name       = "datadog-operator"
  namespace  = "datadog"
  repository = "https://helm.datadoghq.com"
  chart      = "datadog-operator"
  version    = "2.11.1" # You can update to the latest stable version

  create_namespace = true
}
```

### Stage 2: DatadogAgent Configuration

#### datadogagent/variables.tf

```hcl
variable "datadog_api_key" {
  description = "Datadog API key"
  type        = string
  sensitive   = true
}

variable "datadog_app_key" {
  description = "Datadog Application key"
  type        = string
  sensitive   = true
}
```

#### datadogagent/main.tf

```hcl
provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_secret" "datadog_secret" {
  metadata {
    name      = "datadog-secret"
    namespace = "datadog"
  }

  data = {
    api-key = var.datadog_api_key
    app-key = var.datadog_app_key
  }

  type = "Opaque"
}

resource "kubernetes_manifest" "datadog" {
  manifest = {
    apiVersion = "datadoghq.com/v2alpha1"
    kind       = "DatadogAgent"
    metadata = {
      name      = "datadog"
      namespace = "datadog"
    }
    spec = {
      features = {
        autoscaling = {
          workload = {
            enabled = true
          }
        }
        eventCollection = {
          unbundleEvents = true
        }
      }
      global = {
        site = "datadoghq.com"
        credentials = {
          apiSecret = {
            secretName = "datadog-secret"
            keyName = "api-key"
          }
          appSecret = {
            secretName = "datadog-secret"
            keyName = "app-key"
          }
        }
        clusterName = "minikube-dka-demo"
        kubelet = {
          tlsVerify = false
        }
      }
      override = {
        clusterAgent = {
          env = [
            {
              name  = "DD_AUTOSCALING_FAILOVER_ENABLED"
              value = "true"
            }
          ]
        }
        nodeAgent = {
          env = [
            {
              name  = "DD_AUTOSCALING_FAILOVER_ENABLED"
              value = "true"
            }
          ]
        }
      }
    }
  }
} 
```

### Stage 3: Application with DatadogPodAutoscaler

#### nginx-dka/main.tf

```hcl
terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

# Create namespace for the application
resource "kubernetes_namespace" "nginx_demo" {
  metadata {
    name = "nginx-dka-demo"
  }
}

# Nginx deployment
resource "kubernetes_deployment" "nginx" {
  metadata {
    name      = "nginx"
    namespace = kubernetes_namespace.nginx_demo.metadata[0].name
    labels = {
      app = "nginx"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app = "nginx"
      }
    }

    template {
      metadata {
        labels = {
          app = "nginx"
        }
      }

      spec {
        container {
          image = "nginx:latest"
          name  = "nginx"

          port {
            container_port = 80
          }

          resources {
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
            requests = {
              cpu    = "250m"
              memory = "256Mi"
            }
          }
        }
      }
    }
  }
}

# Service for the nginx deployment
resource "kubernetes_service" "nginx" {
  metadata {
    name      = "nginx-service"
    namespace = kubernetes_namespace.nginx_demo.metadata[0].name
  }

  spec {
    selector = {
      app = "nginx"
    }

    port {
      port        = 80
      target_port = 80
    }

    type = "ClusterIP"
  }
}

# DatadogPodAutoscaler for nginx
resource "kubernetes_manifest" "datadogpodautoscaler_nginx_dka_demo_nginx" {
  manifest = {
    "apiVersion" = "datadoghq.com/v1alpha2"
    "kind" = "DatadogPodAutoscaler"
    "metadata" = {
      "name" = "nginx"
      "namespace" = "nginx-dka-demo"
    }
    "spec" = {
      "applyPolicy" = {
        "mode" = "Apply"
        "scaleDown" = {
          "rules" = [
            {
              "periodSeconds" = 1200
              "type" = "Percent"
              "value" = 20
            },
          ]
          "stabilizationWindowSeconds" = 600
          "strategy" = "Max"
        }
        "scaleUp" = {
          "rules" = [
            {
              "periodSeconds" = 120
              "type" = "Percent"
              "value" = 50
            },
          ]
          "stabilizationWindowSeconds" = 600
          "strategy" = "Max"
        }
        "update" = {
          "strategy" = "Auto"
        }
      }
      "constraints" = {
        "containers" = [
          {
            "enabled" = true
            "name" = "nginx"
          },
        ]
        "maxReplicas" = 100
        "minReplicas" = 3
      }
      "objectives" = [
        {
          "podResource" = {
            "name" = "cpu"
            "value" = {
              "type" = "Utilization"
              "utilization" = 70
            }
          }
          "type" = "PodResource"
        },
      ]
      "owner" = "Local"
      "targetRef" = {
        "apiVersion" = "apps/v1"
        "kind" = "Deployment"
        "name" = "nginx"
      }
    }
  }
}
```

## Deployment Instructions

### 1. Deploy Stage 1 (Datadog Operator and CRDs)

```bash
terraform init
terraform apply
```

### 2. Verify Stage 1

```bash
kubectl get crd 
kubectl get pods -n datadog
```

You should see that the Datadog CRDs are created and the datadog-operator pod is running

### 2. Deploy Stage 2 (DatadogAgent)

Create terraform.tfvars file with your Datadog credentials
```bash
cat > datadogagent/terraform.tfvars << EOF
datadog_api_key = "your-api-key-here"
datadog_app_key = "your-app-key-here"
EOF
```
Alternatively, set the `TF_VAR_datadog_api_key` and `TF_VAR_datadog_app_key` enviornment variables in your shell.

```bash
cd datadogagent
terraform init
terraform apply
```

### Verify Stage 2

```
kubectl get datadogagent -n datadog
```
You should see the datadog agent custom resouce created. It should be in the `Running` state before proceeding.

```
kubectl get pods -n datadog
```

You should see that the datadog agent and datadog-cluster-agent pods are running.

### 3. Deploy Stage 3 (Nginx with DKA)

```bash
cd ../nginx-dka
terraform init
terraform apply
```

After deployment, verify that all components are working correctly:

### Check DatadogAgent Status

```bash
kubectl get datadogagent -n datadog
kubectl describe datadogagent datadog -n datadog
```

### Check DatadogPodAutoscaler Status

```bash
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx-autoscaler -n nginx-dka-demo
```
Congratulations, you now have a workload managed by the Datadog Kubernetes Autoscaler!

## Cleanup

To remove all resources, follow the reverse order:

### 1. Cleanup Stage 3

```bash
cd nginx-dka
terraform destroy
```

### 2. Cleanup Stage 2

```bash
cd ../datadogagent
terraform destroy
```

### 3. Cleanup Stage 1

```bash
cd ..
terraform destroy
```

## Troubleshooting

### Debugging Commands

```bash
# Check DatadogPodAutoscaler events
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'

# Check Cluster Agent logs
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent 
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/monitoring/autoscaling/
