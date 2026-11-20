---
aliases:
- /ja/containers/guide/manage-datadogpodautoscaler-with-terraform
description: Terraform を使用して Kubernetes Autoscaling の DatadogPodAutoscaler カスタムリソースをデプロイおよび管理する
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/
  tag: ブログ
  text: 'Kubernetes Autoscaling ガイド: ユースケースに適したソリューションを決定する'
- link: https://docs.datadoghq.com/containers/monitoring/autoscaling/
  tag: ドキュメント
  text: Datadog Kubernetes Autoscaling
- link: https://docs.datadoghq.com/agent/cluster_agent/
  tag: ドキュメント
  text: Datadog Cluster Agent
- link: https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs
  tag: 外部サイト
  text: Terraform Kubernetes プロバイダーのドキュメント
- link: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/
  tag: 外部サイト
  text: Kubernetes Horizontal Pod Autoscaling のドキュメント
title: Terraform を使用した DatadogPodAutoscaler の管理
---
## 概要 {#overview}

DatadogPodAutoscaler (DPA) は、[Datadog Kubernetes Autoscaling (DKA)][1] を使用して Kubernetes ワークロードのオートスケーリングを可能にする Kubernetes カスタムリソース定義 (CRD) です。このガイドでは、Terraform と HashiCorp の Kubernetes プロバイダーを使用して DatadogPodAutoscaler リソースを管理し、オートスケーリング構成をデプロイする方法を説明します。

**大規模なオートスケーリングの有効化:** 共有ポリシーで多くのワークロードやネームスペースにオートスケーリングを展開するには、ワークロードごとに 1 つの `DatadogPodAutoscaler` を作成するのではなく、`autoscaling.datadoghq.com/profile` でワークロードやネームスペースにラベルを付けます。Kubernetes Autoscaling の概要にある[クラスタープロファイル][2]を参照してください。

## 前提条件 {#prerequisites}

始める前に、以下があることを確認します。

- **Kubernetes クラスター**: `kubectl` を使用してアクセスできる稼働中の Kubernetes クラスター
- **Terraform**: Terraform がインストールされている (バージョン 0.13 以降を推奨)
- **Datadog API 資格情報**: 有効な Datadog API キーおよびアプリケーションキー

## プロジェクト構造 {#project-structure}

このガイドでは、Terraform の適切な依存関係を確実に作成するためにマルチステージデプロイメントアプローチを使用します。

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

## デプロイメントステージ {#deployment-stages}

Kubernetes カスタムリソース定義 (CRD) および Terraform を使用する際には、マルチステージデプロイメントアプローチが不可欠です。この順序付けられたアプローチは、プロセスの各ステージに必要な依存関係を確実に作成およびインストールするために必要です。

Kubernetes CRD を使用するカスタムリソースを作成するには、まずクラスターに Kubernetes CRD をインストールする必要があります。DatadogPodAutoscaler CRD は、ステージ 1 で Datadog Operator をインストールすると作成されます。Terraform は、これらの CRD に依存するリソースを管理する前にこれらの CRD について知っておく必要があります。

Terraform Kubernetes プロバイダーは、初期化時に利用可能なリソースタイプを発見します。CRD がインストールされる前に DatadogPodAutoscaler リソースを作成しようとすると、Terraform がカスタムリソースタイプを認識しないために失敗します。

1. **ステージ 1 (Datadog Operator と CRD)**: Datadog シークレット、Datadog Operator、および CRD を作成する
   - Helm を使用した Datadog Operator (CRD を作成)
2. **ステージ 2 (Datadog Agent)**: Datadog Kubernetes Autoscaling 用に構成された Datadog Agent をデプロイする
   - Datadog API およびアプリケーションシークレット
   - Cluster Agent が有効な DatadogAgent カスタムリソース
3. **ステージ 3 (オートスケールされたワークロード)**: DatadogPodAutoscaler を使用してアプリケーションをデプロイする
   - nginx のネームスペースとデプロイメント
   - nginx のデプロイメントのオートスケーリング用 DatadogPodAutoscaler リソース

## 構成ファイルをセットアップする {#set-up-configuration-files}

まず、プロセスの各ステージに対して以下の構成ファイルをセットアップします。

### ステージ 1: Datadog Operator と CRD {#stage-1-datadog-operator-and-crds}

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

### ステージ 2: Datadog Agent {#stage-2-datadog-agent}

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

### ステージ 3: DatadogPodAutoscaler を使用したアプリケーション {#stage-3-application-with-datadogpodautoscaler}

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

## デプロイメント手順 {#deployment-instructions}

各ステージの[構成ファイル](#set-up-configuration-files)をセットアップした後、コンポーネントを正しい順序でデプロイするための手順に従います。

### ステージ 1: Datadog Operator と CRD {#stage-1-datadog-operator-and-crds-1}

Datadog Operator と CRD のデプロイ:

{{< code-block lang="bash" >}}
terraform init
terraform apply
{{< /code-block >}}

Datadog Operator と CRD がデプロイされていることを確認します。

{{< code-block lang="bash" >}}
kubectl get crd
kubectl get pods -n datadog
{{< /code-block >}}

Datadog CRD が作成され、datadog-operator ポッドが実行中であることが確認できるはずです。

### ステージ 2: Datadog Agent {#stage-2-datadog-agent-1}

Datadog の資格情報を使用して `terraform.tfvars` ファイルを作成します。

{{< code-block lang="bash" >}}
cat > datadogagent/terraform.tfvars << EOF
datadog_api_key = "your-api-key-here"
datadog_app_key = "your-app-key-here"
EOF
{{< /code-block >}}
または、シェル内で `TF_VAR_datadog_api_key` および `TF_VAR_datadog_app_key` 環境変数を設定します。

{{< code-block lang="bash" >}}
cd datadogagent
terraform init
terraform apply
{{< /code-block >}}

Datadog Agent がデプロイされていることを確認します。

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
{{< /code-block >}}

Datadog Agent のカスタムリソースが作成されていることが確認できるはずです。進む前に `Running` の状態である必要があります。また、Datadog Agent と datadog-cluster-agent ポッドが実行中であることも確認します。

{{< code-block lang="bash" >}}
kubectl get pods -n datadog
{{< /code-block >}}

### ステージ 3: DatadogPodAutoscaler を使用したアプリケーション {#stage-3-application-with-datadogpodautoscaler-1}

DatadogPodAutoscaler を使用して nginx アプリケーションをデプロイします。

{{< code-block lang="bash" >}}
cd ../nginx-dpa
terraform init
terraform apply
{{< /code-block >}}

デプロイ後、すべてのコンポーネントが正しく動作していることを確認します。

Datadog Agent のステータスをチェックします。

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
kubectl describe datadogagent datadog -n datadog
{{< /code-block >}}

DatadogPodAutoscaler のステータスをチェックします。

{{< code-block lang="bash" >}}
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx-autoscaler -n nginx-dka-demo
{{< /code-block >}}

おめでとうございます。Datadog Kubernetes Autoscaler によって管理されているワークロードがあります。

## クリーンアップ {#cleanup}

すべてのリソースを削除するには、デプロイメントステージの逆の順序に従います。

1. デプロイされたアプリケーションをクリーンアップします (ステージ 3)。
    ```bash
    cd nginx-dpa
    terraform destroy
    ```

2. Datadog Agent をクリーンアップします (ステージ 2)。
    ```bash
    cd ../datadogagent
    terraform destroy
    ```

3. Datadog Operator と CRD をクリーンアップします (ステージ 1)。
    ```bash
    cd ..
    terraform destroy
    ```

## トラブルシューティング {#troubleshooting}

### デバッグコマンド {#debugging-commands}

DatadogPodAutoscaler のイベントをチェックします。
{{< code-block lang="bash" >}}
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'
{{< /code-block >}}

Cluster Agent のログをチェックします。
{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/monitoring/autoscaling/
[2]: /ja/containers/monitoring/autoscaling/#cluster-profiles