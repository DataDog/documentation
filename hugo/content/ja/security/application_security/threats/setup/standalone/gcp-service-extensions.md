---
code_lang: gcp-service-extensions
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: ソースコード
  text: App and API Protection Service Extension のソース コード
- link: https://cloud.google.com/service-extensions/docs/overview
  tag: ドキュメント
  text: Google Cloud Service Extensions の概要
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: 標準提供 (OOTB) の App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: GCP Service Extensions 向け App and API Protection を有効化する
type: multi-code-lang
---

{{< callout url="#" btn_hidden="true" header="App and API Protection Service Extensions はプレビュー版です" >}}
GCP 向け App and API Protection Service Extensions のプレビュー版を試すには、以下のセットアップ手順に従ってください。
{{< /callout >}}

GCP Cloud Load Balancing では、GCP Service Extensions を使って App and API Protection (AAP) を有効化できます。Datadog の App and API Protection Service Extensions インテグレーションにより、GCP 環境内で脅威の検知とブロックを直接実行できます。

## 前提条件

- [Datadog Agent][1] が、アプリケーションのオペレーティングシステムやコンテナ、クラウド、仮想環境にインストールされ構成されている。
- [Remote Configuration][2] が設定済みで、Datadog UI から攻撃者のブロックを有効化できること。
- GCP プロジェクトで、プロジェクトの `owner` または `editor` ロール、もしくは該当する Compute Engine の IAM ロール: `compute.instanceAdmin.v1` (インスタンス作成用) および `compute.networkAdmin` (ロード バランシング設定用) を持っていること。
- サービス向けに Cloud Load Balancer を構成済みの GCP プロジェクトがあること。Cloud Load Balancer は、[Traffic Callouts をサポートする Application Load Balancers][3] のいずれかである必要があります。
- Compute Engine API と Network Services API が有効化されていること:

  ```bash
  gcloud services enable compute.googleapis.com networkservices.googleapis.com
  ```

## 脅威検知を有効化する

GCP 環境に App and API Protection Service Extension をセットアップするには、Google Cloud Console または Terraform スクリプトを使い、次の手順を完了します。

**注:** Google Cloud には、[callout backend service の作成][4] と [Service Extension を traffic extension として構成する方法][5] のガイドがあります。以下の手順は基本的な流れは同じですが、Datadog の App and API Protection インテグレーションに固有の設定を追加しています。

{{< tabs >}}
{{% tab "Google Cloud Console" %}}

1. [Datadog App and API Protection Service Extensions Docker image][1] を使って、Compute Engine の VM インスタンスを作成します。

    VM インスタンス作成時に指定できる環境変数は、[Configuration](#configuration) を参照してください。

    <div class="alert alert-info">
      <strong>Note:</strong> Be sure to update your Firewall rules to allow the Load Balancer and Datadog agent to communicate with the Callout VM instance.
    </div>

2. VM を unmanaged instance group に追加します。

    instance group のポート マッピングに `http:80` と `grpc:443` (または設定値) を指定します。

3. 次の設定で backend service を作成します:
    - Protocol: `HTTP2`
    - Port name: `grpc`
    - Region: 対象のリージョンを選択
    - Health check port number: `80` (または設定値)

4. Service Extension の VM を含む instance group を、この backend service の backend として追加します。

5. Traffic Service Extension の callout を構成する:
    1. Google Cloud コンソールで **Service Extensions** に移動し、新しい Service Extension を作成します。
    2. ロード バランサーのタイプを選択します。
    3. type として `Traffic extensions` を選択します。
    4. forwarding rules を選択します。
  <br><br>

6. Extension Chain を作成する

    1. すべてのトラフィックを extension に送るには、**Match condition** に `true` を入れます。
    2. **Programability type** は `Callouts` を選択します。
    3. 前の手順で作成した backend service を選択します。
    4. App and API Protection の検知を実行したい箇所について、一覧から **Events** をすべて選択します (Request Headers と Response Headers は **required** です)。

</br>

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals Explorer と詳細、Vulnerabilities Explorer と詳細を示す動画。" video="true" >}}

[1]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
{{% /tab %}}

{{% tab "Terraform" %}}

Terraform を使うと、App and API Protection の GCP Service Extension デプロイを自動化できます。既存のロード バランサーと連携する Service Extension のセットアップを、よりシンプルに進められます。

### Terraform デプロイの前提条件

- ローカル マシンに [Terraform][1] がインストールされていること (バージョン 1.0.0 以降)。
- 適切な権限を持つ GCP の認証情報。
- Datadog API key (Datadog Agent の設定に使用)。
- アプリケーション用に既存の GCP Cloud Load Balancer があること。

### インフラの概要

Terraform デプロイでは、次のコンポーネントが作成されます:
- セキュリティ イベントを含むトレースを収集する Datadog Agent VM
- コンテナ内で Datadog Service Extension Callout を実行する VM
- extension と Agent 間の通信を許可するファイアウォール ルール
- Service Extension VM を含む unmanaged instance group
- HTTP/2 用に構成され、ヘルス チェックを備えた backend service
- 既存のロード バランサーに接続された service extension

### デプロイ手順

App and API Protection Service Extension のデプロイは、複数のコンポーネントが連携して動作します。ここでは、それらをまとめた Terraform モジュールを作成し、繰り返し実行できて保守しやすい形でデプロイできるようにします。

1. 新しいディレクトリを作成し、必要な Terraform ファイルを用意します:

    ```bash
    mkdir gcp-aap-service-extension && cd gcp-aap-service-extension
    touch main.tf variables.tf
    ```

2. `main.tf` に次のコードを追加します。このファイルでは、ネットワーク ルール、VM インスタンス、ロード バランサー設定など、App and API Protection Service Extension に必要なインフラ コンポーネントを定義します:

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
       image = "ghcr.io/datadog/dd-trace-go/service-extensions-callout:v1.72.1" # Replace with the latest version
       env = [
         {
           name = "DD_AGENT_HOST",
           value = google_compute_instance.datadog_agent.network_interface.0.network_ip,
         }
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
         authority = "datadoghq.com"
         service   = google_compute_backend_service.se_backend_service.self_link
         timeout   = "0.5s"
         fail_open = false # If the extension fails, the request is dropped

         # Supported events for the App and API Protection Service Extension
         supported_events = ["REQUEST_HEADERS", "REQUEST_BODY", "RESPONSE_HEADERS", "RESPONSE_BODY"]
       }
     }
   }
   ```


3. `variables.tf` に次の内容を追加します。このファイルでは、Terraform 設定に必要な入力変数を定義します:

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

4. メインの Terraform プロジェクトにモジュールを組み込みます。この例は、上で作成したモジュールの参照方法を示しています:

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

5. Terraform ファイルがあるディレクトリで、次のコマンドを実行してインフラをデプロイします:

   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

### デプロイ後の検証

service extension は、ロード バランサーを通過するすべてのトラフィックを自動的に検査し、セキュリティ上の脅威を検知します。

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals Explorer と詳細、Vulnerabilities Explorer と詳細を示す動画。" video="true" >}}

[1]: https://www.terraform.io/
{{% /tab %}}
{{< /tabs >}}

## 設定

Datadog App and API Protection Service Extension の Docker イメージは、次の設定をサポートしています:

| 環境変数                   | デフォルト値   | 説明                                                       |
|----------------------------------------|-----------------|-------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`            | `0.0.0.0`       | gRPC サーバーの待ち受けアドレス。                                    |
| `DD_SERVICE_EXTENSION_PORT`            | `443`           | gRPC サーバーのポート。                                                 |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80`            | ヘルス チェック用の HTTP サーバー ポート。                               |

次の環境変数を使用して、コンテナから Datadog Agent へトレースを送信するように設定します:

| 環境変数                   | デフォルト値 | 説明                                                           |
|----------------------------------------|---------------|-----------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent が稼働しているホスト名。                         |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | トレース収集用の Datadog Agent ポート。                       |

<div class="alert alert-warning">
  <strong>注:</strong> GCP Service Extensions インテグレーションは Datadog Go Tracer をベースに構築されています。リリース プロセスは tracer と同一で、Docker イメージには対応する tracer バージョンのタグが付与されます。
</div>

GCP Service Extensions インテグレーションは [Datadog Go Tracer][6] を使用し、tracer のすべての環境変数を継承します。追加の設定オプションは、[Go Tracing Library の設定][7] と [App and API Protection Library の設定][8] を参照してください。

## 制限

GCP Service Extensions には次の制限があります:

* リクエスト本文は、コンテンツタイプに関係なく検査されません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://cloud.google.com/service-extensions/docs/lb-extensions-overview#supported-lbs
[4]: https://cloud.google.com/service-extensions/docs/configure-callout-backend-service
[5]: https://cloud.google.com/service-extensions/docs/configure-traffic-extensions
[6]: https://github.com/DataDog/dd-trace-go
[7]: https://docs.datadoghq.com/ja/tracing/trace_collection/library_config/go/
[8]: https://docs.datadoghq.com/ja/security/application_security/threats/library_configuration/