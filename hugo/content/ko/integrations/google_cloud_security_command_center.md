---
app_id: google-cloud-security-command-center
app_uuid: 200f1a0b-a67f-4096-a322-91aaee4f0de5
assets:
  dashboards:
    google-cloud-security-command-center: assets/dashboards/google_cloud_security_command_center_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 371
    source_type_name: Google Cloud Security Command Center
  logs:
    source: google.security.command.center
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- google cloud
- log collection
- 보안
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_security_command_center
integration_id: google-cloud-security-command-center
integration_title: Google Cloud Security Command Center
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_security_command_center
public_title: Google Cloud Security Command Center
short_description: Security Command Center는 중앙 취약성과 위협 보고 서비스입니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Google Cloud
  - Category::Log Collection
  - 제출한 데이터 유형::로그
  - 카테고리::보안
  - 제공::통합
  configuration: README.md#Setup
  description: Security Command Center는 중앙 취약성과 위협 보고 서비스입니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/datadog-google-security-command-center/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  support: README.md#Support
  title: Google Cloud Security Command Center
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Google Cloud Security Command Center는 다음을 통해 보안 태세를 강화할 수 있도록 해줍니다.
   * 보안 및 데이터 공격 노출을 평가합니다.
   * 자산 인벤토리를 제공하고 찾아줍니다.
   * 잘못된 구성, 취약성 및 위협을 파악합니다.
   * 위협을 완화하고 치료할 수 있도록 지원합니다.

Security Command Center는 이벤트 위협 탐지 빛 보안 상태 분석 등 서비스를 사용하여 환경 내의 보안 문제를 탐지합니다. 이러한 서비스는 Google Cloud의 로그 및 리소스를 검사하여 위협 징후, 소프트웨어 취약성, 잘못된 구성을 찾습니다. 서비스는 또한 소스로도 명명됩니다. 
자세한 정보는 [보안 소스][1]를 참조하세요.

이러한 서비스가 위협, 취약점 또는 잘못된 설정을 감지하면, 파인딩(finding)을 발행합니다. 파인딩은 Google Cloud 환경에서 서비스가 발견한 개별 위협, 취약점 또는 잘못된 구성에 관한 보고서나 기록을 의미합니다. 파인딩에는 감지된 문제, 해당 문제로 인해 영향을 받는 Google Cloud 리소스, 문제를 해결할 수 있는 방법에 관한 가이드가 포함됩니다.

## 설정

### 설치

시작하기 전에, Google Cloud Security Command Center 파인딩을 수집하려는 프로젝트에 다음 API들이 활성화되어 있는지 확인하세요.
  * [Cloud Resource Manager API][2]
  * [Google Cloud Billing API][3]
  * [Google Cloud Security Command Center API][4]

### 서비스 계정에 역할 할당
서비스 계정은 GCP Security Command Center에서 파인딩을 가져오기 위해 이 역할을 반드시 보유해야 합니다.
이 역할이 활성화되어 있지 않으면 권한 거부 오류로 인해 로그가 표시되지 않을 수 있습니다.

다음 역할 할당:
   * ***Security Center 파인딩 확인자*** 

**참고:** 

동일한 프로젝트가 여러 서비스 계정에 의해 발견되는 경우, 연결된 모든 서비스 계정에 [Security Center 파인딩 확인자 역할][5]이 추가되어야 합니다.

이 요구 사항을 준수하지 않을 경우 PermissionDenied 오류가 발생할 수 있습니다. 
이 경우 해당 프로젝트의 보안 파인딩을 수집할 수 없습니다. 따라서 서비스 계정이 연결된 모든 프로젝트에 
보안 파인딩에 접근할 수 있는 필수 권한을 보유하고 있는지 확인하는 것이 중요합니다.

### 구성

Google Cloud Security Command Center는 기본 [Google Cloud Platform 통합][6] 패키지에 포함되어 있습니다.
아직 설정하지 않았다면, 먼저 이 문서를 참고하여 [Google Cloud Platform 통합][7]을 설정하세요.

기본 Google Cloud 플랫폼 통합 타일:
1.  보안 파인딩을 가져오려는 프로젝트에 해당하는 서비스 계정 및/또는 ProjectID를 엽니다.
2.  **Security Findings** 탭에서 토글을 사용하여 보안 파인딩 수집을 활성화합니다.

활성화되면 보안 파인딩을 수집하는 데 최대 ***1일***이 소요될 수 있습니다.

## 수집한 데이터

#### 로그 수집

Google Cloud Security Command Center 파인딩은 [Google Cloud Security Command Center Client API][8]를 사용해 로그로 수집됩니다.

Datadog 로그 탐색기에서 다음 필터를 사용하여 Google Cloud Security Command Center 로그를 찾으세요.
   * ```Findings```을 **Service**로 설정합니다.
   * ```google.security.command.center```를 **Source**로 설정합니다.
   * 로그 상태는 **Info**입니다.

### 메트릭

Google Cloud Security Command Center는 어떠한 메트릭도 포함하지 않습니다.

### 서비스 점검

Google Cloud Security Command Center는 어떠한 서비스 점검도 포함하지 않습니다.

### 이벤트

Google Cloud Security Command Center는 어떠한 이벤트도 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog를 사용해 Google Cloud 보안 파인딩을 정리하고 분석합니다.][10]
- [Datadog Security는 Google Cloud를 위해 규정 준수와 위협 보호 기능을 확장합니다.][11]

[1]: https://cloud.google.com/security-command-center/docs/concepts-security-sources
[2]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[3]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[4]: https://console.cloud.google.com/apis/library/securitycenter.googleapis.com
[5]: https://cloud.google.com/security-command-center/docs/access-control-org#securitycenter.findingsViewer
[6]: https://app.datadoghq.com/integrations/google-cloud-platform
[7]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[8]: https://cloud.google.com/security-command-center/docs
[9]: https://docs.datadoghq.com/ko/help/
[10]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[11]: https://www.datadoghq.com/blog/datadog-security-google-cloud/