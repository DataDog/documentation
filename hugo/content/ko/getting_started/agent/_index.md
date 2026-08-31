---
description: Datadog Agent를 설치 및 구성하여 호스트에서 시스템 수준 메트릭, 이벤트 및 로그를 수집하는 방법에 대한 가이드입니다.
further_reading:
- link: agent/
  tag: 설명서
  text: Datadog Agent
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 인프라스트럭처 모니터링 강화
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: 클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: 블로그
  text: Datadog으로 AWS Lambda 관리형 인스턴스 모니터링
title: Agent 시작하기
---
## 개요 {#overview}

이 가이드는 Datadog Agent를 소개하며 다음과 같은 주제를 다룹니다.

  - [Agent 소개](#what-is-the-datadog-agent)
  - [설치](#installation)
  - [Agent가 수집한 데이터](#data-collected-by-the-agent)
  - [고급 구성 및 기능](#advanced-configurations-and-features)
  - [문제 해결](#troubleshooting)


## Datadog Agent란 무엇인가요? {#what-is-the-datadog-agent}

Datadog Agent는 호스트에서 실행되는 소프트웨어입니다. 호스트로부터 이벤트와 메트릭을 수집하여 모니터링 및 성능 데이터를 분석할 수 있는 Datadog으로 보냅니다. 

Agent는 다음에서 실행될 수 있습니다.
- 로컬 호스트(Windows, Linux, macOS) 
- 컨테이너화된 환경(Docker, Kubernetes)
- 온프레미스 데이터 센터 

Chef, Puppet 또는 Ansible과 같은 구성 관리 도구를 사용하여 Agent를 설치하고 구성할 수도 있습니다.

Agent는 15~20초마다 75~100개의 시스템 수준 메트릭을 수집할 수 있습니다. 추가 구성을 사용하면 실행 중인 프로세스로부터 실시간 데이터, 로그 및 트레이스를 Datadog으로 보낼 수 있습니다. Datadog Agent는 오픈 소스이며, 소스 코드는 GitHub의 [DataDog/datadog-agent][1]에서 사용할 수 있습니다.

### Agent 구성 파일 {#the-agent-configuration-file}

Agent의 메인 구성 파일은 `datadog.yaml`입니다. 필수 파라미터는 다음과 같습니다.
- [Datadog API 키][16]로, Agent의 데이터를 조직과 연결하는 데 사용됩니다. 
- [Datadog 사이트][41]({{< region-param key="dd_site" code="true" >}}).

사용 가능한 모든 구성 옵션은 [샘플 `config_template.yaml` 파일][23]을 참조하세요. Agent 구성 파일을 조정하여 다른 Datadog 기능을 유용하게 활용할 수 있습니다.


## 설치 {#installation}

### 전제 조건 {#prerequisites}
1. [Datadog 계정][15]을 만듭니다.

2. [Datadog API 키][16]를 준비해 둡니다.

### 설정 {#setup}

Datadog 인앱 워크플로인 [Fleet Automation][39]을 사용하여 단일 호스트에서 또는 대규모로 Datadog Agent를 설치, 업그레이드 및 구성하고 문제를 해결합니다. 

특정 플랫폼에 대한 추가적인 Agent 구성은 [Agent 설명서][40]를 참조하세요.


## Agent가 수집한 데이터 {#data-collected-by-the-agent}

Datadog Agent는 사용자에게 인프라에 대한 완전한 가시성을 제공하기 위해 자체 상태 및 구성에 관한 메트릭, 그리고 기본 검사를 통해 호스트와 서비스에서 수집한 메트릭을 보고합니다.

### Agent 메트릭 {#agent-metrics}

Agent가 자신에 대해 Datadog에 보고하는 메트릭은 다음과 같습니다. 이러한 메트릭은 어느 호스트나 컨테이너가 Agent를 실행하는지, 각 Agent는 언제 시작되었는지, Agent가 사용 중인 Python 버전은 무엇인지에 대한 정보를 제공합니다.

| 메트릭                           | 설명                                      |
| -------------------------------- |------------------------------------------------- |
| `datadog.agent.running`        | Agent가 실행 중이고 Datadog에 보고하는 경우 `1`의 값으로, Agent 버전으로 태그가 지정됩니다.  |
| `datadog.agent.started`        | Agent가 시작될 때마다의 `1` 개수입니다.    |
| `datadog.agent.python.version` | `1` 값으로, Python 버전으로 태그가 지정됩니다.     |


Agent 메트릭 전체 목록은 [Agent Metrics][3] 통합에서 찾아볼 수 있습니다.

### 검사 {#checks}

플랫폼에 따라 Agent에는 메트릭을 수집하는 여러 코어 검사가 기본적으로 활성화되어 있습니다.

| 검사       | 메트릭       | 플랫폼          |
| ----------- | ------------- | ------------------ |
| CPU         | [시스템][4]  | 전체                |
| 디스크        | [디스크][5]    | 전체                |
| IO          | [시스템][4]  | 전체                |
| 메모리      | [시스템][4]  | 전체                |
| 네트워크     | [네트워크][6] | 전체                |
| NTP         | [NTP][7]     | 전체                |
| 가동 시간      | [시스템][4]  | 전체                |
| 파일 처리 | [시스템][4]  | Mac을 제외한 전체     |
| 로드        | [시스템][4]  | Windows를 제외한 전체 |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [시스템][4]  | Windows            |

기타 기술로부터 메트릭을 수집하려면 [Integrations][9] 페이지를 참조하세요.



### 서비스 검사 {#service-checks}

Agent는 다음 서비스 검사를 제공하도록 설정되어 있습니다.

  - `datadog.agent.up`: Agent가 Datadog에 연결되면 **OK**를 반환합니다.
  - `datadog.agent.check_status`: Agent 검사가 Datadog에 메트릭을 보낼 수 없는 경우 **CRITICAL**을 반환하고, 그렇지 않으면 **OK**를 반환합니다.

Datadog에서 이러한 검사를 사용하여 모니터와 대시보드를 통해 Agent 상태를 한눈에 확인할 수 있습니다. 자세한 내용은 [서비스 검사 개요][21]를 참조하세요.


## 고급 구성 및 기능 {#advanced-configurations-and-features}

{{% collapse-content title="호스트 및 컨테이너용 Agent의 차이점" level="h4" expanded=false id="id-for-anchoring" %}}

Agent를 호스트에 설치하는 것과 컨테이너화된 환경에 설치하는 것 사이에는 다음과 같은 중요한 차이점이 있습니다. 

- **구성 차이점**: 
    - **호스트**: YAML 파일을 사용해 Agent를 구성합니다.
    - **컨테이너**: [환경 변수][10]를 사용하여 구성 옵션이 전달됩니다. 예를 들면 다음과 같습니다.
    
    ```sh 
    `DD_API_KEY` # Datadog API key
    `DD_SITE`    # Datadog site
    ```

- **통합 감지**: 
    - **호스트**: Agent 구성 파일을 통해 [통합][9]을 식별합니다.
    - **컨테이너**: Datadog의 Autodiscovery 기능을 사용해 통합이 자동으로 식별됩니다. 자세한 내용은 [기본 Agent Autodiscovery][11]를 참조하세요.

또한 컨테이너화된 환경에서 Agent를 실행하는 방법에 관한 워크스루는 [Docker Agent][12] 또는 [Kubernetes][13]를 참조하세요.
{{% /collapse-content %}} 


{{% collapse-content title="Agent 구성 파일을 통해 태그 설정" level="h4" expanded=false id="id-for-anchoring" %}}

태그는 메트릭 및 이벤트에 추가적인 메타데이터 레이어를 추가합니다. 태그를 사용하면 Datadog 시각화에서 데이터의 범위를 지정하고 데이터를 비교할 수 있습니다. 여러 호스트에서 Datadog으로 데이터를 보내는 경우, 이 데이터에 태그를 지정하면 가장 시각화하고 싶은 데이터로 범위를 좁힐 수 있습니다.

예를 들어 여러 팀에서 수집한 데이터가 있고, 알파팀의 메트릭을 보는 데만 관심이 있는 경우 그러한 호스트를 `team:alpha` 또는 `team:bravo` 태그로 태그를 지정하면 `team:alpha`로 태그가 지정된 메트릭으로만 필터링해 범위를 좁힐 수 있습니다. 데이터에 태그를 지정하는 것에 관한 자세한 내용은 [태그 시작하기][24]를 참조하세요.

1. Agent의 [메인 구성 파일][25]을 찾습니다. Ubuntu의 경우, 파일 위치는 `/etc/datadog-agent/datadog.yaml`입니다.

2. `datadog.yaml` 파일에서 `tags` 파라미터를 찾습니다. 호스트 수준 태그를 `datadog.yaml` 구성에서 설정하여 이 호스트에서 전달된 모든 메트릭, 트레이스 및 로그에 태그를 적용할 수 있습니다.

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

3. 태그 파라미터와 제공된 예시 `team:infra` 태그의 주석을 제거합니다. 사용자 지정 태그를 추가할 수도 있습니다(예: `test:agent_walkthrough`).
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

4. Agent의 [재시작 명령][26]을 실행하여 Agent를 재시작합니다. Ubuntu 재시작 명령:

   ```shell
   sudo service datadog-agent restart
   ```

5. 몇 분 뒤 다시 [Metrics Summary 페이지][22]로 이동하여 메트릭 `datadog.agent.started`를 클릭합니다. 기본 `host` 및 `version` 태그 외에 `team` 태그 및 사용자가 추가한 개인 태그도 표시됩니다. 페이지 상단에서 `Tag` 필드를 기준으로 메트릭을 필터링할 수도 있습니다.

6. [Events Explorer 페이지][20]로 이동하여 최신 Agent 이벤트와 함께 표시된 사용자 지정 태그를 찾습니다.

{{% /collapse-content %}} 

{{% collapse-content title="Datadog UI에서 메트릭 찾기" level="h4" expanded=false id="id-for-anchoring" %}}

Agent가 올바로 실행 중인지 확인하려면 Datadog UI에서 기본 메트릭을 검사하면 됩니다. [Metrics Summary 페이지][22]로 이동하여 메트릭 `datadog.agent.started` 또는 메트릭 `datadog.agent.running`을 검색합니다. 이러한 메트릭이 바로 표시되지 않는 경우, Agent가 Datadog에 데이터를 보내는 데 몇 분 걸릴 수 있습니다.

두 메트릭 중 아무 것이나 클릭하면 Metric 패널이 열립니다. 이 패널에는 이러한 메트릭의 수집 위치에 대한 추가 메타데이터와 연결된 태그가 표시됩니다. 호스트에서 구성된 태그가 없는 경우, Datadog이 해당 메트릭에 할당하는 기본 태그만 표시됩니다(예를 들어 `version` 및 `host`). 태그를 추가하는 방법을 자세히 알아보려면 Agent 구성 파일을 통해 태그를 설정하는 방법을 다룬 위의 섹션을 참조하세요.

`ntp.offset` 또는 `system.cpu.idle`과 같은 다른 기본 메트릭을 둘러보세요.
{{% /collapse-content %}} 


{{% collapse-content title="Agent 오버헤드" level="h4" expanded=false id="id-for-anchoring" %}}

Agent가 차지하는 공간과 리소스의 양은 구성 및 해당 Agent가 보내는 데이터가 무엇인지에 좌우됩니다. 처음에는 평균 CPU 사용량 약 0.08%, 디스크 공간 약 880MB~1.3GB가 예상됩니다.

이러한 벤치마크 수치에 대해 자세히 알아보려면 [Agent 오버헤드][2]를 참조하세요.
{{% /collapse-content %}}

{{% collapse-content title="추가 구성 옵션" level="h4" expanded=false id="id-for-anchoring" %}}

Agent 구성 파일을 통해 [로그][27], [트레이스][28] 및 [프로세스][29] 데이터 수집을 활성화할 수 있습니다. 이러한 기능은 기본적으로 활성화되지 않습니다. 예를 들어 구성 파일에서 `logs_enabled` 파라미터는 false로 설정됩니다.

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

기타 Agent 구성 파일을 통해 구성할 수 있는 Datadog 기능은 다음과 같습니다.
- [OTLP 트레이스 수집][30] 활성화
- [로그 수집을 사용자 지정][31]하여 민감한 데이터 필터링 또는 스크러빙
- [DogStatsD][32]를 통한 사용자 지정 데이터 구성

설정하는 과정 내내, 설명서에서 `datadog.yaml` 파일 또는 Agent 구성 파일을 언급하는 경우 이것이 구성해야 하는 파일입니다.

{{% /collapse-content %}} 


## 명령 {#commands}

[Agent 명령어][33]를 참조하여 Agent를 [시작][34], [중지][35] 또는 [다시 시작][26]합니다.

## 문제 해결 {#troubleshooting}

Agent 문제 해결과 관련해 도움이 필요하신 경우:

- [Agent 문제 해결][36] 참조
- [Agent 로그 파일][37] 보기
- [Datadog 지원팀][38]에 문의

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<p>

## 다음 단계 {#next-steps}

{{< whatsnext desc="Agent가 설치된 이후:">}}
{{< nextlink href="/getting_started/integrations" >}}Integrations에 대해 알아보기{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Datadog UI에 대해 알아보기{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Agent를 통해 로그를 수집하는 방법 알아보기{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Agent를 통해 트레이스를 수집하는 방법 알아보기{{< /nextlink >}}
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
[17]: /ko/agent/supported_platforms
[18]: https://app.datadoghq.com/account/settings/agent/latest
[19]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[20]: https://app.datadoghq.com/event/explorer
[21]: /ko/extend/service_checks/#visualize-your-service-check-in-datadog
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
[32]: /ko/extend/dogstatsd/?tab=hostagent
[33]: /ko/agent/configuration/agent-commands/
[34]: /ko/agent/configuration/agent-commands/#start-the-agent
[35]: /ko/agent/configuration/agent-commands/#stop-the-agent
[36]: /ko/agent/troubleshooting/
[37]: /ko/agent/configuration/agent-log-files/
[38]: /ko/help/
[39]: /ko/agent/fleet_automation/
[40]: /ko/agent/?tab=Host-based
[41]: /ko/getting_started/site/