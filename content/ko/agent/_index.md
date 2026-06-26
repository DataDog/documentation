---
aliases:
- /ko/agent/faq/agent-check-directory-structure
- /ko/agent/faq/install-core-extra
- /ko/logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
- /ko/agent/faq/the-datadog-agent-for-logs-or-traces-only
- /ko/agent/basic_agent_usage/
- /ko/guides/basic_agent_usage/
- /ko/agent/faq/where-is-the-configuration-file-for-the-agent/
- /ko/agent/faq/log-location
cascade:
- _target:
    lang: en
    path: /agent/basic_agent_usage/chef
  tags:
  - uninstall
- _target:
    lang: en
    path: /infrastructure/**/*
  algolia:
    rank: 80
    tags:
    - agent
description: Agent 설치 및 구성을 통한 데이터 수집
further_reading:
- link: /logs/
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process/
  tag: 설명서
  text: 프로세스 수집
- link: /tracing/
  tag: 설명서
  text: 트레이스 수집
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: 설명서
  text: 클라우드 인스턴스에 Agent를 설치하는 이유가 무엇인가요?
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: 블로그
  text: Agent를 두려워하지 마세요.
- link: https://learn.datadoghq.com/courses/agent-on-host
  tag: 학습 센터
  text: 호스트의 Agent
title: Agent
---
<div class="alert alert-info">
Agent v7을 사용할 수 있습니다. <a href="/agent/versions/upgrade_to_agent_v7">최신 버전으로 업그레이드</a>하여 모든 새로운 기능을 활용하세요.
</div>

## 개요 {#overview}

Datadog Agent는 호스트에서 실행되는 소프트웨어입니다. 호스트로부터 이벤트와 메트릭을 수집하여 모니터링 및 성능 데이터를 분석할 수 있는 Datadog으로 보냅니다. Datadog Agent는 오픈 소스이며, 소스 코드는 GitHub의 [DataDog/datadog-agent][1]에서 사용할 수 있습니다.

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog에서는 Datadog Agent를 마이너 릴리스 및 패치 릴리스별로, 또는 적어도 매월 업데이트하도록 권장합니다. </p>
<p>
주요 Datadog Agent 버전으로 업그레이드하고 업데이트된 상태를 유지하는 것이 최신 Datadog Agent 기능과 수정 사항을 이용하기 위해 지원되는 유일한 방법입니다.</p>
<p> <em>Agent를 완전히 설치하는 것이 좋습니다.</em> 그러나 Amazon Linux, CentOS, Debian, Fedora, Red Hat, SUSE 및 Ubuntu에서 독립 실행형 DogStatsD 패키지도 사용할 수 있습니다. 이 패키지는 DogStatsD가 사이드카로 실행되는 컨테이너화된 환경이나 전체 Agent 기능 없이 DogStatsD 서버를 실행하는 환경에서 사용됩니다.</p>
</div>

## Agent 관리 {#managing-the-agent}

### Fleet Automation으로 Agent 관리(권장) {#managing-the-agent-with-fleet-automation-recommended}
[Fleet Automation][15]은 Datadog Agent를 대규모로 설치, 업그레이드, 구성 및 문제 해결하는 기본적인 인앱 워크플로입니다.

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="Fleet Automation 뷰를 통해 한곳에서 Datadog Agent를 중앙에서 관리할 수 있습니다." style="width:100%;">}}


- **{{< ui >}}View configuration & history{{< /ui >}}**: 플릿의 모든 Agent, 해당 버전, 활성화된 제품, 구성 파일 및 변경 기록을 한 페이지에서 확인하세요.
- **[오래된 Agent 업그레이드][13]**: 몇 번의 클릭으로 Agent를 원격으로 업그레이드하여 플릿을 최신 상태로 유지하세요.
- **[지원을 위한 flare 전송][14]**: 호스트의 {{< ui >}}Support{{< /ui >}} 탭에서 flare를 생성하고 명령줄을 사용할 필요 없이 기존 또는 신규 지원 케이스에 첨부하세요.
- **API 키 사용량 감사**: 어느 Agent가 특정 API 키를 사용 중인지 파악하여 안전하게 키를 회전합니다.


### Datadog Agent Manager GUI {#datadog-agent-manager-gui}

<div class="alert alert-info">Agent GUI는 32비트 Windows 플랫폼에서는 지원되지 않습니다.</div>

다음에 Datadog Agent Manager GUI를 사용합니다.
- Agent의 상태 정보 보기
- 실행 중인 검사 모두 보기
- Agent 로그 보기
- Agent 구성 파일(`datadog.yaml`) 편집
- Agent 검사 추가 또는 편집
- flare 전송

Datadog Agent Manager GUI는 Windows 및 macOS에서 기본적으로 활성화되며, 포트 `5002`에서 실행됩니다. 기본 웹 브라우저에서 GUI를 열려면 `datadog-agent launch-gui` 명령을 사용하세요.

GUI의 기본 포트는 `datadog.yaml` 구성 파일에서 변경할 수 있습니다. GUI를 비활성화하려면 포트의 값을 `-1`로 설정하세요. Linux에서는 기본적으로 GUI가 비활성화되어 있습니다.

GUI 요구 사항:
- 브라우저에서 쿠키를 활성화해야 합니다. GUI는 브라우저에서 토큰을 생성하고 저장하는데, 이를 활용해 GUI 서버와의 모든 커뮤니케이션을 인증합니다.
- GUI를 시작하려면 사용자에게 필수 권한이 있어야 합니다. `datadog.yaml`을 열 수 있으면 GUI를 사용할 수 있습니다.
- 보안상의 이유로 GUI는 로컬 네트워크 인터페이스**에서만** 액세스할 수 있으므로(`localhost`/`127.0.0.1`), Agent를 실행 중인 호스트에서 작업해야 합니다. VM이나 컨테이너에서 Agent를 실행하고 호스트 시스템에서 액세스할 수 없습니다.

### 명령줄 인터페이스 {#command-line-interface}

Agent 6 이후 버전부터는 Agent 명령줄 인터페이스가 하위 명령 기반입니다. Agent 하위 명령의 전체 목록을 보려면 [Agent 명령어][2]를 참조하세요.

## Datadog Agent 더 자세히 알아보기{#getting-further-with-the-datadog-agent}

### Agent 업데이트 {#update-the-agent}

지정된 호스트의 부차 버전 두 개 사이에 Datadog Agent 코어를 수동으로 업데이트하려면 [플랫폼에 해당하는 설치 명령][7]을 실행합니다.

**참고**: 하나의 특정 Agent 통합을 수동으로 업데이트하려면, [통합 관리 가이드][8]를 참조하세요.

### 구성 파일 {#configuration-files}

[Agent 구성 파일 설명서][9]를 참조하세요.

### Datadog 사이트 {#datadog-site}

[Agent의 메인 구성 파일][10]인 `datadog.yaml`을 편집하여 `site` 파라미터를 설정합니다(기본값은 `datadoghq.com`임).

```yaml
site: {{< region-param key="dd_site" >}}
```

**참고**: `site` 파라미터에 대한 자세한 내용은 [Datadog 사이트 시작하기 설명서][11]를 참조하세요.

### 로그 위치 {#log-location}

[Agent 로그 파일 설명서][12]를 참조하세요.

## Agent 오버헤드 {#agent-overhead}

다음은 Datadog Agent 리소스 사용량 예시입니다. 테스트는 Amazon EC2 머신 `c5.xlarge` 인스턴스(4 VCPU/ 8GB RAM)에서 진행했으며, 비슷한 리소스를 갖춘 ARM64 기반 인스턴스에서 그에 필적하는 성능이 확인되었습니다. 기본 `datadog-agent`가 Agent 자체를 모니터링하기 위해 프로세스 검사와 함께 실행 중이었습니다. 더 많은 통합을 활성화하면 Agent 리소스 소비량이 늘어날 수 있습니다.
JMX 점검을 활성화하면 모니터링 중인 JVM으로 노출되는 빈의 개수에 따라 Agent의 메모리 사용량이 늘어납니다. 트레이스 및 프로세스 Agent를 활성화하면 리소스 사용량도 늘어납니다.

* Agent Test 버전: 7.34.0
* CPU: 평균적으로 CPU의 약 0.08% 사용
* 메모리: RAM 약 130MB 사용(RSS 메모리)
* 네트워크 대역폭: 약 140B/s ▼ | 800B/s ▲
* 디스크:
  * Linux 830MB~880MB(배포에 따라 다름)
  * Windows: 870MB

**로그 수집**:

아래의 결과는 [HTTP 포워더][6]를 활성화한 상태로 파일 하나에서 *초당 로그 110KB*를 수집하여 얻은 것입니다. 리소스 사용량의 변화를 사용할 수 있는 여러 압축 수준에서 보여줍니다.

{{< tabs >}}
{{% tab "HTTP 압축 수준 6" %}}

* Agent Test 버전: 6.15.0
* CPU: 평균적으로 CPU의 약 1.5%
* 메모리: RAM 약 95MB 사용.
* 네트워크 대역폭: 약 14KB/s ▲

{{% /tab %}}
{{% tab "HTTP 압축 수준 1" %}}

* Agent Test 버전: 6.15.0
* CPU: 평균적으로 CPU의 약 1% 사용
* 메모리: RAM 약 95MB 사용.
* 네트워크 대역폭: 약 20KB/s ▲

{{% /tab %}}
{{% tab "HTTP 비압축" %}}

* Agent Test 버전: 6.15.0
* CPU: 평균적으로 CPU의 약 0.7% 사용
* 메모리: RAM 약 90MB 사용(RSS 메모리)
* 네트워크 대역폭: 약 200KB/s ▲
 
{{% /tab %}}
{{< /tabs >}}


## 추가 리소스 {#additional-resources}
{{< whatsnext desc="이 섹션에는 다음 주제가 포함되어 있습니다.">}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Datadog Agent를 Kubernetes에 설치하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Cluster Agent</u>: Cluster Agent for Kubernetes를 설치하고 구성합니다. 이것은 오케스트레이션된 클러스터 전체에서 모니터링 데이터를 효율적으로 수집하도록 구축된 Datadog Agent 버전입니다.{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Datadog Agent를 Amazon ECS에 설치하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: Datadog Agent를 AWS Fargate 기반 Aamzon ECS를 사용하여 설치하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: Datadog IoT Agent를 설치하고 구성합니다. 이것은 IoT 장치 및 임베디드 애플리케이션 모니터링에 최적화된 Datadog Agent 버전입니다.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>로그 수집</u>: Datadog Agent에서 로그 수집을 활성화하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>프록시</u>: 네트워크 구성이 아웃바운드 트래픽을 제한하는 경우, Agent 트래픽에 프록시를 사용하세요.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>버전</u>: Agent 7이 Datadog Agent의 최신 주 버전입니다. 여러 Agent 주 버전 간 변경 사항과 업그레이드 방법을 알아보세요.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>문제 해결</u>: Datadog Agent의 문제 해결 정보를 찾아보세요.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>가이드</u>: Agent 사용에 관한 심층적, 단계별 튜토리얼입니다.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>보안</u>: 고객 환경의 보안을 확보하기 위해 고객이 사용할 수 있는 주요 보안 성능 및 기능에 관한 정보입니다.{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Observability Pipelines 및 Datadog 구성</u>: Observability Pipelines Worker를 애그리게이터로 배포하여 모든 로그와 메트릭을 수집, 변환하고, 원하는 대상으로 라우팅합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /ko/agent/configuration/agent-commands/
[6]: /ko/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /ko/agent/guide/integration-management/
[9]: /ko/agent/configuration/agent-configuration-files/
[10]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ko/getting_started/site/
[12]: /ko/agent/configuration/agent-log-files/
[13]: /ko/agent/fleet_automation/remote_management/#remotely-upgrade-your-agents
[14]: /ko/agent/troubleshooting/send_a_flare/?tab=agent#send-a-flare-from-the-datadog-site
[15]: /ko/agent/fleet_automation