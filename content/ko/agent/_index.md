---
aliases:
- /ko/agent/faq/agent-check-directory-structure
- /ko/agent/faq/install-core-extra
- /ko/logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
- /ko/agent/faq/the-datadog-agent-for-logs-or-traces-only
description: 데이터 수집을 위한 Agent 설치 & 설정
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
  text: 클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: 블로그
  text: Agent를 어려워하지 마세요
kind: 설명서
title: Agent
---

<div class="alert alert-info">
Agent v7을 사용할 수 있습니다. <a href="/agent/versions/upgrade_to_agent_v7">최신 버전으로 업그레이드</a>하고 신기능을 전부 누려보세요.
</div>

## 개요

Datadog Agent는 호스트에서 실행되는 소프트웨어입니다. 이벤트와 메트릭을 호스트에서 수집해 Datadog로 전송하며, 이를 통해 사용자가 모니터링 및 성능 데이터를 분석할 수 있습니다. Datadog Agent는 오픈 소스이며 소스 코드는 깃허브 [DataDog/datadog-agent][1]에서 살펴볼 수 있습니다.

**Agent를 전체 설치하시길 권장합니다.** 단 아마존 리눅스, CentOS, 데비안(Debian), 페도라(Fedora), 레드햇(Red Hat), SUSE, 우분투(Ubuntu)에서는 독립형 DogStatsD 패키지를 사용할 수 있습니다. 이 패키지는 DogStatsD를 사이드카로 실행하는 컨테이너화 환경이나 전체 Agent 기능 없이 DogStatsD 서버를 실행하는 환경에서 사용됩니다.

독립형 DogStatsD 패키지는 Agent의 [원라인 설치 명령어][2]로 설치할 수 있습니다. **그러나** `datadog-agent` 부분을 모두 `datadog-dogstatsd`로 바꾸어야 합니다. [DogStats D6 도커(Docker) 이미지 저장소][3]에 있는 도커 이미지도 사용할 수 있습니다.

64bit x86 및 Arm v8 아키텍처용 패키지도 준비되어 있습니다. 기타 아키텍처의 경우에는 소스 설치를 이용하세요.

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog Agent를 마이너 릴리스와 패치 릴리스별로, 또는 적어도 매월 업데이트하시길 권장합니다. </p>
<p>
최신 Agent 기능과 수정 사항을 적용하는 유일한 지원 방법은 Datadog Agent의 메이저 버전으로 업그레이드하여 최신 상태로 유지하는 것입니다. 그러나 Agent는 자주 업데이트를 출시하므로 기업 규모에서 업데이트를 관리하기는 어려울 수 있습니다. 이는 메이저 버전이 출시되기까지 업데이트를 미루어야 한다는 의미는 아닙니다. 조직에 적합한 업데이트 빈도는 인프라스트럭처와 설정 관리 방법에 따라 달라집니다. 단, 매월 업데이트를 목표로 해주세요.</p>
<p>
특정 호스트의 두 마이너 버전 사이에서 Datadog Agent 코어를 갱신하려면 <a href="https://app.datadoghq.com/account/settings#agent">플랫폼에 대응하는 설치 명령을 실행하세요</a>.</p>
<p>
Datadog Agent 릴리스 번호는 <a href="https://semver.org/">SemVer</a> 규칙을 따릅니다.</p>
</div>

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/agent/basic_agent_usage">}}<u>기초적인 Agent 사용</u>: Datadog Agent의 아키텍처 정보, CLI, 오버헤드, 설정 관리 도구 등 자세한 정보를 알아보세요.{{< /nextlink >}}
  {{< nextlink href="/agent/docker">}}<u>도커(Docker)</u>: Datadog Agent를 도커에서 설치하고 설정하는 방법을 안내합니다. {{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes">}}<u>쿠버네티스(Kubernetes)</u>: Datadog Agent를 쿠버네티스에서 설치하고 설정하는 방법을 안내합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>클러스터 Agent</u>: 쿠버네티스용 클러스터 Agent를 설치하고 설정하는 방법을 안내합니다. 클러스터 Agent는 오케스트레이션을 마친 클러스터에서 모니터링 데이터를 효율적으로 수집하기 위해 설계된 Datadog Agent 버전입니다.{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Datadog Agent를 Amazon ECS에서 설치하고 설정하는 방법을 안내합니다{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: Datadog Agent를 AWS Fargate 상의 Amazon ECS에서 설치하고 설정하는 방법을 안내합니다 {{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: Datadog IoT Agent를 설치하고 설정하는 방법을 안내합니다. Datadog IoT Agen는 IoT 기기와 임베디드 애플리케이션 모니터링에 최적화된 Datadog Agent입니다.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>로그 수집</u>: Datadog Agent 내의 로그 수집을 활성화하고 설정하는 방법을 안내합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/proxy">}}<u>프록시</u>: 네트워크 설정이 아웃바운드 트래픽을 제한하는 경우, Agent 트래픽에 프록시를 사용하세요.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>버전</u>: Agent 7은 Datadog Agent의 최신 버전입니다. 메이저 Agent 버전 간 차이점과 업그레이드 방법을 알아보세요.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>트러블슈팅</u>: Datadog Agent 트러블슈팅 정보를 찾아보세요.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>가이드</u>: 심도 있는 단계별 튜토리얼로 Agent 사용법을 안내합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>보안</u>: 주요 보안 기능 및 환경의 안전성을 확인하기 위해 고객이 사용할 수 있는 기능과 관련된 정보입니다.{{< /nextlink >}}
  {{< nextlink href="/agent/vector_aggregation">}}<u>Agent 집계</u>: 옵저버빌리티 파이프라인 구축용 도구인 Vector로 데이터를 전송하도록 Datadog Agent를 설정합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: https://app.datadoghq.com/account/settings#agent/aws
[3]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/dogstatsd/alpine
