---
description: datadog.yaml의 대안으로 환경 변수를 사용하여 Datadog Agent 설정을 구성합니다(명명 규칙 및 systemd
  사용법 포함).
further_reading:
- link: /agent/docker/#environment-variables
  tag: 설명서
  text: Docker Agent 환경 변수
- link: /agent/docker/apm/#docker-apm-agent-environment-variables
  tag: 설명서
  text: APM Agent 환경 변수
- link: /logs/log_collection/#container-log-collection
  tag: 설명서
  text: 컨테이너 로그 수집
- link: /agent/configuration/proxy/#environment-variables
  tag: 설명서
  text: 프록시 환경 변수
title: Agent 환경 변수
---
<div class="alert alert-danger">
Agent v5의 경우 <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">Docker Agent GitHub 리포지토리</a>를 참조하세요.
</div>

## 개요 {#overview}

Agent v6의 경우 [Agent 기본 구성 파일][1](`datadog.yaml`)에 있는 대부분의 구성 옵션을 환경 변수를 통해 설정할 수 있습니다. 사용 가능한 모든 `datadog.yaml` 설정에 대한 전체 주석이 포함된 참조는 Datadog Agent GitHub 리포지토리의 [예시 구성 파일][15]을 참조하세요.

## 권장 사항{#recommendations}

Datadog에서는 태그를 할당할 때 unified service tagging을 사용하는 것을 모범 사례로 권장합니다. unified service tagging은 Datadog `env`, `service`, `version`의 세 가지 표준 태그를 사용하여 Datadog 텔레메트리를 연결합니다. 환경을 unified service tagging을 사용하여 구성하는 방법은 [unified service tagging documentation][2]을 참조하세요.

## 일반적인 사용{#general-use}

일반적으로 다음 규칙을 사용합니다.

* 옵션 이름은 `DD_` 접두사를 사용하여 대문자로 표기해야 합니다. `hostname` -> `DD_HOSTNAME`

* 목록 값은 공백으로 구분되어야 합니다(포함 규칙은 정규식을 지원하며 쉼표로 구분된 문자열 목록으로 정의됨):
   ```yaml
      container_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_CONTAINER_INCLUDE="image:cp-kafka image:k8szk"
   ```

* **미리 정의된** 키가 있는 구성 옵션의 중첩은 밑줄로 구분해야 합니다.
   ```yaml
      cluster_agent:
        cmd_port: 5005
      # DD_CLUSTER_AGENT_CMD_PORT=5005
   ```

* **사용자 정의** 키가 포함된 구성 옵션의 중첩은 JSON 형식이어야 합니다.
   ```yaml
      container_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_CONTAINER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

### 속성 정의 우선순위{#property-definition-priority}

- 속성이 전역 구성 파일(`datadog.yaml`)과 환경 변수에 모두 정의된 경우, 환경 변수가 우선합니다.
- 환경 변수로 중첩된 옵션을 지정하면 구성 옵션 아래에 지정된 _모든_ 중첩 옵션이 재정의됩니다. 이 규칙의 예외는 `proxy` 구성 옵션입니다. 자세한 내용은 [Agent 프록시 설명서][3]를 참조하세요.

### 예외 {#exceptions}

- 모든 `datadog.yaml` 옵션을 환경 변수로 사용할 수 있는 것은 아닙니다. Datadog Agent GitHub 리포지토리의 [core_schema.yaml][4] 구성 스키마를 참조하세요. 스키마에서 `no-env` 태그가 지정된 설정은 환경 변수를 지원하지 않습니다.

  이전 Agent 버전의 경우, 구성 소스가 위치를 옮겼습니다.

  | Agent 버전       | 구성 소스                                                          |
  | -------------------- | ------------------------------------------------------------------------------ |
  | 7.51~7.83    | `*_settings.go` [7.83.x branch의 pkg/config/setup][13] 내 파일        |
  | 7.50 및 이전 버전     | [7.50.x branch의 config.][9]                                            |

- [core_schema.yaml][4]에 나열되지 않은 구성요소별 환경 변수도 지원될 수 있습니다.

  | 구성요소              | 구성 소스                        | Agent 7.51~7.83                                                | Agent 7.50 및 이전 버전                              |
  | ----------------------- | -------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
  | APM Trace Agent          | [apm_config.yaml][6], [Docker APM Agent 환경 변수][5] | `apm_settings.go` [7.83.x branch의 pkg/config/setup][13]| `apm.go` [7.50.x branch의 pkg/config][14]    |
  | Live Process Agent       | [process_config.yaml][7]                     | `process_settings.go` [7.83.x branch의 pkg/config/setup][13] | `process.go` [7.50.x branch의 pkg/config][14] |
  | OTLP Ingest              | [core_schema.yaml(otlp_config)][4]          | `otlp_settings.go` [7.83.x branch pkg/config/setup][13] | `otlp.go` [7.50.x branch pkg/config][14]   |
  | System Probe             | [system-probe_schema.yaml][10]               | `system_probe_settings.go` [7.83.x branch의 pkg/config/setup][13]| `system_probe.go` [7.50.x branch pkg/config][14] |
  | Private Action Runner    | [private_action_runner.yaml][11]             | `privateactionrunner_settings.go` [7.83.x branch pkg/config/setup][13] | 사용 불가                                       |
  | Multi-Region Failover    | [multi_region_failover.yaml][12]             | `multi_region_failover_settings.go` [7.83.x branch pkg/config/setup][13] | 사용 불가                                       |

  APM Trace Agent 예시:

  ```yaml
     apm_config:
         enabled: true
         env: dev
     # DD_APM_ENABLED=true
     # DD_APM_ENV=dev
  ```

  Live Process Agent 예시:

  ```yaml
     process_config:
         process_collection:
             enabled: true
         process_dd_url: https://process.datadoghq.com
     # DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED=true
     # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
  ```

## systemd 유닛에서 환경 변수를 사용 {#using-environment-variables-in-systemd-units}

systemd를 사용하여 서비스를 관리하는 운영 체제에서는 일반적으로 환경 변수(전역(예: `/etc/environment`) 또는 세션 기반(예: `export VAR=value`))가 서비스에 제공되지 않으며, 별도로 구성해야 합니다. 자세한 내용은 [systemd Exec 매뉴얼 페이지][8]를 참조하세요.

Datadog Agent 7.45부터 Datadog Agent 서비스(`datadog-agent.service` 단위)는 선택적으로 파일(`<ETC_DIR>/environment`)에서 환경 변수 할당을 로드할 수 있습니다.

1.  존재하지 않으면 `/etc/datadog-agent/environment`를 생성합니다.
2. 새 줄로 구분된 환경 변수 할당을 정의합니다. 예:
  ```
  GODEBUG=x509ignoreCN=0,x509sha1=1
  DD_HOSTNAME=myhost.local
  DD_TAGS=env:dev service:foo
  ```
3. 변경 사항을 적용하려면 서비스를 다시 시작합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/agent/configuration/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/core_schema.yaml
[5]: https://docs.datadoghq.com/ko/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/apm_config.yaml
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/process_config.yaml
[8]: https://www.freedesktop.org/software/systemd/man/systemd.exec.html#Environment
[9]: https://github.com/DataDog/datadog-agent/blob/7.50.x/pkg/config/config.go
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/system-probe_schema.yaml
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/multi_region_failover.yaml
[13]: https://github.com/DataDog/datadog-agent/tree/7.83.x/pkg/config/setup
[14]: https://github.com/DataDog/datadog-agent/tree/7.50.x/pkg/config
[15]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example