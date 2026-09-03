---
app_id: pihole
app_uuid: 008d006b-6390-4b93-9302-dc37d9625b18
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: pihole.clients_ever_seen
      metadata_path: metadata.csv
      prefix: pihole.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10169
    source_type_name: pihole
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: monganai@tcd.ie
  support_email: monganai@tcd.ie
categories:
- 네트워크
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pihole/README.md
display_on_public_website: true
draft: false
git_integration_title: pihole
integration_id: pihole
integration_title: Pi-hole
integration_version: 3.14.1
is_public: true
manifest_version: 2.0.0
name: pihole
public_title: Pi-hole
short_description: 기본 Pi-hole 메트릭 수집 통합
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
  - Category::Network
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 기본 Pi-hole 메트릭 수집 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pi-hole
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Datadog 에이전트를 통해 [Pi-hole][1]을 모니터링합니다.

## 설정

Pi-hole 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

에이전트 v7.21+ / v6.21+의 경우, 아래 지침에 따라 호스트에 파이홀 점검을 설치하세요. 도커(Docker) 에이전트 또는 이전 버전의 에이전트 과 함께 설치하려면 [커뮤니티 통합][3]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   sudo -u dd-agent -- datadog-agent integration install -t datadog-pihole==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

1. 에이전트 설정 디렉토리 루트의 `conf.d/` 폴더에 있는 `pihole.d/conf.yaml` 파일을 편집하여 Pi-hole 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 pihole.d/conf.yaml][5]을 참조하세요.

2. [에이전트를 재시작합니다][6].

### 검증

[에이전트 상태 하위 명령][7]을 실행하고 점검 섹션에서 `pihole`을 찾습니다.

### 로그 수집

Linux 플랫폼의 경우 `/etc/datadog-agent/datadog.yaml`에서 Datadog 에이전트에 대해 로그 수집을 활성화합니다. 다른 플랫폼에서는 설정 파일의 위치에 대한 [에이전트 설정 파일 가이드][8]를 참조하세요.

```yaml
logs_enabled: true
```

- `pihole.d/conf.yaml` 파일에 이 설정 블록을 활성화하여 로그 수집을 시작하세요.
    ```yaml
    logs:
      - type: file
        path: /var/log/pihole.log
        source: pihole
    ```

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "pihole" >}}


### 이벤트

Pi-hole에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "pihole" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://pi-hole.net/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/pihole/datadog_checks/pihole/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/
[9]: https://github.com/DataDog/integrations-extras/blob/master/pihole/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/pihole/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/