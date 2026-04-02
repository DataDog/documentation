---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-integration-backup-and-restore-tool
app_uuid: bac70338-c588-4766-90ea-3ca10fe259d1
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28271702
    source_type_name: crest_data_systems_integration_backup_and_restore_tool
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_integration_backup_and_restore_tool
integration_id: crest-data-systems-integration-backup-and-restore-tool
integration_title: 백업 및 복원 도구
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_integration_backup_and_restore_tool
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: integration-backup-and-restore-tool
  short_description: 통합 백업 및 복원 도구(IBRT) 통합의 월별 정액 요금입니다.
  unit_price: 499.0
public_title: 통합 백업 및 복원 도구
short_description: 모든 Agent 구성 파일, 통합, 종속성을 백업하고 신속하게 복원하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Offering::Integration
  configuration: README.md#Setup
  description: 모든 Agent 구성 파일, 통합, 종속성을 백업하고 신속하게 복원하세요.
  media:
  - caption: 통합 백업 및 복원 개요
    image_url: images/integration_backup_restore_overview.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: 통합 백업 및 복원 도구
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

통합 백업 및 복원 도구(IBRT)로 Datadog 환경을 한 단계 업그레이드하세요. 이 강력한 도구로 Datadog 구성의 백업을 쉽게 생성하여 워크플로를 간소화할 수 있습니다. 이를 통해 Agent 업그레이드 또는 마이그레이션 후 설정을 신속하게 복원합니다.

### 기능

- 다음을 포함하여 Datadog 구성의 전체 백업을 생성합니다.
    - 통합
    - 종속성
    - 구성 파일(예: 통합의 `datadog.yaml` 및 `conf.yaml` 파일)
- 여러 백업 위치를 지원하여 가장 적합한 위치에 백업을 저장할 수 있습니다.
- 유연한 백업 일정 예약:
    - 필요에 따라 온디맨드 백업 실행
    - 특정 요구 사항에 따라 자동 실행되는 주기적 백업 일정 예약
- 복구 중 다음 옵션을 제공합니다.
    1. **Agent 마이그레이션 또는 재설치**: 원활한 마이그레이션 환경을 위해 통합 `conf.yaml` 및 `datadog.yaml`을 포함한 모든 통합을 설치하고 YAML 파일을 복사합니다.
    2. **Agent 업그레이드**: 통합을 YAML 구성으로 설치하고 업그레이드 프로세스 중에 종속성을 유지합니다.

### 지원되는 백업 위치

- 로컬 머신
- 원격 머신
- 클라우드 서비스:
    - AWS S3 버킷
    - Azure Blob 스토리지
    - Google Cloud Storage

### 사용 편의성

수동 설치 및 구성이 필요한 기존 백업 방법과 달리, IBRT는 간단하고 편리하게 백업을 생성하는 방법을 제공합니다. Agent 수준에서 온디맨드 명령을 실행하거나 주기적 백업 자동 실행을 예약하여 Datadog 구성의 백업을 쉽게 생성합니다. 백업을 복원하는 것 또한 간단하여 단일 스크립트만으로 구성을 다시 실행할 수 있습니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

* Support Email: [datadog.integrations@crestdata.ai][7]
* Sales Email: [datadog-sales@crestdata.ai][8]
* 웹사이트: [crestdata.ai][3]
* FAQ: [Crest Data Datadog Marketplace 통합 FAQ][6]

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.crestdata.ai/datadog-integrations-readme/IBRT.pdf
[5]: https://docs.datadoghq.com/ko/agent/
[6]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[7]: mailto:datadog.integrations@crestdata.ai
[8]: mailto:datadog-sales@crestdata.ai

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-integration-backup-and-restore-tool" target="_blank">Marketplace에서 구매하세요</a>.