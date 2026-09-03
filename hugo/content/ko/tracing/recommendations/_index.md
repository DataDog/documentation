---
algolia:
  tags:
  - apm recommendations
  - apm recommendation
  - application performance monitoring
  - performance recommendations
  - reliability recommendations
  - tracing
description: APM Recommendations로 애플리케이션 성능과 안정성을 최적화하는 방법 알아보기.
further_reading:
- link: /tracing/
  tag: 설명서
  text: Application Performance Monitoring(APM)이란?
- link: /tracing/guide/apm_dashboard/
  tag: 설명서
  text: APM 대시보드 가이드
- link: /cloud_cost_management/recommendations/
  tag: 설명서
  text: Cloud Cost Recommendations
- link: /database_monitoring/recommendations/
  tag: 설명서
  text: DBM Recommendations
- link: https://www.datadoghq.com/blog/proactive-app-recommendations/
  tag: 블로그
  text: Proactive App Recommendations를 활용해 성능 및 안정성 개선
- link: https://www.datadoghq.com/blog/apm-recommendations
  tag: 블로그
  text: APM Recommendations를 활용해 성능 및 안정성 개선
multifiltersearch:
  data:
  - category: Performance
    recommendation_description: 백엔드 애플리케이션은 쿼리를 일괄 처리하는 대신 동일한 데이터베이스를 순차적으로 호출합니다.
    recommendation_prerequisite: APM
    recommendation_type: N+1 Queries on Database
    scope: Backend services
  - category: Performance
    recommendation_description: 백엔드 애플리케이션이 다운스트림 API를 병렬 실행하지 않고 순차적으로 여러 번 호출하여
      불필요하게 요청 레이턴시를 증가시키고 전체 서비스 성능을 저하시킵니다.
    recommendation_prerequisite: APM
    recommendation_type: Repeated Sequential API calls
    scope: Backend services
  - category: Performance
    recommendation_description: 백엔드 애플리케이션이 다운스트림 API를 호출할 때 과도한 횟수의 재시도를 수행하여 요청
      시간을 연장하고, 부하 발생 시 연쇄 장애를 일으킬 위험이 있습니다.
    recommendation_prerequisite: APM
    recommendation_type: Persistent Retries
    scope: Backend services
  - category: Performance
    recommendation_description: 쿼리의 실행 계획이 비용이 많이 드는 순차 스캔을 수행합니다. 감지 시 Datadog은 인덱스를
      사용하여 쿼리 속도를 높일 것을 권장합니다.
    recommendation_prerequisite: APM + DBM
    recommendation_type: Missing index
    scope: Databases
  - category: Performance
    recommendation_description: 서비스가 복제본을 사용할 수 있음에도 불구하고 기본 데이터베이스 인스턴스에 읽기 전용 쿼리를
      수행하고 있습니다. 이러한 쿼리를 복제본으로 라우팅하면 기본 데이터베이스의 부하를 줄이고 성능을 개선할 수 있습니다.
    recommendation_prerequisite: APM + DBM
    recommendation_type: Unbalanced Read Load
    scope: Databases
  - category: Reliability
    recommendation_description: 백엔드 애플리케이션이 적절한 백오프 없이 빠른 재시도를 트리거하여, 어려움을 겪는 종속성에
      높은 압박을 가하고 일시적인 장애 발생 시 시스템 복구를 방해하여 장기적인 중단을 초래할 위험이 있습니다.
    recommendation_prerequisite: APM
    recommendation_type: Aggressive Retries
    scope: Backend services
  - category: Reliability
    recommendation_description: 백엔드 애플리케이션이 제어 흐름 관리 목적으로 많은 예외를 발생시켜 CPU 및 메모리 오버헤드를
      추가하고 있습니다.
    recommendation_prerequisite: APM + Continuous Profiler
    recommendation_type: High Exception Volumes
    scope: Backend services
  - category: Reliability
    recommendation_description: 백엔드 애플리케이션이 다운스트림 종속성을 호출하는 동안 타임아웃이 발생합니다. 이는 종속성의
      응답 속도가 너무 느려 요청 실패를 유발하고, 최종 사용자에게 영향을 미치며 업스트림으로 연쇄 장애가 발생할 위험을 높이기 때문입니다.
    recommendation_prerequisite: APM + RUM
    recommendation_type: Dependency Timeouts
    scope: Backend services
  - category: Performance
    recommendation_description: 서비스가 요청 경로에서 비용이 많이 드는 반복 작업을 수행하고 있습니다. 이를 단기 캐시에서
      처리하면 테일링 지연 시간과 다운스트림 부하를 줄일 수 있습니다.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Missing Cache
    scope: Backend services
  - category: Performance
    recommendation_description: 서비스가 임계 경로상의 느린 다운스트림 스팬으로 인해 과도한 테일링 지연 시간을 보이고 있습니다.
      이는 주로 제한 없는 종속성 레이턴시나 병렬로 실행할 수 있는 순차적 호출 때문입니다.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Tail Latency
    scope: Backend services
  - category: Performance
    recommendation_description: 서비스가 CPU 집약적인 직렬화 또는 구문 분석 작업에 요청 시간의 상당 부분을 소비하여
      불필요한 지연 시간과 CPU 오버헤드를 추가하고 있습니다.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Excessive Serialization
    scope: Backend services
  - category: Performance
    recommendation_description: 서비스가 크기나 범위 제한 없이 요청 매개변수를 허용하여 과도하게 큰 입력값이 비용이 많이
      드는 다운스트림 작업, 테일링 지연 시간 및 타임아웃을 유발하도록 방치하고 있습니다.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Unbounded Payload
    scope: Backend services
  - category: Performance
    recommendation_description: 요청 처리가 동기화 기본 요소나 장시간 실행되는 임계 영역 뒤에서 직렬화되어 동시성 환경에서
      테일링 지연 시간을 유발합니다.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Resource Contention
    scope: Backend services
  - category: Reliability
    recommendation_description: 서비스가 다운스트림 종속성에 대한 연결 풀을 반복적으로 소진하여 요청을 대기시키고, 부하
      발생 시 지연 시간 급증이나 실패를 유발합니다.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Connection Pool Exhaustion
    scope: Backend services
  - category: Reliability
    recommendation_description: 서비스가 예상된 결과를 APM에서 오류로 표시하여 엔드포인트 오류율을 부풀리고 실제 안정성
      저하를 가리고 있습니다.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Error Misclassification
    scope: Backend services
  headers:
  - filter_by: true
    id: category
    name: 권장 카테고리
  - filter_by: true
    id: recommendation_type
    name: 권장 유형
  - filter_by: true
    id: scope
    name: 권장 범위
  - id: recommendation_description
    name: 권장 내용
  - filter_by: true
    id: recommendation_prerequisite
    name: 사전 조건
site_support_id: apm_recommendations
title: APM Recommendations
---
APM Recommendations는 수집된 텔레메트리에서 최적화 기회를 찾아 애플리케이션의 성능과 안정성을 개선하는 데 도움을 줍니다. 이 권장 사항의 목적은 다음과 같습니다.

- 성능 병목 현상 식별 및 해결
- 서비스 안정성과 가동 시간 향상
- 최종 사용자 경험 향상

{{< img src="/tracing/recommendations/apm_recommendations-3.png" alt="안정성 및 성능 문제에 대한 요약 카드와 검토할 권장 사항 목록이 포함된 APM Recommendations 페이지" style="width:100%;" >}}

{{< callout url="https://www.datadoghq.com/product-preview/apm-ai-recommendations/" header="AI 권장 사항 미리 보기를 사용해 보세요!" >}}
이제 AI 기반 권장 사항 유형을 사용할 수 있으며, Datadog이 감지할 수 있는 [최적화 기회](?recommendation_prerequisite=APM+%2B+AI+Recs+%28Preview%29#supported-recommendations) 세트가 확장되었습니다.
{{< /callout >}}

## 전제 조건 {#prerequisites}

특정 권장 사항은 특정 Datadog 제품에 의존합니다. {{< ui >}}Recommendation Prerequisite{{< /ui >}} 드롭다운을 사용하여 설정에 있는 Datadog 제품별로 권장 사항을 필터링합니다.

[Bits Code][3]를 사용하여 권장 사항을 구현하려는 경우 [설정을 완료][4]해야 합니다.

## 작동 방식 {#how-it-works}

Recommendations는 스택의 다양한 부분에서 수집된 데이터를 기반으로 합니다.

- Application Performance Monitoring(APM)의 분산 트레이스
- Database Monitoring(DBM)의 데이터베이스 텔레메트리
- Real User Monitoring(RUM) 세션 및 사용자 여정

Datadog은 이러한 소스를 상호 연결하여 성능, 안정성 및 사용자 경험을 개선할 기회를 식별합니다.

Datadog은 텔레메트리 신호(예: 상대적 요청 볼륨 및 성능 추세)를 바탕으로 문제의 잠재적 영향을 평가하여 우선순위 점수를 산출함으로써 권장 사항의 순위를 매깁니다. 서비스 안정성과 성능을 개선하기 위한 가장 중요한 인사이트가 먼저 표시됩니다.

## 권장 사항 사용 {#using-recommendations}

권장 사항을 확인하려면 다음 단계를 따르세요.

1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Recommendations{{< /ui >}}][1]로 이동합니다.
2. 상태 또는 유형별로 권장 사항을 필터링합니다.
3. 목록에서 권장 사항을 선택하여 문제에 대한 자세한 설명을 확인합니다.
4. 문제, 영향, Datadog의 권장 사항을 검토합니다.
5. (선택 사항) [Bits Code][3]를 사용하여 코드 수정을 생성하려면 {{< ui >}}Next Steps{{< /ui >}}에서 {{< ui >}}Fix with Bits{{< /ui >}}를 클릭합니다.
6. (선택 사항) Jira 또는 Work Management에서 수정을 추적하려면 {{< ui >}}Triage{{< /ui >}}에서 {{< ui >}}Add Jira Ticket{{< /ui >}} 또는 {{< ui >}}Add Work Item{{< /ui >}}을 클릭합니다.

권장 사항을 검토한 후 {{< ui >}}FOR REVIEW{{< /ui >}} 드롭다운을 사용하여 권장 사항 상태를 {{< ui >}}REVIEWED{{< /ui >}}, {{< ui >}}IGNORED{{< /ui >}} 또는 {{< ui >}}RESOLVED{{< /ui >}}로 변경할 수 있습니다.

**참고**: [APM 홈 페이지][5]에서 {{< ui >}}Watchdog{{< /ui >}} 및 {{< ui >}}Error Tracking{{< /ui >}} 섹션도 선택한 서비스 필터(필터가 설정되지 않은 경우, 맞춤형 서비스)를 따르며, 이는 권장 사항이 범위가 지정되는 방식과 일치합니다. 서비스가 선택되었으나 일치하는 경고나 문제가 없는 경우, 해당 섹션은 {{< ui >}}Clear filter{{< /ui >}} 버튼과 함께 빈 상태를 표시하며, Error Tracking {{< ui >}}View all{{< /ui >}} 링크는 해당 서비스로 미리 필터링됩니다.

## 대시보드에서 권장 사항 보기 {#viewing-recommendations-on-a-dashboard}

APM Recommendations를 데이터 소스로 사용하는 목록 위젯을 추가하여 팀의 성능 메트릭과 함께 권장 사항을 검토하세요.

{{< img src="tracing/recommendations/apm_recommendations_dashboard_widget.png" alt="APM Recommendations를 데이터 소스로 구성하고 우선순위, 서비스, 서비스 요약, 문제 및 상태별로 권장 사항을 표시하는 목록 위젯" style="width:100%;" >}}

1. 대시보드에서 위젯을 만들고 시각화로 {{< ui >}}List{{< /ui >}}를 선택합니다.
2. 데이터 소스로 {{< ui >}}APM Recommendations{{< /ui >}}를 선택합니다.
3. 환경, 서비스, 팀, 권장 사항 유형 및 상태별로 필터링합니다.

## 지원되는 권장 사항 {#supported-recommendations}

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}}

**참고**: APM과 Database Monitoring(DBM)을 모두 사용하는 경우, [DBM 권장 사항 페이지][2]보다 여기에서 더 적은 누락된 인덱스 권장 사항이 표시될 수 있습니다. APM Recommendations는 Datadog이 계측된 애플리케이션 서비스와 연결할 수 있는 누락된 인덱스 문제만 표시합니다. 특정 서비스에 연결할 수 없는 누락된 인덱스 권장 사항은 DBM에만 나타납니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
[2]: /ko/database_monitoring/recommendations/
[3]: /ko/bits_ai/bits_code/
[4]: /ko/bits_ai/bits_code/setup/
[5]: https://app.datadoghq.com/apm/home