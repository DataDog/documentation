---
description: Datadog Agent를 사용하여 로그를 수집하고 Datadog로 전송하기
further_reading:
- link: agent/logs/agent_tags/
  tag: 설명서
  text: Agent 태그를 로그에 자동으로 추가
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: 설명서
  text: Datadog로 전송한 로그 필터링하기
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: 설명서
  text: 로그에서 민감한 데이터 스크러빙
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: 설명서
  text: 여러 줄 로그 집계
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: 설명서
  text: 와일드카드를 사용한 디렉터리 테일링
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: 설명서
  text: 전역 처리 규칙
title: 호스트 에이전트 로그 수집
---
로그 수집 기능을 사용하려면 Datadog Agent v6.0 이상이 필요합니다. 이전 버전의 Agent에는 `log collection` 인터페이스가 포함되어 있지 않습니다. 아직 Agent를 사용하고 있지 않다면 [Agent 설치 지침][1]을 따르세요.

다른 공급업체의 수집기 또는 포워더를 사용하여 로그를 전송하려는 경우, 또는 전송하기 전에 사용자 환경 내에서 로그 데이터를 전처리하려는 경우 [Observability Pipelines][2]를 참조하세요.

## 로그 수집 활성화 {#activate-log-collection}

Datadog Agent에서는 로그 수집이 기본적으로 **활성화되어 있지 않습니다**. Kubernetes 또는 Docker 환경에서 Agent를 실행 중인 경우 전용 설명서인 [Kubernetes 로그 수집][3] 또는 [Docker 로그 수집][4]을 참조하세요.

호스트에서 실행 중인 Agent로 로그 수집을 활성화하려면 Agent의 [기본 구성 파일][5](`datadog.yaml`)에서 `logs_enabled: false` 값을 `logs_enabled: true`로 변경합니다.

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="false" collapsible="true" >}}
logs_enabled: true
logs_config:
    auto_multi_line_detection: true
    force_use_http: true
{{< /code-block >}}

사용 가능한 모든 구성 옵션은 [샘플 config_template.yaml file][6]을 참조하세요.

<div class="alert alert-info">Agent v6.19+/v7.19+부터는 HTTPS 전송 방식이 기본값으로 사용됩니다. 자세한 내용은 <a href="/agent/logs/log_transport/">Agent 전송</a>을 참조하세요.</div>

**환경 변수**를 사용하여 로그를 전송하려면 다음과 같이 구성합니다.

```
DD_LOGS_ENABLED=true
```

로그 수집을 활성화하면 Agent는 Datadog로 로그를 전달할 준비가 완료됩니다. 다음으로 Agent가 어디에서 로그를 수집할지 구성해야 합니다.

## 사용자 지정 로그 수집 {#custom-log-collection}

Datadog Agent v6는 로그를 수집하여 파일, 네트워크(TCP 또는 UDP), journald 및 Windows 채널에서 Datadog로 전달할 수 있습니다.

1. [Agent의 구성 디렉터리][5] 루트의 `conf.d/` 디렉터리 아래에 Datadog 사용자가 접근할 수 있는 새 `<CUSTOM_LOG_SOURCE>.d/` 폴더를 생성합니다.
2. 새 폴더 안에 `conf.yaml` 파일을 생성합니다.
3. 아래 파라미터를 사용하여 사용자 지정 로그 수집 구성 그룹을 추가합니다.
4. [Agent를 다시 시작][8]하여 새 구성을 적용합니다.
5. [Agent의 상태 하위 명령][9]을 실행한 후 검사 섹션에서 `<CUSTOM_LOG_SOURCE>`을 확인합니다.

권한 오류가 있는 경우, [로그 파일 테일링 권한 문제][10]를 참조하여 문제를 해결하세요.

다음은 사용자 지정 로그 수집 설정의 예입니다.

{{< tabs >}}
{{% tab "파일 테일링" %}}

`<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`에 저장된 `<APP_NAME>` 애플리케이션 로그를 수집하려면 [Agent의 구성 디렉터리][1] 루트에 `<APP_NAME>.d/conf.yaml` 파일을 생성하고 다음 내용을 추가합니다.

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

**Windows**에서는 `<DRIVE_LETTER>:\\<PATH_LOG_FILE>\\<LOG_FILE_NAME>.log` 경로를 사용하고, 사용자 `ddagentuser`가 로그 파일에 대한 읽기 권한을 가지고 있는지 확인하세요.

**참고**: 로그 줄은 개행 문자 `\n` 또는 `\r\n`로 끝나야 합니다. 그렇지 않으면 Agent가 무기한 대기하며 해당 로그 줄을 보내지 않습니다.

[1]: /ko/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

발신자 IP 주소를 캡처하여 로그 메시지 페이로드에 포함하려면 `datadog.yaml` 파일에 다음 구성을 추가합니다.

```yaml
 logs_config:
   use_sourcehost_tag: true
```
TCP 포트 **10518**로 로그를 전달하는 `<APP_NAME>` 애플리케이션의 로그를 수집하려면 [Agent의 구성 디렉터리][1] 루트에 `<APP_NAME>.d/conf.yaml` 파일을 생성하고 다음 내용을 추가합니다.

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<APP_NAME>"
    source: "<CUSTOM_SOURCE>"
```

Serilog를 사용하는 경우 `Serilog.Sinks.Network`는 UDP 연결 옵션입니다.

Agent 버전 7.31.0 이상에서 TCP 연결은 유휴 상태에서도 무기한 열린 상태를 유지합니다.

**참고**:
- Agent는 원시 문자열, JSON 및 Syslog 형식의 로그를 지원합니다. 로그를 배치 단위로 전송하는 경우 줄바꿈 문자를 사용하여 로그를 구분하세요.
- 로그 줄은 개행 문자 `\n` 또는 `\r\n`로 끝나야 합니다. 그렇지 않으면 Agent가 무기한 대기하며 해당 로그 줄을 보내지 않습니다.

[1]: /ko/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

journald에서 로그를 수집하려면 [Agent의 구성 디렉터리][1] 루트에 `journald.d/conf.yaml` 파일을 생성하고 다음 내용을 추가합니다.

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

컨테이너화된 환경 및 단위 필터링 설정에 대한 자세한 내용은 [journald 통합][2] 문서를 참조하세요.

[1]: /ko/agent/configuration/agent-configuration-files/
[2]: /ko/integrations/journald/
{{% /tab %}}
{{% tab "Windows 이벤트" %}}

Windows 이벤트를 로그로 Datadog에 전송하려면 채널을 `conf.d/win32_event_log.d/conf.yaml`에 수동으로 추가하거나 Datadog Agent Manager를 사용하세요.

채널 목록을 보려면 PowerShell에서 다음 명령을 실행합니다.

```text
Get-WinEvent -ListLog *
```

가장 활성화된 채널을 확인하려면, PowerShell에서 다음 명령을 실행합니다.

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

그런 다음 채널을 `win32_event_log.d/conf.yaml` 구성 파일에 추가합니다.

```yaml
logs:
  - type: windows_event
    channel_path: "<CHANNEL_1>"
    source: "<CHANNEL_1>"
    service: "<SERVICE>"
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: "<CHANNEL_2>"
    source: "<CHANNEL_2>"
    service: "<SERVICE>"
    sourcecategory: windowsevent
```

수집할 이벤트의 Windows 채널 이름으로 `<CHANNEL_X>` 파라미터를 수정합니다.
[통합 자동 처리 파이프라인 설정][1]의 이점을 활용하려면 해당 `source` 파라미터도 동일한 채널 이름으로 설정합니다.

마지막으로 [Agent를 다시 시작][2]합니다.

[1]: /ko/logs/log_configuration/pipelines/#integration-pipelines
[2]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Windows Private Location" %}}
Windows Private Location 로그를 Datadog로 전송하려면 다음 섹션의 단계를 수행하세요.

### Agent 구성 {#configure-the-agent}

1. Agent 구성 파일에서 `logs_enabled: true`를 구성하여 Agent 로그 수집을 활성화합니다.
2. `C:\ProgramData\Datadog\conf.d`으로 이동하여 `synthetics_worker.d`라는 폴더를 생성합니다.
3. `synthetics_worker.d` 폴더 안에 `conf.yaml`이라는 파일을 생성하고 다음 예제를 템플릿으로 사용합니다.

```yaml
logs:
  - type: file
    path: "C:\\Program Files\\Datadog-Synthetics\\Synthetics\\private-location-service.out.log"
    service: <YOUR_SERVICE>
    source: synthetics
    tags: # Defined per user preference
      - env:<YOUR_ENV>
      - private_location:<YOUR_PRIVATE_LOCATION>
```

### Agent를 실행하는 사용자 확인 {#verify-the-user-running-the-agent}

Private Location 설치 폴더는 관리자만 접근할 수 있도록 제한되어 있으므로 Datadog Agent가 로그 파일에 접근할 수 있는 권한이 필요합니다. Datadog Agent를 실행하는 사용자를 확인하려면 다음 단계를 따르세요.

1. Windows 키를 누르고 `R`을 입력한 후 {{< ui >}}Run{{< /ui >}}를 검색합니다.
2. Datadog Agent를 찾아 마우스 오른쪽 버튼으로 클릭하고 {{< ui >}}Properties{{< /ui >}}를 선택합니다.
3. {{< ui >}}Log On{{< /ui >}} 탭에서 계정(기본값은 `ddagentuser`)을 확인합니다.
4. 창을 닫습니다.

### Agent를 실행하는 사용자에게 권한 부여 {#grant-permission-to-the-user-running-the-agent}

1. `C:\Program Files`로 이동하여 `synthetics_worker.d` 폴더를 찾습니다.
2. `synthetics_worker.d` 폴더를 마우스 오른쪽 버튼으로 클릭하고 {{< ui >}}Properties{{< /ui >}}를 선택합니다.
3. {{< ui >}}Security{{< /ui >}} 탭으로 이동합니다.
4. {{< ui >}}Edit{{< /ui >}}를 클릭하고 `ddagentuser`를 추가합니다.
5. 필요한 권한을 부여합니다.
6. 변경 사항을 적용하고 Datadog로 로그 전송을 시작하려면 서비스 화면 또는 명령줄에서 Datadog Agent를 다시 시작합니다.
{{% /tab %}}
{{< /tabs >}}

로그 수집에 사용 가능한 모든 파라미터 목록:

| 파라미터        | 필수 | 설명                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | 예      | 로그 입력 소스의 유형입니다. 유효한 값: `tcp`, `udp`, `file`, `windows_event`, `docker`, `journald`.                                                                                                                                                                                                                                          |
| `port`           | 예      | `type`**tcp** 또는 **udp**인 경우, 로그 수신에 사용할 포트를 설정합니다.                                                                                                                                                                                                                                                                                     |
| `path`           | 예      | `type`이 **file** 또는 **journald**인 경우, 로그 수집을 위한 파일 경로를 설정합니다.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Yes      | `type`이 **windows_event**인 경우, 로그 수집을 위한 Windows 이벤트 채널을 나열합니다.                                                                                                                                                                                                                                                                     |
| `service`        | 예      | 로그를 생성하는 서비스의 이름입니다. [Datadog APM][11]으로 서비스를 계측한 경우 동일한 서비스 이름이어야 합니다. 여러 데이터 유형에서 `service`를 구성할 때는 [unified service tagging][12] 지침을 참조하세요.                                                                                                          |
| `source`         | 예      | 로그를 전송하는 통합을 정의하는 속성입니다. 기존 통합에서 생성된 로그가 아닌 경우 사용자 지정 소스 이름을 사용할 수 있습니다. 다만 관련 [사용자 지정 메트릭][13]의 네임스페이스와 일치시키는 것이 좋습니다. 예: `myapp.request.count`의 `myapp`. |
| `include_units`  | 아니요       | `type`이 **journald**인 경우 포함할 특정 journald 유닛 목록입니다.                                                                                                                                                                                                                                                                               |
| `exclude_paths`  | 아니요       | `type`이 **file**이고 `path`에 와일드카드 문자가 포함된 경우 로그 수집에서 제외할 일치 파일 목록입니다. Agent 버전 6.18 이상에서 사용 가능합니다.                                                                                                                                                                            |
| `exclude_units`  | 아니요       | `type`이 **journald**인 경우 제외할 특정 journald 유닛 목록입니다.                                                                                                                                                                                                                                                                               |
| `sourcecategory` | 아니요       | 소스 속성이 속한 범주를 정의하는 데 사용하는 속성입니다. 예: `source:postgres, sourcecategory:database` 또는 `source: apache, sourcecategory: http_web_access`.                                                                                                                                                                                                                              |
| `start_position` | 아니요       | 자세한 내용은 [시작 위치](#start-position)를 참조하세요.|
| `encoding`       | 아니요       | `type`이 **file**인 경우 Agent가 파일을 읽을 때 사용할 인코딩을 설정합니다. UTF-16 리틀 엔디언은 `utf-16-le`, UTF-16 빅 엔디언은 `utf-16-be`, Shift JIS는 `shift-jis`를 사용합니다. 다른 값으로 설정하면 Agent는 파일을 UTF-8로 읽습니다.  _`utf-16-le`, `utf-16be`는 Agent v6.23/v7.23에, `shift-jis`는 Agent v6.34/v7.34에 추가되었습니다._                                                                                      |
| `tags`           | 아니요       | 수집되는 각 로그에 추가할 태그 목록입니다([태깅에 대해 자세히 알아보기][14]).                                                                                                                                                                                                                                                                             |

### 시작 위치 {#start-position}

`start_position` 파라미터는 **file** 및 **journald** 테일러 유형에서 지원됩니다. 컨테이너를 테일링할 때 `start_position`은 항상 `beginning`입니다.

지원:
- **파일**: Agent 6.19+/7.19 이상
- **journald**: Agent 6.38+/7.38 이상

`type`가 **file**인 경우:
- Agent가 파일 읽기를 시작할 위치를 설정합니다.
- 유효한 값은 `beginning`, `end`, `forceBeginning`, `forceEnd`이며 기본값은 `end`입니다.
- `beginning` 위치는 와일드카드가 포함된 경로를 지원하지 않습니다.

`type`이 **journald**인 경우:
- Agent가 저널 읽기를 시작할 위치를 설정합니다.
- 유효한 값은 `beginning`, `end`, `forceBeginning`, `forceEnd`이며 기본값은 `end`입니다.

#### 우선 순위 {#precedence}

file 및 journald 테일러 유형 모두에서 `end` 또는 `beginning` 위치가 지정되어 있더라도 저장된 오프셋이 있으면 오프셋이 우선 적용됩니다. `forceBeginning` 또는 `forceEnd`를 사용하면 저장된 오프셋이 있더라도 Agent가 지정된 값을 강제로 사용합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/observability_pipelines/
[3]: /ko/containers/kubernetes/log/
[4]: /ko/containers/docker/log/
[5]: /ko/agent/configuration/agent-configuration-files/
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[7]: /ko/agent/logs/log_transport/
[8]: /ko/agent/configuration/agent-commands/#restart-the-agent
[9]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[10]: /ko/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files
[11]: /ko/tracing/
[12]: /ko/getting_started/tagging/unified_service_tagging
[13]: /ko/metrics/custom_metrics/#overview
[14]: /ko/getting_started/tagging/