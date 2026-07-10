---
app_id: nfsstat
app_uuid: 423f4b03-ce99-4ffc-a553-e522ebd451be
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.nfs.ops
      metadata_path: metadata.csv
      prefix: 시스템.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 9164582
    source_type_name: Nfsstat
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nfsstat/README.md
display_on_public_website: true
draft: false
git_integration_title: nfsstat
integration_id: nfsstat
integration_title: Nfsstat
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: nfsstat
public_title: Nfsstat
short_description: nfsstat gets nfsiostat-sysstat metrics.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS & 시스템
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: nfsstat gets nfsiostat-sysstat metrics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nfsstat
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

NFS 통합은 NFS 클라이언트에서 연결 지점에 관한 메트릭을 수집합니다. 통합에서는 `nfsiostat` 도구를 사용해  NFS 클라이언트 당 연결 [통계][1]를 표시합니다.

## 설정

호스트에서 실행되는 Agent에 대해 이 검사를 설치하고 구성하려면 아래 지침을 따르세요.

### 설치

NFSstat 점검에는 [Datadog 에이전트][2] 패키지가 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

### 구성

[에이전트 설정 디렉토리][3]의 루트에 있는 `conf.d/` 폴더에서 `nfsstat.d/conf.yaml` 파일을 편집합니다. nfsiostat 바이너리 스크립트를 가리키거나 바이너리 설치기에 포함된 것 하나를 사용합니다. 사용할 수 있는 모든 구성 옵션을 보려면 [nfsstat.d/conf.yam 샘플][4]을 확인하세요.

### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml`에서 다음을 설정해 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `nfsstat.d/conf.yaml` 파일에 추가하여 NFSstat 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/messages
       source: nfsstat
   ```

   `path` 파라미터 값을 변경하고 환경에 맞게 설정합니다.
   사용 가능한 모든 설정 옵션은 [샘플 nfsstat.d/conf.yaml][4]을 참고하세요.

3. [Agent를 재시작합니다][5].


### 검증

[에이전트의 `status` 상태 하위 명령을 실행][6]하고 점검 섹션에서 `nfsstat`를 찾습니다.

## 수집한 데이터
### 메트릭
{{< get-metrics-from-git "nfsstat" >}}


### 이벤트
Nfsstat 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
Nfsstat 점검에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

## 참고 자료

- [HTTP 점검에 네트워크 모니터 구축][9]

[1]: http://man7.org/linux/man-pages/man8/nfsiostat.8.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/datadog_checks/nfsstat/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/metadata.csv
[8]: https://docs.datadoghq.com/ko/help/
[9]: https://docs.datadoghq.com/ko/monitors/monitor_types/network/