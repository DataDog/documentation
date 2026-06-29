---
aliases:
- /es/containers/guide/manage-datadogpodautoscaler-with-terraform
description: Despliega y gestiona recursos personalizados de DatadogPodAutoscaler
  para el escalado automático de Kubernetes utilizando Terraform
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/
  tag: Blog
  text: 'Guía de Kubernetes Autoscaling: determina qué solución es adecuada para tu
    caso de uso'
- link: https://docs.datadoghq.com/containers/monitoring/autoscaling/
  tag: Documentación
  text: Datadog Kubernetes Autoscaling
- link: https://docs.datadoghq.com/agent/cluster_agent/
  tag: Documentación
  text: Datadog Cluster Agent
- link: https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs
  tag: Sitio externo
  text: Documentación del proveedor de Kubernetes de Terraform
- link: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/
  tag: Sitio externo
  text: Documentación de Horizontal Pod Autoscaling de Kubernetes
title: Gestionando DatadogPodAutoscaler con Terraform
---
## Resumen {#overview}

El DatadogPodAutoscaler (DPA) es una definición de recurso personalizado (CRD) de Kubernetes que permite el escalado automático de cargas de trabajo de Kubernetes utilizando [Datadog Kubernetes Autoscaling (DKA)][1]. Esta guía demuestra cómo gestionar recursos de DatadogPodAutoscaler utilizando Terraform y el proveedor de Kubernetes de HashiCorp para desplegar una configuración de escalado automático.

**Activando el escalado automático a gran escala:** Para implementar el escalado automático en muchas cargas de trabajo o espacios de nombres con una política compartida, etiqueta las cargas de trabajo o espacios de nombres con `autoscaling.datadoghq.com/profile` en lugar de crear uno `DatadogPodAutoscaler` por carga de trabajo. Consulta [Perfiles de clúster][2] en el Resumen de Kubernetes Autoscaling.

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrate de tener lo siguiente:

- **Clúster de Kubernetes**: Un clúster de Kubernetes en funcionamiento con acceso utilizando `kubectl`
- **Terraform**: Terraform instalado (se recomienda la versión 0.13 o posterior)
- **Credenciales de API de Datadog**: Clave de API de Datadog válida y clave de aplicación

## Estructura del proyecto {#project-structure}

Esta guía utiliza un enfoque de implementación en múltiples etapas para asegurar la correcta creación de dependencias para Terraform.

```
.
├── providers.tf              # Provider configurations
├── variables.tf              # Input variables
├── main.tf                   # Stage 1: Datadog secret and operator (CRDs)
├── terraform.tfvars          # Example variable values
├── datadogagent/             # Stage 2: DatadogAgent CRD resource
│   └── main.tf               # DatadogAgent manifest
├── nginx-dpa/                # Stage 3: Nginx application with DPA
│   └── main.tf               # Nginx namespace, deployment, and DPA
```

## Etapas de implementación {#deployment-stages}

Un enfoque de implementación en múltiples etapas es esencial al trabajar con definiciones de recursos personalizados (CRDs) de Kubernetes y Terraform. Este enfoque ordenado es necesario para asegurar que crees e instales las dependencias requeridas para cada etapa en el proceso.

Las CRDs de Kubernetes deben ser instaladas en el clúster antes de que puedas crear recursos personalizados que las utilicen. La CRD DatadogPodAutoscaler se crea cuando instala el Datadog Operator en la Etapa 1. Terraform necesita conocer estas CRDs antes de poder gestionar recursos que dependen de ellas.

El proveedor de Kubernetes de Terraform descubre los tipos de recursos disponibles en el momento de la inicialización. Si intentas crear un recurso DatadogPodAutoscaler antes de que la CRD esté instalada, Terraform fallará porque no reconoce el tipo de recurso personalizado.

1. **Etapa 1 (Datadog Operator and CRDs)**: Crea el secreto de Datadog, el Datadog Operator y la CRD
   - Datadog Operator using Helm (crea CRDs)
2. **Etapa 2 (Datadog Agent)**: Despliega el Datadog Agent configurado para Datadog Kubernetes Autoscaling
   - Secretos de API y aplicación de Datadog
   - Recurso personalizado DatadogAgent con el agente de clúster habilitado
3. **Etapa 3 (Carga de trabajo con DatadogPodAutoscaler)**: Despliega la aplicación con DatadogPodAutoscaler
   - Espacio de nombres y despliegue de Nginx
   - Recurso DatadogPodAutoscaler para el escalado automático del despliegue de nginx

## Configura los archivos de configuración {#set-up-configuration-files}

Primero, configura los siguientes archivos de configuración para cada etapa en el proceso.

### Etapa 1: Operador de Datadog y CRDs {#stage-1-datadog-operator-and-crds}

{{< code-block lang="hcl" filename="providers.tf" >}}
provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes = {
    config_path = "~/.kube/config"
  }
}
{{< /code-block >}}

{{< code-block lang="hcl" filename="main.tf" >}}
resource "helm_release" "datadog_operator" {
  name       = "datadog-operator"
  namespace  = "datadog"
  repository = "https://helm.datadoghq.com"
  chart      = "datadog-operator"
  version    = "2.11.1" # You can update to the latest stable version

  create_namespace = true
}
{{< /code-block >}}

### Etapa 2: Datadog Agent {#stage-2-datadog-agent}

{{< code-block lang="hcl" filename="datadogagent/variables.tf" >}}
variable "datadog_api_key" {
  description = "Datadog API key"
  type        = string
  sensitive   = true
}

variable "datadog_app_key" {
  description = "Datadog application key"
  type        = string
  sensitive   = true
}
{{< /code-block >}}

{{< code-block lang="hcl" filename="datadogagent/main.tf" >}}
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
{{< /code-block >}}

### Etapa 3: Aplicación con DatadogPodAutoscaler {#stage-3-application-with-datadogpodautoscaler}

{{< code-block lang="hcl" filename="nginx-dpa/main.tf" >}}
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
{{< /code-block >}}

## Instrucciones de implementación {#deployment-instructions}

Después de haber configurado los [archivos de configuración](#set-up-configuration-files) para cada etapa, sigue estos pasos para implementar los componentes en el orden correcto.

### Etapa 1: Operador de Datadog y CRDs {#stage-1-datadog-operator-and-crds-1}

Implemente el Datadog Operator y las CRDs:

{{< code-block lang="bash" >}}
terraform init
terraform apply
{{< /code-block >}}

Verifique que el Datadog Operator y las CRDs estén implementados:

{{< code-block lang="bash" >}}
kubectl get crd
kubectl get pods -n datadog
{{< /code-block >}}

Deberías ver que los CRDs de Datadog están creados y el pod datadog-operator está en ejecución.

### Etapa 2: Agente de Datadog {#stage-2-datadog-agent-1}

Crea un `terraform.tfvars` archivo con tus credenciales de Datadog:

{{< code-block lang="bash" >}}
cat > datadogagent/terraform.tfvars << EOF
datadog_api_key = "your-api-key-here"
datadog_app_key = "your-app-key-here"
EOF
{{< /code-block >}}
Alternativamente, establece las variables de entorno `TF_VAR_datadog_api_key` y `TF_VAR_datadog_app_key` en tu terminal.

{{< code-block lang="bash" >}}
cd datadogagent
terraform init
terraform apply
{{< /code-block >}}

Verifica que el Agente de Datadog esté implementado:

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
{{< /code-block >}}

Deberías ver el recurso personalizado Datadog Agent creado. Debería estar en el `Running` estado antes de continuar. Verifique que los pods Datadog Agent y Datadog Cluster Agent estén en ejecución:

{{< code-block lang="bash" >}}
kubectl get pods -n datadog
{{< /code-block >}}

### Etapa 3: Aplicación con DatadogPodAutoscaler {#stage-3-application-with-datadogpodautoscaler-1}

Implementa la aplicación nginx con DatadogPodAutoscaler:

{{< code-block lang="bash" >}}
cd ../nginx-dpa
terraform init
terraform apply
{{< /code-block >}}

Después de la implementación, verifica que todos los componentes estén funcionando correctamente.

Verifique el estado del Datadog Agent:

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
kubectl describe datadogagent datadog -n datadog
{{< /code-block >}}

Verifica el estado de DatadogPodAutoscaler:

{{< code-block lang="bash" >}}
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx-autoscaler -n nginx-dka-demo
{{< /code-block >}}

¡Felicidades, tiene una carga de trabajo gestionada por el Datadog Kubernetes Autoscaler!

## Limpieza {#cleanup}

Para eliminar todos los recursos, sigue el orden inverso de las etapas de implementación:

1. Limpia la aplicación desplegada (Etapa 3):
    ```bash
    cd nginx-dpa
    terraform destroy
    ```

2. Limpie el Datadog Agent (Etapa 2):
    ```bash
    cd ../datadogagent
    terraform destroy
    ```

3. Limpie el Datadog Operator y las CRDs (Etapa 1):
    ```bash
    cd ..
    terraform destroy
    ```

## Resolución de problemas {#troubleshooting}

### Comandos de depuración {#debugging-commands}

Revisa los eventos de DatadogPodAutoscaler:
{{< code-block lang="bash" >}}
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'
{{< /code-block >}}

Revisa los registros del Cluster Agent:
{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/monitoring/autoscaling/
[2]: /es/containers/monitoring/autoscaling/#cluster-profiles