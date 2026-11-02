---
description: SECL 변수와 Agent 규칙 작업을 통해 이벤트를 보강하고, 위협에 대응하고, 상태 기반의 탐지 로직을 구축하세요.
disable_toc: false
title: 변수 및 작업
---
규칙 작업을 실행할 경우 Workload Protection(런타임 보안) 규칙의 범위가 탐지 수준 이상으로 확장됩니다. 규칙이 이벤트와 일치하면 Agent는 1건 이상의 작업을 실행하여 이벤트를 보강하거나, 위협에 대응하거나, 다단계 탐지 로직을 구동할 수 있습니다.

작업은 규칙의 `actions` 필드 아래의 Agent 정책 파일(`.policy`)에 정의됩니다.
<div class="alert alert-info">모든 작업은 Agent의 Agent 정책 파일(YAML)에서 구성할 수 있지만 <code>log</code>, <code>coredump</code>및 <code>network_filter</code> 규칙 생성 시 UI에서는 설정할 수 없습니다.
Datadog에서 Agent 규칙을 생성할 때 다음을 구성할 수 있습니다. <code>hash</code>, <code>kill</code> (<a href="/security/workload_protection/respond_and_report/#automated-response">Automated response</a>) 및 <code>set</code> 작업. 보안 신호에서 다음 항목을 수동으로 적용할 수 있습니다. <code>kill</code> 또는 <code>network_filter</code> <a href="/security/workload_protection/respond_and_report/#response">수동 대응</a>으로 표적 위협에 대응합니다.
</div>

| 작업           | 목적                                               | 플랫폼       | 적용 필요 |
| ---------------- | ----------------------------------------------------- | -------------- | -------------------- |
| `set`            | 다른 규칙에서 사용할 수 있도록 변수에 상태 저장      | Linux, Windows | 아니요                   |
| `kill`           | 프로세스 종료                                   | Linux, Windows | 예                  |
| `hash`           | 파일 해시 계산                              | Linux          | 아니요                   |
| `log`            | Agent 로그에 메시지 기록                      | Linux, Windows | 아니요                   |
| `coredump`       | 포렌식 상태 캡처(process, mount, dentry)       | Linux          | 아니요                   |
| `network_filter` | BPF 필터와 일치하는 네트워크 트래픽 모니터링/차단 | Linux          | 예                  |


## 구문 {#syntax}

각 규칙별로 여러 작업을 YAML 목록 형태로 정의할 수 있습니다. 각 목록 항목에는 정확히 하나의 작업 유형을 포함해야 합니다.

{{< code-block lang="yaml" >}}
rules:
  - id: my_rule
    expression: exec.file.name == "suspicious_binary"
    actions:
      - set:
          name: flagged_process
          value: true
          ttl: 5m
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

### 작업 필터 {#action-filters}

모든 작업은 선택 사항에 해당하는 `filter` 필드를 지원합니다(작업 시점에 평가되는 SECL 표현식). 작업은 규칙 표현식과 작업 필터가 모두 일치하는 경우에만 실행됩니다.


| 필드    | (필수) | 기본값                                | 설명                               |
| -------- | -------- | -------------------------------------- | ----------------------------------------- |
| `filter` | 아니요       | 없음(모든 규칙이 일치할 때 작업 실행) | 작업 시점에 평가되는 SECL 표현식 |


{{< code-block lang="yaml" >}}
rules:
  - id: kill_container_process
    expression: exec.file.name == "malware"
    actions:
      - filter: process.container.id != ""
        kill:
          signal: SIGTERM
          scope: container

{{< /code-block >}}

## `set`: 변수 저장 {#set-store-variables}

`set`을 사용하여 동일한 정책 내 규칙 간에 지속되는 상태를 저장합니다. 변수를 정의한 후 해당 정책의 다른 모든 규칙에서 변수를 참조할 수 있습니다.

### 사용 시점 {#when-to-use-it}

변수는 Agent 규칙 작성 과정에서 가장 강력한 기능 중 하나입니다. 단일 SECL 표현식으로 표현할 수 없는 상태 기반의 다단계 탐지를 구축하는 데 필수적입니다.

- 한 규칙에서 컨텍스트를 기록하고, 해당 변수를 참조하는 후속 규칙을 매칭하는 방식으로 정책 내 규칙을 연결합니다.
- 프로세스 이름, 경로, DNS 활동의 롤링 리스트를 작성합니다.

### 파라미터 {#parameters}


| 필드           | (필수)                                 | 기본값                         | 설명                                                                                      |
| --------------- | ---------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `name`          | 예                                      | —                               | 변수 이름 표현식에서 `${name}` 또는 `${scope.name}`으로 참조됩니다.                        |
| `value`         | `value`, `field`, `expression` |  중에 1개 —                               | 정적 값(문자열, 정수, 불리언, 배열)                                               |
| `field`         | `value`, `field`, `expression` |  중에 1개 —                               | 트리거 이벤트의 값을 복사합니다(예: `process.file.name`).                       |
| `expression`    | `value`, `field`, `expression` |  중에 1개 — | 결과를 저장하는 SECL 표현식 유형을 추론할 수 없는 경우 `default_value`이 필요합니다.     |
| `default_value` | 아니요 | — | `expression` 사용 시 기본값 적용 유형 `value`과 일치해야 합니다.                                 |
| `scope`         | 아니요 | 전역(범위 접두사 없음) | `process`, `container`, `cgroup`. 변수 이름 앞에 접두사를 붙입니다(예: `process.my_var`). |
| `scope_field`   | 아니요 | 트리거 프로세스 PID | 사용자 지정 범위 키(`process` 범위만 해당).                                                         |
| `append`        | 아니요 | `false`                         | 덮어쓰지 않고 목록 변수에 추가합니다.                                                |
| `size`          | 아니요 | `100`(`append`가 `true`인 경우) | 최대 목록 길이(`append`가 `true`인 경우)                                                     |
| `ttl`           | 아니요 | 만료 없음 | 지속 시간(예: `10s`, `5m`) 이 기간이 지나면 변수가 만료됩니다.                   |
| `inherited`     | 아니요 | `false`                         | 변수가 자식 프로세스에 상속됩니다(`process` 범위만 해당).                                 |
| `private`       | 아니요 | `false`                         | 변수가 보안 이벤트에서 노출되지 않습니다.                                                      |


### 예시 {#examples}

불리언 플래그 설정하기:

{{< code-block lang="yaml" >}}
rules:
  - id: flag_suspicious_exec
    expression: exec.file.path in ["/tmp/evil"]
    actions:
      - set:
          name: suspicious
          value: true
          ttl: 10m
  - id: detect_follow_up
    expression: open.file.path == "/etc/shadow" && ${suspicious}
{{< /code-block >}}

DNS 쿼리를 롤링 목록 형태로 수집합니다.

{{< code-block lang="yaml" >}}
rules:
  - id: collect_dns_queries
    expression: dns.question.name != ""
    actions:
      - set:
          name: queried_domains
          field: dns.question.name
          append: true
          size: 10
          ttl: 10s
          scope: process

{{< /code-block >}}

상관관계 규칙을 생성합니다.

`private`를 사용하여 내부 상태를 보안 이벤트에서 제외하고, `scope_field`를 사용하여 이벤트를 트리거한 프로세스가 아닌 다른 프로세스에 변수를 바인딩합니다(예: `cgroup_write` 이벤트 대상).

{{< code-block lang="yaml" >}}
rules:
  - id: init_correlation_key
    expression: cgroup_write.file.path != "" && ${process.correlation_key} == ""
    actions:
      - set:
          name: correlation_key
          default_value: ""
          expression: '"attack_${builtins.uuid4}"'
          scope: process
          scope_field: cgroup_write.pid
          inherited: true
          private: true
  - id: detect_correlated_file_access
    expression: open.file.path == "/etc/shadow" && ${process.correlation_key} != ""
{{< /code-block >}}

표현식을 바탕으로 값을 계산합니다.
`expression`과 `default_value`을 함께 사용하여 변수 유형을 정의하고 계산된 결과를 저장합니다.

{{< code-block lang="yaml" >}}
rules:
  - id: record_exec_context
    expression: exec.file.path in ["/tmp/evil"]
    actions:
      - set:
          name: exec_context
          default_value: ""
          expression: '"cmd_${process.pid}_${exec.file.name}"'
          scope: process
          ttl: 5m
{{< /code-block >}}

## `kill`: 프로세스 종료 {#kill-terminate-a-process}

`kill`을 사용하여 악성 활동을 능동적으로 차단합니다. Agent는 대상 프로세스, 컨테이너, cgroup에 POSIX 신호를 보냅니다.

### Datadog에서 구성하기 {#configure-in-datadog}

Agent 정책 파일에서 `kill` 작업을 정의하는 것 외에도, Datadog에서 프로세스 종료를 구성할 수 있습니다.

- **자동:** 이 섹션에서 설명한 대로 정책의 Agent 규칙에 `kill` 작업을 추가하거나 [자동 응답][1]을 사용하세요.
- **수동:** 보안 신호의 경우 신호 사이드 패널의 {{< ui >}}Respond{{< /ui >}} 아래에 있는 [컨테이너/프로세스 종료][2]를 사용하세요.

두 방식 모두 [Agent 강제 적용][3]이 필요하며, 이는 기본적으로 활성화되어 있습니다. 강제 적용 및 대응 작업에 대한 개요는 [위협 대응][4]을 참조하세요.

### 사용 시점 {#when-to-use-it-1}

- 런타임에 암호화폐 채굴, 리버스 셸, 알려진 악성 코드를 차단합니다.
- 프로세스를 정상적으로 중지(`SIGTERM`)하거나 강제 종료(`SIGKILL`)합니다.

### 요구 사항 {#requirements}

- Agent 구성(`runtime_security_config.enforcement.enabled`)에서 강제 적용(enforcement)을 활성화해야 합니다. [고급 구성][5]을 참조하세요.
- 강제 적용이 전역적으로 비활성화된 경우, 종료 작업은 정책 로드 시점에 거부됩니다.
- 지원되는 신호로는 `SIGKILL`, `SIGTERM`, `SIGHUP`, `SIGINT`, 기타 표준 POSIX 신호 이름 등이 있습니다.

### 파라미터 {#parameters-1}


| 필드                         | (필수) | 기본값   | 설명                                                                         |
| ----------------------------- | -------- | --------- | ----------------------------------------------------------------------------------- |
| `signal`                      | 예      | —         | 신호 이름(예: `SIGKILL`, `SIGTERM`)                                    |
| `scope`                       | 아니요       | `process` | `process`, `container` 또는 `cgroup` 신호를 수신할 프로세스를 결정합니다. |
| `disable_container_disarmer`  | 아니요       | `false`   | 자동 컨테이너 무력화 보호 기능을 비활성화합니다.                                 |
| `disable_executable_disarmer` | 아니요       | `false`   | 자동 실행 파일 무력화 보호 기능을 비활성화합니다.                                |


### 안전 장치 {#safeguards}

Agent에는 자동 대응 중 폭주 프로세스 종료 루프를 방지하는 무력화 장치가 포함되어 있습니다. 구성한 기간 내에 동일한 컨테이너나 실행 파일에 대해 지나치게 많은 종료 작업이 실행되면, 해당 기간이 만료될 때까지 대상에 대한 후속 종료 작업이 억제됩니다.

특정 바이너리는 `runtime_security_config.enforcement.exclude_binaries`를 통해 강제 적용 대상에서 제외할 수 있습니다.

### 예시 {#example}

{{< code-block lang="yaml" >}}
rules:
  - id: block_ping_process
    expression: >-
      exec.file.name == "ping"
    actions:
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

#### 종료 작업 보고서 {#kill-action-report}

`kill` 작업이 실행되면 Agent는 `agent.rule_actions`의 트리거 Agent 이벤트에 작업 보고서를 첨부합니다. 이는 별도의 사용자 지정 이벤트가 아니며, 보고서는 규칙과 일치하는 보안 이벤트와 함께 직렬화됩니다. `SIGKILL`의 경우, Agent는 타이밍 필드의 정확성 확보를 위해 대상 프로세스가 종료될 때까지 이벤트 전송을 지연할 수 있습니다.

| 필드 | 설명 |
| ----- | ----------- |
| `type` | 상시 `kill` |
| `signal` | POSIX 신호 전송됨(예: `SIGKILL`, `SIGTERM`) |
| `scope` | `process`, `container`, `cgroup` |
| `status` | 실행 결과: `performed`, `partially_performed`, `error`, `kill_queued`, `kill_aborted`, `rule_disarmed`, `rule_dismantled` |
| `disarmer_type` | 종료를 차단 또는 변경한 보호 기능: `container` 또는 `executable`(해당하는 경우) |
| `created_at` | 대상 프로세스가 생성된 시간 |
| `detected_at` | 규칙이 일치한 시간 |
| `killed_at` | 신호가 전송된 시간(해당하는 경우) |
| `exited_at` | 대상 프로세스가 종료된 시간(해당하는 경우) |
| `ttr` | 프로세스 생성부터 종료까지의 경과 시간 |

규칙 일치 후 `kill` 작업 실행 횟수를 계산하려면 `rule_id:<rule_id>` 및 `action_name:kill` 태그와 함께 `datadog.runtime_security_config.rules.action_performed` 메트릭을 사용합니다.

## `network_filter`: 네트워크 트래픽 모니터링 또는 차단 {#network-filter-monitor-or-block-network-traffic}

`network_filter`를 사용하여 문제가 되는 프로세스나 cgroup의 BPF 필터 표현식과 일치하는 패킷을 드롭합니다. 이는 호스트 수준의 네트워크 격리입니다.

### Datadog에서 구성하기 {#configure-in-datadog-1}

Agent 정책 파일에서 `network_filter` 작업을 정의하는 것 외에도, Datadog에서 손상된 워크로드를 격리할 수 있습니다.

- **자동:** 이 섹션에서 설명한 대로 정책의 Agent 규칙에 `network_filter` 작업을 추가합니다. 규칙이 일치하면 Agent에서 일치하는 트래픽을 자동으로 드롭합니다.
- **수동:** 보안 신호의 경우 신호 사이드 패널의 {{< ui >}}Respond{{< /ui >}} 아래에 있는 [네트워크 격리][6]를 사용합니다.

### 사용 시점 {#when-to-use-it-2}

- 악성 프로세스 탐지 후 C2 통신을 차단합니다.
- 손상된 컨테이너의 DNS 또는 특정 포트 트래픽을 차단합니다.

### 요구 사항 {#requirements-1}

- 강제 적용을 활성화해야 합니다.
- `raw_packet` 이벤트 유형은 Agent 설정에서 활성화해야 합니다.
- Linux 전용(eBPF 기반 패킷 필터링)

### 파라미터 {#parameters-2}


| 필드    | (필수) | 기본값   | 설명                                                    |
| -------- | -------- | --------- | -------------------------------------------------------------- |
| `filter` | 예      | —         | BPF 필터 표현식(예: `port 53`, `tcp port 80`) |
| `policy` | 아니요       | `allow`   | `drop` 또는 `allow`. `drop`만 패킷 드롭을 강제 적용합니다.       |
| `scope`  | 아니요       | `process` | `process` 또는 `cgroup`.                                         |


### 예시 {#example-1}

{{< code-block lang="yaml" >}}
rules:
  - id: block_malicious_container_network
    expression: exec.container.id == "046f6a38c8b404a78fb9be56672d554ed5a326f4c568ffb137e16cf3e7e6be43"
    actions:
      - network_filter:
          filter: "dst net 10.0.0.0/8 or dst net 172.16.0.0/12 or dst net 192.168.0.0/16 or dst net 169.254.0.0/16 or dst net 127.0.0.0/8"
          policy: drop
          scope: cgroup

{{< /code-block >}}

### 원시 패킷 작업 및 메트릭 {#raw-packet-action-and-metrics}

#### 원시 패킷 작업 이벤트 {#raw-packet-action-event}

커널이 활성 필터와 일치하는 패킷을 드롭하면 Agent에서 `rawpacket_action` 사용자 지정 이벤트(`@agent.rule_id:rawpacket_action`)를 내보낼 수 있습니다. 이러한 이벤트에는 드롭 볼륨이 높을 때 속도 제한이 적용됩니다. Agent에서 드롭된 모든 패킷에 대해 이벤트를 1개씩 전송할 수 없기 때문입니다. 이벤트 페이로드는 다음을 포함합니다.


| 필드            | 설명                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `packet.dropped` | `true` 드롭된 패킷                                           |
| `packet.layers`  | 디코딩된 네트워크 레이어(Ethernet, IP, TCP/UDP 등)            |
| `packet.tls`     | TLS 컨텍스트(사용 가능한 경우)                                           |
| `network`        | 드롭된 패킷의 네트워크 컨텍스트(장치, 소스, 대상) |


#### 메트릭 {#metrics}

드롭 횟수를 안정적으로 추적하려면 `datadog.runtime_security_config.network.raw_packet.dropped` 메트릭을 사용하세요.

## `hash`: 파일 해시 계산 {#hash-compute-file-hashes}

`hash`를 사용하여 트리거 이벤트에서 참조된 파일의 암호화 해시로 이벤트를 보강합니다. 이는 위협 인텔리전스 매칭과 포렌식 분석에 유용합니다.

### 사용 시점 {#when-to-use-it-3}

- 바이너리가 삭제 또는 수정되기 전 실행 시점에 해시를 생성합니다.
- 알려진 악성 코드 서명과의 상관관계 분석을 위해 쓰기용으로 열린 파일의 해시를 생성합니다.

### 파라미터 {#parameters-3}


| 필드           | (필수) | 기본값                                                                      | 설명                                                                                       |
| --------------- | -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `field`         | 아니요       | `exec.file` 규칙의 경우; `exec``open.file` 규칙의 경우                   `open`| 해시를 생성할 파일 이벤트 필드(예: `exec.file`, `open.file`) 기타 이벤트 유형에 필요합니다. |
| `max_file_size` | 아니요       | `5242880`(5 MB), `runtime_security_config.hash_resolver.max_file_size` | 해시를 생성할 파일 크기(바이트) 기준 이보다 더 큰 파일은 건너뜁니다.                                      |


### 지원되는 알고리즘 {#supported-algorithms}

해시는 Agent 해시 리졸버에 의해 계산되며, Agent 구성에 따라 `MD5`, `SHA1`, `SHA256` 및 `SSDEEP`을 포함할 수 있습니다. 결과는 파일 이벤트의 `*.hashes` 필드에 표시됩니다(예: `exec.file.hashes`). `runtime_security_config.hash_resolver.hash_algorithms`을 `system-probe.yaml`에서 업데이트하거나 `DD_RUNTIME_SECURITY_CONFIG_HASH_RESOLVER_HASH_ALGORITHMS`을 설정합니다. 모든 해시 리졸버 파라미터에 대한 내용은 [Workload Protection Agent 구성][5]을 참조하세요.

### 예시 {#example-2}

{{< code-block lang="yaml" >}}
rules:
  - id: hash_dropped_binary
    expression: exec.file.path startswith "/tmp/" && exec.file.name not in ["systemd"]
    actions:
      - hash:
          field: exec.file
          max_file_size: 10485760  # 10 MB

{{< /code-block >}}

## `log`: Agent 로그에 기록 {#log-write-to-agent-logs}

규칙이 실행될 때 `log`를 사용하여 Runtime Security Agent 로그에 구조화된 메시지를 전송합니다. 이는 사용자 지정 규칙을 디버깅하거나 전체 보안 신호를 생성하지 않고 규칙 트리거를 감사하는 데 유용합니다.

### 사용 시점 {#when-to-use-it-4}

- 개발 과정에서 규칙 로직을 디버그합니다.

### 파라미터 {#parameters-4}


| 필드     | (필수) | 기본값                    | 설명                                        |
| --------- | -------- | -------------------------- | -------------------------------------------------- |
| `level`   | 예      | —                          | 로그 레벨: `debug`, `info`, `warning`, `error`. |
| `message` | 아니요       | `Rule <rule_id> triggered` | 사용자 지정 메시지                                    |


### 예시 {#example-3}

{{< code-block lang="yaml" >}}
rules:
  - id: log_sensitive_file_access
    expression: open.file.path startswith "/etc/"
    actions:
      - log:
          level: warning
          message: "Suspicious file access detected on sensitive path"

{{< /code-block >}}

## `coredump`: 포렌식 상태 캡처 {#coredump-capture-forensic-state}

규칙이 일치하는 시점에 `coredump`을 사용하여 내부 Agent 상태 스냅샷을 생성합니다. 덤프는 gzip으로 압축되며(비활성화되지 않은 경우) 보안 이벤트에 첨부됩니다.

### 사용 시점 {#when-to-use-it-5}

- 주로 디버그 목적으로 사용됩니다.
- 트리거 이벤트와 함께 프로세스 트리, 마운트 표, dentry 캐시 상태 등의 내부 컨텍스트 캐시를 캡처합니다.

### 플랫폼 {#platform}

Linux 전용입니다.

### 파라미터 {#parameters-5}

`process`, `mount`, `dentry` 중에서 하나 이상을 `true`로 설정해야 합니다.


| 필드            | 필수     | 기본값                            | 설명                                   |
| ---------------- | ------------ | ---------------------------------- | --------------------------------------------- |
| `process`        | 최소 1개 이상 | `false`                            | 프로세스 리졸버 스냅샷을 포함합니다.        |
| `mount`          | 최소 1개 이상 | `false`                            | 마운트 리졸버 스냅샷을 포함합니다.          |
| `dentry`         | 최소 1개 이상 | `false`                            | 덴트리 리졸버 스냅샷을 포함합니다.         |
| `no_compression` | 아니요           | `false` (gzip 압축 활성화됨) | 덤프 페이로드의 gzip 압축을 비활성화합니다. |


### 예시 {#example-4}

{{< code-block lang="yaml" >}}
rules:
  - id: capture_forensic_state
    expression: exec.file.path startswith "/tmp/" && process.container.id != ""
    actions:
      - coredump:
          process: true
          mount: true
          dentry: true
          no_compression: false

{{< /code-block >}}

## 작업 결합 {#combining-actions}

단일 규칙으로 여러 건의 작업을 연결할 수 있습니다. 규칙이 일치하면 목록 순서대로 실행됩니다.

{{< code-block lang="yaml" >}}
rules:
  - id: detect_and_respond
    expression: exec.file.path == "/tmp/payload"
    actions:
      - set:
          name: payload_seen
          value: true
      - hash:
          field: exec.file
      - log:
          level: info
          message: "Payload executed, hashing and killing"
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

일반 패턴:


| 패턴                 | 작업                                       |
| ----------------------- | --------------------------------------------- |
| 탐지 → 보강 → 경고 | `hash` 전용(신호 자동 전송)       |
| 탐지 → 대응        | `kill` 또는 `network_filter`                    |
| 다단계 탐지    규칙 A에서| `set`, 규칙 B에서 `${var}` 참조 |
| 사용자 지정 규칙 디버그      | `log`                                         |


## 플랫폼 요약 {#platform-summary}


| 작업           | Linux | Windows |
| ---------------- | ----- | ------- |
| `set`            | ✅     | ✅       |
| `kill`           | ✅     | ✅       |
| `hash`           | ✅     | ❌       |
| `log`            | ✅     | ✅       |
| `coredump`       | ✅     | ❌       |
| `network_filter` | ✅     | ❌       |


## 유효성 검사 규칙 {#validation-rules}

Agent는 정책 로드 시점에 작업을 검증합니다.

- **목록 항목당 작업 유형 1개**: `set` 및 `kill`은 동일한 작업 블록에 표시할 수 없습니다.
- **필수 필드**: 예: `kill.signal`, `log.level`, `network_filter.filter`
- **강제 적용 게이트**: `kill` 및 `network_filter`는 강제 적용을 활성화해야 합니다.
- **이벤트 유형 호환성**: `network_filter`는 `raw_packet` 이벤트 유형을 필요로 하며, `hash.field`는 규칙의 이벤트 유형과 호환되어야 합니다.

[1]: /ko/security/workload_protection/respond_and_report/#automated-response
[2]: /ko/security/workload_protection/investigate_and_triage/security_signals/actions#kill-containers-or-processes
[3]: /ko/security/workload_protection/respond_and_report/#configure-agent-enforcement
[4]: /ko/security/workload_protection/respond_and_report/
[5]: /ko/security/workload_protection/setup/advanced_configuration
[6]: /ko/security/workload_protection/investigate_and_triage/security_signals/actions#network-isolation