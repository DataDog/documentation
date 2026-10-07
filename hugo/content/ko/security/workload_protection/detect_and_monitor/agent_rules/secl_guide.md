---
aliases:
- /ko/security/workload_protection/agent_expressions
- /ko/security/threats/agent_expressions
- /ko/security/workload_protection/secl_auth_guide
- /ko/security/workload_protection/guide/custom-rules-guidelines
description: Datadog Security Language(SECL)를 사용하여 Workload Protection Agent 규칙 표현식을
  작성하세요.
disable_toc: false
title: SECL 가이드
---
Datadog SECL은 Datadog Workload Protection에서 Agent 표현식과 정책을 생성하는 데 사용되는 사용자 지정 도메인 특화 언어입니다. SECL을 사용하면 보안 팀이 호스트, 컨테이너, 애플리케이션 및 클라우드 인프라 전반에서 보안 Agent가 모니터링할 수 있는 조건, 연산자 및 패턴을 지정하여 실시간 위협 탐지 규칙을 정의할 수 있습니다.

## SECL 규칙 구성 방식 {#how-secl-rules-fit-together}

SECL을 로컬 필터로 생각하세요. 각 호스트의 Agent 내부에서 실행되며 커널 및 OS 이벤트를 모니터링합니다. 이벤트가 SECL 표현식과 일치하면 Agent가 탐지를 생성합니다.

Datadog 위협 탐지 규칙은 백엔드 로직으로 작동합니다. 즉, 하나 이상의 Agent 규칙을 결합하고(`@agent.rule_id` 사용), 임계값을 추가하며, 불필요한 탐지를 억제하고, 경보 전달 방식을 결정합니다.

요약하면, Agent 규칙은 원시 동작을 찾고, 탐지 규칙은 이를 전체 공격 흐름으로 연결합니다.

<div class="alert alert-info">이 가이드에서는 규칙 표현식을 수동으로 생성하는 방법을 설명하지만, Workload Protection에서는 <b>Assisted rule creator</b> 마법사를 제공하여 Agent 및 탐지 규칙을 함께 생성하는 과정을 안내합니다. <a href="/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together">사용자 지정 Agent 및 탐지 규칙 함께 생성</a>을 참조하세요.</div>

## SECL 표현식 구문 {#secl-expression-syntax}

SECL 표현식의 표준 형식은 다음과 같습니다.

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...
{{< /code-block >}}

이 형식을 사용하는 Linux 시스템의 규칙 예시는 다음과 같습니다.

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && process.file.path not in ["/usr/sbin/vipw"]
{{< /code-block >}}

### 연산자 {#operators}

SECL 연산자는 이벤트 속성을 결합하여 전체 표현식으로 구성하는 데 사용됩니다. 다음 연산자를 사용할 수 있습니다.

| SECL 연산자         |  정의                              | Agent 버전 |
|-----------------------|------------------------------------------|---------------|
| `==`                  | 같음                                    | 7.27          |
| `!=`                  | 같지 않음                                | 7.27          |
| `>`                   | 초과                                  | 7.27          |
| `>=`                  | 이상                         | 7.27          |
| `<`                   | 미만                                   | 7.27          |
| `<=`                  | 이하                          | 7.27          |
| `!` 또는 `not`          | NOT                                      | 7.27          |
| `^`                   | 이진 NOT                               | 7.27          |
| `in [elem1, ...]`     | 목록에 포함된 요소             | 7.27          |
| `not in [elem1, ...]` | 목록에 포함되지 않은 요소         | 7.27          |
| `=~`                  | 문자열 일치                          | 7.27          |
| `!~`                  | 문자열이 일치하지 않음                      | 7.27          |
| `&`                   | 이진 AND                               | 7.27          |
| `\|`                  | 이진 OR                                | 7.27          |
| `&&` 또는 `and`         | 논리 AND                              | 7.27          |
| `\|\|` 또는 `or`        | 논리 OR                               | 7.27          |
| `in CIDR`             | IP 범위에 있는 요소               | 7.37          |
| `not in CIDR`         | IP 범위에 없는 요소           | 7.37          |
| `allin CIDR`          | IP 범위에 있는 모든 요소     | 7.37          |
| `in [CIDR1, ...]`     | IP 범위에 있는 요소              | 7.37          |
| `not in [CIDR1, ...]` | IP 범위에 없는 요소          | 7.37          |
| `allin [CIDR1, ...]`  | IP 범위에 있는 모든 요소    | 7.37          |

### 패턴 및 정규식 {#patterns-and-regular-expressions}

SECL 표현식에서 패턴 또는 정규식을 사용할 수 있습니다. `in`, `not in`, `=~` 및 `!~` 연산자와 함께 사용할 수 있습니다.

| 형식           |  예시             | 지원되는 필드   | Agent 버전 |
|------------------|----------------------|--------------------|---------------|
| `~"pattern"`     | `~"httpd.*"`         | 전체                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | 전체(일부 제외) `.path` | 7.27          |

`.path`필드의 패턴은 Glob으로 사용됩니다. `*`는 파일 및 폴더를 같은 레벨에서 일치시킵니다. 7.34에서 도입된 `**`는 경로 끝에 사용하여 모든 파일 및 하위 폴더를 일치시킵니다.

### 기간 {#durations}

SECL을 사용하여 특정 기간 동안 발생하는 이벤트를 트리거하는 기간 기반 규칙을 작성할 수 있습니다. 예를 들어, 프로세스가 생성된 후 일정 시간이 지나서 비밀 파일에 액세스하는 이벤트를 트리거할 수 있습니다.
이러한 규칙은 다음과 같이 작성할 수 있습니다.

{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s
{{< /code-block >}}

기간은 단위 접미사가 붙은 숫자입니다. 지원되는 접미사는 's', 'm', 'h'입니다.

### 플랫폼별 구문 {#platform-specific-syntax}

SECL 표현식은 여러 플랫폼을 지원합니다. 아래 문서에서 각 플랫폼에 사용할 수 있는 속성과 헬퍼를 확인할 수 있습니다.

- [Linux][1]
- [Windows][2]

## 규칙 작성 팁 {#rule-authoring-tips}

- 항상 운영 체제(OS)를 설정하세요.
- 노이즈를 줄이려면 계층 구조를 기준으로 하세요. `process.ancestors.file.name`를 사용하세요.
- 기간(예: `> 5s`, `10m`, `2h`)을 사용하여 실행 시간 범위를 짧게 지정하세요.
- 가능하면 정확히 일치(`==`)를 사용하세요. 노이즈를 최소화할 수 있습니다.
- 목록 멤버십(`in [...]`)은 허용 목록이나 제어된 값 집합에 가장 적합합니다.
- 경로 패밀리에는 glob 일치(`~"/path/*"`)를 사용하세요. 정규식보다 안전하고 빠릅니다.
- glob 또는 목록을 사용할 수 없는 경우에만 정규식(`=~`)을 사용하세요. 정규식의 범위를 가능한 한 좁게 유지하세요. 일반적으로는 `==` 또는 `in [...]`로 시작하세요. 정규식은 최후의 수단으로만 사용하세요.
- 부정(`not in [...]`, `!~`)을 사용하여 예외(예: 신뢰할 수 있는 도구)를 명시적으로 지정하세요.
- 네트워크 경계를 지정하려면 CIDR 연산자(`in CIDR`, `not in CIDR`)를 사용하세요.
- 행동별로 규칙의 이름을 지정하고 *무엇 + 누구 + 컨텍스트* 형식을 따르세요.
- 태그를 적극적으로 지정하세요.`team`, `app`, `env`, `MITRE`, `severity`.

### 흔히 하는 실수를 피하세요 {#avoid-common-mistakes}

| 패턴                   | 설명                                 |
| ------------------------- | -------------------------------------------- |
| `open.file.path == "/etc/passwd"`, `exec.comm != ""` | 범위를 너무 넓게 지정하지 마세요. 여러 정상적인 상황까지 탐지할 수 있습니다.  |
| `container.id != ""`      | 더 구체적인 필드로 범위를 지정한 경우에만 유용합니다. |

## 예시 모음 {#example-library}

<div class="alert alert-info">Agent에 기본 제공되는 정책에서 더 자세한 예시를 찾을 수 있습니다. <a href="https://github.com/DataDog/security-agent-policies/blob/master/runtime/default.policy">Workload Protection 기본 정책</a>을 참조하세요.</div>

Agent 정책 파일에서 각 규칙에는 `id` 및 `expression`가 포함됩니다. 선택적으로 `actions`을 추가할 수도 있습니다. 자세한 내용은 [변수 및 작업][3]을 참조하세요.

### Linux {#linux}

#### 민감한 파일에 대한 액세스(안전한 도구 허용 목록) {#access-to-sensitive-files-allowlist-safe-tools}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: access_sensitive_files
    expression: >-
      open.file.path in ["/etc/shadow", "/etc/sudoers"] &&
      process.file.path not in ["/usr/sbin/vipw", "/usr/sbin/visudo"]
    filters:
      - os == "linux"
{{< /code-block >}}

#### NGINX 또는 PHP가 bash를 생성 {#nginx-or-php-spawning-bash}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: nginx_php_spawn_bash
    expression: >-
      exec.file.path == "/usr/bin/bash" &&
      (
        process.ancestors.file.name == "nginx" ||
        process.ancestors.file.name =~ "php*"
      )
    filters:
      - os == "linux"
{{< /code-block >}}

#### 컨테이너에서 의심스러운 IMDS 액세스 {#suspicious-imds-access-from-container}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: suspicious_imds_access
    expression: >-
      connect &&
      network.destination.ip in ["169.254.169.254"] &&
      container.id != ""
    filters:
      - os == "linux"
{{< /code-block >}}

#### 유지 관리 기간 외에 커널 모듈 로드 {#kernel-module-loads-outside-maintenance-window}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: kernel_module_load
    expression: >-
      load_module &&
      process.user != "root" &&
      process.ancestors.file.name not in ["modprobe", "insmod"]
    filters:
      - os == "linux"
{{< /code-block >}}

#### 시작 직후 민감한 파일 읽기 {#sensitive-file-read-shortly-after-start}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: sensitive_file_read_after_start
    expression: >-
      open.file.path == "/etc/secret" &&
      process.file.name == "java" &&
      process.created_at > 5s
    filters:
      - os == "linux"
{{< /code-block >}}

#### 비기업 IP로의 아웃바운드(CIDR 허용 목록) {#outbound-to-non-corporate-ips-cidr-allowlist}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: outbound_non_corporate_ips
    expression: >-
      connect &&
      network.destination.ip not in [10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12]
    filters:
      - os == "linux"
{{< /code-block >}}

### Windows {#windows}

#### 실행 키를 통한 레지스트리 지속성 {#registry-persistence-through-a-run-key}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: registry_run_key_persistence
    expression: >-
      set_key_value &&
      open_key.registry.key_path =~ "*\\Software\\Microsoft\\Windows\\CurrentVersion\\Run*"
    filters:
      - os == "windows"
{{< /code-block >}}

#### 서명되지 않은 바이너리가 PowerShell 실행 {#unsigned-binary-launching-powershell}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: unsigned_binary_powershell
    expression: >-
      exec.file.path =~ "*\\WindowsPowerShell\\v1.0\\powershell.exe" &&
      process.parent.file.path !~ "*\\Program Files*" &&
      process.user_sid != "S-1-5-18"
    filters:
      - os == "windows"
{{< /code-block >}}

### 크로스 플랫폼 {#cross-platform}

#### 암호화폐 채굴기 지표 {#crypto-miner-indicators}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: crypto_miner_indicators
    expression: >-
      exec.args_flags in ["cpu-priority", "donate-level", ~"randomx-1gb-pages"] ||
      exec.args in [~"*stratum+tcp*", ~"*nicehash*", ~"*yespower*"]
{{< /code-block >}}

[1]: /ko/security/workload_protection/linux_expressions
[2]: /ko/security/workload_protection/windows_expressions
[3]: /ko/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions