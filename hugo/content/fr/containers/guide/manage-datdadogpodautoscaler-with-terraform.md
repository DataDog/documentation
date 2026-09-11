---
aliases:
- /fr/containers/guide/manage-datadogpodautoscaler-with-terraform
description: Déployez et gérez les ressources personnalisées DatadogPodAutoscaler
  pour l'autoscaling Kubernetes en utilisant Terraform
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/
  tag: Blog
  text: 'Guide d''autoscaling Kubernetes : déterminez quelle solution convient le
    mieux à votre cas d''utilisation'
- link: https://docs.datadoghq.com/containers/monitoring/autoscaling/
  tag: Documentation
  text: Datadog Kubernetes Autoscaling
- link: https://docs.datadoghq.com/agent/cluster_agent/
  tag: Documentation
  text: Agent de cluster Datadog
- link: https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs
  tag: Site externe
  text: Documentation du fournisseur Kubernetes Terraform
- link: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/
  tag: Site externe
  text: Documentation sur l'autoscaling horizontal des pods Kubernetes
title: Gestion de DatadogPodAutoscaler avec Terraform
---
## Aperçu {#overview}

Le DatadogPodAutoscaler (DPA) est une définition de ressource personnalisée Kubernetes (CRD) qui permet l'autoscaling des charges de travail Kubernetes en utilisant [Datadog Kubernetes Autoscaling (DKA)][1]. Ce guide démontre comment gérer les ressources DatadogPodAutoscaler en utilisant Terraform et le fournisseur Kubernetes de HashiCorp pour déployer une configuration d'autoscaling.

**Activation de l'autoscaling à grande échelle :** Pour déployer l'autoscaling sur de nombreuses charges de travail ou espaces de noms avec une politique partagée, étiquetez les charges de travail ou espaces de noms avec `autoscaling.datadoghq.com/profile` au lieu de rédiger un `DatadogPodAutoscaler` par charge de travail. Voir [Profils de cluster][2] dans l'aperçu de l'autoscaling Kubernetes.

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous d'avoir ce qui suit :

- **Cluster Kubernetes** : Un cluster Kubernetes fonctionnel avec accès en utilisant `kubectl`
- **Terraform** : Terraform installé (version 0.13 ou ultérieure recommandée)
- **Identifiants API Datadog** : Clé API Datadog valide et clé d'application

## Structure du projet {#project-structure}

Ce guide utilise une approche de déploiement multi-étapes pour garantir la création correcte des dépendances pour Terraform.

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

## Étapes de déploiement {#deployment-stages}

Une approche de déploiement multi-étapes est essentielle lors de l'utilisation des définitions de ressources personnalisées Kubernetes (CRDs) et de Terraform. Cette approche ordonnée est nécessaire pour garantir que vous créez et installez les dépendances requises pour chaque étape du processus.

Les CRDs Kubernetes doivent être installées dans le cluster avant que vous puissiez créer des ressources personnalisées qui les utilisent. La CRD DatadogPodAutoscaler est créée lorsque vous installez l'Opérateur Datadog à l'Étape 1. Terraform doit connaître ces CRDs avant de pouvoir gérer les ressources qui en dépendent.

Le fournisseur Kubernetes de Terraform découvre les types de ressources disponibles au moment de l'initialisation. Si vous essayez de créer une ressource DatadogPodAutoscaler avant que la CRD ne soit installée, Terraform échouera car il ne reconnaît pas le type de ressource personnalisée.

1. **Étape 1 (Opérateur Datadog et CRDs)** : Crée le secret Datadog, l'Opérateur et les CRDs
   - Opérateur Datadog utilisant Helm (crée des CRDs)
2. **Étape 2 (Agent Datadog)** : Déploie l'Agent Datadog configuré pour Datadog Kubernetes Autoscaling
   - Secrets API et application Datadog
   - Ressource personnalisée DatadogAgent avec Cluster Agent activé
3. **Étape 3 (Charge de travail autoscalée)** : Déploie l'application avec DatadogPodAutoscaler
   - Nginx : espace de noms et déploiement
   - Ressource DatadogPodAutoscaler pour l'autoscaling du déploiement Nginx

## Configurer les fichiers de configuration {#set-up-configuration-files}

Tout d'abord, configurez les fichiers de configuration suivants pour chaque étape du processus.

### Étape 1 : Opérateur Datadog et CRDs {#stage-1-datadog-operator-and-crds}

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

### Étape 2 : Agent Datadog {#stage-2-datadog-agent}

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

### Étape 3 : Application avec DatadogPodAutoscaler {#stage-3-application-with-datadogpodautoscaler}

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

## Instructions de déploiement {#deployment-instructions}

Après avoir configuré les [fichiers de configuration](#set-up-configuration-files) pour chaque étape, suivez ces étapes pour déployer les composants dans le bon ordre.

### Étape 1 : Opérateur Datadog et CRD {#stage-1-datadog-operator-and-crds-1}

Déployez l'opérateur Datadog et les CRDs :

{{< code-block lang="bash" >}}
terraform init
terraform apply
{{< /code-block >}}

Vérifiez que l'opérateur Datadog et les CRDs sont déployés :

{{< code-block lang="bash" >}}
kubectl get crd
kubectl get pods -n datadog
{{< /code-block >}}

Vous devriez voir que les CRDs Datadog sont créées et que le pod datadog-operator est en cours d'exécution.

### Étape 2 : Agent Datadog {#stage-2-datadog-agent-1}

Créez un fichier `terraform.tfvars` avec vos identifiants Datadog :

{{< code-block lang="bash" >}}
cat > datadogagent/terraform.tfvars << EOF
datadog_api_key = "your-api-key-here"
datadog_app_key = "your-app-key-here"
EOF
{{< /code-block >}}
Alternativement, définissez les variables d'environnement `TF_VAR_datadog_api_key` et `TF_VAR_datadog_app_key` dans votre shell.

{{< code-block lang="bash" >}}
cd datadogagent
terraform init
terraform apply
{{< /code-block >}}

Vérifiez que l'agent Datadog est déployé :

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
{{< /code-block >}}

Vous devriez voir la ressource personnalisée de l'agent Datadog créée. Il devrait être dans l'état `Running` avant de continuer. Vérifiez également que les pods de l'agent Datadog et du datadog-cluster-agent sont en cours d'exécution :

{{< code-block lang="bash" >}}
kubectl get pods -n datadog
{{< /code-block >}}

### Étape 3 : Application avec DatadogPodAutoscaler {#stage-3-application-with-datadogpodautoscaler-1}

Déployez l'application Nginx avec DatadogPodAutoscaler :

{{< code-block lang="bash" >}}
cd ../nginx-dpa
terraform init
terraform apply
{{< /code-block >}}

Après le déploiement, vérifiez que tous les composants fonctionnent correctement.

Vérifiez l'état de l'agent Datadog :

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
kubectl describe datadogagent datadog -n datadog
{{< /code-block >}}

Vérifiez l'état de DatadogPodAutoscaler :

{{< code-block lang="bash" >}}
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx-autoscaler -n nginx-dka-demo
{{< /code-block >}}

Félicitations, vous avez une charge de travail gérée par le Datadog Kubernetes Autoscaler !

## Nettoyage {#cleanup}

Pour supprimer toutes les ressources, suivez l'ordre inverse des étapes de déploiement :

1. Nettoyez l'application déployée (Étape 3) :
    ```bash
    cd nginx-dpa
    terraform destroy
    ```

2. Nettoyez l'agent Datadog (Étape 2) :
    ```bash
    cd ../datadogagent
    terraform destroy
    ```

3. Nettoyez l'opérateur Datadog et les CRDs (Étape 1) :
    ```bash
    cd ..
    terraform destroy
    ```

## Dépannage {#troubleshooting}

### Commandes de débogage {#debugging-commands}

Vérifiez les événements de DatadogPodAutoscaler :
{{< code-block lang="bash" >}}
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'
{{< /code-block >}}

Vérifiez les journaux du Cluster Agent :
{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/monitoring/autoscaling/
[2]: /fr/containers/monitoring/autoscaling/#cluster-profiles