---
app_id: reboot-required
app_uuid: 673a1136-68ad-46f4-ba6f-4203df10db6a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: reboot-required.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10209
    source_type_name: Reboot required
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: support@krugerheavyindustries.com
  support_email: support@krugerheavyindustries.com
categories:
- developer tools
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/reboot_required/README.md
display_on_public_website: true
draft: false
git_integration_title: reboot_required
integration_id: reboot-required
integration_title: Reboot Required
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: reboot_required
public_title: Reboot Required
short_description: 소프트웨어 업데이트 후 재부팅이 필요한 시스템 모니터링
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::OS & System
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: 소프트웨어 업데이트 후 재부팅이 필요한 시스템 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Reboot Required
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

패키지를 자동 설치하도록 설정된 Linux 시스템은 자동 재부팅하도록 설정되지 않을 수도 있습니다(수동으로 시간을 지정하는 것이 바람직할 수도 있음). 본 점검으로 재부팅이 적시에 수행되지 않을 경우 알림이 전송되도록 설정할 수 있습니다.

## 설정

Reboot Required 점검은 [Datadog 에이전트][1] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우 아래 지침을 따라 호스트에 Reboot Required 점검을 설치하세요. [커뮤니티 통합 사용][2]을 확인하여 도커(Docker) 에이전트 또는 이전 버전의 에이전트를 설치합니다.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-reboot_required==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][3]과 유사하게 설정하세요.

### 구성

1. [에이전트 설정 디렉토리][4] 루트의 `conf.d/` 폴더에 있는 `reboot_required.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [reboot_required.d/conf.yaml 샘플][5]을 참조하세요.

2. 에이전트에 대한 dd-에이전트(Datadog 에이전트를 실행하는 사용자) 쓰기 가능 디렉토리를 생성하고 본 점검이 이를 사용해야 합니다. 기본값은 `/var/run/dd-agent`이 최적입니다. 다음 스니펫으로 충분합니다.

   ```shell
   sudo mkdir /var/run/dd-agent
   sudo chown dd-agent:dd-agent /var/run/dd-agent
   ```

3. [Agent를 재시작합니다][6].

### 검증

[에이전트의 `status` 하위 명령을 실행][7]하고 점검 섹션에서 `reboot_required`를 찾으세요.

## 수집한 데이터

### 메트릭

메트릭 수집되지 않습니다.

### 이벤트

Reboot_required 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "reboot-required" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/datadog_checks/reboot_required/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/assets/service_checks.json
[9]: http://docs.datadoghq.com/help