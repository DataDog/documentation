---
app_id: 시스템
app_uuid: 43bff15c-c943-4153-a0dc-25bb557ac763
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.processes.cpu.pct
      metadata_path: metadata.csv
      prefix: 시스템.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Process
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/process/README.md
display_on_public_website: true
draft: false
git_integration_title: process
integration_id: 시스템
integration_title: Processes
integration_version: 5.0.0
is_public: true
manifest_version: 2.0.0
name: process
public_title: Processes
short_description: 메트릭을 캡처하고 실행 중인 프로세스의 상태를 모니터링합니다.
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
  - Category::OS & 시스템
  - Offering::Integration
  configuration: README.md#Setup
  description: 메트릭을 캡처하고 실행 중인 프로세스의 상태를 모니터링합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/process-check-monitoring
  support: README.md#Support
  title: Processes
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Process 점검으로 다음을 수행할 수 있습니다.
- 호스트에서 실행 중인 특정 프로세스에 대한 리소스 사용 메트릭을 수집합니다. 예를 들어 CPU, 메모리, I/O 및 스레드 수입니다.
- [Process Monitors][1]를 사용하여 특정 프로세스의 인스턴스가 실행되어야 하는 개수에 대한 임계값을 구성하고 임계값에 도달하지 못할 때 경고를 받습니다(아래 **Service Checks** 참조).

## 설정

### 설치

Process 점검은 [Datadog Agent][2] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

### 구성

많은 점검과 달리 Process 점검은 기본적으로 유용한 것을 모니터링하지 않습니다. 따라서 모니터링하려는 프로세스를 구성해야 합니다.

표준화된 기본 구성은 없지만 SSH/SSHD 프로세스를 모니터링하는 예시 `process.d/conf.yaml`는 다음과 같습니다. 사용 가능한 모든 구성 옵션은 [샘플 process.d/conf.yaml][3]을 참조하세요.

```yaml
init_config:
instances:
  - name: ssh
    search_string:
      - ssh
      - sshd
```

**참고**: 구성을 변경한 후에는 [Agent를 다시 시작][4]해야 합니다.

일부 프로세스 메트릭을 검색하려면 Datadog 컬렉터를 모니터링된 프로세스 사용자로 실행하거나 권한이 있는 액세스로 실행해야 합니다. Unix 플랫폼의 `open_file_descriptors` 메트릭의 경우 추가 구성 옵션이 있습니다. `conf.yaml` 파일에서 `try_sudo`를 `true`로 설정하면 Process 점검에서 `sudo`를 사용하여 `open_file_descriptors` 메트릭을 수집할 수 있습니다. 이 구성 옵션을 사용하려면 `/etc/sudoers`에서 적절한 sudoers 규칙을 설정해야 합니다.

```shell
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `process`를 찾습니다.

### 메트릭 참고 사항

다음 메트릭은 Linux 또는 macOS에서 사용할 수 없습니다.
- Agent가 읽는 파일(`/proc//io`)을 프로세스 소유자만 읽을 수 있기 때문에 Linux나 macOS에서는 Process I/O 메트릭을 사용할 수 없습니다. 자세한 내용은 [Agent FAQ를 참조하세요][6].

다음 메트릭은 Windows에서 사용할 수 없습니다.
- `system.cpu.iowait`
- `system.processes.mem.page_faults.minor_faults`
- `system.processes.mem.page_faults.children_minor_faults`
- `system.processes.mem.page_faults.major_faults`
- `system.processes.mem.page_faults.children_major_faults`
- `system.processes.mem.real`

**참고**: [WMI 점검][7]을 사용하여 Windows에서 페이지 오류 메트릭을 수집합니다.

**참고**: Windows의 v6.11+에서 Agent는 `Local System` 대신 `ddagentuser`로 실행됩니다. [이것][8] 때문에 다른 사용자 계정으로 실행되는 프로세스의 전체 명령줄과 다른 사용자의 프로세스 사용자에 대한 액세스 권한이 없습니다.  이로 인해 점검의 다음 옵션이 작동하지 않습니다.
- `exact_match`를 `false`로 설정 시
- 특정 사용자에게 속한 프로세스를 선택하게 해주는 `user`

모든 메트릭은 `instance`당 process.yaml에서 구성되고 `process_name:<instance_name>` 태그가 지정됩니다.

이 점검에서 보낸 `system.processes.cpu.pct` 메트릭은 30초 이상 지속되는 프로세스에 대해서만 정확합니다. 수명이 짧은 프로세스에 대한 값은 정확하지 않을 수 있습니다.

전체 메트릭 목록은 [메트릭 섹션](#metrics)을 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "process" >}}


### 이벤트

Process 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "process" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

## 참고 자료

Datadog으로 프로세스 리소스 사용을 모니터링하는 방법은 [관련 블로그 포스트][12]에서 확인해 보세요.

[1]: https://docs.datadoghq.com/ko/monitors/create/types/process_check/?tab=checkalert
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric/
[7]: https://docs.datadoghq.com/ko/integrations/wmi_check/
[8]: https://docs.datadoghq.com/ko/agent/guide/windows-agent-ddagent-user/#process-check
[9]: https://github.com/DataDog/integrations-core/blob/master/process/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/process/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/
[12]: https://www.datadoghq.com/blog/process-check-monitoring