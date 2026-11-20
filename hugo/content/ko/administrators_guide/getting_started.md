---
description: 새 Datadog 설치를 시작하기 위한 전략을 알아보세요.
further_reading:
- link: /getting_started/support/
  tag: 설명서
  text: Datadog 지원 시작하기
title: 시작하기
---
## 개요 {#overview}

이 시작 가이드는 조직에 Datadog을 효과적으로 도입하기 위한 전략을 제공합니다. 지원 리소스, 지식을 심화할 수 있는 학습 센터 과정, 테스트 환경 설정 지침을 살펴보세요.

## 도움 받기 {#getting-help}

### 셀프 서비스 리소스 {#self-service-resources}

이 가이드를 진행하면서 다음 셀프 서비스 리소스를 참조하세요.

* [Datadog 교육](#learn-datadog-basics) 과정
* Datadog [설명서][16], 특히 [시작하기][17] 페이지를 통해 플랫폼에 대해 더 자세히 알아보세요.  
* [Datadog UI][18]에서 상황별 도움말, 특정 구성 필드에 대한 정보, 릴리스 노트 및 기타 리소스를 확인하려면 <kbd>?</kbd> 아이콘을 앱 곳곳이나 제품 탐색 메뉴 하단에서 클릭하세요.

{{< img src="/administrators_guide/help_center.png" alt="Datadog UI 도움말 센터의 스크린샷" style="width:90%;">}} 

### 지원 티켓 제출 {#file-a-support-ticket}

문제가 발생했을 때 지원을 받으려면:

* [**Datadog 지원**][20]: 어려운 문제를 해결하고, 설치를 안내하며, 문제를 현지 환경에 맞게 파악하고, 버그를 식별하며, 기능 요청을 접수하는 데 도움을 줍니다.
* [**Datadog Agent flare**][21]: 이 CLI 도구는 자동으로 새 지원 티켓을 생성하고, 일부 정보가 삭제된 관련 로그 파일, 디버그 수준 설정 및 로컬 구성이 포함된 압축 파일을 로그인 없이 Datadog 지원 팀에 전송합니다. flare를 사용하고 Datadog 지원 팀에 보내는 방법에 대한 자세한 내용은 [flare 보내기][21]를 참조하세요.  
* [**Fleet Automation**][5]: 플랫폼 UI에서 원격으로 flare를 생성할 수 있습니다.

## Datadog 기본 정보 알아보기 {#learn-datadog-basics}

사용 사례에 가장 중요한 Datadog 구성 요소를 빠르게 파악하세요. 무료 [학습 센터][1] 과정에 등록하는 것부터 시작하세요. 다음 과정을 온보딩 워크플로에 통합하세요.

**시작하기**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Datadog 기초{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tagging-best-practices" >}}태깅 모범 사례{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/managing-software-catalog" >}}카탈로그 관리{{< /nextlink >}}
{{< /whatsnext >}}

**관리자**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/agent-on-host" >}}호스트의 Agent{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent" >}}Kubernetes 클러스터 모니터링{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-api-automation-iac" >}}Datadog API: 자동화 및 코드형 인프라{{< /nextlink >}}
{{< /whatsnext >}} 

**사용자 인터페이스**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}대시보드 소개{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}그래프 위젯 알아보기{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboards-slos" >}}대시보드 및 SLO 사용하기{{< /nextlink >}}
{{< /whatsnext >}}

**사이트 안정성 엔지니어**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-sre" >}}Datadog 101: 사이트 안정성 엔지니어{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-monitors-and-alerting" >}}APM Monitors and Alerting{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/core-web-vitals-lab" >}}Datadog RUM을 사용하여 핵심 웹 바이탈 추적하기{{< /nextlink >}}
{{< /whatsnext >}}

**개발자**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-java-host" >}}Java 애플리케이션용 APM 설정{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-dev" >}}Datadog 101: 개발자{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tracking-errors-rum-javascript" >}}JavaScript 웹 애플리케이션용 RUM으로 오류 추적{{< /nextlink >}}
{{< /whatsnext >}}

## 테스트 환경 만들기{#create-a-test-environment}

일부 과정을 완료한 후, 배운 내용을 자신의 환경에 적용해 보세요. 위험 부담이 적은 샌드박스에 Datadog을 설치하고 실험하여 환경에 익숙해지세요. 더 광범위하게 설치하기 전에 모니터링 설정을 구축할 수 있는 간단하고 접근하기 쉬운 환경을 만드세요. 

### 테스트 환경 구성 {#configuring-your-test-environment}

#### 인앱 {#in-app}

[Datadog UI][18]는 테스트 환경 구축을 시작하기에 가장 좋은 곳입니다. 이 플랫폼은 구성 지원, 실시간 데이터 자동 파서, 상황별 제안 및 기타 여러 도구를 제공합니다. Datadog UI는 이러한 작업 중 일부를 완료하는 데 도움이 되는 리소스를 제공합니다. 

몇 가지 예는 다음과 같습니다.

* [Synthetic Monitoring 테스트][14]를 생성해 애플리케이션에서 수행하는 주요 비즈니스 트랜잭션 테스트를 시작하세요.
* 몇 가지 [Service Level Objectives][15](SLO)를 생성하여 애플리케이션 성능 목표를 정의하세요.
* [APM 서비스 설정][9] 페이지를 검토하고 단계별 지침에 따라 서비스 계측을 시작하세요.
* [로그 파이프라인][8]을 구성하고 테스트하여 인프라 및 애플리케이션에서 들어오는 다양한 로그 세트를 수집하는 방법을 결정하세요.
* [모니터 템플릿][10] 페이지를 검토하여 테스트 환경에 알림 추가를 시작하세요.

#### 호스트 Agent 구성 템플릿 {#host-agent-config-templates}

[Datadog Agent][2]는 오픈 소스이며 GitHub에 게시되어 있습니다. Agent GitHub 저장소는 환경 구축을 지원하는 구성 템플릿 및 사양을 확인하는 데 유용한 리소스입니다. 

몇 가지 예는 다음과 같습니다.

* [Agent 구성 예시][3]
* [통합 구성 사양][4]   
* [Fleet Automation][5]

## 다음 단계 {#next-steps}

새 Datadog 설치를 성공적으로 구축하려면 [계획][11] 페이지를 검토하세요. 범위 설정 연습을 만들고, [리소스 태깅][12]을 설정하고, 제품 모범 사례를 알아보고, 더 많은 제품을 추가하고, 데이터 수집을 최적화하여 원활하게 설치하는 방법을 알아보세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://learn.datadoghq.com/
[2]: https://github.com/DataDog/datadog-agent
[3]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
[4]: https://github.com/DataDog/integrations-core
[5]: https://app.datadoghq.com/fleet
[6]: /ko/getting_started/tagging/unified_service_tagging/
[7]: /ko/getting_started/tagging/
[8]: https://app.datadoghq.com/logs/pipelines/pipeline/add
[9]: https://app.datadoghq.com/apm/service-setup
[10]: https://app.datadoghq.com/monitors/templates
[11]: /ko/administrators_guide/plan
[12]: /ko/administrators_guide/plan/#resource-tagging
[13]: https://github.com/DataDog/datadog-agent/tree/main/examples
[14]: https://app.datadoghq.com/synthetics/tests
[15]: https://app.datadoghq.com/slo/manage
[16]: https://docs.datadoghq.com
[17]: /ko/getting_started
[18]: https://app.datadoghq.com
[19]: /ko/bits_ai/
[20]: /ko/help
[21]: /ko/agent/troubleshooting/send_a_flare/?tab=agent