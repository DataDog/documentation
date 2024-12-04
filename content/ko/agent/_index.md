---
aliases:
- /ko/agent/faq/agent-check-directory-structure
- /ko/agent/faq/install-core-extra
- /ko/logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
- /ko/agent/faq/the-datadog-agent-for-logs-or-traces-only
cascade:
- _target:
    path: /agent/basic_agent_usage/chef
    lang: ko
  tags:
  - 설치 제거
- _target:
    path: /infrastructure/**/*
    lang: ko
  algolia:
    rank: 80
    tags:
    - 에이전트
description: 에이전트 설치 및 설정을 통한 데이터 수집
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
  text: 클라우드 인스턴스에 에이전트를 설치하는 이유가 무엇인가요?
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: 블로그
  text: 에이전트를 두려워하지 마세요.
title: 에이전트
---

<div class="alert alert-info">
에이전트 v7을 사용할 수 있습니다. <a href="/agent/versions/upgrade_to_agent_v7">최신 버전으로 업그레이드하여</a> 모든 새로운 기능을 활용하세요.
</div>

## 개요

Datadog 에이전트 호스트에서 실행되는 소프트웨어입니다. 호스트로부터 이벤트와 메트릭을 수집하여 모니터링 및 성능 데이터를 분석할 수 있는 Datadog으로 보냅니다. Datadog 에이전트는 오픈 소스이며 해당 소스 코드는 GitHub([DataDog/datadog-agent][1])에서 사용할 수 있습니다.

**에이전트를 완전히 설치하는 것이 좋습니다.** 그러나 Amazon Linux, CentOS, Debian, Fedora, Red Hat, SUSE 및 Ubuntu에서 독립 실행형 DogStatsD 패키지를 사용할 수 있습니다. 이 패키지는 DogStatsD가 사이드카로 실행되는 컨테이너화된 환경이나 전체 에이전트 기능 없이 DogStatsD 서버를 실행하는 환경에서 사용됩니다.

독립 실행형 DogStatsD 패키지는 에이전트 [한 줄 설치 명령][2]와 함께 설치됩니다. 단, 매 `datadog-agent` 경우를 **제외한** 모든 항목은 `datadog-dogstatsd`로 대체되어야 합니다. Docker 이미지는 [DogStatsD6 Docker 이미지 저장소][3]에서 사용할 수 있습니다.

64bit x86 및 Arm v8 아키텍처용 패키지도 준비되어 있습니다. 기타 아키텍처의 경우에는 소스 설치를 이용하세요.

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog에서는 모든 부 버전 및 패치 릴리스가 있을 때마다 또는 최소한 매월 Datadog 에이전트를 업데이트할 것을 권장합니다.</p>
<p>
주요 Datadog 에이전트 버전으로 업그레이드하고 업데이트를 유지하는 것이 최신 에이전트 기능과 수정 사항을 이용할 수 있는 유일한 지원 방법입니다. 하지만 에이전트는 업데이트가 자주 릴리스되므로 기업 규모에서 업데이트를 관리하는 것이 어려울 수 있습니다. 업데이트하기 전에 주요 릴리스를 기다려야 한다는 의미는 아닙니다. 조직에 적합한 업데이트 주기는 인프라 및 구성 관리 관행에 따라 다르지만 월별을 목표로 합니다.</p>

<p>
특정 호스트의 두 부 버전 간에 Datadog 에이전트 코어를 업데이트하려면 플랫폼에 <a href="https://app.datadoghq.com/account/settings/agent/latest">해당하는 설치 명령을 실행하세요</a>.</p>
<p>
Datadog 에이전트 릴리스 번호 지정은 <a href="https://semver.org/">SemVer</a> 규칙을 따릅니다.</p>
</div>

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/agent/basic_agent_usage">}} <u>기본 에이전트 사용법</u>: 아키텍처 세부 정보, CLI, 오버헤드 및 설정 관리 도구를 포함하여 Datadog 에이전트에 대해 자세히 알아보세요.{{< /nextlink >}} {{< nextlink href="/agent/docker">}}<u>Docker</u>: Docker에 Datadog 에이전트를 설치하고 설정합니다. {{< /nextlink >}} {{< nextlink href="/agent/kubernetes">}}<u>쿠버네티스(Kubernetes)</u>: 쿠버네티스(Kubernetes)에 Datadog 에이전트를 설치하고 설정합니다.{{< /nextlink >}} {{< nextlink href="/agent/cluster_agent">}}<u>클러스터 에이전트</u>: 오케스트레이션된 클러스터 전체에서 모니터링 데이터를 효율적으로 수집하기 위해 구축된 Datadog 에이전트 버전인 Kubernetes용 클러스터 에이전트를 설치하고 구성합니다.{{< /nextlink >}} {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Amazon ECS에 Datadog 에이전트를 설치하고 설정합니다.{{< /nextlink >}} {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: AWS Fargate에서 Amazon ECS를 사용하여 Datadog 에이전트 설치 및 설정{{< /nextlink >}} {{< nextlink href="/agent/iot">}}<u>IoT</u>: IoT 장치 및 임베디드 애플리케이션 모니터링에 최적화된 Datadog 에이전트 버전인 Datadog IoT 에이전트를 설치하고 구성합니다.{{< /nextlink >}} {{< nextlink href="/agent/logs">}}<u>로그 수집</u>: Datadog 에이전트에서 로그 수집을 활성화하고 설정합니다.{{< /nextlink >}} {{< nextlink href="/agent/configuration/proxy">}}<u>프록시</u>: 네트워크 구성이 아웃바운드 트래픽을 제한하는 경우 에이전트 트래픽용 프록시를 사용하세요.{{< /nextlink >}} {{< nextlink href="/agent/versions/">}}<u>버전</u>: 에이전트 7은 Datadog 에이전트의 최신 주요 버전입니다. 주요 에이전트 버전 간의 변경 사항과 업그레이드 방법을 알아보세요.{{< /nextlink >}} {{< nextlink href="/agent/troubleshooting">}}<u>트러블슈팅</u>: Datadog 에이전트에 대한 트러블슈팅 정보를 찾아보세요.{{< /nextlink >}} {{< nextlink href="/agent/guide">}}<u>가이드</u>: 에이전트 사용에 대한 심층적인 단계별 튜토리얼입니다.{{< /nextlink >}} {{< nextlink href="/agent/security">}}<u>보안</u>: 고객의 환경 보안을 보장하기 위해 고객이 사용할 수 있는 주요 보안 기능에 대한 정보입니다.{{< /nextlink >}} {{< nextlink href="/getting_started/observability_pipelines">}}<u>관측 가능성 파이프라인 및 Datadog 설정</u>: Observability Pipelines Worker를 집계자로 배포하여 모든 로그와 메트릭을 원하는 대상으로 수집, 변환 및 라우팅합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[3]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/dogstatsd/alpine