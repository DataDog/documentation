---
further_reading:
- link: /agent/basic_agent_usage/
  tag: 설명서
  text: 에이전트 기본 사용법
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 인프라스트럭처 모니터링 강화
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: 클라우드 인스턴스에 Datadog 에이전트를 설치해야 하는 이유
title: 에이전트 이용해 시작하기
---

이번 가이드에서는 에이전트를 소개하고, 시스템 레벨 메트릭을 Datadog 플랫폼으로 전송할 때 사용하는 방법을 알려드리겠습니다. 우분투(Ubuntu) 상의 에이전트 설치 사례도 함께 설명합니다. 이번에 다룰 주제는 다음과 같습니다.

  - 에이전트 설치
  - 에이전트 실행 여부의 확인
  - 에이전트 기능 설정
  - 트러블슈팅 자료

## 개요

### 에이전트 소개

Datadog 에이전트는 호스트에서 실행되는 소프트웨어입니다. 호스트에서 이벤트와 메트릭을 수집하여 모니터링 및 성능 데이터를 분석할 수 있는 Datadog으로 전송합니다. 로컬 호스트(Windows, MacOS), 컨테이너화된 환경(Docker, Kubernetes), 온프레미스 데이터 센터에서 실행할 수 있습니다. 설정 관리 도구(Chef, Puppet, Ansible)를 사용하여 설치 및 구성할 수 있습니다.



에이전트는 15~20초마다 75~100개의 시스템 레벨 메트릭을 수집할 수 있습니다. 또한 에이전트 추가 설정을 통해 실행 중인 프로세스에서 라이브 데이터, 로그, 트레이스를 Datadog 플랫폼으로 전송할 수 있습니다. DataDog 에이전트는 오픈소스로, 소스 코드는 깃허브(GitHub)의 [DataDog/datadog-agent][1]에 공개되어 있습니다.

### 에이전트의 오버헤드

에이전트가 차지하는 공간과 리소스의 양은 설정과 에이전트가 전송하도록 구성된 데이터에 따라 달라집니다. 시작 시 평균적으로 약 0.08%의 CPU가 사용되고 약 880MB~1.3GB의 디스크 공간이 사용됩니다.

이러한 벤치마크 수치에 대해 자세히 알아보려면 [에이전트 오버헤드][2]를 참조하세요.

### 수집 데이터

#### 에이전트 메트릭

다음의 에이전트 메트릭은 에이전트 자체에 대하여 스스로 Datadog에 전송하는 정보입니다. 따라서 호스트나 컨테이너가 에이전트를 실행 중인지, 언제 에이전트가 시작되었는지, 어느 버전의 파이썬(Python)을 실행하는지 확인할 수 있습니다.

| 메트릭                           | 설명                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `datadog.agent.python.version` | 에이전트가 Datadog에 보고 중인 경우 값 `1`이 표시됩니다. 메트릭에는 `python_version` 태그가 지정됩니다. |
| `datadog.agent.running`        | 에이전트가 Datadog에 보고 중인 경우 값 `1`이 표시됩니다.                                                 |
| `datadog.agent.started`        | 에이전트 시작 시에 값 `1`과 함께 개수 정보가 전송됩니다(v6.12 이상에서 사용할 수 있습니다).                                        |

에이전트 메트릭 전체 목록은 [에이전트 메트릭][3] 통합에서 찾아볼 수 있습니다.

#### 점검

플랫폼에 따라 Agent는 메트릭을 수집하면서 여러 핵심 점검을 기본으로 수행합니다.

| 점검       | 메트릭       | 플랫폼          |
| ----------- | ------------- | ------------------ |
| CPU         | [시스템][4]  | 전체                |
| 디스크        | [디스크][5]    | 전체                |
| IO          | [시스템][4]  | 전체                |
| 메모리      | [시스템][4]  | 전체                |
| 네트워크     | [네트워크][6] | 전체                |
| NTP         | [NTP][7]     | 전체                |
| 업타임      | [시스템][4]  | 전체                |
| 파일 관리 | [시스템][4]  | 맥(Mac) 제외 전체     |
| 로드        | [시스템][4]  | 윈도우즈(Windows) 제외 전체 |
| 도커(Docker)      | [도커(Docker)][8]  | 도커(Docker)             |
| 윈프록(Winproc)     | [시스템][4]  | 윈도우즈(Windows)            |

기타 기술 메트릭을 수집하려면 [통합][9] 페이지를 참조하세요.

## 호스트 및 컨테이너용 Agent의 차이점

이번 가이드에서는 호스트 상의 Agent 설치와 설정 방법을 설명해드리겠습니다. 최종적으로 컨테이너 환경에 Agent를 설치할 예정이 있는 경우, 몇 가지 주지하셔야 하는 차이점이 있습니다.

1. 호스트에서 Agent는 YAML 파일을 사용하여 설정됩니다(가이드의 후반부에서 자세히 설명하겠습니다). 반면, 컨테이너 Agent 설정 옵션은 [환경 변수][10]로 전달됩니다. 예를 들면 다음과 같습니다.
    - Datadog API 키용: `DD_API_KEY`
    - Datadog 사이트용: `DD_SITE`

2. 마찬가지로 호스트 상에서 [통합][9]은 Agent 설정 파일을 통해 식별되지만 컨테이너 환경에서는 Datadog의 자동탐지 기능을 통해 통합이 자동 식별됩니다. 자세한 내용은 [기본 Agent 자동탐지[11]를 참조하세요.

컨테이너 환경에서 Agent를 실행하기 위한 튜토리얼은 [도커(Docker) Agent][12]나 [쿠버네티스(Kubernetes)][13]를 참조하시기 바랍니다.

## Agent를 설치해야 하는 이유

다양한 Agent 기반 통합에서 데이터를 전송하려면 Agent를 설치해야 합니다. 예를 들어, Datadog API를 통해 로그나 메트릭을 전송할 때는 꼭 Agent가 필요하지는 않습니다. 그러나 Datadog 플랫폼으로 데이터를 전송할 때는 Agent를 사용하시길 권장합니다.

Agent는 15초마다 호스트 데이터를 수집하여 환경 전체에서 무슨 일이 일어나고 있는지 정확하게 파악합니다. [점검][14] 섹션에서 설명한 바와 같이 Agent는 50개 이상의 기본 메트릭을 수집하는 점검을 활성화하고, 시스템 레벨의 데이터에 대하여 보다 깊이 있는 인사이트를 제공합니다.

## 설정

### 전제 조건

1. [Datadog 계정][15]을 만듭니다.

2. [Datadog API 키][16]를 준비하세요.

3. Datadog UI를 열어둡니다.

**참조**: 이번 튜토리얼에서는 우분투(Ubuntu) 운영체제를 사용합니다. 지원되는 플랫폼의 전체 목록은 [기본 Agent 사용][17] 페이지를 참조하세요.

### 설치

Datadog UI에서 [에이전트 설치 페이지][18]로 이동해 **Ubuntu**를 클릭합니다. 호스트에서 Datadog 에이전트를 설치하려면 해당 페이지에서 1줄 설치 명령을 사용합니다(아래 예시). 1줄 설치 명령은 [Datadog API 키][16]로 업데이트되어야 합니다.

우분투(Ubuntu) 1줄 설치 명령 예시:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

[에이전트 설치 페이지][18]에서 사용 중인 운영 체제에 대한 최신 설치 지침을 확인하세요.

### 검증

#### 터미널 명령어

Agent의 [상태 명령][19]을 실행하여 설치를 확인합니다.

```shell
sudo datadog-agent status
```
정상적으로 설치된 경우 다음과 같은 Agent 정보로 시작하는 Agent 상태 리포트가 반환됩니다.

```text
===============
Agent (v7.36.1)
===============

  Status date: 2022-06-15 15:54:48.364 EDT / 2022-06-15 19:54:48.364 UTC (1655322888364)
  Agent start: 2022-06-15 15:54:29.85 EDT / 2022-06-15 19:54:29.85 UTC (1655322869850)
  Pid: 9801
  Go Version: go1.17.6
  Python Version: 3.8.11
  Build arch: amd64
  Agent flavor: agent
  Check Runners: 6
  Log Level: info
```

#### 이벤트 

Datadog UI에서 [이벤트 탐색기 페이지][20]로 이동합니다. 에이전트를 시작하거나 다시 시작하면 이벤트가 Datadog로 전송됩니다. 에이전트가 성공적으로 설치되면 다음 메시지가 표시됩니다:

```text
Datadog agent (v. 7.XX.X) started on <Hostname>
```

#### 서비스 검사

Agent는 다음의 서비스 점검을 제공하도록 설정되어 있습니다.

  - `datadog.agent.up`:
    Agent가 Datadog에 연결된 경우 `OK`를 반환합니다.

  - `datadog.agent.check_status`:
    Agent 점검으로 Datadog에 메트릭을 보낼 수 없는 경우 `CRITICAL`를 반환합니다. 기타 경우에는 `OK`를 반환합니다.

이러한 점검은 Datadog 플랫폼에서 모니터링과 대시보드를 통해 Agent 상태를 빠르게 시각화하는 용도로 사용됩니다. 더 자세한 정보는 [서비스 점검 개요][21]를 참조하세요.

#### 메트릭

Datadog UI에서 [메트릭 요약 페이지][22]로 이동하여 `datadog.agent.started` 또는 `datadog.agent.running` 메트릭을 검색합니다. 해당 메트릭이 즉시 표시되지 않는 경우 에이전트가 Datadog 플랫폼에 데이터를 전송하는 데 수 분이 소요되기 때문일 수 있습니다.

하나의 메트릭을 클릭하면 메트릭(Metric) 패널이 열립니다. 이 패널에는 메트릭이 어디에서 수집되었는지, 관련 태그가 무엇인지에 관한 메타데이터가 추가로 표시됩니다. 이번 튜토리얼에서 다루는 호스트에는 태그가 지정되어 있지 않으므로, Datadog가 메트릭에 할당할 기본 태그만(`version`나 `host` 등) 표시될 것입니다. 태그를 추가하는 방법은 다음의 Agent 설정 파일 섹션을 참조하시기 바랍니다.

`ntp.offset`이나 `system.cpu.idle`를 비롯한 기타 기본 메트릭을 살펴보세요.

## Agent 설정 파일

Agent의 기본 설정 파일은 `datadog.yaml`입니다. 필수 파라미터는 다음과 같습니다.
- [Datadog API 키][16]. Agent 데이터를 귀하의 조직과 연결하기 위해 사용됩니다.
- Datadog 사이트 ({{< region-param key="dd_site" code="true" >}}). 

사용 가능한 모든 설정 옵션을 보려면 [샘플 `config_template.yaml` 파일][23]을 참조하세요.

Agent의 설정 파일을 조정하여 태그를 포함한 기타 Datadog의 기능을 이용할 수 있습니다.

#### Agent 설정 파일을 통해 태그 설정

태그는 메트릭과 이벤트에 추가 메타데이터 레이어를 더해줍니다. 이를 활용해 Datadog에서 시각화한 데이터의 범위를 설정하고 서로 비교할 수 있습니다. 여러 호스트에서 Datadog로 데이터가 전송된 경우, 이 정보를 태그하여 시각화하고 싶은 데이터만 포함하도록 범위를 지정할 수 있습니다.

예를 들어, 여러 팀에서 수집한 데이터가 있고, 팀 알파의 메트릭에만 관심이 있다고 가정해 보겠습니다. 해당 특정 호스트를 `team:alpha` 또는 `team:bravo` 태그로 태깅하면 `team:alpha`로 태깅하여 메트릭을 필터링할 수 있습니다. [태그 시작하기][24]를 참조해 데이터 태깅에 대해 자세히 알아보세요.

1. 에이전트의 [기본 설정 파일][25]을 찾습니다. 우분투(Ubuntu)의 경우 파일 위치는 `/etc/datadog-agent/datadog.yaml`입니다.

2. `datadog.yaml` 파일에서 `tags` 파라미터를 찾습니다. 호스트 레벨 태그를 `datadog.yaml` 설정에 구성하면 해당 호스트에서 전송한 모든 메트릭, 트레이스, 로그에 태그를 지정할 수 있습니다.

   ```yaml
   ## @param tags  - list of key:value elements - optional
   ## @env DD_TAGS - space separated list of strings - optional
   ## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
   ##
   ## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
   ## tags to be set in a configuration file (`tags`), and additional tags to be added
   ## with an environment variable (`DD_EXTRA_TAGS`).
   ##
   ## Learn more about tagging: https://docs.datadoghq.com/tagging/
   #
   # tags:
   #   - team:infra
   #   - <TAG_KEY>:<TAG_VALUE>
   ```

3. 태그 파라미터의 코멘트를 해제하고 제시된 사례의 `team:infra` 태그를 추가합니다. 또는, `test:agent_walkthrough`처럼 커스텀 태그를 만들어 추가할 수도 있습니다.
   ```yaml
   ## @param tags  - list of key:value elements - optional
   ## @env DD_TAGS - space separated list of strings - optional
   ## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
   ##
   ## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
   ## tags to be set in a configuration file (`tags`), and additional tags to be added
   ## with an environment variable (`DD_EXTRA_TAGS`).
   ##
   ## Learn more about tagging: https://docs.datadoghq.com/tagging/
   #
   tags:
      - team:infra
      - test:agent_walkthrough
   ```

4. 에이전트의 [재설치 명령][26]을 실행하여 에이전트를 재설치합니다. 우분투(Ubuntu) 재시작 명령은 다음과같습니다.

   ```shell
   sudo service datadog-agent restart
   ```

5. 몇 분 후 [메트릭 요약 페이지][22]로 다시 이동하여 `datadog.agent.started` 메트릭을 클릭합니다. 기본 `host` 및 `version` 태그 외에도 `team` 태그 및 직접 추가한 태그를 확인할 수 있습니다. 페이지 상단의 `Tag` 필드를 통해 메트릭 을 필터링할 수도 있습니다.

6. [이벤트 탐색기 페이지][20]로 이동하여 최신 에이전트 이벤트에 표시된 커스텀 태그를 찾습니다.

#### 기타 설정 옵션

[로그][27], [트레이스][28], [프로세스][29] 데이터 수집은 에이전트 설정 파일을 통해 활성화할 수 있습니다. 이러한 기능은 기본적으로 활성화되는 기능이 아닙니다. 예를 들어 설정 파일에서 `logs_enabled` 파라미터는 거짓(false)로 설정되어 있습니다.

```yaml
##################################
## Log collection Configuration ##
##################################

## @param logs_enabled - boolean - optional - default: false
## @env DD_LOGS_ENABLED - boolean - optional - default: false
## Enable Datadog Agent log collection by setting logs_enabled to true.
#
# logs_enabled: false
```

기타 Agent 설정 파일을 통해 설정할 수 있는 Datadog 기능은 다음과 같습니다.
- [OTLP 트레이스 수집][30] 활성화
- 민감한 데이터 필터링 및 스크러빙을 위한 [로그 수집 커스터마이즈][31]
- [DogStatsD][32]를 통해 커스텀 데이터 설정하기

설정 과정을 진행하는 중에 설명서에서 `datadog.yaml` 파일이나 Agent 설정 파일을 언급하는 경우, 이는 설정해야 하는 파일을 가리킵니다.

## 명령어

[에이전트 명령어][33]를 참조하여 에이전트를 [시작][34], [중지][35] 또는 [다시 시작][26]합니다.

## 문제 해결

Agent 트러블슈팅과 관련해 도움이 필요하신 경우

- [에이전트 트러블슈팅][26] 참조하기
- [에이전트 로그 파일][37] 보기
- [Datadog 지원팀][38]에 문의하기

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<p>

## 다음 단계

{{< whatsnext desc="Agent를 설치한 후:">}}
{{< nextlink href="/getting_started/integrations" >}}통합에 대해 알아보세요{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Datadog UI에 대해 알아보세요{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Agent로 로그를 수집하는 방법을 알아보세요{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Agent로 트레이스를 수집하는 방법을 알아보세요{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /ko/agent/basic_agent_usage/?tab=agentv6v7#agent-overhead
[3]: /ko/integrations/agent_metrics/
[4]: /ko/integrations/system/#metrics
[5]: /ko/integrations/disk/#metrics
[6]: /ko/integrations/network/#metrics
[7]: /ko/integrations/ntp/#metrics
[8]: /ko/agent/docker/data_collected/#metrics
[9]: /ko/getting_started/integrations/
[10]: /ko/agent/guide/environment-variables/#overview
[11]: /ko/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[12]: /ko/agent/docker/?tab=standard
[13]: /ko/agent/kubernetes/installation?tab=operator
[14]: /ko/getting_started/agent/#checks
[15]: https://www.datadoghq.com
[16]: https://app.datadoghq.com/organization-settings/api-keys
[17]: /ko/agent/basic_agent_usage/?tab=agentv6v7
[18]: https://app.datadoghq.com/account/settings/agent/latest
[19]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[20]: https://app.datadoghq.com/event/explorer
[21]: /ko/developers/service_checks/#visualize-your-service-check-in-datadog
[22]: https://app.datadoghq.com/metric/summary
[23]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[24]: /ko/getting_started/tagging/
[25]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[26]: /ko/agent/configuration/agent-commands/#restart-the-agent
[27]: /ko/logs/
[28]: /ko/tracing/
[29]: /ko/infrastructure/process/?tab=linuxwindows#introduction
[30]: /ko/opentelemetry/otlp_ingest_in_the_agent/?tab=host
[31]: /ko/agent/logs/advanced_log_collection/
[32]: /ko/developers/dogstatsd/?tab=hostagent
[33]: /ko/agent/configuration/agent-commands/
[34]: /ko/agent/configuration/agent-commands/#start-the-agent
[35]: /ko/agent/configuration/agent-commands/#stop-the-agent
[36]: /ko/agent/troubleshooting/
[37]: /ko/agent/configuration/agent-log-files/
[38]: /ko/help/