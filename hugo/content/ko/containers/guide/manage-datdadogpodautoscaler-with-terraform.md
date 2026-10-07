---
aliases:
- /ko/containers/guide/manage-datadogpodautoscaler-with-terraform
description: Terraform을 사용하여 Kubernetes 오토스케일링을 위한 DatadogPodAutoscaler 사용자 지정 리소스
  배포 및 관리
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/
  tag: 블로그
  text: 'Kubernetes 오토스케일링 가이드: 사용 사례에 적합한 솔루션 선택 방법'
- link: https://docs.datadoghq.com/containers/monitoring/autoscaling/
  tag: 설명서
  text: Datadog Kubernetes Autoscaling
- link: https://docs.datadoghq.com/agent/cluster_agent/
  tag: 설명서
  text: Datadog Cluster Agent
- link: https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs
  tag: 외부 사이트
  text: Terraform Kubernetes Provider 문서
- link: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/
  tag: 외부 사이트
  text: Kubernetes Horizontal Pod Autoscaling 문서
title: Terraform을 사용한 DatadogPodAutoscaler 관리
---
## 개요 {#overview}

DatadogPodAutoscaler(DPA)는 [Datadog Kubernetes Autoscaling(DKA)][1]을 사용하여 Kubernetes 워크로드의 오토스케일링을 가능하게 하는 Kubernetes 사용자 지정 리소스 정의(CRD)입니다. 이 가이드는 Terraform 및 HashiCorp의 Kubernetes Provider를 사용하여 DatadogPodAutoscaler 리소스를 관리하고 오토스케일링 구성을 배포하는 방법을 설명합니다.

**대규모 오토스케일링 활성화:** 공유 정책을 사용하여 많은 워크로드 또는 네임스페이스에 오토스케일링을 배포하려면 워크로드마다 `DatadogPodAutoscaler`을 생성하는 대신 워크로드 또는 네임스페이스에 `autoscaling.datadoghq.com/profile` 레이블을 지정합니다. 자세한 내용은 Kubernetes Autoscaling 개요의 [클러스터 프로필][2]을 참조하세요.

## 전제 조건 {#prerequisites}

시작하기 전에 다음 사항을 준비합니다.

- **Kubernetes 클러스터**: `kubectl`을 사용하여 액세스 가능한 Kubernetes 클러스터
- **Terraform**: Terraform 설치(버전 0.13 이상 권장)
- **Datadog API 자격 증명**: 유효한 Datadog API 키 및 애플리케이션 키

## 프로젝트 구조 {#project-structure}

이 가이드는 Terraform의 종속성을 올바르게 생성하기 위해 다단계 배포 방식을 사용합니다.

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

## 배포 단계 {#deployment-stages}

Kubernetes 사용자 지정 리소스 정의(CRD) 및 Terraform을 사용하는 경우 다단계 배포 방식이 필수적입니다. 이 순차적 접근 방식은 프로세스의 각 단계에 필요한 종속성을 생성하고 설치하기 위해 필요합니다.

Kubernetes CRD는 이를 사용하는 사용자 지정 리소스를 생성하기 전에 클러스터에 설치되어야 합니다. DatadogPodAutoscaler CRD는 1단계에서 Datadog Operator를 설치할 때 생성됩니다. Terraform은 이러한 CRD에 의존하는 리소스를 관리하기 전에 해당 CRD를 인식해야 합니다.

Terraform Kubernetes Provider는 초기화 시 사용 가능한 리소스 유형을 검색합니다. CRD가 설치되기 전에 DatadogPodAutoscaler 리소스를 생성하려고 하면 Terraform이 해당 사용자 지정 리소스 유형을 인식하지 못해 실패합니다.

1. **1단계(Datadog Operator 및 CRD)**: Datadog 시크릿, Operator 및 CRD 생성
   - Helm을 사용한 Datadog Operator(CRD 생성)
2. **2단계(Datadog Agent)**: Datadog Kubernetes Autoscaling용으로 구성된 Datadog Agent 배포
   - Datadog API 및 애플리케이션 시크릿
   - Cluster Agent가 활성화된 DatadogAgent 사용자 지정 리소스
3. **3단계(오토스케일링된 워크로드)**: DatadogPodAutoscaler가 포함된 애플리케이션 배포
   - Nginx 네임스페이스 및 배포
   - nginx 배포를 오토스케일링하기 위한 DatadogPodAutoscaler 리소스

## 구성 파일 설정 {#set-up-configuration-files}

먼저 프로세스의 각 단계에 대해 다음 구성 파일을 설정합니다.

### 1단계: Datadog Operator 및 CRD {#stage-1-datadog-operator-and-crds}

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

### 2단계: Datadog Agent {#stage-2-datadog-agent}

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

### 3단계: DatadogPodAutoscaler가 포함된 애플리케이션 {#stage-3-application-with-datadogpodautoscaler}

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

## 배포 지침 {#deployment-instructions}

각 단계의 [구성 파일](#set-up-configuration-files)을 설정한 후 다음 단계에 따라 올바른 순서로 구성 요소를 배포합니다.

### 1단계: Datadog Operator 및 CRD {#stage-1-datadog-operator-and-crds-1}

Datadog Operator 및 CRD를 배포합니다.

{{< code-block lang="bash" >}}
terraform init
terraform apply
{{< /code-block >}}

Datadog Operator와 CRD가 배포되었는지 확인합니다.

{{< code-block lang="bash" >}}
kubectl get crd
kubectl get pods -n datadog
{{< /code-block >}}

Datadog CRD가 생성되고 datadog-operator 포드가 실행 중인 것을 확인할 수 있습니다.

### 2단계: Datadog Agent {#stage-2-datadog-agent-1}

Datadog 자격 증명이 포함된 `terraform.tfvars` 파일을 생성합니다.

{{< code-block lang="bash" >}}
cat > datadogagent/terraform.tfvars << EOF
datadog_api_key = "your-api-key-here"
datadog_app_key = "your-app-key-here"
EOF
{{< /code-block >}}
또는 셸에서 `TF_VAR_datadog_api_key` 및 `TF_VAR_datadog_app_key` 환경 변수를 설정합니다.

{{< code-block lang="bash" >}}
cd datadogagent
terraform init
terraform apply
{{< /code-block >}}

Datadog Agent가 배포되었는지 확인합니다.

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
{{< /code-block >}}

Datadog Agent 사용자 지정 리소스가 생성된 것을 확인할 수 있습니다. 계속 진행하기 전에 `Running` 상태여야 합니다. 또한 Datadog Agent 및 datadog-cluster-agent 포드가 실행 중인지 확인합니다.

{{< code-block lang="bash" >}}
kubectl get pods -n datadog
{{< /code-block >}}

### 3단계: DatadogPodAutoscaler가 포함된 애플리케이션 {#stage-3-application-with-datadogpodautoscaler-1}

DatadogPodAutoscaler가 포함된 nginx 애플리케이션을 배포합니다.

{{< code-block lang="bash" >}}
cd ../nginx-dpa
terraform init
terraform apply
{{< /code-block >}}

배포 후에는 모든 구성 요소가 정상적으로 작동하는지 확인합니다.

Datadog Agent 상태를 확인합니다.

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
kubectl describe datadogagent datadog -n datadog
{{< /code-block >}}

DatadogPodAutoscaler 상태를 확인합니다.

{{< code-block lang="bash" >}}
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx-autoscaler -n nginx-dka-demo
{{< /code-block >}}

축하합니다! Datadog Kubernetes Autoscaler가 관리하는 워크로드를 성공적으로 구성했습니다.

## 정리 {#cleanup}

모든 리소스를 제거하려면 배포 단계의 역순으로 진행합니다.

1. 배포된 애플리케이션 정리(3단계):
    ```bash
    cd nginx-dpa
    terraform destroy
    ```

2. Datadog Agent 정리(2단계):
    ```bash
    cd ../datadogagent
    terraform destroy
    ```

3. Datadog Operator 및 CRD 정리(1단계):
    ```bash
    cd ..
    terraform destroy
    ```

## 문제 해결 {#troubleshooting}

### 디버깅 명령 {#debugging-commands}

DatadogPodAutoscaler 이벤트를 확인합니다.
{{< code-block lang="bash" >}}
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'
{{< /code-block >}}

Cluster Agent 로그를 확인합니다.
{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/monitoring/autoscaling/
[2]: /ko/containers/monitoring/autoscaling/#cluster-profiles