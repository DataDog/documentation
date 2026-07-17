---
aliases:
- /ko/real_user_monitoring/browser/
description: Datadog RUM 브라우저 SDK를 사용하여 실제 사용자 데이터 및 프런트엔드 성능을 모니터링하여 웹 경험을 최적화하고
  스택 전체에서 문제를 식별합니다.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM Explorer에 대해 자세히 알아보기
- link: /logs/log_collection/javascript/
  tag: 설명서
  text: 로그를 위한 Datadog Browser SDK에 대해 자세히 알아보기
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: 학습 센터
  text: Real User Monitoring(RUM) 소개
title: RUM 브라우저 모니터링
---
## 개요 {#overview}

Datadog Real User Monitoring(RUM)을 사용하면 애플리케이션을 사용하는 개개인의 실시간 성능 및 사용자 여정을 시각화하고 분석할 수 있습니다.

## 브라우저 애플리케이션 모니터링 시작 {#start-monitoring-browser-applications}

브라우저용 RUM을 시작하려면 애플리케이션을 생성하고 브라우저 SDK를 구성하세요.

{{< whatsnext desc="이 섹션에는 다음 주제가 포함되어 있습니다." >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>클라이언트 측</u>: 브라우저 기반 웹 애플리케이션 각각을 계측하고 애플리케이션을 배포한 다음 추적하려는 초기화 파라미터를 구성하고, 고급 구성을 사용해 RUM이 수집하는 데이터와 컨텍스트를 추가로 관리합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>자동 계측</u>: RUM SDK JavaScript 스크립틀릿을 웹 서버 또는 프록시를 통해 제공되는 웹 애플리케이션의 HTML 응답에 주입합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring">}}<u>에이전틱 온보딩</u>: (미리 보기 상태) 프로젝트의 프레임워크를 감지하는 AI 기반 설정을 수행하고 프롬프트 하나를 사용해 RUM SDK를 추가합니다. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/advanced_configuration">}}<u>고급 구성</u>: RUM 브라우저 SDK가 데이터 수집을 수정하고, 조회 이름을 재정의하고, 사용자 세션을 관리하고 애플리케이션의 요구 사항에 맞춰 샘플링을 조절하도록 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins">}}<u>빌드 플러그인</u>: Datadog 빌드 플러그인을 JavaScript 번들러와 통합하여 소스 맵 업로드, 액션 이름 난독화 해제, 기타 RUM 작업을 빌드 타임에 자동화합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/data_collected">}}<u>수집된 데이터</u>: 브라우저 SDK가 수집하는 데이터를 검토합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_page_performance">}}<u>페이지 성능 모니터링</u>: 조회 타이밍을 모니터링하여 사용자의 관점에서 애플리케이션 성능을 이해합니다. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/optimizing_performance">}}<u>성능 최적화</u>: RUM Optimization 페이지를 사용하여 Core Web Vitals 분석 및 사용자 경험 시각화를 사용해 브라우저 성능 문제를 식별하고 해결합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance">}}<u>리소스 성능 모니터링</u>: 브라우저 리소스 성능을 모니터링하고 RUM 데이터를 백엔드 트레이스와 연결하여 전체적인 가시성을 확보합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/collecting_browser_errors">}}<u>브라우저 오류 수집</u>: 수동 오류 수집 및 React 오류 경계를 포함해 RUM 브라우저 SDK를 사용하여 여러 소스에서 프런트엔드 오류를 수집하고 추적하는 방법을 알아보세요.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/tracking_user_actions">}}<u>사용자 액션 추적</u>: 자동 클릭 감지 및 액션 성능 인사이트를 사용하여 브라우저 애플리케이션에서의 사용자 상호 작용을 추적하고 분석합니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/frustration_signals">}}<u>불만 신호</u>: RUM 불만 신호(연속 클릭, 무반응 클릭 및 오류 클릭 포함)를 사용해 사용자 마찰 지점을 식별하여 사용자 경험을 개선하고 이탈을 줄입니다.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/troubleshooting">}}<u>문제 해결</u>: 일반적인 브라우저 SDK 문제를 해결합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}