---
app_id: system
categories:
- os & system
custom_kind: 통합
description: 메트릭을 수집하고 실행 중인 프로세스 상태를 모니터링하세요.
further_reading:
- link: https://www.datadoghq.com/blog/process-check-monitoring
  tag: 블로그
  text: 프로세스 리소스 사용량을 한눈에 모니터링
integration_version: 5.1.0
media: []
supported_os:
- linux
- macos
- windows
title: 프로세스
---
## 개요

Process 점검으로 다음을 수행할 수 있습니다.

- 호스트에서 실행 중인 특정 프로세스에 대한 리소스 사용 메트릭을 수집합니다. 예를 들어 CPU, 메모리, I/O 및 스레드 수입니다.
- [Process Monitors][1]를 사용하여 특정 프로세스의 실행 인스턴스 수의 임계값을 구성하고 임계값이 충족되지 않을 때 알림을 받도록 설정할 수 있습니다(아래 **Service Checks** 참고).

## 설정

### 설치

Process 점검은 [Datadog Agent][2] 패키지에 포함되어 있으므로 서버에 별도로 설치할 필요가 없습니다.

### 설정

많은 점검과 달리 Process 점검은 기본적으로 유용한 것을 모니터링하지 않습니다. 따라서 모니터링하려는 프로세스를 구성해야 합니다.

표준 기본 점검 구성은 없지만, SSH/SSHD 프로세스를 모니터링하는 예시 `process.d/conf.yaml`는 다음과 같습니다. 사용 가능한 모든 구성 옵션은 [샘플 process.d/conf.yaml][3]을 참고하세요.

```yaml
init_config:
instances:
  - name: ssh
    search_string:
      - ssh
      - sshd
```

**참고**: 설정을 변경한 후에는 반드시 [Agent를 재시작하세요][4].

일부 프로세스 메트릭을 검색하려면 Datadog 컬렉터를 모니터링된 프로세스 사용자로 실행하거나 권한이 있는 액세스로 실행해야 합니다. Unix 플랫폼의 `open_file_descriptors` 메트릭의 경우 추가 구성 옵션이 있습니다. `conf.yaml` 파일에서 `try_sudo`를 `true`로 설정하면 Process 점검에서 `sudo`를 사용하여 `open_file_descriptors` 메트릭을 수집할 수 있습니다. 이 구성 옵션을 사용하려면 `/etc/sudoers`에서 적절한 sudoers 규칙을 설정해야 합니다.

```shell
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

### 검증

[Agent 상태 하위 명령][5]을 실행하고 Checks 섹션에서 `process`를 찾습니다.

### 메트릭 참고 사항

다음 메트릭은 Linux 또는 macOS에서 사용할 수 없습니다.

- Agent가 읽는 파일(`/proc/<PID>/io`)은 프로세스 소유자만 읽을 수 있으므로 Linux 또는 macOS에서는 프로세스 I/O 메트릭을 사용할 수 **없습니다**. 자세한 내용은 [Agent FAQ를 참고하세요][6].

다음 메트릭은 Windows에서 사용할 수 없습니다.

- `system.cpu.iowait`
- `system.processes.mem.page_faults.minor_faults`
- `system.processes.mem.page_faults.children_minor_faults`
- `system.processes.mem.page_faults.major_faults`
- `system.processes.mem.page_faults.children_major_faults`
- `system.processes.mem.real`

**참고**: Windows에서 페이지 폴트 메트릭을 수집하려면 [WMI 점검][7]을 사용하세요.

**참고**: Windows 버전 6.11 이상에서는 Agent가 `Local System` 대신 `ddagentuser`로 실행됩니다. [이 때문에][8] 다른 사용자 계정으로 실행 중인 프로세스의 전체 명령줄과 다른 사용자 프로세스의 사용자 계정에 접근할 수 없습니다. 또한, 다음 점검 옵션이 작동하지 않습니다.

- `exact_match`를 `false`로 설정 시
- 특정 사용자에게 속한 프로세스를 선택하게 해주는 `user`

모든 메트릭은 `instance`당 process.yaml에서 구성되고 `process_name:<instance_name>` 태그가 지정됩니다.

이 점검에서 전송되는 `system.processes.cpu.pct` 메트릭은 30초 이상 실행되는 프로세스에만 정확합니다. 실행 시간이 짧은 프로세스라면 해당 값이 정확하지 않을 수 있습니다.

전체 메트릭 목록은 아래 Metrics 섹션을 참조하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **system.processes.cpu.pct** <br>(gauge) | 프로세스의 CPU 사용률<br>_percent로 표시됨_ |
| **system.processes.cpu.normalized_pct** <br>(gauge) | 프로세스의 정규화된 CPU 사용률<br>_percent로 표시됨_ |
| **system.processes.involuntary_ctx_switches** <br>(gauge) | 이 프로세스에서 발생한 비자발적 컨텍스트 스위치 수<br>_event로 표시됨_ |
| **system.processes.ioread_bytes** <br>(gauge) | 이 프로세스가 디스크에서 읽은 바이트 수. (Windows에서는 읽은 바이트 수)<br>_byte로 표시됨_ |
| **system.processes.ioread_bytes_count** <br>(count) | 이 프로세스가 디스크에서 읽은 바이트 수. (Windows에서는 읽은 바이트 수)<br>_byte로 표시됨_ |
| **system.processes.ioread_count** <br>(gauge) | 이 프로세스의 디스크 읽기 횟수. (Windows에서는 이 프로세스의 읽기 횟수)<br>_read로 표시됨_ |
| **system.processes.iowrite_bytes** <br>(gauge) | 이 프로세스가 디스크에 기록한 바이트 수. (Windows에서는 이 프로세스가 기록한 바이트 수)<br>_byte로 표시됨_ |
| **system.processes.iowrite_bytes_count** <br>(count) | 이 프로세스가 디스크에 기록한 바이트 수. (Windows에서는 이 프로세스가 기록한 바이트 수)<br>_byte로 표시됨_ |
| **system.processes.iowrite_count** <br>(gauge) | 이 프로세스의 디스크 쓰기 수. (Windows에서는 이 프로세스의 쓰기 횟수)<br>_write로 표시됨_ |
| **system.processes.mem.page_faults.minor_faults** <br>(gauge) | Unix/Linux 또는 macOS: 이 프로세스에서 초당 발생하는 마이너 페이지 폴트 수<br>_occurrence로 표시됨_ |
| **system.processes.mem.page_faults.children_minor_faults** <br>(gauge) | Unix/Linux 또는 macOS: 이 프로세스의 하위 프로세스에서 초당 발생하는 마이너 페이지 폴트 수<br>_occurrence로 표시됨_ |
| **system.processes.mem.page_faults.major_faults** <br>(gauge) | Unix/Linux 또는 macOS: 이 프로세스에서 초당 발생하는 메이저 페이지 폴트 수<br>_occurrence로 표시됨_ |
| **system.processes.mem.page_faults.children_major_faults** <br>(gauge) | Unix/Linux 또는 macOS: 이 프로세스의 하위 프로세스에서 초당 발생하는 메이저 페이지 폴트 수<br>_occurrence로 표시됨_ |
| **system.processes.mem.pct** <br>(gauge) | 프로세스 메모리 소비율<br>_percent로 표시됨_ |
| **system.processes.mem.real** <br>(gauge) | 프로세스가 사용 중이며 다른 프로세스와 공유할 수 없는 비스왑(non-swapped) 물리 메모리(Linux만 해당)<br>_byte로 표시됨_ |
| **system.processes.mem.rss** <br>(gauge) | 프로세스가 사용 중인 비스왑(non-swapped) 물리 메모리. "Resident Set Size"라고도 함.<br>_byte로 표시됨_ |
| **system.processes.mem.vms** <br>(gauge) | 프로세스가 사용하는 가상 메모리의 총량. "Virtual Memory Size"라고도 함.<br>_byte로 표시됨_ |
| **system.processes.number** <br>(gauge) | 프로세스 수<br>_process로 표시됨_ |
| **system.processes.open_file_descriptors** <br>(gauge) | 이 프로세스가 사용한 파일 디스크립터 수 (dd-agent 사용자 권한으로 실행되는 프로세스에서만 사용 가능)|
| **system.processes.open_handles** <br>(gauge) | 이 프로세스가 사용한 핸들 수|
| **system.processes.threads** <br>(gauge) | 이 프로세스가 사용하는 스레드 수<br>_thread로 표시됨_ |
| **system.processes.voluntary_ctx_switches** <br>(gauge) | 이 프로세스가 수행한 자발적 컨텍스트 스위치 횟수<br>_event로 표시됨_ |
| **system.processes.run_time.avg** <br>(gauge) | 이 프로세스의 모든 인스턴스의 평균 실행 시간<br>_second로 표시됨_ |
| **system.processes.run_time.max** <br>(gauge) | 이 프로세스의 모든 인스턴스 중 가장 긴 실행 시간<br>_second로 표시됨_ |
| **system.processes.run_time.min** <br>(gauge) | 이 프로세스의 모든 실행 시간 중 가장 짧은 시간<br>_second로 표시됨_ |

### 이벤트

Process 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**process.up**

점검 값이 경고 임계값 내에 있으면 OK를 반환하고, 치명적 임계값을 벗어나면 CRITICAL을 반환하며, 경고 임계값을 벗어나면 WARNING을 반환합니다.

_Statuses: ok, warning, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀][9]에 문의하세요.

## 참고 자료

Datadog을 사용하여 프로세스 리소스 사용량을 모니터링하는 방법(또는 이유)에 대해 더 자세히 알아보려면 다음 [블로그 포스트 시리즈][10]를 참고하세요.

[1]: /monitors/create/types/process_check/?tab=checkalert
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example
[4]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /agent/guide/agent-commands/#agent-status-and-information
[6]: /agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric/
[7]: /integrations/wmi_check/
[8]: /agent/guide/windows-agent-ddagent-user/#process-check
[9]: /help/
[10]: https://www.datadoghq.com/blog/process-check-monitoring