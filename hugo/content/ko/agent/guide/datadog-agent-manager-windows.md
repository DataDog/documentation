---
description: 브라우저 기반 Datadog Agent Manager GUI를 사용하여 지원되는 브라우저 및 인증을 통해 Windows Agent를
  구성하고 관리합니다.
further_reading:
- link: /agent/basic_agent_usage/windows/
  tag: 설명서
  text: 윈도우즈(Windows) Agent의 기본 사용법
title: Windows용 Datadog Agent Manager
---
## 개요 {#overview}

Datadog Agent Manager GUI는 브라우저 기반입니다. GUI가 실행되는 포트는 `datadog.yaml` 파일에서 구성할 수 있습니다. 포트를 `-1`로 설정하면 GUI가 비활성화됩니다. 기본적으로 Windows와 Mac에서는 포트 5002에서 활성화되며 Linux에서는 비활성화되어 있습니다.

### 요구 사항 {#requirements}

1. 브라우저에서 쿠키를 활성화해야 합니다. GUI는 브라우저에 토큰을 생성하여 저장하고, 이 토큰을 사용하여 GUI 서버와의 모든 통신을 인증합니다.

2. GUI는 GUI를 실행하는 사용자에게 적절한 권한이 있는 경우에만 실행됩니다. `datadog.yaml`을 열 수 있으면 GUI를 사용할 수 있습니다.

3. 보안상의 이유로 GUI는 로컬 네트워크 인터페이스(localhost/127.0.0.1)에서만 액세스할 수 있으므로, GUI를 사용하려면 Agent가 실행 중인 호스트에 있어야 합니다. 즉, VM이나 컨테이너에서 Agent를 실행하고 호스트 머신에서 GUI에 액세스할 수 없습니다.

#### 지원되는 브라우저 {#supported-browsers}

| 브라우저       | 지원 버전(이상) | 설명                 |
|---------------|------------------------------|-------------------------|
| IE            | 11                           |                         |
| Edge          | 12                           |  Pre-Chromium Edge |
| Edge-chromium | 79                           |                         |
| Firefox       | 38                           |                         |
| Chrome        | 60                           |                         |
| Safari        | 8                            |                         |
| iOS           | 12                           |  Mobile Safari          |

### Datadog Agent Manager 시작하기 {#start-the-datadog-agent-manager}

윈도우즈 호스트에 Agent를 [설치][1]한 후, Datadog Agent Manager를 시작해 Agent를 그래픽으로 관리하세요.

윈도우즈 시작 메뉴에서:

* {{< ui >}}Datadog{{< /ui >}} 폴더를 클릭합니다.
* {{< ui >}}Datadog Agent Manager{{< /ui >}}를 마우스 오른쪽 버튼으로 클릭합니다.
* {{< ui >}}Run as Administrator{{< /ui >}}를 선택합니다.

고급 PowerShell 프롬프트에서:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
```

기본 웹 브라우저에서 Datadog Agent Manager가 실행됩니다. 웹 주소는 `http://127.0.0.1:5002`입니다.

## 옵션 {#options}

다음 섹션에서는 왼쪽 내비게이션 바에 있는 옵션에 대한 정보를 안내해드리겠습니다.

### 상태 {#status}

#### 일반 {#general}

Datadog Agent Manager를 실행하면 일반 상태 페이지가 기본으로 표시됩니다. 다음 섹션으로 구성됩니다.

| 섹션     | 설명                                                                     |
|-------------|---------------------------------------------------------------------------------|
| {{< ui >}}Agent Info{{< /ui >}}  | Agent 버전, 로그 레벨, 파일 경로 등의 정보를 제공합니다. |
| {{< ui >}}System Info{{< /ui >}} | 시스템 시간, NTP 오프셋, Go, Python 버전 등의 정보를 제공합니다.       |
| {{< ui >}}Host Info{{< /ui >}}   | OS, 플랫폼, 프로세스, 업타임 등의 호스트 정보를 제공합니다.     |
| {{< ui >}}Hostnames{{< /ui >}}   | Agent에서 찾은 호스트 이름과 호스트 태그를 표시합니다.                        |
| {{< ui >}}JMX Status{{< /ui >}}  | JMX 검사 및 해당 상태의 목록입니다.                                         |
| {{< ui >}}Forwarder{{< /ui >}}   | API 키 상태를 비롯한 Agent 포워더 정보를 제공합니다.      |
| {{< ui >}}Endpoints{{< /ui >}}   | Agent에서 사용 중인 엔드포인트입니다.                                                  |
| {{< ui >}}Logs Agent{{< /ui >}}  | Logs Agent 정보입니다(활성화된 경우).                                     |
| {{< ui >}}Aggregator{{< /ui >}}  | Agent의 데이터 애그리게이터 정보입니다.                                     |
| {{< ui >}}DogStatsD{{< /ui >}}   | DogStatsD로 전송된 데이터 통계입니다.                                         |

#### Collector {#collector}

컬렉터 상태 페이지는 Agent에서 실행하는 점검의 상세 정보를 보여줍니다. 예를 들면 다음과 같습니다.

```text
cpu
   Instance ID: cpu [OK]
   Total Runs: 1,561
   Metric Samples: 7, Total: 10,921
   Events: 0, Total: 0
   Service Checks: 0, Total: 0
   Average Execution Time: 4ms
```

### 로그 {#log}

로그 페이지에는 `agent.log`으로 출력되는 Agent 로그가 표시됩니다. 로그는 최신순 또는 오래된순으로 정렬할 수 있습니다.

```text
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check winproc
2019-07-10 17:46:05 EDT | INFO | (runner.go:302 in work) | Done running check winproc
2019-07-10 17:48:02 EDT | INFO | (transaction.go:114 in Process) | Successfully posted payload to "https://6-2-1-app.agent.datadoghq.com/api/v1/check_run?api_key=*************************12345"
```

### 설정 {#settings}

설정 페이지에는 Agent의 기본 구성 파일 `datadog.yaml`의 내용이 표시됩니다. Datadog Agent Manager에서 이 파일을 직접 편집할 수 있습니다. 변경 후 오른쪽 상단에서 {{< ui >}}Save{{< /ui >}}를 클릭한 다음 [Agent 재시작하기](#restart-agent)를 클릭합니다.

사용 가능한 옵션의 전체 목록은 [Windows용 예제 `datadog.yaml` 파일][6]을 참조하세요.

### 검사 {#checks}

#### 검사 관리 {#manage-checks}

검사 관리 페이지에는 활성화된 검사 구성 파일의 내용이 표시됩니다. Datadog Agent Manager에서 이러한 파일을 직접 편집할 수 있습니다. 변경 후 오른쪽 상단에서 {{< ui >}}Save{{< /ui >}}를 클릭한 다음 [Agent 재시작하기](#restart-agent)를 클릭합니다.

검사를 추가하려면 드롭다운 메뉴에서 {{< ui >}}Add a Check{{< /ui >}}를 선택합니다. 설치 가능한 검사 목록이 표시됩니다. 구성 세부 정보는 특정 검사의 [integration][3] 페이지를 참조하세요.

#### 검사 요약 {#checks-summary}

점검 요약 페이지는 실행 중인 점검의 목록, 각 점검의 인스턴스 수, 점검 상태를 표시합니다.

### Flare {#flare}

Agent에 문제가 있는 경우 Flare 페이지에서 [Datadog 지원][4] 팀과 함께 문제를 해결할 수 있습니다. 티켓 번호(선택 사항)와 이메일 주소를 입력한 후 {{< ui >}}Submit{{< /ui >}}을 클릭합니다. 그러면 Agent 로그 및 구성 파일 사본이 Datadog 지원 팀으로 전송됩니다. Flare에 대한 자세한 내용은 [Agent Flare][5] 설명서에서 확인할 수 있습니다.

### Agent 재시작하기 {#restart-agent}

왼쪽 탐색 모음에서 {{< ui >}}Restart Agent{{< /ui >}}를 클릭하면 Agent가 즉시 재시작됩니다. 페이지나 확인 프롬프트가 없습니다. Agent를 재시작한 후 [일반 상태](#general) 페이지로 이동합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/basic_agent_usage/windows/#installation
[3]: /ko/integrations/
[4]: /ko/help/
[5]: /ko/agent/troubleshooting/send_a_flare/
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example