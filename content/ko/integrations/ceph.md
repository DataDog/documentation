---
app_id: ceph
app_uuid: 485341cc-3dee-4136-b147-dda76171701a
assets:
  dashboards:
    ceph: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ceph.write_bytes_sec
      metadata_path: metadata.csv
      prefix: ceph.
    process_signatures:
    - ceph-mon
    - ceph-mgr
    - ceph-osd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 138
    source_type_name: Ceph
  logs:
    source: ceph
  saved_views:
    ceph_processes: assets/saved_views/ceph_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- os & system
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ceph/README.md
display_on_public_website: true
draft: false
git_integration_title: ceph
integration_id: ceph
integration_title: Ceph
integration_version: 2.10.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: ceph
public_title: Ceph
short_description: 풀당 성과 메트릭을 수집하고 전반적인 클러스터 상태를 모니터링하세요.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Data Stores
  - Category::OS & 시스템
  - Category::로그 수집
  configuration: README.md#Setup
  description: 풀당 성과 메트릭을 수집하고 전반적인 클러스터 상태를 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ceph
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Ceph dashboard][1]

## 개요

Datadog-Ceph 통합을 활성화해 다음 작업을 수행할 수 있습니다.

- 스토리지 풀 전반의 디스크 사용량 추적
- 문제 시 서비스 점검 수신
- I/O 성능 메트릭 모니터링

## 설정

### 설치

Ceph 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있으므로 Ceph 서버에서 아무 것도 설치할 필요가 없습니다.

### 설정

[에이전트 설정 디렉터리][3] 루트에 있는 `conf.d/` 폴더에서 `ceph.d/conf.yaml` 파일을 편집합니다.
사용 가능한 모든 옵션은 [sample ceph.d/conf.yaml][4]을 참조하세요.

```yaml
init_config:

instances:
  - ceph_cmd: /path/to/your/ceph # default is /usr/bin/ceph
    use_sudo: true # only if the ceph binary needs sudo on your nodes
```

`use_sudo`을 활성화하면 다음과 같은 라인을 `sudoers` 파일에 추가합니다.

```text
dd-agent ALL=(ALL) NOPASSWD:/path/to/your/ceph
```

#### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 다음으로 아래에서 `logs` 라인의 주석을 제거하여 `ceph.d/conf.yaml`을 편집합니다. Ceph 로그 파일에 대한 올바른 경로를 사용해 로그 `path`를 업데이트합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/ceph/*.log
       source: ceph
       service: "<APPLICATION_NAME>"
   ```

3. [에이전트를 재시작합니다][5].

### 검증

[에이전트 상태 하위 명령을 실행하고][6] 점검 섹션 아래에서 `ceph`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ceph" >}}


**참고**: Ceph luminous 이상 버전을 실행 중인 경우 `ceph.osd.pct_used` 메트릭이 포함되지 않습니다.

### 이벤트

Ceph 점검은 이벤트를 포함하지 않습니다.

### 서비스 검사
{{< get-service-checks-from-git "ceph" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

## 참고 자료

- [Ceph 모니터링: 노드 상태에서 클러스터 성능까지][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ceph/images/ceph_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/ceph/datadog_checks/ceph/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/ceph/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/ceph/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help/
[10]: https://www.datadoghq.com/blog/monitor-ceph-datadog