---
aliases:
- /ko/overview
- /ko/getting_started/faq/
cascade:
  algolia:
    category: 시작하기
    rank: 50
disable_sidebar: true
further_reading:
- link: https://learn.datadoghq.com/
  tag: 학습 센터
  text: Datadog 시작을 위한 코스 수강하기
- link: https://datadoghq.com/blog/
  tag: 블로그
  text: 새로운 Datadog 제품 및 기능, 통합 등에 대해 알아보기
kind: 설명서
title: 시작하기
---

## Datadog이란 무엇인가요?

Datadog은 모든 스택에서 소프트웨어 개발의 전 단계를 지원하는 가관측성 플랫폼입니다. 본 플랫폼은 소프트웨어를 빌드, 테스트, 모니터링, 디버그, 최적화, 보안 유지를 도와드리는 여러 제품으로 구성되어 있습니다. 해당 제품을 개별적으로 사용하거나 맞춤형 솔루션으로 조합하여 사용할 수 있습니다.

다음 테이블에서 Datadog 제품의 몇 가지 예를 살펴보세요.

<table>
    <thead>
        <th>카테고리</th>
        <th>제품 예시</th>
    </thead>
    <tr>
        <td><p><strong>개발</strong></p></td>
        <td>
        <ul>
        <li><a href="/coscreen/">CoScreen</a>으로 원격 페어 프로그래밍 세션을 원활하게 진행합니다.</li>
        <li>코드 분석</a>으로 텍스트 편집기 또는 GitHub에서 코드 취약점을 강조 표시합니다.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>테스트</strong></p></td>
        <td>
            <ul>
                <li><a href="/quality_gates/">퀄리티 게이트</a>로 결함이 있는 코드가 프로덕션에 배포되지 않도록 차단합니다.</li>
                <li><a href="/synthetics/">신서틱 모니터링</a>으로 전 세계 사용자를 시뮬레이션하여 웹 앱, API, 또는 모바일 애플리케이션을 테스트합니다.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>모니터링</strong></p></td>
        <td>
            <ul>
                <li><a href="/logs/">로그</a> 수집, <a href="/metrics/">메트릭</a>, <a href="/events/">이벤트</a>, <a href="/tracing/glossary/#trace">네트워크 트레이스</a>를 정밀하게 제어하여 처리, 집계, <a href="/monitors/">경고</a>합니다.</li>
                <li><a href="/profiler/">연속 프로파일러</a>로 호스트 성능을 평가합니다.</li>
                <li><a href="/tracing/">애플리케이션 성능 모니터링</a>으로 애플리케이션 성능을 평가합니다.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>트러블슈팅</strong></p></td>
        <td>
            <ul>
                <li><a href="/error_tracking/">오류</a> 및 <a href="/service_management/incident_management/">인시던트</a>를 관리하여 문제를 요약하고 수정 사항을 제안합니다.</li>
                <li><a href="/real_user_monitoring/">실사용자 모니터링으로 사용자 이탈을 측정하고 불만을 감지합니다</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>보안</strong></p></td>
        <td>
            <ul>
                <li><a href="/security/">Datadog 보안</a>으로 위협 및 공격을 감지합니다.</li>
            </ul>
        </td>
    </tr>
</table>

아울러, 수백 개의 [통합][1]으로 이미 사용 중인 기술 위에 Datadog 기능을 레이어링할 수 있습니다. 예를 들어, [AWS 통합][2]은 90개 이상의 AWS 서비스에서 로그, 이벤트, 메트릭을 수집합니다.

## 자세히 알아보기

### 코스 수강하기
Datadog 학습 센터에서는 Datadog 플랫폼에 대한 실습 경험을 제공해 드립니다. [시작 코스][3]에서는 가관측성 사례, 주요 Datadog 개념 등을 다룹니다.

Datadog 를 가장 빠르게 탐색하는 방법을 알아보려면 [빠른 시작 코스][4]를 참조하세요.

### 제품 부문에 대해 자세히 알아보기
{{< whatsnext desc="하단의 지침 중 하나부터 시작해 보세요:">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: 대시보드, 인프라스트럭처 목록 , 지도 등, Datadog UI 사용법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Datadog 사이트</u>: 지역 및 보안 요구 사항에 적합한 Datadog 사이트를 선택합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}DevSecOps<u>번들</u>: 애플리케이션 성능 모니터링(APM) DevSecOps 및 인프라스트럭처 DevSecOps 번들로 시작해 보세요.{{< /nextlink >}}
<u>{{< nextlink href="/getting_started/agent" >}}에이전트</u>: 호스트에서 Datadog으로 메트릭 및 이벤트를 전송합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Datadog HTTP API입니다.{{< /nextlink >}}
<u>{{< nextlink href="/getting_started/integrations" >}}통합</u>: Datadog 통합으로 메트릭, 트레이스, 로그 수집 방법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>태그</u>: 메트릭, 로그, 트레이스를 태깅해 보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: OpenTelemetry 메트릭 , 트레이스, 로그를 Datadog으로 전송하는 방법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>학습 센터</u>: 학습 경로를 따라 셀프 학습 코스 또는 실습을 수강하고 Datadog 인증 프로그램을 알아봅니다.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="플랫폼 서비스:">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>대시보드</u>: 중요한 업무 관련 질문에 답하는 대시보드를 생성, 공유, 관리합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>모니터링</u>: 경고 및 알림을 설정하여 중요한 변경 사항이 발생하면 팀이 알 수 있도록 합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>인시던트 관리</u>: 시스템의 문제를 커뮤니케이션 및 추적합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>워크플로우 자동화</u>: 경고 및 보안 시그널에 대한 응답 엔드 투 엔드 프로세스를 자동화합니다.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="제품:">}}
{{< nextlink href="/getting_started/containers" >}}<u>컨테이너</u>: 에이전트 자동탐지 및 Datadog 연산자 사용 방법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>AWS Lambda 서버리스</u>: 서버리스 인프라스트럭처에서 메트릭, 로그, 트레이스를 수집하는 방법을 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/service_catalog" >}}<u>서비스 카탈로그</u>: 서비스 카탈로그에서 규모에 따른 서비스 소유권, 안정성 및 성능을 관리합니다. {{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>트레이싱</u>: 에이전트를 설정하여 소규모 애플리케이션을 추적합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>프로파일러</u>: 연속 프로파일러로 코드에서 성능 문제를 찾아서 수정합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>데이터베이스 모니터링</u>: 데이터베이스의 상태 및 성능을 확인하고 발생한 문제를 신속하게 해결합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>신서틱 모니터링</u>: 테스트를 시작하고 API 엔드포인트와 주요 비즈니스 경로를 신서틱(Synthetic) 테스트로 모니터링합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>세션 리플레이</u>:세션 리플레이로 사용자가 제품과 상호 작용하는 방식을 심층적으로 살펴봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>연속 테스트</u>: CI 파이프라인과 IDE에서 엔드 투 엔드 신서틱(Synthetic) 테스트를 실행합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>애플리케이션 보안 관리</u>: ASM를 사용한 팀업 및 실행 모범 사례를 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>클라우드 보안 관리</u>: CSM을 사용한 팀업 및 실행 모범 사례를 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>클라우드 SIEM</u>: 클라우드 SIEM를 사용한 팀업 및 실행 모범 사례를 알아봅니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>CI 가시성</u>: CI 제공업체와 통합을 설정하여 CI 파이프라인 데이터를 수집합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>로그</u>: 첫 로그를 전송하고 해당 로그를 처리하여 보강합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_visibility" >}}<u>테스트 가시성</u>: Datadog에서 테스트 서비스를 설정하여 CI 테스트 데이터를 수집합니다.{{< /nextlink >}}
{{< nextlink href="/getting_started/intelligent_test_runner" >}}<u>지능형 테스트 러너</u>: 테스트 스위트를 최적화하고 코드 변경 관련 테스트만 실행하여 CI 비용을 절감합니다{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/integrations/
[2]: /ko/integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart