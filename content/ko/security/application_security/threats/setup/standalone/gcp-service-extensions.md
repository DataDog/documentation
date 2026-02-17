---
code_lang: gcp-service-extensions
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: 소스 코드
  text: App and API Protection Service Extension 소스 코드
- link: https://cloud.google.com/service-extensions/docs/overview
  tag: 설명서
  text: Google Cloud Service Extensions 개요
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 트러블슈팅
title: GCP Service Extensions를 위한 App and API Protection 활성화
type: multi-code-lang
---

{{< callout url="#" btn_hidden="true" header="App and API Protection Service Extensions is in Preview" >}}
GCP App and API Protection Service Extensions 미리 보기를 사용해 보려면 하단의 설정 지침을 따릅니다.
{{< /callout >}}

GCP Cloud Load Balancing 내에서 GCP Service Extensions를 통해 App and API Protection(AAP)를 활성화할 수 있습니다. Datadog App and API Protection Service Extensions 통합은 GCP 환경에서 직접 위협 탐지 및 차단 기능을 제공합니다.

## 사전 필수 조건

- [Datadog Agent][1]는 애플리케이션의 운영 체제나 컨테이너, 클라우드 또는 가상 환경에 맞게 설치 및 설정됩니다.
- [원격 설정][2]으로 Datadog UI를 통해 공격자를 차단할 수 있게 설정합니다.
- GCP 프로젝트에는 `owner` 역할이나 `editor` 역할, 또는 관련 Compute Engine IAM 역할  `compute.instanceAdmin.v1`(인스턴스 생성) 및 `compute.networkAdmin`(로드 밸런싱 설정)이 있습니다.
- 서비스에 Cloud Load Balancer가 포함된 GCP 프로젝트가 설정됩니다. Cloud Load Balancer는 [Traffic Callouts를 지원하는 Application Load Balancers][3] 중 하나여야 합니다.
- Compute Engine API 및 Network Services API가 활성화됩니다.

  ```bash
  gcloud services enable compute.googleapis.com networkservices.googleapis.com
  ```

## 위협 탐지 활성화

GCP 환경에서 App and API Protection Service Extension을 설정하려면 Google Cloud Console 또는 Terraform 스크립트로 다음 단계를 완료합니다.

**참고:** Google Cloud는 [콜아웃 백엔드 서비스 생성][4] 및 [Service Extension을 트래픽 확장으로 설정][5]하는 지침을 제공합니다. 다음 단계는 동일한 일반 설정을 사용하지만 Datadog App and API Protection에 특화된 커스텀 설정을 포함합니다.

{{< tabs >}}
{{% tab "Google Cloud Console" %}}

1. [Datadog App and API Protection Service Extensions Docker 이미지][1]로 VM Compute 인스턴스를 생성합니다.

    VM 인스턴스를 설정할 때 사용 가능한 환경 변수는 [설정](#configuration)을 참조하세요.

    <div class="alert alert-info">
      <strong>Note:</strong> Be sure to update your Firewall rules to allow the Load Balancer and Datadog agent to communicate with the Callout VM instance.
    </div>

2. 비관리형 인스턴스 그룹에 VM을 추가합니다.

    인스턴스 그룹의 포트 매핑에 `http:80` 및 `grpc:443` (또는 사용자가 설정한 값)을 지정합니다.

3. 다음 설정으로 백엔드 서비스를 생성합니다.
    - 프로토콜: `HTTP2`
    - 포트 이름: `grpc`
    - 리전: 리전 선택
    - 서비스 상태 확인 포트 번호: `80`(또는 사용자가 설정한 값)

4. 해당 백엔드 서비스에 서비스 확장 VM이 포함된 인스턴스 그룹을 백엔드로 추가합니다.

5. Traffic Service Extension 콜아웃을 설정합니다.
    1. Google Cloud Console에서 **Service Extensions**으로 이동하여 새 Service Extension을 만듭니다.
    2. 로드 밸런서 유형을 선택합니다.
    3. 유형으로 `Traffic extensions`를 선택합니다.
    4. 포워딩 규칙을 선택합니다.
  <br><br>

6. Extension Chain 생성하기

    1. 모든 트래픽을 확장으로 전송하려면 **Match condition**에 `true`를 입력합니다.
    2. **Programability type**의 경우 `Callouts`를 선택합니다.
    3. 이전 단계에서 생성한 백엔드 서비스를 선택합니다.
    4. 목록에서 App and API Protection가 탐지를 실행할 모든 **이벤트**를 선택합니다(요청 헤더 및 응답 헤더는 **필수**입니다).

</br>

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals Explorer 및 세부 정보와 Vulnerabilities Explorer 및 세부 정보를 보여주는 영상" video="true" >}}

[1]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
{{% /tab %}}

{{% tab "Terraform" %}}

Terraform으로 App and API Protection GCP Service Extension의 배포를 자동화할 수 있습니다. 이렇게 하면 기존 로드 밸런서와 함께 작동하도록 서비스 확장을 설정하는 프로세스가 간소화됩니다.

### Terraform 배포 사전 필수 조건

- 로컬 머신에 설치된 [Terraform][1](버전 1.0.0 이상).
- 적절한 권한이 있는 GCP 자격 증명
- Datadog API 키(Datadog Agent 설정에 사용)
- 애플리케이션용 기존 GCP Cloud Load Balancer

### 인프라스트럭처 개요

Terraform 배포는 다음 컴포넌트를 생성합니다.
- 보안 이벤트가 포함된 트레이스를 수집하는 Datadog Agent VM
- 컨테이너에서 Datadog Service Extension Callout을 실행하는 VM
- 확장 프로그램과 Agent 간의 통신을 허용하는 방화벽 규칙
- Service Extension VM을 포함하는 비관리형 인스턴스 그룹
- 서비스 상태 점검이 있는 HTTP/2용으로 설정된 백엔드 서비스
- 기존 로드 밸런서에 연결된 서비스 확장

### 배포 단계

App and API Protection Service Extension 배포에는 함께 동작하는 여러 컴포넌트가 필요합니다. 이러한 모든 컴포넌트를 모두 포함하여 배포 프로세스를 반복 가능하고 유지 관리하기 쉽도록 도와주는 Terraform 모듈을 만들어봅니다.

1. 새 디렉터리와 필요한 Terraform 파일을 생성합니다.

    ```bash
    mkdir gcp-aap-service-extension && cd gcp-aap-service-extension
    touch main.tf variables.tf
    ```

2. `main.tf` 파일에 다음 코드를 추가합니다. 이 파일은 네트워크 규칙, VM 인스턴스, 로드 밸런서 설정을 포함하여 App and API Protection Service Extension에 필요한 모든 인프라스트럭처 컴포넌트를 정의합니다.

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


3. `variables.tf` 파일에 다음 콘텐츠를 추가합니다. 이 파일은 Terraform 설정에 필요한 모든 입력 변수를 정의합니다.

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

4. 메인 Terraform 프로젝트에 모듈을 포함합니다. 본 예시는 위에서 생성한 모듈을 참조하는 방법을 보여줍니다.

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

5. Terraform 파일이 있는 디렉토리에서 다음 명령을 실행하여 인프라스트럭처를 배포합니다.

   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

### 배포 후 유효성 검사

서비스 확장은 로드 밸런서를 통과하는 모든 트래픽을 자동 검사하여 보안 위협을 탐지합니다.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="신호 탐색기 및 세부 정보와 취약점 탐색기 및 세부 정보를 보여주는 영상" video="true" >}}

[1]: https://www.terraform.io/
{{% /tab %}}
{{< /tabs >}}

## 설정

Datadog App and API Protection Service Extension Docker 이미지는 다음 구성 설정을 지원합니다.

| 환경 변수                   | 기본값   | 설명                                                       |
|----------------------------------------|-----------------|-------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`            | `0.0.0.0`       | gRPC 서버 수신 주소입니다.                                    |
| `DD_SERVICE_EXTENSION_PORT`            | `443`           | gRPC 서버 포트입니다.                                                 |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80`            | 서비스 상태 점검을 위한 HTTP 서버 포트입니다.                               |

다음 환경 변수를 사용하여 Datadog Agent로 트레이스를 전송하도록 컨테이너를 설정합니다.

| 환경 변수                   | 기본값 | 설명                                                           |
|----------------------------------------|---------------|-----------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent가 실행되는 호스트 이름입니다.                         |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | 트레이스 수집용 Datadog Agent 포트입니다.                       |

<div class="alert alert-danger">
  <strong>참고:</strong> GCP Service Extensions 통합은 Datadog Go Tracer에 기반하여 만들어졌습니다. 트레이서와 동일한 릴리스 프로세스를 따르며, Docker 이미지에 해당 트레이스 버전 태그가 지정됩니다.
</div>

GCP Service Extensions 통합은 [Datadog Go Tracer][6]를 사용하며 트레이서로부터 모든 환경 변수를 상속받습니다. 자세한 설정 옵션은 [Go 추적 라이브러리 설정하기][7] 및 [App and API Protection 라이브러리 설정하기][8]에서 확인할 수 있습니다.

## 한계

GCP Service Extensions에는 다음과 같은 제한 사항이 있습니다.

* 요청 본문은 콘텐츠 유형에 관계없이 검사하지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ko/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://cloud.google.com/service-extensions/docs/lb-extensions-overview#supported-lbs
[4]: https://cloud.google.com/service-extensions/docs/configure-callout-backend-service
[5]: https://cloud.google.com/service-extensions/docs/configure-traffic-extensions
[6]: https://github.com/DataDog/dd-trace-go
[7]: https://docs.datadoghq.com/ko/tracing/trace_collection/library_config/go/
[8]: https://docs.datadoghq.com/ko/security/application_security/threats/library_configuration/