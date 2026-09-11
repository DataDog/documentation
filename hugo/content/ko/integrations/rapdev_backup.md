---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-backup
app_uuid: f0a2c15e-9c53-4645-aedc-5a28af130308
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rapdev.backup
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10194
    source_type_name: RapDev 백업
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_backup
integration_id: rapdev-backup
integration_title: 백업 자동화 도구
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_backup
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: 백업
  short_description: \u0008통합에 대한 정액제
  unit_price: 500
public_title: 백업 자동화 도구
short_description: Datadog 대시보드 , 신서틱, 모니터 및 노트북을 백업하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog 대시보드 , 신서틱, 모니터 및 노트북을 백업하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: 백업 자동화 도구
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

이 에이전트점검 의 목적은 Datadog 계정의 대시보드, 신서틱(Synthetic) 테스트, 모니터 및 노트북에 대한 압축 백업을 만드는 것입니다.
그런 다음 해당 백업을 로컬 컴퓨터 또는 지원되는 다른 플랫폼(예: AWS, Azure 및 GitHub) 중 하나에 저장할 수 있습니다.

## 수집한 데이터

### 메트릭

이 통합에는 메트릭이 포함되어 있지 않습니다.

### 서비스 점검

이 통합에는 서비스 점검 `rapdev.backup.can_connect`가 포함되어 있지 않습니다. 해당 요소는 에이전트가 Datadog API와 통신할 수 있을 때 `OK` 를 반환하고 그렇지 않으면 `CRITICAL`을 보고합니다. 

### 이벤트

이 통합에는 이벤트가 포함되어 있지 않습니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 지원 팀: support@rapdev.io
- 영업 팀: sales@rapdev.io
- 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*찾고 계신 통합 이 아닌가요? 조직에 꼭 필요한 기능이 없나요? RapDev에 [메시지](mailto:support@rapdev.io)를 남겨주시면 빌드해 드릴게요!!!*.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
[4]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-v6-python-3/?tab=hostagent
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[8]: https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys
[9]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html
[10]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html

---
이 애플리케이션은 Datadog 마켓플레이스를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-backup" target="_blank">마켓플레이스에서 이 애플리케이션을 구입하세요</a>.