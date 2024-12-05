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

<div class="alert alert-warning">
Agent v5의 경우 <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">Docker Agent GitHub 리포지토리</a>를 참조하세요.
</div>

## 개요

Agent 버전 6의 경우 [Agent의 기본 설정 파일][1](`datadog.yaml`)에 있는 대부분의 설정 옵션은 환경 변수를 통해 설정할 수 있습니다.

## 권장 사항

Datadog에서 태그를 지정할 때  통합 서비스 태깅을 사용하는 것이 좋습니다. 통합 서비스 태깅은 표준 태그 3개:`env`, `service`, `version`를 사용하여 Datadog 텔레메트리를 연결합니다. 통합 태깅으로 환경을 설정하는 방법에 대해서는 [통합 서비스 태깅 설명서][2]를 참조하세요.

## 일반적인 사용

일반적으로 다음 규칙을 사용합니다:

* 옵션 이름은 `DD_` 접두사와 함께 대문자여야 합니다: `hostname` -> `DD_HOSTNAME`

* 목록 값은 공백으로 구분되어야 합니다. (포함 규칙은 정규 표현식을 지원하며 쉼표로 구분된 문자열 목록으로 정의됩니다._
   ```yaml
      container_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_CONTAINER_INCLUDE="image:cp-kafka image:k8szk"
   ```

* **미리 정의된** 키를 사용하는 설정 옵션의 중첩은 밑줄로 구분해야 합니다.
   ```yaml
      cluster_agent:
        cmd_port: 5005
      # DD_CLUSTER_AGENT_CMD_PORT=5005
   ```

* **사용자 정의된** 키를 사용하는 설정 옵션의 중첩은 JSON 형식이어야 합니다:
   ```yaml
      container_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_CONTAINER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

**참고**: 환경 변수로 중첩 옵션을 지정하면 config 옵션 아래에 지정된 중첩 옵션을 _모두_ 재정의합니다. 이 규칙의 예외는 `proxy` config 옵션입니다. 자세한 내용은 [Agent 프록시 문서][3]를 참조하세요.

### 예외

- 환경 변수로 모든 `datadog.yaml` 옵션을 사용할 수 있는 것은 아닙니다. Datadog Agent GitHub 리포지토리의 [config.go][4]를 참조하세요. 환경 변수가 있는 옵션은 `config.BindEnv*`로 시작합니다.

- [config.go][4]에 나열되지 않은 컴포넌트별 환경 변수도 지원될 수 있습니다.

  - **APM 트레이스 에이전트**

      - [Docker 애플리케이션 성능 모니터링(APM) Agent 환경 변수][5]
      - [trace-agent config/apm.go][6]
      - 예시

          ```yaml
             apm_config:
                 enabled: true
                 env: dev
             # DD_APM_ENABLED=true
             # DD_APM_ENV=dev
          ```

  - **실시간 프로세스 Agent**

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

systemd를 사용하여 서비스를 관리하는 운영 체제에서는 일반적으로 글로벌(예: `/etc/environment`) 또는 세션 기반(예: `export VAR=value`)과 같은 환경 변수를 서비스에서 사용할 수 있도록 설정하지 않는 한 사용할 수 없습니다. 자세한 내용은 [systemd Exec 매뉴얼 페이지][8]를 참조하세요.

Datadog Agent 7.45에서 Datadog Agent 서비스(`datadog-agent.service` 유닛)는 필요 시 환경 변수 할당을 파일(`<ETC_DIR>/environment`)에서 로드할 수 있습니다.

1. 존재하지 않을 경우 `/etc/datadog-agent/environment`를 생성합니다.
2. 새 줄로 구분된 환경 변수 할당을 정의합니다. 예:
  ```
  GODEBUG=x509ignoreCN=0,x509sha1=1
  DD_HOSTNAME=myhost.local
  DD_TAGS=env:dev service:foo
  ```
3. 변경 내용을 적용하려면 서비스를 다시 시작합니다

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/agent/configuration/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config.go
[5]: https://docs.datadoghq.com/ko/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/apm.go
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/process.go
[8]: https://www.freedesktop.org/software/systemd/man/systemd.exec.html#Environment