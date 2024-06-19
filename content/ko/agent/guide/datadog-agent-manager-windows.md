---
further_reading:
- link: /agent/basic_agent_usage/windows/
  tag: 설명서
  text: 윈도우즈(Windows) Agent의 기본 사용법
title: 윈도우즈(Windows)용 Datadog Agent Manager
---

## 개요

Datadog Agent Manager GUI는 브라우저 기반입니다. GUI 실행 포트는  `datadog.yaml` 파일로 설정할 수 있습니다. 포트를 `-1`로 설정하면 GUI가 비활성화됩니다. 기본적으로 윈도우즈와 맥에서는 포트 5002에서 활성화되며, 리눅스(Linux)에서는 비활성화되어 있습니다.

### 요건

1. 브라우저에서 쿠키를 활성화한 상태여야 합니다. GUI는 브라우저에서 토큰을 생성하고 저장하는데, 이를 활용해 GUI 서버와의 모든 커뮤니케이션을 인증합니다.

2. GUI는 GUI를 부팅하는 사용자가 올바른 사용자 권한을 받은 경우에만 시작됩니다. `datadog.yaml`을 열 수 있다면 GUI를 사용할 수 있습니다.

3. 보안상의 이유로 GUI는 로컬 네트워크 인터페이스(localhost/127.0.0.1)에서만 접근할 수 있습니다. 따라서 Agent를 같은 호스트에서 실행해야 합니다. Agent를 가상 머신(VM)이나 컨테이너에서 실행하면 호스트 머신에서 접근할 수 없습니다.

#### 지원하는 브라우저

| 브라우저       | 지원 버전(또는 그보다 최신 버전) | 비고                 |
|---------------|------------------------------|-------------------------|
| IE            | 11                           |                         |
| Edge          | 12                           |  Pre-Chromium Edge |
| Edge-chromium | 79                           |                         |
| Firefox       | 38                           |                         |
| Chrome        | 60                           |                         |
| Safari        | 8                            |                         |
| iOS           | 12                           |  모바일 Safari          |

### Datadog Agent Manager 시작하기

윈도우즈 호스트에 Agent를 [설치][1]한 후, Datadog Agent Manager를 시작해 Agent를 그래픽으로 관리하세요.

윈도우즈 시작 메뉴에서:

* Datadog 폴더를 클릭합니다.
* Datadog Agent Manager를 오른쪽 클릭합니다.
* `Run as Administrator`를 선택합니다.

고급 PowerShell 프롬프트에서:
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
```

기본 웹 브라우저에서 Datadog Agent Manager가 실행됩니다. 웹 주소는 `http://127.0.0.1:5002`입니다.

## 옵션

다음 섹션에서는 왼쪽 내비게이션 바에 있는 옵션에 대한 정보를 안내해드리겠습니다.

### 상태

#### 일반

Datadog Agent Manager를 부팅했을 때 일반 상태 페이지가 기본으로 표시되며, 다음과 같은 섹션으로 구성됩니다.

| 섹션     | 설명                                                                     |
|-------------|---------------------------------------------------------------------------------|
| Agent 정보  | Agent 버전, 로그 레벨, 파일 경로 등의 정보를 알려줍니다. |
| 시스템 정보 | 시스템 시간, NTP 오프셋, Go, 파이썬(Python) 버전 등의 정보를 알려줍니다.       |
| 호스트 정보   | OS, 플랫폼, 프로시저, 업타임 등의 정보를 알려줍니다.     |
| 호스트네임   | Agent에서 찾은 호스트네임과 호스트 태그를 표시합니다.                        |
| JMX 상태  | JMX 점검 및 상태 목록을 보여줍니다.                                         |
| 포워더(Forwarder)   | API 키 상태를 비롯해 Agent 포워더와 관련된 정보를 보여줍니다.      |
| 엔드포인트   | Agent에서 사용 중인 엔드포인트입니다.                                                  |
| 로그 Agent  | 로그 Agent 정보입니다(활성화된 경우).                                     |
| 애그리게이터(aggregator)  | Agent의 데이터 애그리게이터 정보입니다.                                     |
| DogStatsD   | DogStatsD로 전송된 데이터 통계입니다.                                         |

#### 컬렉터(Collector)

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

### 로그

로그 페이지에는 `agent.log`에 출력되는 Agent 로그가 표시됩니다. 로그는 최신 또는 오래된 것부터 차례로 정렬할 수 있습니다.

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

### 설정

설정 페이지는 Agent 주요 설정 파일 `datadog.yaml`의 내용을 표시합니다. Datadog Agent Manager에서 파일을 바로 편집할 수 있습니다. 파일을 변경한 후에는 상단 오른족의 **Save**를 클릭하고, [Agent를 재시작](#restart-agent)하세요.

사용 가능한 설정 옵션을 전부 확인하려면 [sample config_template.yaml][2]을 참조하시기 바랍니다.

### 점검

#### 관리 점검

관리 점검 페이지는 활성화된 점검 설정 파일의 내용을 표시합니다. Datadog Agent Manager에서 파일을 바로 편집할 수 있습니다. 파일을 변경한 후에는 상단 오른족의 **Save**를 클릭하고, [Agent를 재시작](#restart-agent)하세요.

점검을 추가하려면 드롭다운 메뉴에서 **점검 추가**를 선택합니다. 설치할 수 있는 사용 가능한 점검 목록을 표시합니다. 설정 상세 정보는 구체적인 점검 [통합][3] 페이지를 참조합니다.

#### 점검 요약

점검 요약 페이지는 실행 중인 점검의 목록, 각 점검의 인스턴스 수, 점검 상태를 표시합니다.

### Flare

Agent에서 문제가 발생해 트러블슈팅이 필요한 경우 Flare 페이지에서 [Datadog 지원팀][4]의 도움을 받을 수 있습니다. 티켓 번호(선택 사항) 및 이메일 주소를 입력하고 **Submit**을 클릭하세요. 이렇게 하면 Agent 로그와 설정 파일의 사본이 Datadog 지원팀으로 전송됩니다. 자세히 알아보려면 [Agent Flare][5] 설명서를 참조하시기 바랍니다.

### Agent 재시작하기

왼쪽 내비게이션 바의 **Restart Agent**를 클릭하면 Agent가 바로 재시작됩니다. 페이지나 확인 프롬프트가 따로 없습니다. Agent를 재시작한 후에는 [일반 상태](#general) 페이지로 이동합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/basic_agent_usage/windows/#installation
[2]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[3]: /ko/integrations/
[4]: /ko/help/
[5]: /ko/agent/troubleshooting/send_a_flare/