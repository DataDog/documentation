---
app_id: terraform
app_uuid: 05198ed5-6fe5-417b-8711-e124718e9715
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10153
    source_type_name: terraform
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 설정 및 배포
- 개발 툴
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/terraform/README.md
display_on_public_website: true
draft: false
git_integration_title: terraform
integration_id: terraform
integration_title: Terraform
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: terraform
public_title: Terraform
short_description: Terraform으로 Datadog 계정 관리
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Terraform으로 Datadog 계정 관리
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Terraform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Datadog Terraform 공급자를 사용하면 Terraform 구성을 통해 Datadog API와 상호 작용할 수 있습니다. 이 구성을 통해 Dashboards, Monitors, Logs Configuration 등 Datadog 리소스를 관리할 수 있습니다.

## 설정

### 설치

Datadog Terraform 공급자는 [Terraform Registry][1]를 통해 사용할 수 있습니다.

### 구성

1. [Terraform을 설치합니다][2].
2. Terraform 구성 파일을 포함할 디렉터리를 만듭니다(예: `terraform_config/`).
3. `terraform_config/` 디렉터리에 다음 내용이 담긴 `main.tf` 파일을 만듭니다.
    ```
    terraform {
      required_providers {
        datadog = {
          source = "DataDog/datadog"
        }
      }
    }

    # Configure the Datadog provider
    provider "datadog" {
      api_key = var.datadog_api_key
      app_key = var.datadog_app_key
    }
    ```

    **참고**: Datadog US1 사이트를 사용하지 않는 경우 [Datadog 사이트][4]에서 `api_url` [선택적 파라미터][3]를 설정해야 합니다. 페이지 오른쪽의 문서 사이트 선택기가 올바른 Datadog 사이트로 설정되어 있는지 확인한 후, 다음 URL을 `api_url` 파라미터 값으로 사용하세요.


    ```
    https://api.{{< region-param key="dd_site" code="true" >}}/
    ```


4. `terraform init`을 실행합니다. 이는 Terraform에서 사용할 디렉터리를 초기화하고 Datadog 공급자를 가져옵니다.
5. `terraform_config/` 디렉터리에 `.tf` 파일을 만들고 Datadog 리소스 생성을 시작합니다.

## 모니터 생성

이 예제에서는 [실시간 프로세스 모니터][5]를 생성하는 `monitor.tf` 파일을 보여줍니다.

    ```
    # monitor.tf
    resource "datadog_monitor" "process_alert_example" {
      name    = "Process Alert Monitor"
      type    = "process alert"
      message = "Multiple Java processes running on example-tag"
      query   = "processes('java').over('example-tag').rollup('count').last('10m') > 1"
      monitor_thresholds {
        critical          = 1.0
        critical_recovery = 0.0
      }

      notify_no_data    = false
      renotify_interval = 60
    }
    ```

`terraform apply`를 실행하여 Datadog 계정에서 이 모니터를 생성합니다.

## Datadog에 이벤트 전송

`datadogpy`를 설치하면 Dogwrap 명령줄 도구에 액세스할 수 있으며, 이 도구를 사용하여 모든 Terraform 명령을 래핑하고 사용자 정의 이벤트에 바인딩할 수 있습니다.

`datadogpy`를 설치합니다.
  ```
  pip install datadog
  ```

자세한 내용은 [Datadog Python 라이브러리][6]를 참고하세요.

`terraform apply` 이벤트를 전송합니다.

  ```
  dogwrap -n "terraform apply" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform apply -no-color"
  ```

`terraform destroy` 이벤트를 전송합니다.

  ```
  dogwrap -n "terraform destroy" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform destroy -no-color"
  ```

## 수집한 데이터

### 메트릭

Terraform은 메트릭을 포함하지 않습니다.

### 서비스 점검

Terraform은 서비스 점검을 포함하지 않습니다.

### 이벤트

Terraform은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs#optional
[4]: https://docs.datadoghq.com/ko/getting_started/site/
[5]: https://docs.datadoghq.com/ko/monitors/types/process/
[6]: https://github.com/DataDog/datadogpy
[7]: https://docs.datadoghq.com/ko/help/