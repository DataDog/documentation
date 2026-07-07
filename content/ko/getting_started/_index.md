---
aliases:
- /ko/overview
- /ko/getting_started/faq/
cascade:
  algolia:
    category: Getting Started
    rank: 50
description: Datadog의 Observability 플랫폼 설치, 구성 및 주요 기능 시작하기 가이드를 포함한 소개입니다.
disable_sidebar: true
further_reading:
- link: https://learn.datadoghq.com/
  tag: 학습 센터
  text: Datadog 시작 과정 듣기
- link: https://datadoghq.com/blog/
  tag: 블로그
  text: Datadog의 새로운 제품 및 기능, 통합 등에 관해 알아보기
- link: https://app.datadoghq.com/help/quick_start
  tag: 앱
  text: 빠른 시작 가이드 둘러보기
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: 학습 센터
  text: Observability 소개
title: 시작하기
---
## Datadog이란? {#what-is-datadog}

Datadog은 스택에 관계없이 소프트웨어 개발의 모든 단계를 지원하는 가시성 플랫폼입니다. 이 플랫폼은 소프트웨어를 빌드, 테스트, 모니터링, 디버그, 최적화, 보안을 확보하는 데 도움이 되는 수많은 제품으로 구성되어 있습니다. 이러한 제품은 개별로 사용하거나, 여럿을 합쳐서 맞춤형 솔루션으로 사용할 수 있습니다.

아래 표에 Datadog 제품을 몇 가지 예를 들어 나열했습니다.

<table>
    <thead>
        <th>카테고리</th>
        <th>제품 예시</th>
    </thead>
    <tr>
        <td><p><strong>개발</strong></p></td>
        <td>
        <ul>
        <li>텍스트 편집기나 GitHub에서 <a href="/security/code_security/">Code Security</a>로 코드 취약성을 강조 표시합니다.</li>
        <li><a href="/coscreen/">CoScreen</a>을 사용해 원격 페어 프로그래밍 세션을 쉽게 진행합니다.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>테스트</strong></p></td>
        <td>
            <ul>
                <li><a href="/pr_gates/">PR Gate</a>를 사용하여 잘못된 코드가 프로덕션에 배포되는 것을 차단합니다.</li>
                <li><a href="/synthetics/">Synthetic Monitoring</a>을 사용해 전 세계 사용자를 시뮬레이션하여 웹 앱, API 또는 모바일 애플리케이션을 테스트합니다.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>모니터링</strong></p></td>
        <td>
            <ul>
                <li><a href="/logs/">로그</a>, <a href="/metrics/">메트릭</a>, <a href="/events/">이벤트</a> 및 <a href="/tracing/glossary/#trace">네트워크 트레이스</a>를 수집하고 처리, 집계 및 <a href="/monitors/">경보를 세밀하게 제어합니다.</a></li>
                <li><a href="/profiler/">Continuous Profiler</a>로 호스트 성능을 평가합니다.</li>
                <li><a href="/tracing/">Application Performance Monitoring</a>으로 애플리케이션 성능을 평가합니다.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>문제 해결</strong></p></td>
        <td>
            <ul>
                <li><a href="/error_tracking/">오류</a> 및 <a href="/incident_response/incident_management/">인시던트</a>를 관리하고 문제를 요약하며 해결 방법을 제안합니다.</li>
                <li><a href="/real_user_monitoring/">Real User Monitoring</a>으로 사용자 이탈을 측정하고 사용자 불만을 감지합니다.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>보안</strong></p></td>
        <td>
            <ul>
                <li><a href="/security/">Datadog Security</a>로 위협과 공격을 감지합니다.</li>
            </ul>
        </td>
    </tr>
</table>

또한 수백 가지 [통합][1]을 이용해 이미 사용 중인 기술과 Datadog 기능을 연동할 수 있습니다. 예를 들어 [AWS 통합][2]은 90여 가지 AWS 서비스에서 로그, 이벤트 및 메트릭을 수집합니다.

## 자세히 알아보기 {#learn-more}

{{< learning-center-callout header="활성화 웨비나 세션에 참가하기" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}}
  이 기반 활성화 세션을 수강하면 "Datadog이란 무엇이고, 나에게 어떤 도움이 될까?"라는 핵심적인 질문에 답할 수 있습니다. Datadog으로 데이터를 보내는 방법은 물론 사용자의 다양한 환경, 애플리케이션, 인프라의 상태를 더 잘 이해하려면 어떤 페이지를 방문해야 하는지도 배우게 됩니다.
{{< /learning-center-callout >}}

### 과정 듣기 {#take-a-course}
Datadog 학습 센터에서 Datadog 플랫폼 실습 경험을 제공합니다. [시작 과정][3]에서는 관측 가능성 실무, 주요 Datadog 개념 등을 다룹니다.

Datadog 탐색 방법을 빠르게 배울 좋은 방법은 [빠르게 시작하기 코스][4]를 듣는 것입니다.

### 제품 분야 심층 탐구 {#dive-deeper-into-a-product-area}
{{< whatsnext desc="아래의 가이드 중 하나로 시작하기:">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: 대시보드, 인프라 목록, 맵 등 Datadog UI 사용법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Datadog 사이트</u>: 지역 및 보안 요구 사항에 적절한 Datadog 사이트를 선택합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>DevSecOps 번들</u>: 인프라 DevSecOps 번들로 시작합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: 호스트의 메트릭과 이벤트를 Datadog으로 보냅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Datadog HTTP API로 시작하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>Integrations</u>: Datadog 통합을 사용해 메트릭, 트레이스, 로그를 수집하는 방법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/search" >}}<u>검색</u>: Datadog 제품 전반에 걸친 검색 및 필터링의 기초를 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>태그</u>: 메트릭, 로그, 트레이스를 태그하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: OpenTelemetry 메트릭, 트레이스, 로그를 Datadog으로 보내는 방법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>학습 센터</u>: 학습 경로를 따르거나, 자체 주도형 수업 또는 랩을 수강하고 Datadog 인증 프로그램을 둘러봅니다.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="플랫폼 서비스:">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>Dashboards</u>: 사용자가 중시하는 작업 질문에 답해 주는 대시보드를 생성, 공유, 유지 관리합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>Incident Management</u>: 시스템의 문제에 관해 소통하고 문제를 추적합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>Monitors</u>: 중대한 변경 사항이 발생하면 팀에서 알 수 있도록 경보와 알림을 설정합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/notebooks" >}}<u>Notebooks</u>: 실시간 그래프, 메트릭, 로그, 모니터를 결합해 문제를 격리하고 인터랙티브 가이드를 만듭니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/organization_topology" >}}<u>Organization Topology</u>: 단일 조직 및 다중 조직 Datadog 배포 중에서 선택하고 액세스 제어로 격리를 관리합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/teams" >}}<u>Teams</u>: ID 제공업체, GitHub 및 기타 소스에서 얻은 팀 데이터를 Datadog에 동기화하여 신뢰할 수 있는 소유권 모델을 구축합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>Workflow Automation</u>: 경보 및 보안 신호에 대응한 엔드투엔드 프로세스를 자동화합니다.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="제품:">}}
{{< nextlink href="/getting_started/containers" >}}<u>Containers</u>: Agent Autodiscovery 및 Datadog 연산자 사용법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>Serverless for AWS Lambda</u>: 서버리스 인프라에서 메트릭, 로그, 트레이스를 수집하는 방법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/internal_developer_portal" >}}<u>Internal Developer Portal</u>: 텔레메트리, 메타데이터, 워크플로를 통합해 전달 속도를 높입니다. {{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>Tracing</u>: Agent가 소형 애플리케이션을 추적하도록 설정합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>Profiler</u>: Continuous Profiler를 사용하여 코드의 성능 문제를 찾아서 해결합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>Database Monitoring</u>: 데이터베이스의 상태와 성능을 조회하고 발생하는 문제를 신속하게 해결합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>Synthetic Monitoring</u>: Synthetic 테스트로 API 엔드포인트 테스트 및 모니터링과 주요 비즈니스 여정을 시작하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>Continuous Testing</u>: CI 파이프라인 및 IDE에서 엔드투엔드 Synthetic 테스트를 실행하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>세션 리플레이</u>: 세션 리플레이를 사용해 사용자가 귀사 제품과 어떻게 상호작용하는지 심층적으로 살펴봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>App and API Protection</u>: AAP로 팀을 구성하고 운영하는 모범 사례를 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>Cloud Security</u>: Cloud Security로 팀을 구성하고 운영하는 모범 사례를 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Cloud SIEM으로 팀을 구성하고 운영하는 모범 사례를 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>Logs</u>: 첫 로그를 보내고 로그 처리를 사용하여 강화합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibility</u>: CI 제공업체와 통합을 설정하여 CI 파이프라인 데이터를 수집합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/feature_flags" >}}<u>Feature Flag</u>: 기본 제공되는 관측 가능성을 사용해 기능 제공을 관리하고 사용자 경험을 개인화합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_optimization" >}}<u>Test Optimization</u>: Datadog에서 테스트 서비스를 설정하여 CI 테스트 데이터를 수집합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_impact_analysis" >}}<u>Test Impact Analysis</u>: 코드 변경과 관련 있는 테스트만 실행하여 테스트 모음을 최적화하고 CI 비용을 절감하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/code_security" >}}<u>Code Security</u>: 개발부터 런타임까지 애플리케이션 내 퍼스트파티 코드 및 오픈소스 라이브러리를 분석합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 미리 보기 제품 또는 기능 사용해 보기 {#try-a-preview-product-or-feature}

Datadog 제품 팀에서는 고객에게 도움이 될 만한 새로운 기능을 자주 추가하고 있습니다. 이러한 몇몇 기능이 정식 출시되기 전에 사용해 보고 도움이 되는지 알아본 다음, Datadog에 개선할 방법에 관한 피드백을 주실 수 있습니다. 진행 중인 미리 보기의 전체 목록을 확인하고 자세한 정보를 알아보거나 참여자로 등록하려면 [Datadog 제품 미리 보기 프로그램][5]으로 이동하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/integrations/
[2]: /ko/integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/