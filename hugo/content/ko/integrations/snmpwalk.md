---
app_id: snmpwalk
app_uuid: bc37c561-7ac5-4799-a56b-d85347bc9ff1
assets: {}
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notifications
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/README.md
display_on_public_website: true
draft: false
git_integration_title: snmpwalk
integration_id: snmpwalk
integration_title: SNMP walk
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: snmpwalk
public_title: SNMP walk
short_description: snmpwalk description.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::알림
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: snmpwalk description.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SNMP walk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 통합은 SNMP walk 상태에 관한 실시간 인사이트를 제공해 다음을 할 수 있습니다.

- SNMP walk 상태 시각화 및 모니터링
- SNMP walk 장애 조치에 관한 알림 받기

## 설정

SNMP walk 점검은 [Datadog Agent][1] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

이 통합 대신 [`snmp walk`][2] 명령을 사용할 수도 있습니다.

```
sudo -u dd-agent datadog-agent snmp walk
```

### 설치

Agent v7.21+ / v6.21+의 경우, 아래 지침에 따라 호스트에 SNMP walk 점검을 설치하세요. Docker Agent 또는 이전 버전의 Agent를 사용하여 설치하려면 [커뮤니티 통합 사용][3]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-snmpwalk==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

1. [Agent 구성 디렉터리][5] 루트에 있는 `conf.d/` 폴더의 `snmpwalk.d/conf.yaml` 파일을 편집하여 SNMP walk [메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 snmpwalk.d/conf.yaml][6]에서 확인하세요.

2. [에이전트를 다시 시작][7]합니다.

## 검증

[Agent의 `status` 하위 명령을 실행][8]하고 Checks 섹션에서 `snmpwalk`를 찾습니다.

## 수집한 데이터

### 메트릭

SNMP walk 통합은 메트릭을 포함하지 않습니다.

### 이벤트

SNMP walk 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

SNMP walk 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/network_monitoring/devices/troubleshooting/?tab=linux#device-not-visible-in-datadog
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/datadog_checks/snmpwalk/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[9]: http://docs.datadoghq.com/help