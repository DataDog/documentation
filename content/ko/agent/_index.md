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
description: Agent 설치 및 설정을 통한 데이터 수집
further_reading:
- link: /logs/
  tag: Documentation
  text: 로그 수집
- link: /infrastructure/process/
  tag: Documentation
  text: 프로세스 수집
- link: /tracing/
  tag: Documentation
  text: 트레이스 수집
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: 클라우드 인스턴스에 Agent를 설치하는 이유가 무엇인가요?
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: Blog
  text: Agent를 두려워하지 마세요.
title: Agent
---
<div class="alert alert-info">
Agent v7을 사용할 수 있습니다. <a href="/agent/versions/upgrade_to_agent_v7">최신 버전으로 업그레이드</a>하여 모든 새로운 기능을 활용하세요.
</div>

## 개요

Datadog Agent는 호스트에서 실행되는 소프트웨어입니다. 호스트로부터 이벤트와 메트릭을 수집하여 모니터링 및 성능 데이터를 분석할 수 있는 Datadog으로 보냅니다. Datadog Agent는 오픈 소스이며, 소스 코드는 GitHub의 [DataDog/datadogagent][1]에서 사용할 수 있습니다.

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog는 Datadog Agent를 마이너 릴리스와 패치 릴리스별로, 또는 적어도 매월 업데이트하시길 권장합니다.</p>
<p>
주요 Datadog Agent 버전으로 업그레이드하고 업데이트를 유지하는 것이 최신 Datadog Agent 기능과 수정 사항을 이용할 수 있는 유일한 지원 방법입니다.</p>
<p> <em>Agent를 완전히 설치하는 것이 좋습니다.</em> 그러나 Amazon Linux, CentOS, Debian, Fedora, Red Hat, SUSE 및 Ubuntu에서 독립 실행형 DogStatsD 패키지를 사용할 수 있습니다. 이 패키지는 DogStatsD가 사이드카로 실행되는 컨테이너화된 환경이나 전체 Agent 기능 없이 DogStatsD 서버를 실행하는 환경에서 사용됩니다.</p>
</div>

## Agent 관리

### Fleet Automation을 통한 Agent 관리(권장)
[Fleet Automation][15]은 대규모로 Datadog Agent를 설치, 업그레이드, 구성 및 문제를 해결하는 기본적인 인앱 워크플로입니다.

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="Fleet Automation 뷰를 통해 한 곳에서 Datadog Agent를 중앙에서 관리할 수 있습니다." style="width:100%;">}}


 **구성 및 이력 보기**: 한 페이지에서 플릿에 있는 모든 Agent와 그 버전, 활성화된 제품, 구성 파일 및 변경 내역을 확인하세요.
 **[오래된 Agent 업그레이드][13]**: 몇 번의 클릭으로 Agent를 원격으로 업그레이드하여 플릿을 최신 상태로 유지하세요.
 **[지원을 위한 플레어 요청][14]**: 호스트의 Support 탭에서 플레어를 생성하고 명령줄을 사용할 필요 없이 기존 또는 새로운 지원 케이스에 첨부하세요.
 **API 키 사용 감사**: 특정 API 키를 사용하는 Agent를 파악하고 안전하게 키를 교체하세요.


### Datadog Agent Manager GUI

<div class="alert alert-info"> Agent GUI는 32비트 Windows 플랫폼에서 지원되지 않습니다.</div>

다음에 Datadog Agent Manager GUI를 사용합니다.
 Agent용 상태 정보 보기
 모든 실행 중인 검사 보기
 Agent 로그 보기
 Agent 구성 파일(`datadog.yaml`) 편집
 Agent 검사 추가 또는 수정
 플레어 전송

Datadog Agent Manager GUI는 기본적으로 Windows 및 macOS에서 활성화되어 있으며, 포트 `5002`에서 실행됩니다. 기본 웹 브라우저에서 GUI를 열려면 `datadogagent launchgui` 명령어를 사용하세요.

GUI의 기본 포트는 `datadog.yaml` 구성 파일에서 변경할 수 있습니다. GUI를 비활성화하려면 포트 값을 `1`로 설정하세요. Linux에서는 기본적으로 GUI가 비활성화되어 있습니다.

GUI 요구 사항:
 브라우저에서 쿠키를 활성화한 상태여야 합니다. GUI는 브라우저에서 토큰을 생성하고 저장하는데, 이를 활용해 GUI 서버와의 모든 커뮤니케이션을 인증합니다.
 GUI를 시작하려면 사용자에게 필요 권한이 있어야 합니다. `datadog.yaml`을 열 수 있으면 GUI를 사용할 수 있는 것입니다.
 보안상의 이유로 **오직** 로컬 네트워크 인터페이스(`localhost`/`127.0.0.1`)에서만 GUI에 액세스할 수 있으므로 Agent가 실행 중인 호스트에서 작업해야 합니다. VM이나 컨테이너에서 Agent를 실행하고 호스트 시스템에서 액세스할 수 없습니다.

### 명령줄 인터페이스

Agent 6 이상 버전부터는 Agent 명령줄 인터페이스는 하위 명령을 기반으로 합니다. Agent 하위 명령어 전체 목록을 보려면 [Agent 명령어][2]를 참조하세요.

## Datadog Agent 더 자세히 알아보기

### Agent 업데이트

지정된 호스트의 부차 버전 두 개 사이에 Datadog Agent 코어를 수동으로 업데이트하려면 [플랫폼에 해당하는 설치 명령][7]을 실행합니다.

**참고**: 특정 Agent 통합을 수동으로 업데이트하려면 [통합 관리 지침][8]을 참조하세요.

### 구성 파일

[Agent 구성 파일 설명서][9]를 참고하세요.

### Datadog 사이트

[Agent 주 구성 파일][10] `datadog.yaml`을 편집해 `site` 파라미터를 설정하세요(기본값인 `datadoghq.com`으로 설정).

```yaml
site: {{< region-param key="dd_site" >}}
```

**참고**: `site` 파라미터에 관한 자세한 내용은 [Datadog 사이트 설명서 시작하기][11]를 참고하세요.

### 로그 위치

[Agent 로그 파일 설명서][12]를 참고하세요.

## Agent 오버헤드

다음은 Datadog Agent 리소스 소비량 예시입니다. Amazon EC2 머신 `c5.xlarge` 인스턴스(4 VCPU/ 8GB RAM)에 테스트가 생성되고 유사한 리소싱의 ARM64 기반 인스턴스 비교 성능을 볼 수 있습니다. Agent를 모니터링하기 위해 기본 `datadogagent`가 프로세스 점검으로 실행 중입니다. 통합을 더 활성화하면 Agent 리소스 소비량이 늘어날 수 있습니다.
JMX 점검을 활성화하면 모니터링 중인 JVM으로 노출되는 빈의 개수에 따라 Agent의 메모리 사용량이 늘어납니다. 트레이스 및 프로세스 Agent를 활성화하면 리소스 사용량도 늘어납니다.

* Agent Test 버전: 7.34.0
* CPU: 평균 CPU의 약 0.08% 사용
* 메모리: RAM 약 130MB 사용(RSS 메모리)
* 네트워크 대역폭: 약 140B/s ▼ | 800B/s ▲
* 디스크:
  * Linux 830MB에서 880MB(분포에 따라 결정됨)
  * Windows: 870MB

**로그 수집**:

아래는 파일 하나에서 [HTTP 포워더][6]를 활성화하여 *초당 로그 110KB*를 수집해 얻은 결과입니다. 리소스 사용량의 변화를 사용할 수 있는 여러 압축 수준에서 보여줍니다.

{{< tabs >}}
{{% tab "HTTP 압축 수준 6" %}}

* Agent Test 버전: 6.15.0
* CPU: 평균 CPU의 약 1.5% 사용
* 메모리: RAM 약 95MB 사용
* 네트워크 대역폭: 약 14KB/s ▲

{{% /tab %}}
{{% tab "HTTP 압축 수준 1" %}}

* Agent Test 버전: 6.15.0
* CPU: 평균 CPU의 약 1% 사용
* 메모리: RAM 약 95MB 사용
* 네트워크 대역폭: 약 20KB/s ▲

{{% /tab %}}
{{% tab "HTTP 비압축" %}}

* Agent Test 버전: 6.15.0
* CPU: 평균 CPU 약 0.7% 사용
* 메모리: RAM 약 90MB 사용(RSS 메모리)
* 네트워크 대역폭: 약 200KB/s ▲
 
{{% /tab %}}
{{< /tabs >}}


## 추가 리소스
{{< whatsnext desc="이 섹션에는 다음 주제가 포함되어 있습니다.">}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Kubernetes에 Datadog Agent를 설치하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Cluster Agent</u>: 오케스트레이션을 마친 클러스터에서 모니터링 데이터를 효율적으로 수집하기 위해 구축된 Datadog Agent의 버전인 Kubernetes용 Cluster Agent를 설치하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Amazon ECS에 Datadog Agent를 설치하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: AWS Fargate에서 Amazon ECS로 Datadog Agent를 설치하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: IoT 장치 및 임베디드 애플리케이션 모니터링에 최적화된 Datadog Agent 버전인 Datadog IoT Agent를 설치하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>로그 수집</u>: Datadog Agent에서 로그 수집을 활성화하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>프록시</u>: 네트워크 구성으로 인해 아웃바운드 트래픽이 제한되는 경우 Agent 트래픽에 프록시를 사용합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>버전</u>: Agent 7은 Datadog Agent의 최신 주요 버전입니다. 주요 Agent 버전 간의 변경 사항과 업그레이드 방법을 알아보세요.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>문제 해결</u>: Datadog Agent에 대한 문제 해결 정보를 찾습니다.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>가이드</u>: Agent 사용에 관한 상세한 단계별 튜토리얼입니다.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>보안</u>: 주요 보안 기능 및 환경의 안전성을 확인하기 위해 고객이 사용할 수 있는 기능과 관련된 정보입니다{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Observability Pipelines 및 Datadog 구성</u>: Observability Pipelines Worker를 애그리게이터로 배포하여 모든 로그와 메트릭을 원하는 대상으로 수집, 변환 및 라우팅합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadogagent
[2]: /ko/agent/configuration/agentcommands/
[6]: /ko/agent/logs/log_transport/?tab=https#enforceaspecifictransport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /ko/agent/guide/integrationmanagement/
[9]: /ko/agent/configuration/agentconfigurationfiles/
[10]: /ko/agent/configuration/agentconfigurationfiles/#agentmainconfigurationfile
[11]: /ko/getting_started/site/
[12]: /ko/agent/configuration/agentlogfiles/
[13]: /ko/agent/fleet_automation/remote_management/#remotelyupgradeyouragents
[14]: /ko/agent/troubleshooting/send_a_flare/?tab=agent#sendaflarefromthedatadogsite
[15]: /ko/agent/fleet_automation