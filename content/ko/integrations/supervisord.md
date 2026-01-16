---
app_id: supervisord
app_uuid: c4ee3618-f4b4-48b8-9515-a4a2f4091c0d
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: supervisord.process.count
      metadata_path: metadata.csv
      prefix: supervisord.
    process_signatures:
    - supervisord
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 116
    source_type_name: Supervisord
  saved_views:
    supervisord_processes: assets/saved_views/supervisord_processes.json
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
- https://github.com/DataDog/integrations-core/blob/master/supervisord/README.md
display_on_public_website: true
draft: false
git_integration_title: supervisord
integration_id: supervisord
integration_title: Supervisord
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: supervisord
public_title: Supervisord
short_description: Supervisor가 관리하는 프로세스의 상태, 업타임 및 개수를 모니터합니다.
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
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 슈퍼바이저가 관리하는 프로세스의 상태, 업타임 및 개수를 모니터합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/supervisor-monitors-your-processes-datadog-monitors-supervisor
  support: README.md#Support
  title: Supervisord
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Supervisor 이벤트][1]

## 개요

본 검사는 Supervisor에서 실행 중인 프로세스의 수, 업타임, 상태를 모니터링합니다.

## 설정

### 설치

Supervisor 검사는 [Datadog Agent][2] 패키지에 포함되어 있으므로 Supervisor가 실행 중인 서버에 추가 설치할 필요가 없습니다.

### 구성

#### Supervisord 준비

Agent는 HTTP 서버 또는 UNIX 소켓을 통해 Supervisor로부터 데이터를 수집할 수 있습니다. Agent는 어떤 수집 메서드를 구성하든 동일한 데이터를 수집합니다.

##### HTTP 서버

Supervisor의 메인 구성 파일(`/etc/supervisor.conf`)에 다음 블록을 추가합니다.

```ini
[inet_http_server]
port=localhost:9001
;username=user  # optional
;password=pass  # optional
```

##### UNIX 소켓

아직 없다면 `/etc/supervisor.conf`에 다음 블록을 추가합니다.

```ini
[supervisorctl]
serverurl=unix:///var/run/supervisor.sock

[unix_http_server]
file=/var/run/supervisor.sock
chmod=777
chown=nobody:nogroup
;username=user  # optional
;password=pass  # optional
```

Supervisor가 루트로 실행된다면, `chmod` 또는 `chown`이 설정되어 있는지 확인하여 비루트 사용자(예: `dd-agent`)가 소켓을 읽을 수 있게 합니다.

---

`supervisord`를 다시 로드합니다.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

[Agent 구성 디렉터리][1] 루트의 `conf.d/` 폴더에 있는 `supervisord.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 supervisord.d/conf.yaml][2]에서 확인하세요.

```yaml
init_config:

instances:
  ## 태그 서비스 점검 및 메트릭 사용. 예: supervisor_server:supervisord0
  - name: supervisord0
    host: localhost
    port: 9001
  ## 대신 소켓에서 수집
  # - name: supervisord0
  #   socket: unix:///var/run/supervisor.sock
```

`proc_names` 및/또는 `proc_regex` 옵션을 통해 Agent가 메트릭을 수집하고 서비스 검사를 생성할 프로세스를 나열합니다. 두 옵션 중 하나를 제공하지 않는다면 Agent는 Supervisor의 모든 자식 프로세스를 추적합니다. 두 옵션을 모두 제공하면, Agent가 두 목록의 프로세스를 모두 추적하므로 두 옵션은 상호배타적이지 않습니다.

다른 검사 옵션에 대한 자세한 설명은 [확인 구성 예시][2]를 참조하세요.

[Agent를 다시 시작][3]하여 Datadog으로 Supervisor 메트릭을 전송하기 시작합니다.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `supervisord`                                                                                                      |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                                      |
| `<INSTANCE_CONFIG>`  | `{"name":"<SUPERVISORD_SERVER_NAME>", "host":"%%host%%", "port":"9001", "username":"<USERNAME>", "password":"<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### 로그 수집



1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. Supervisord 로그 수집을 시작하려면 `supervisord.d/conf.yaml` 파일에 이 구성 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: supervisord
   ```

   `path` 파라미터 값을 변경하고 환경에 맞게 설정합니다.
   사용 가능한 모든 구성 옵션은 [supervisord.d/conf.yaml 샘플][3]을 참조하세요.

3. [Agent를 재시작합니다][4].

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `supervisord`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "supervisord" >}}


### 이벤트

Supervisor 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "supervisord" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.

## 참고 자료

- [Supervisor가 프로세스를 모니터합니다. Datadog이 Supervisor를 모니터합니다.][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/supervisord/images/supervisorevent.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://www.datadoghq.com/blog/supervisor-monitors-your-processes-datadog-monitors-supervisor