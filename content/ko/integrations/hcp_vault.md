---
app_id: hcp-vault
app_uuid: ad48fccf-95f1-4ead-ae7f-efac1757418a
assets:
  dashboards:
    HCPVault Overview: assets/dashboards/hcp_vault_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: hcp_vault.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10223
    source_type_name: HCPVault
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories: []
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hcp_vault/README.md
display_on_public_website: true
draft: false
git_integration_title: hcp_vault
integration_id: hcp-vault
integration_title: HCP Vault
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: hcp_vault
public_title: HCP Vault
short_description: HCP Vault 통합에서 Vault 클러스터에 대한 개요를 확인할 수 있습니다.
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: HCP Vault 통합에서 Vault 클러스터에 대한 개요를 확인할 수 있습니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HCP Vault
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

HCP Vault(통합)는 Vault 클러스터에 대한 개요를 제공하여 성능 및 클러스터 상태를 모니터링할 수 있습니다.

HCP Vault 메트릭 스트리밍은 모든 프로덕션 등급 클러스터 티어에서 사용할 수 있습니다. 개발 티어 클러스터에서는 이 기능을 사용할 수 없습니다.

메트릭 범위 및 해석에 대한 자세한 내용은 [HCP Vault 메트릭 안내][1]를 참조하세요.

## 설정

### 설치

아래 설정 안내를 따르세요.

### 사전 필수 조건
- 프로덕션 등급 HCP Vault 클러스터
- Datadog 지역 및 [Datadog API 키][2]
- 관리자 또는 기여자[HCP에서 할당된 역할][3]가 있는 계정

### 설정

메트릭 스트리밍을 활성화하려면

1. HCP Vault 클러스터 개요에서 메트릭 보기를 선택합니다.

   ![메트릭 스트리밍][4]

2. 아직 메트릭 스트리밍을 설정하지 않은 경우 스트리밍 사용을 클릭합니다.

3. Stream Vault 메트릭 보기에서 Datadog를 공급자 로 선택합니다.

4. Datadog 설정에서 API 키를 입력하고 Datadog 환경과 일치하는 Datadog 사이트 지역을 선택합니다.

   ![공급자 선택][5]

5. 저장을 클릭합니다. 
**참고**: HCP Vault는 한 번에 하나의 메트릭 엔드포인트에 대해서만 메트릭 스트리밍을 지원합니다.

6. Datadog로 이동한 다음 통합 타일에서 설치를 클릭하여 통합을 활성화합니다. 이렇게 하면 HCP Vault 원격 분석을 최대한 활용할 수 있도록 지원하는 위젯 및 HCP Vault 대시보드가 설치됩니다. 대시보드 목록에서 "HCP Vault 개요"를 검색하여 대시보드를 찾을 수 있습니다.
   **참고**: 대시보드 메트릭에서 `cluster` & `project_id` 값을 입력하여 올바른 클러스터를 선택합니다. `cluster`는 클러스터 생성 시 설정한 클러스터의 이름입니다. `project_id`는 HCP 포털의 URL `https://portal.cloud.hashicorp.com/orgs/xxxx/projects/xxxx`에 있는 이름입니다. 

## 수집한 데이터

### 메트릭

메트릭 범위 및 해석에 대한 자세한 내용은 [HCP Vault 메트릭 안내][1]를 참조하세요.

### 서비스 점검

HCP Vault 통합에는 서비스 점검이 포함되지 않습니다.

### 이벤트

HCP Vault 통합은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://learn.hashicorp.com/collections/vault/cloud
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[3]: https://cloud.hashicorp.com/docs/hcp/access-control
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/metrics-streaming.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/choose-provider.png
[6]: https://docs.datadoghq.com/ko/help/