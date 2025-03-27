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
  text: Datadog 시작 코스 수강하기
- link: https://datadoghq.com/blog/
  tag: 블로그
  text: Datadog 제품, 기능, 통합 등에 관해 더 알아보기
- link: https://app.datadoghq.com/help/quick_start
  tag: 앱
  text: 빠른 시작 가이드 탐색하기
title: 시작하기
---

## Datadog란 무엇인가요?

Datadog는 모든 스택에서 소프트웨어 개발 단계를 관찰할 수 있는 플랫폼입니다. Datadog 플랫폼은 소프트웨어 빌드, 테스트, 모니터링, 디버그, 최적화, 보안을 지원하는 제품으로 구성되어 있습니다. 이 제품을 별도로 사용하거나 맞춤형으로 조합해 사용할 수 있습니다.

다음은 Datadog 제품 예시를 보여주는 표입니다.

<table>
    <thead>
        <th>카테고리</th>
        <th>제품 예시</th>
    </thead>
    <tr>
        <td><p><strong>개발</strong></p></td>
        <td>
        <ul>
        <li> <a href="/security/code_security/">코드 보안</a>으로 텍스트 편집기나 GitHub의 코드 취약성을 강조 표시.</li>
        <li><a href="/coscreen/">CoScreen</a>으로 원격 페어 프로그래밍 세션을 가능하게 함.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>테스팅</strong></p></td>
        <td>
            <ul>
                <li><a href="/quality_gates/">Quality Gates</a>로 결함이 있는 코드가 프로덕션으로 배포되는 것을 차단</li>
                <li><a href="/synthetics/">신서틱 모니터링</a>으로 전 세계 사용자로 시뮬레이션하여 웹 앱, API, 또는 모바일 애플리케이션 테스트</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>모니터링</strong></p></td>
        <td>
            <ul>
                <li><a href="/logs/">로그</a>, <a href="/metrics/">메트릭</a>, <a href="/events/">이벤트</a>, <a href="/tracing/glossary/#trace">네트워크 트레이스</a>를 수집할 때 처리, 집계, <a href="/monitors/">알림</a>을 세부적으로 통제</li>
                <li><a href="/profiler/">연속적 프로파일러</a>로 호스트 성능 평가</li>
                <li><a href="/tracing/">애플리케이션 성능 모니터링</a>으로 애플리케이션 성능 평가</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>트러블슈팅</strong></p></td>
        <td>
            <ul>
                <li>오류를 요약하고 수정을 제안하여 <a href="/error_tracking/">오류</a> 및 <a href="/service_management/incident_management/">인시던트</a> 관리</li>
                <li><a href="/real_user_monitoring/">실시간 사용자 모니터링</a>으로 사용자 이탈률과 사용자 불만을 측정</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>보안</strong></p></td>
        <td>
            <ul>
                <li><a href="/security/">Datadog 보안</a>으로 위협과 공격 감지</li>
            </ul>
        </td>
    </tr>
</table>

또한 사용할 수 있는 [통합][1]이 수백 개가 되기 때문에 이미 사용 중인 기술에 Datadog를 적용할 수 있습니다. 에를 들어 [AWS 통합][2]의 경우 90개가 넘는 AWS 서비스에서 로그, 이벤트, 메트릭을 수집합니다.

## 자세히 알아보기

{{< learning-center-callout header="활성화 웨비나 세션 참여하기" hide_image="true" btn_title="신청하기" btn_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}}
  이 기초 활성화 세션에 참여하면 "Datadog란 무엇이고 어떤 일을 할 수 있나요?"와 같은 핵심 질문에 답을 얻을 수 있습니다. Datadog에 데이터를 보내는 방법과 다양한 환경, 애플리케이션, 인프라스트럭처의 상태를 알아보려면 어떤 페이지를 방문해야 하는지 알아봅니다.
{{< /learning-center-callout >}}

### 코스 듣기
Datadog 학습 센터에서 Datadog 플랫폼 사용 실습을 할 수 있습니다. [코스 시작하기][3]에서는 관측 실습을 해보고 핵심 Datadog 개념 등을 배웁니다.

Datadog 탐색 방법을 빠르게 배울 좋은 방법은 [빠르게 시작하기 코스][4]를 듣는 것입니다.

### 제품 분야 자세히 배우기
{{< whatsnext desc="아래 가이드로 시작해 보세요.">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: 대시보드, 인프라스트럭처 목록, 맵 등 Datadog UI 사용 방법 배우기{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Datadog Site</u>: 내 리전에 맞는 Datadog 사이트와 보안 요구 사항을 선택하기{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>DevSecOps 번들</u>: APM DevSecOps와 Infrastructure DevSecOps 번들 시작하기{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: 내 호스트에서 Datadog로 메트릭과 이벤트 보내기{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Datadog HTTP API 시작하기{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>통합</u>: Datadog 통합으로 메트릭, 트레이스, 로그 수집 방법 알아보기{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>태그</u>: 메트릭, 로그, 트레이스 태깅 시작하기{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: Datadog로 OpenTelemetry 메트릭, 트레이스, 로그 전송 방법 배우기{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>학습 센터</u>: 학습 경로에 따라 자기 학습형 수업이나 랩을 듣고 Datadog 인증 프로그램 알아보기{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="플랫폼 서비스">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>대시보드</u>: 나에게 중요한 작업 관련 정보가 있는 대시보드를 생성하고, 공유하고, 저장하기{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>모니터</u>: 중요한 변경 사항이 있을 때 팀에서 알 수 있도록 알림과 공지사항을 설정하기{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>인시던트 관리</u>: 시스템 내 문제에 관해 소통하고 문제를 추적하기{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>워크플로우 자동화</u>: 알림 및 보안 신호에 대응하는 엔드 투 엔드 과정을 자동화하기{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="제품">}}
{{< nextlink href="/getting_started/containers" >}}<u>컨테이너</u>: 에이전트 자동 탐지와 Datadog 연산자 사용 방법 알아보기{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>AWS Lambda용 서버리스</u>: 서버리스 인프라스트럭처에서 메트릭, 로그, 트레이스를 수집하는 방법 알아보기{{< /nextlink >}}
{{< nextlink href="/getting_started/software_catalog" >}}<u>Software Catalog</u>: Software Catalog에서 대규모 서비스 소유권, 신뢰성, 성능 관리하기{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>추적</u>: 소규모 애플리케이션을 추적하도록 에이전트 설정하기{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>프로파일러</u>: 연속적 프로파일러를 사용해 코드의 성능 문제를 찾고 수정하기{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>데이터베이스 모니터링</u>: 데이터베이스의 상태와 성능을 확인하고 발생한 오류를 빠르게 트러블슈팅하기{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>신서틱 모니터링</u>: 신서틱 모니터링으로 내 API 엔드포인트와 핵심 비즈니스 여정 테스트 및 모니터링하기{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>연속적 테스팅</u>: CI 파이프라인과 IDE에서 엔드 투 엔드 신서틱 테스트 실행하기{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>세션 재생</u>: 세션 재생으로 사용자가 제품과 어떻게 상호 작용하는지 심도 있게 관찰하기{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>애플리케이션 보안 관리</u>: 팀에서 ASM 사용하기 전에 모범 사례 알아보기{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>클라우드 보안 관리</u>: 팀에서 CSM 사용하기 전에 모범 사례 알아보기{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: 팀에서 Cloud SIEM 사용하기 전에 모범 사례 알아보기{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>로그</u>: 첫 로그를 전송하고 로그 처리를 사용해 로그 보강하기{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>CI 가시성</u>: CI 공급자 통합을 설정해 CI 파이프라인 데이터 수집하기{{< /nextlink >}}
{{< nextlink href="/getting_started/test_optimization" >}}<u>테스트 최적화</u>: Datadog에 테스트 서비스를 설정해 CI 테스트 데이터 수집하기{{< /nextlink >}}
{{< nextlink href="/getting_started/test_impact_analysis" >}}<u>테스트 영향 분석</u>: 코드 변경과 관련된 테스트만 실행해 스위트를 최적화하고 CI 비용 줄이기{{< /nextlink >}}
{{< nextlink href="/getting_started/code_security" >}}<u>코드 보안</u>: 개발에서 런타임까지 애플리케이션에서 자사 코드와 오픈 소스 라이브러리 분석하기{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/integrations/
[2]: /ko/integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart