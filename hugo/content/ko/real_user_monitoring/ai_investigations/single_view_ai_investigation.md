---
description: 단일 RUM 뷰에서 에이전트 기반 조사를 실행하여 사용자 경험 저하의 근본 원인을 파악합니다.
further_reading:
- link: /real_user_monitoring/ai_investigations/
  tag: 설명서
  text: AI 조사 개요
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM Explorer
- link: /real_user_monitoring/explorer/events/
  tag: 설명서
  text: 이벤트 사이드 패널 보기
title: 단일 뷰 AI 조사
---
## 개요 {#overview}

단일 뷰 AI 조사는 단일 RUM 뷰에 대한 에이전트 기반 근본 원인 분석을 수행합니다. 예를 들어 페이지나 화면이 느리게 로드되거나 오류가 발생하는 등 성능이 저조한 세션을 발견할 경우, **Investigate with AI**를 클릭하세요. Datadog의 RUM 에이전트는 해당 뷰에 연결된 모든 데이터를 검사합니다. 이러한 데이터의 예로 오류, 느린 네트워크 요청, 메인 스레드 차단, 백엔드 트레이스, CPU 프로파일 및 기기 컨텍스트 등이 있습니다.

API 호출 지연, 클라이언트 측의 과도한 연산 또는 CDN 문제의 원인을 파악하기 위해 RUM 이벤트를 수동으로 살펴보는 대신 앱 성능, 서버 측, 제3자, 환경과 같은 근본 원인 범주별로 그룹화된 우선순위 기반 분석 결과를 확인할 수 있습니다. 이후 채팅 인터페이스를 통해 추가로 조사하거나, 결과를 [노트북][1]에 저장하여 팀과 공유할 수 있습니다.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="RUM 뷰에 대해 범주화된 분석 결과를 표시하는 단일 뷰 AI 조사 패널." style="width:100%;" >}}

## 조사 시작 {#launch-an-investigation}

1. RUM 뷰 사이드 패널을 엽니다.
2. **Investigate with AI** 버튼을 클릭하세요.

   **참고**: 뷰가 종료된 후 이 버튼이 표시되기까지 최대 15분이 소요될 수 있습니다.

조사가 시작되면 분석 결과가 준비되는 즉시 사이드 패널에 순차적으로 표시됩니다. 따라서 전체 분석이 완료되기 전에 먼저 생성된 분석 결과부터 확인할 수 있습니다.

## 에이전트가 조사하는 내용 {#what-the-agent-investigates}

뷰를 조사하기 위해 Datadog의 RUM 에이전트는 해당 뷰에 대해 Datadog이 수집한 데이터를 검사하고, 사용 가능한 경우 연관된 텔레메트리도 활용합니다.

- **뷰 이벤트** 및 그 하위 이벤트: [리소스][2], [긴 작업][3], [오류][4], 및 [사용자 작업][5].
뷰 전반에서 - **집계된 성능 신호**: 압축되지 않은 리소스, 과도한 스크립트 평가 및 대역폭 비효율성과 같은 자동 감지된 문제가 포함됩니다.
- **SDK에 의해 캡처된 기기 및 환경 컨텍스트**: 브라우저 또는 운영 체제, 지역, 연결 유형 및 기타 [RUM 속성][6].
- **APM 트레이스**:뷰의 리소스가 백엔드 트레이스와 상관관계가 있을 때. 에이전트는 트레이스 데이터를 사용하여 서버 측 지연을 특정 스팬 및 서비스에 귀속시킵니다. 자세한 내용은 [RUM과 APM 트레이스 상호 연결][7]을 참조하세요.
- **프로파일링 데이터**: 애플리케이션에 대해 [RUM 프로파일링 상호 연결][8]이 활성화될 때. 에이전트는 CPU 프로파일을 사용하여 앱 성능 결과를 코드의 특정 함수에 귀속시킵니다.

뷰에 사용할 수 있는 데이터가 풍부할수록 분석이 더 정확해집니다. RUM과 APM을 연관시키고 프로파일링을 활성화하면 에이전트가 클라이언트 측 타임라인을 넘어 조사를 수행하는 데 도움이 됩니다.

## 근본 원인의 출처 {#sources-of-root-causes}

Datadog의 RUM 에이전트는 뷰에서 성능 저하의 근본 원인을 식별하기 위해 4가지 출처를 분석합니다.

| 출처            | 분석 내용                                                                                              |
|-------------------|---------------------------------------------------------------------------------------------------------------|
| 앱 성능   | 메인 스레드 경합, 코드 실행 및 렌더링 지연과 같은 클라이언트 측 문제.               |
| 서버 측       | 뷰에 영향을 미친 백엔드 지연 및 서버 측 오류.                                                |
| 제3자       | 애플리케이션에 의해 로드된 제3자 스크립트 및 라이브러리로 인한 성능 영향.                                 |
| 환경       | 사용자 경험에 영향을 미친 네트워크 및 인프라 조건.                                    |

## 결과 확인 {#read-the-results}

각 분석 결과는 제목, 문제 설명, 심각도 수준 및 영향을 받는 이벤트에 대한 링크가 포함된 카드로 표시됩니다. 여러 분석 결과는 영향도가 높은 순으로 정렬되므로, 가장 영향력이 큰 문제에 먼저 집중할 수 있습니다.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-results.png" alt="심각도, 설명 및 영향을 받는 이벤트에 대한 링크를 포함하고 영향도가 높은 순으로 정렬된 분석 결과를 나타내는 결과 패널." style="width:70%;" >}}

간단한 채팅 인터페이스를 통해 분석 결과를 추가로 확인할 수 있습니다. 특정 분석 결과에 대한 자세한 정보를 요청하거나 추가 컨텍스트를 요청하거나 관련 증상을 더 살펴볼 수 있습니다.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-chat.png" alt="뷰에서 발견된 문제에 대해 사용자에게 후속 질문을 입력하도록 안내하는 채팅 인터페이스." style="width:70%;" >}}

## 조치 취하기 {#take-action}

조사가 완료되면 패널에서 나가지 않고도 분석 결과에 대해 다음과 같은 조치를 취할 수 있습니다.

- **노트북에 저장**: 전체 타임라인과 결과를 [노트북][1]으로 내보내 팀과 공유합니다.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/notebooks/
[2]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[3]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[4]: /ko/real_user_monitoring/error_tracking/
[5]: /ko/real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[6]: /ko/real_user_monitoring/explorer/search/
[7]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/
[8]: /ko/real_user_monitoring/correlate_with_other_telemetry/profiling/