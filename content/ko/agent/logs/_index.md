---
description: Datadog Agent를 사용하여 로그를 수집하고 Datadog로 전송하기
further_reading:
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: 설명서
  text: Datadog로 전송한 로그 필터링하기
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: 설명서
  text: 로그에서 민감한 데이터 스크러빙하기
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: 설명서
  text: 멀티라인 로그 집계
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: 설명서
  text: 와일드카드를 사용해 디렉터리 테일링
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: 설명서
  text: 글로벌 처리 규칙
title: 호스트 에이전트 로그 수집
---

로그 수집에는 Datadog 에이전트 v6.0 이상이 필요합니다. 이전 버전의 에이전트에는 `log collection` 인터페이스가 포함되어 있지 않습니다. 아직 에이전트를 사용하고 있지 않다면, [에이전트 설치 지침][1]을 따르세요.

다른 공급업체의 수집기 또는 전달자를 사용하여 로그를 전송하려는 경우 또는 배송 전에 사용자 환경 내에서 로그 데이터를 전처리하려는 경우 [관찰 가능성 파이프라인][2]을 참조하세요.

## 로그 수집 활성화

Datadog 에이전트에서는 기본적으로 로그 수집이 **활성화되지 않습니다**. 쿠버네티스(Kubernetes) 또는 도커(Docker) 환경에서 에이전트를 실행하는 경우 전용 [쿠버네티스 로그 수집][3] 또는 [도커 로그 수집][4] 설명서를 참조하세요.

호스트에서 실행 중인 에이전트로 로그 수집을 활성화하려면 에이전트의 [기본 설정 파일][5](`datadog.yaml`)에서 `logs_enabled: false`를 `logs_enabled: true`로 변경하세요.

{{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

에이전트 v6.19+/v7.19+부터는 HTTPS 전송이 기본 전송으로 사용됩니다. HTTPS/TCP 전송을 강제하는 방법에 대한 자세한 내용은 [에이전트 전송 문서][6]를 참조하세요.

환경 변수와 로그를 보내려면 다음과 같이 설정하세요.

* `DD_LOGS_ENABLED=true`

로그 수집을 활성화하면, 에이전트가 Datadog에 로그를 전달할 준비가 됩니다. 다음으로 로그를 수집할 에이전트를 설정합니다.

## 커스텀 로그 수집

Datadog 에이전트 v6는 로그를 수집하여 파일, 네트워크(TCP 또는 UDP), journald 및 윈도우즈(Windows) 채널에서 Datadog로 전달할 수 있습니다:

1. [에이전트 설정 디렉터리][5]의 루트에 있는 `conf.d/` 디렉터리에 Datadog 사용자가 액세스할 수 있는 새 `<CUSTOM_LOG_SOURCE>.d/` 폴더를 생성합니다.
2. 이 새 폴더에 새로운 `conf.yaml` 파일을 만듭니다.
3. 아래 파라미터를 사용하여 커스텀 로그 수집 설정 그룹을 추가합니다.
4. 이 새로운 설정을 고려하려면 [에이전트를 다시 시작][7]하세요.
5. [에이전트 상태 하위 명령][8]을 실행하고 확인 섹션에서 `<CUSTOM_LOG_SOURCE>`을 찾으세요.

권한 오류가 있는 경우 [로그 파일 추적 권한 문제][9]를 참조하여 트러블슈팅하세요.

다음은 커스텀 로그 수집 설정의 예입니다:

{{< tabs >}}
{{% tab "Tail files" %}}

`<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`에 저장된 `<APP_NAME>` 애플리케이션에서 로그를 수집하려면 [Agent의 설정 디렉토리][1] 루트에서 다음 내용을 포함하여 `<APP_NAME>.d/conf.yaml` 파일을 생성하세요:

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

**Windows**에서는 `<DRIVE_LETTER>:\\<PATH_LOG_FILE>\\<LOG_FILE_NAME>.log` 경로를 사용하고 `ddagentuser` 사용자에게 로그 파일에 대한 읽기 및 쓰기 액세스 권한이 있는지 확인하세요.

[1]: /ko/agent/configuration/agent-configuration-files/
{{% /tab %}}

{{% tab "TCP/UDP" %}}

로그를 TCP 포트 **10518**로 전달하는 `<APP_NAME>` 애플리케이션에서 로그를 수집하려면, [에이전트 설정 디렉토리][1]의 루트에 다음 내용이 포함된`<APP_NAME>.d/conf.yaml` 파일을 생성합니다:

```yaml
logs:
  - type: tcp
    port: 10518
    service: "<APP_NAME>"
    source: "<CUSTOM_SOURCE>"
```

Serilog를 사용하는 경우, `Serilog.Sinks.Network`는 UDP로 연결하기 위한 옵션입니다.

에이전트 버전 7.31.0+에서 TCP 연결은 유휴 상태에서도 무기한 열린 상태를 유지합니다.

**참고**: 에이전트는 원시 문자열, JSON 및 Syslog 형식의 로그를 지원합니다. 로그를 배치로 보내는 경우, 줄 바꿈 문자를 사용하여 로그를 구분하세요. 

[1]: /ko/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{% tab "journald" %}}

journald에서 로그를 수집하려면, [에이전트 설정 디렉토리][1]의 루트에 다음 내용이 포함된 `journald.d/conf.yaml` 파일을 생성합니다:

```yaml
logs:
  - type: journald
    path: /var/log/journal/
```

컨테이너화된 환경 및 단위 필터링 설정에 대한 자세한 내용은 [journald 통합][2] 문서를 참조하세요.

[1]: /ko/agent/configuration/agent-configuration-files/
[2]: /ko/integrations/journald/
{{% /tab %}}
{{% tab "Windows Events" %}}

Windows 이벤트를 로그로 Datadog에 보내려면, 채널을 `conf.d/win32_event_log.d/conf.yaml`에 수동으로 추가하거나 Datadog 에이전트 매니저를 사용하세요.

채널 목록을 보려면 PowerShell에서 다음 명령을 실행합니다:

```text
Get-WinEvent -ListLog *
```

가장 활성화된 채널을 확인하려면, PowerShell에서 다음 명령을 실행합니다:

```text
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

그런 다음 `win32_event_log.d/conf.yaml` 설정 파일에 채널을 추가합니다:

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

이벤트를 수집하려는 Windows 채널 이름으로 `<CHANNEL_X>` 파라미터를 편집합니다.
해당 `source` 파라미터를 동일한 채널 이름으로 설정하여 [통합 자동 처리 파이프라인 설정][1]의 이점을 얻습니다.

마지막으로 [에이전트를 다시 시작합니다][2].

[1]: /ko/logs/log_configuration/pipelines/#integration-pipelines
[2]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

로그 수집에 사용 가능한 모든 파라미터 목록:

| 파라미터        | 필수 | 설명                                                                                                                                                                                                                                                                                                                                              |
|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Yes      | 로그 입력 소스의 유형입니다. 유효한 값은 `tcp`, `udp`, `file`, `windows_event`, `docker`, 또는 `journald`입니다.                                                                                                                                                                                                                                          |
| `port`           | Yes      | `type`이 **tcp** 또는 **udp**인 경우, 로그를 수신할 포트를 설정합니다.                                                                                                                                                                                                                                                                                     |
| `path`           | Yes      | `type`이 **파일** 또는 **journald**인 경우, 로그를 모으기 위한 파일 경로를 설정합니다.                                                                                                                                                                                                                                                                             |
| `channel_path`   | Yes      | `type`이 **windows_event**인 경우, 로그 수집을 위한 Windows 이벤트 채널을 목록으로 표시합니다.                                                                                                                                                                                                                                                                      |
| `service`        | Yes      | 로그를 소유한 서비스의 이름입니다. [Datadog APM][10]으로 서비스를 계측한 경우 서비스 이름이 동일해야 합니다. 여러 데이터 유형에 걸쳐 `service`를 설정하는 경우 [통합 서비스 태깅][11] 지침을 확인하세요.                                                                                                          |
| `source`         | Yes      | 로그를 보내는 통합을 정의하는 속성입니다. 로그가 기존 통합에서 제공되지 않은 경우 이 필드에 커스텀 소스 이름이 포함될 수 있습니다. 그러나 이 값을 수집 중인 관련 [커스텀 메트릭][12]의 네임스페이스와 일치시키는 것이 좋습니다(예: `myapp.request.count`의 `myapp`). |
| `include_units`  | 아니요       | `type`이 **journald**인 경우, 포함할 특정 journald 단위의 목록을 표시합니다.                                                                                                                                                                                                                                                                                |
| `exclude_paths`  | 아니요       | `type`이 **파일**이고, `path`가 와일드카드 문자를 포함하는 경우, 로그 수집에서 제외할 일치하는 파일의 목록을 표시합니다. 에이전트 버전 6.18 이상에서 사용할 수 있습니다.                                                                                                                                                                            |
| `exclude_units`  | 아니요       | `type`이 **journald**인 경우, 제외할 특정 journald 단위의 목록을 표시합니다.                                                                                                                                                                                                                                                                                |
| `sourcecategory` | 아니요       | 소스 속성이 속한 범주를 정의하는 데 사용되는 속성입니다, 예를 들어:  `source:postgres, sourcecategory:database` 또는 `source: apache, sourcecategory: http_web_access`입니다.                                                                                                                                                                                                                              |
| `start_position` | 아니요       | 자세한 내용은 [시작 포지션](#start-position)를 참조하세요.|
| `encoding`       | 아니요       | `type`이 **파일**인 경우, 에이전트가 파일을 읽을 수 있도록 인코딩을 설정합니다. UTF-16 little-endian은 `utf-16-le`, UTF-16 big-endian은 `utf-16-be`, Shift JIS는 `shift-jis`로 설정합니다. 다른 값으로 설정하면, 에이전트는 파일을 UTF-8로 읽습니다. _`utf-16-le` 및 `utf-16be`는 에이전트 v6.23/v7.23에 추가됨, `shift-jis`는 에이전트 v6.34/v7.34에 추가됨_                                                                                      |
| `tags`           | 아니요       | 수집된 각 로그에 추가된 태그 목록([태그 지정에 대해 자세히 알아보기][13])                                                                                                                                                                                                                                                                             |

### 시작 포지션

`start_position` 파라미터는 **file** 및 **journald** 테일러 유형에서 지원됩니다. 컨테이너를 추적할 때 `start_position`는 항상 `beginning`입니다.

지원:
- **File**: 에이전트6.19+/7.19+
- **Journald**: 에이전트 6.38+/7.38+

`type`이 **file**인 경우:
- 에이전트에 대한 포지션을 설정하여 파일 읽기를 시작합니다.
- 유효한 값은 `beginning`, `end`, `forceBeginning` 및 `forceEnd`(기본값: `end`)입니다.
- `beginning` 포지션은 와일드카드 포함 경로를 지원하지 않습니다.

`type`이 **journald**인 경우:
- 에이전트가 저널 읽기를 시작하는 포지션을 설정합니다.
- 유효한 값은 `beginning`, `end`, `forceBeginning` 및 `forceEnd`(기본값: `end`)입니다.

#### 우선 순위

file 및 journald 테일러 유형 모두에 대해 또는 `end` 또는 `beginning` 포지션이 지정되었지만 오프셋이 저장된 경우 오프셋이 우선합니다. 저장된 오프셋이 있는 경우에도 `forceBeginning` 또는 `forceEnd`를 사용하면 에이전트가 지정된 값을 사용하도록 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/observability_pipelines/
[3]: /ko/agent/kubernetes/log/
[4]: /ko/agent/docker/log/
[5]: /ko/agent/configuration/agent-configuration-files/
[6]: /ko/agent/logs/log_transport/
[7]: /ko/agent/configuration/agent-commands/#restart-the-agent
[8]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[9]: /ko/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files'
[10]: /ko/tracing/
[11]: /ko/getting_started/tagging/unified_service_tagging
[12]: /ko/metrics/custom_metrics/#overview
[13]: /ko/getting_started/tagging/