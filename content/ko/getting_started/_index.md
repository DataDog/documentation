---
title: 시작하기
description: "Datadog 가시성 플랫폼 소개와 함께 설치, 구성 및 주요 기능 시작 가이드를 제공합니다."
disable_sidebar: true
aliases:
    - /overview
    - /getting_started/faq/
further_reading:
    - link: 'https://learn.datadoghq.com/'
      tag: 'Learning Center'
      text: 'Datadog 시작 과정 듣기'
    - link: 'https://datadoghq.com/blog/'
      tag: 'Blog'
      text: 'Datadog의 새로운 제품 및 기능, 통합 등에 관해 알아보기'
    - link: 'https://app.datadoghq.com/help/quick_start'
      tag: 'App'
      text: '빠른 시작 가이드 둘러보기'
cascade:
    algolia:
        rank: 50
        category: Getting Started
---

## Datadog이란 무엇인가요?

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
        <li><a href="/security/code_security/">Code Security</a>를 사용해 텍스트 편집기나 GitHub에서 코드 취약성을 강조 표시합니다.</li>
        <li><a href="/coscreen/">CoScreen</a>을 사용하여 원격 페어 프로그래밍 세션을 쉽게 진행할 수 있습니다.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>테스트</strong></p></td>
        <td>
            <ul>
                <li><a href="/pr_gates/">PR Gate</a>를 사용해 오류가 있는 코드가 프로덕션에 배포되는 것을 차단합니다.</li>
                <li><a href="/synthetics/">Synthetic Monitoring</a>을 사용해 전 세계 사용자를 시뮬레이션하여 웹 앱, API 또는 모바일 애플리케이션을 테스트합니다.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>모니터링</strong></p></td>
        <td>
            <ul>
                <li><a href="/logs/">로그</a>, <a href="/metrics/">메트릭</a>, <a href="/events/">이벤트</a> 및 <a href="/tracing/glossary/#trace">네트워크 트레이스</a>를 수집하고 처리, 집계 및 <a href="/monitors/">경보</a>를 세밀하게 제어합니다.</li>
                <li><a href="/profiler/">Continuous Profiler</a>를 사용해 호스트 성능을 평가합니다.</li>
                <li><a href="/tracing/">Application Performance Monitoring</a>을 사용해 애플리케이션 성능을 평가합니다.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>문제 해결</strong></p></td>
        <td>
            <ul>
                <li><a href="/error_tracking/">오류</a>와 <a href="/incident_response/incident_management/">인시던트</a>를 관리하고 문제를 요약하며 해결 방법을 제안합니다.</li>
                <li><a href="/real_user_monitoring/">Real User Monitoring</a>을 사용해 사용자 이탈률을 측정하고 사용자 불만을 탐지합니다.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>보안</strong></p></td>
        <td>
            <ul>
                <li><a href="/security/">Datadog Security</a>로 위협과 공격을 탐지합니다.</li>
            </ul>
        </td>
    </tr>
</table>

또한 수백 가지 [통합][1]을 통해 이미 사용 중인 기술에 Datadog 기능을 연동할 수 있습니다. 예를 들어 [AWS 통합][2]은 90여 가지 AWS 서비스에서 로그, 이벤트, 메트릭을 수집합니다.

## 자세히 알아보기

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}}
  이 기초 인에이블먼트 세션을 수강하면 “Datadog은 무엇이며 어떤 기능을 제공하는가?”라는 핵심 질문에 답할 수 있습니다. Datadog으로 데이터를 보내는 방법은 물론 사용자의 다양한 환경, 애플리케이션, 인프라의 상태를 더 잘 이해하려면 어떤 페이지를 방문해야 하는지도 배우게 됩니다.
{{< /learning-center-callout >}}

### 과정 듣기
Datadog 학습 센터에서 Datadog 플랫폼 실습 경험을 제공합니다. [시작 과정][3]에서는 가시성 사례, 주요 Datadog 개념 등을 다룹니다.

Datadog을 탐색하는 방법을 가장 빨리 알아보려면 [빠른 시작 과정][4]을 들어보세요.

### 제품 분야 심층 탐구
{{< whatsnext desc="Get started with one of the guides below:">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: Datadog UI 사용법 알아보기: 대시보드, 인프라 목록, 지도 등.{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Datadog 사이트</u>: 지역 및 보안 요구 사항에 따라 적절한 Datadog 사이트를 선택하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>DevSecOps 번들</u>: Infrastructure DevSecOps 번들을 시작하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: 호스트에서 Datadog으로 메트릭과 이벤트를 보냅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Datadog HTTP API를 시작하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>통합</u>: Datadog 통합을 사용해 메트릭, 트레이스, 로그를 수집하는 방법을 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/search" >}}<u>검색</u>: 여러 Datadog 제품에서 검색하고 필터링하는 방법의 기초를 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>태그</u>: 메트릭, 로그, 트레이스를 태그해 보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: OpenTelemetry 메트릭, 트레이스, 로그를 Datadog에 보내는 방법을 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>학습 센터</u>: 학습 경로를 따라가거나, 자체 주도형 수업이나 랩을 수강하고, Datadog 인증 프로그램을 둘러보세요.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Platform Services:">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>대시보드</u>: 나에게 중요한 업무 관련 질문에 답하는 대시보드를 만들고, 공유하고, 유지 관리합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>Incident Management</u>: 시스템의 문제에 관해 소통하고 문제를 추적합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>모니터링</u>: 중요한 변경 사항이 발생하면 팀원들이 알 수 있도록 경보와 알림을 설정합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/notebooks" >}}<u>노트북</u>: 실시간 그래프, 메트릭, 로그, 모니터를 결합해 문제를 격리하고 인터랙티브 가이드를 만듭니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>Workflow Automation</u>: 경보와 보안 시그널에 대응하여 전체적인 프로세스를 자동화합니다.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Product:">}}
{{< nextlink href="/getting_started/containers" >}}<u>컨테이너</u>: Agent Autodiscovery와 Datadog 연산자의 사용 방법을 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>AWS Lambda용 서버리스</u>: 서버리스 인프라에서 메트릭, 로그, 트레이스를 수집하는 방법을 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/internal_developer_portal" >}}<u>Internal Developer Portal</u>: 원격 측정, 메타데이터, 워크플로를 통합해 전달 속도를 높이세요. {{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>추적</u>: Agent를 설정해 소규모 애플리케이션을 추적하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>프로파일러</u>: Continuous Profiler를 사용해 코드의 성능 문제를 찾아 해결합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>Database Monitoring</u>: 데이터베이스의 상태와 성능을 보고, 문제가 발생하면 신속하게 해결합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>Synthetic Monitoring</u>: Synthetic 테스트를 사용해 API 엔드포인트와 주요 비즈니스 여정을 테스트하고 모니터링하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>Continuous Testing</u>: CI 파이프라인 및 IDE에서 엔드투엔드 Synthetic 테스트를 실행합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>Session Replay</u>: Session Replay를 사용해 사용자가 제품과 어떻게 상호작용하는지 심층적으로 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>앱 및 API 보호</u>: AAP로 팀을 구성하고 운영하기 위한 모범 사례를 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>Cloud Security</u>: Cloud Security로 팀을 구성하고 운영하기 위한 모범 사례를 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Cloud SIEM으로 팀을 구성하고 운영하기 위한 모범 사례를 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>로그</u>: 첫 로그를 보내고, 로그 처리를 사용해 보강하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibility</u>: CI 제공자와의 통합을 설정해 CI 파이프라인 데이터를 수집하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/feature_flags" >}}<u>기능 플래그</u>: 기본 제공되는 가시성을 사용해 기능 제공을 관리하고 사용자 경험을 개인화하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_optimization" >}}<u>Test Optimization</u>: Datadog에 테스트 서비스를 설정해 CI 테스트 데이터를 수집하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_impact_analysis" >}}<u>테스트 영향 분석</u>: 코드 변경 사항과 관련 있는 테스트만 실행하여 테스트 모음을 최적화하고 CI 비용을 절감하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/code_security" >}}<u>Code Security</u>: 개발부터 런타임까지 애플리케이션의 퍼스트파티 코드와 오픈소스 라이브러리를 분석하세요.{{< /nextlink >}}
{{< /whatsnext >}}

## 미리 보기 제품 또는 기능 사용해 보기

Datadog 제품 팀에서는 고객에게 도움이 될 만한 새로운 기능을 자주 추가하고 있습니다. 이러한 몇몇 기능이 정식 출시되기 전에 사용해 보고 도움이 되는지 알아본 다음, Datadog에 개선할 방법에 관한 피드백을 주실 수 있습니다. 진행 중인 미리 보기의 전체 목록을 확인하고 자세한 정보를 알아보거나 참여자로 등록하려면 [Datadog 제품 미리 보기 프로그램][5]으로 이동하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/
[2]: /integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/
