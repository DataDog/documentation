---
further_reading:
- link: /agent/docker/#environment-variables
  tag: 설명서
  text: Docker Agent 환경 변수
- link: /agent/docker/apm/#docker-apm-agent-environment-variables
  tag: 설명서
  text: 애플리케이션 성능 모니터링(APM) Agent 환경 변수
- link: /logs/log_collection/#container-log-collection
  tag: 설명서
  text: 컨테이너 로그 수집
- link: /agent/configuration/proxy/#environment-variables
  tag: 설명서
  text: 프록시 환경 변수
title: Agent  환경 변수
---

<div class="alert alert-danger">
Agent v5인 경우 Docker Agent GitHub 리포지토리</a>를 참조하세요.
</div>

## 개요

Agent v6의 경우 [Agent 기본 구성 파일][1](`datadog.yaml`)에 있는 대부분의 구성 옵션을 환경 변수를 통해 설정할 수 있습니다.

## 권장 사항

모범 사례로 Datadog에서는 태그를 할당할 때 통합 서비스 태깅을 사용할 것을 권장합니다. 통합 서비스 태깅은 세 가지 표준 태그(`env`, `service`, `version`)를 사용하여 Datadog 원격 측정을 함께 연결합니다. 통합 태그를 사용하여 환경을 구성하는 방법을 알아보려면 [통합 서비스 태깅 문서][2]를 참조하세요.

## 일반적인 사용

일반적으로 다음 규칙을 사용합니다.

* 옵션 이름은 `DD_` 접두사와 함께 대문자이어야 합니다: `hostname`  -> `DD_HOSTNAME`

* 목록 값은 공백으로 구분되어야 합니다 (포함 규칙은 정규 표현식을 지원하며 쉼표로 구분된 문자열 목록으로 정의됨).
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

### 속성 정의 우선순위

- 속성이 전역 구성 파일(`datadog.yaml`)과 환경 변수에 모두 정의된 경우, 환경 변수가 우선합니다.
- 환경 변수로 중첩 옵션을 지정하면 config 옵션에서 지정한 _모든_ 중첩 옵션이 재정의됩니다. 단, `proxy` config 옵션은 이 규칙에서 예외입니다. 자세한 내용은 [Agent 프록시 설명서][3]를 참조하세요.

### 예외

- 환경 변수에 모든 `datadog.yaml` 옵션을 사용할 수 있는 것은 아닙니다. Datadog Agent GitHub 리포지토리의 [config.go][4]를 참조하세요. 환경 변수가 있는 옵션은 `config.BindEnv*`로 시작합니다.

- [config.go][4]에 나열되지 않은 구성요소별 환경 변수도 지원될 수 있습니다.

  - **APM Trace Agent**

      - [Docker APM Agent 환경 변수][5]
      - [trace-agent config/apm.go][6]
      - 예시

          ```yaml
             apm_config:
                 enabled: true
                 env: dev
             # DD_APM_ENABLED=true
             # DD_APM_ENV=dev
          ```

  - **Live Process Agent**

      - [process-agent config/process.go][7]
      - 예시

          ```yaml
             process_config:
                 process_collection:
                     enabled: true
                 process_dd_url: https://process.datadoghq.com
             # DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED=true
             # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
          ```

## 시스템 단위에서 환경 변수 사용

서비스를 관리하기 위해 systemd를 사용하는 운영 체제에서는 환경 변수—전역(예: `/etc/environment`) 또는 세션 기반(예:`export VAR=value`)—을 구성하지 않는 한 일반적으로 서비스에서 사용할 수 없습니다. 자세한 내용은 [systemd Exec 매뉴얼 페이지][8]를 참조하세요.

Datadog Agent 7.45부터 Datadog Agent 서비스(`datadog-agent.service` 단위)는 선택적으로 파일(`<ETC_DIR>/environment`)에서 환경 변수 할당을 로드할 수 있습니다.

1. 존재하지 않을 경우 `/etc/datadog-agent/environment`를 생성합니다.
2. 새 줄로 구분된 환경 변수 할당을 정의합니다. 예:
  ```
  GODEBUG=x509ignoreCN=0,x509sha1=1
  DD_HOSTNAME=myhost.local
  DD_TAGS=env:dev service:foo
  ```
3. 변경 사항을 적용하려면 서비스를 다시 시작합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/agent/configuration/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/setup/config.go
[5]: https://docs.datadoghq.com/ko/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/setup/apm.go
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/setup/process.go
[8]: https://www.freedesktop.org/software/systemd/man/systemd.exec.html#Environment