---
app_id: microsoft-defender-for-cloud
app_uuid: e9e9981e-c97a-4395-a98b-b39b2adf1bb6
assets:
  dashboards:
    MicrosoftDefenderforCloud-Overview: assets/dashboards/MicrosoftDefenderforCloud-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10376
    source_type_name: Microsoft Defender for Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- 로그 수집
- 보안
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_defender_for_cloud
integration_id: microsoft-defender-for-cloud
integration_title: Microsoft Defender for Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_defender_for_cloud
public_title: Microsoft Defender for Cloud
short_description: Microsoft Defender for Cloud 모니터링
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - "\b카테고리::클라우드"
  - Category::Log Collection
  - 카테고리::보안
  - 제공::통합
  configuration: README.md#Setup
  description: Microsoft Defender for Cloud 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Defender for Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

[Microsoft Defender for Cloud][1]에서 로그 및 알림을 수집합니다.

클라우드용 Defender는 클라우드 네이티브 애플리케이션 보호 플랫폼(CNAPP)으로, Microsoft Azure 애플리케이션을 모니터링하고, 클라우드 보안 태세 관리(CSPM)를 통해 Azure 보안 위험에 대한 인사이트를 제공하며, 서버, 컨테이너, 스토리지 및 데이터베이스용 Azure 클라우드 워크로드(CWPP)를 보호합니다.

Datadog Cloud SIEM 기본 제공 보안 규칙을 사용하여 다른 보안 인프라와 함께 Azure 환경 모니터를 사용하도록 설정하세요.

## 설정

### 설치

이 통합을 사용하려면 Datadog Azure 통합이 활성화되어 있어야 합니다. 이벤트 허브를 사용하여 Azure를 통해 Datadog로 로그를 전달합니다. 이 통합을 사용하려면 로그 포워더가 버전 `1.0.1` 이상이어야 합니다.

### 구성

이벤트 허브로 [계속 로그를 내보내려면][2] 클라우드용 Defender를 구성합니다. Datadog에서 추가 구성이 필요하지 않습니다.

### 검증

[Microsoft의 이 지침][3]에 따라 Microsoft Defender for Cloud에서 샘플 경고를 생성하세요.

Defender for Cloud 로그는 로그 관리에서 `source:microsoft-defender-for-cloud`를 사용하여 액세스할 수 있습니다.

Datadog Cloud SIEM을 사용하는 경우 Microsoft Defender for Cloud 탐지 규칙이 사용하도록 설정되어 있는지 확인합니다.
1. Datadog 메뉴에서 **Security** > **Configuration**으로 이동하여 **Cloud SIEM**를 펼칩니다.
1. "Detection Rules"을 선택합니다. 오른쪽에서 **Group By** 선택기를 클릭하고 **Source**를 선택하여 탐지 규칙을 소스로 그룹화합니다.
1. 아래로 스크롤하여 **Azure**라는 제목의 섹션을 펼칩니다. 목록을 스크롤하여 Microsoft Defender for Cloud 규칙을 찾습니다. 규칙이 켜져 있는지 확인합니다.


## 수집한 데이터

### 메트릭

Microsoft Defender for Cloud에는 메트릭이 포함되지 않습니다.

### 서비스 점검

Microsoft Defender for Cloud에는 서비스 점검이 포함되지 않습니다.

### 이벤트

Microsoft Defender for Cloud에는 이벤트가 포함되지 않습니다.

## 트러블슈팅

Cloud SIEM에서 Microsoft Defender for Cloud 알림을 수신하고 있는지 확인하려면 다음 단계를 따르세요.
1. Datadog 메뉴에서 **Security** > **Configuration**으로 이동하여 **Cloud SIEM**를 펼칩니다.
1. **Log Sources**를 선택한 다음 **Azure**로 스크롤을 내립니다. 
1. Microsoft Defender for Cloud가 **Installed**으로 표시되는지 확인합니다. 
1. 열 차트를 검사하여 로그가 수신되고 있는지 확인합니다. 
1. 로그가 수신되고 있는 경우 **Logs** > **Search**로 이동하여 `source:microsoft-defender-for-cloud`을 검색합니다. 로그가 표시되는 기간을 변경해야 할 수도 있습니다. 
1. 로그를 검사하고 로그가 제대로 형성되었는지 확인합니다.

그래도 문제가 계속되면 [Datadog 지원팀][4]에 문의하세요.

[1]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction
[2]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/continuous-export?tabs=azure-portal
[3]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/alert-validation
[4]: https://docs.datadoghq.com/ko/help/