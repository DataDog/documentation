---
app_id: contrastsecurity
app_uuid: 8509e113-cf2e-42f1-b8d4-1261720498a5
assets:
  dashboards:
    Contrast Security Integration Overview: assets/dashboards/contrast_security_protect.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: contrastsecurity.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10084
    source_type_name: contrastsecurity
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Contrast Security
  sales_email: kristiana.mitchell@contrastsecurity.com
  support_email: kristiana.mitchell@contrastsecurity.com
categories:
- 로그 수집
- 보안
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/README.md
display_on_public_website: true
draft: false
git_integration_title: contrastsecurity
integration_id: contrastsecurity
integration_title: Contrast Security
integration_version: ''
is_public: true
kind: 통합
manifest_version: 2.0.0
name: contrastsecurity
public_title: Contrast Security
short_description: Datadog에서 Contrast Security가 제공하는 공격 및 취약점 보기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog에서 Contrast Security가 제공하는 공격 및 취약점 보기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Contrast Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Datadog-Contrast 통합을 이용해 Datadog에서 Contrast 로그를 볼 수 있습니다.

## 설정

### 로그 수집

Linux 플랫폼의 `/etc/datadog-agent/datadog.yaml`에서 Datadog 에이전트가 로그를 수집할 수 있도록 활성하세요. 다른 플랫폼의 경우 구성 파일 위치를 보려면 [에이전트 구성 파일 가이드][1]를 확인하세요.

```yaml
logs_enabled: true
```

- Contrast 로그를 수집하려면 `contrastsecurity.d/conf.yaml` 파일에 다음 구성 블록을 추가하세요.
- 새 `conf.yaml` 파일을 생성합니다.
- 커스텀 로그 수집 구성 그룹을 추가합니다.

    ```yaml
    logs:
      - type: file
        path: /path/to/contrast/security.log
        service: contrast
        source: contrastsecurity
    ```

로그에 관한 자세한 정보는 [Contrast Security 설명서][2]를 참고하세요.

- [Datadog 에이전트를 다시 시작합니다][3].

자세한 내용은 다음을 참고하세요.
- [Datadog 로그 설명서][4]
- [Datadog 대시보드 API][5]

## 수집한 데이터

### 메트릭

Contrast 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

Contrast 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Contrast 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? 이 통합의 [유지 관리자][6]에게 연락하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/
[2]: https://docs.contrastsecurity.com/
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ko/logs/log_collection/
[5]: https://docs.datadoghq.com/ko/api/#create-a-dashboard
[6]: https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/manifest.json