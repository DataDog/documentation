---
description: RUM without Limits에서 기본 제공되는 성능 메트릭을 알아봅니다.
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: 문서
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: 문서
  text: 보존 필터
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: 문서
  text: 보존 할당량으로 비용 제어
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: 가이드
  text: 보존 필터 모범 사례
title: 메트릭으로 성능 분석
---
## 개요 {#overview}

{{< img src="real_user_monitoring/rum_without_limits/filters-rum-measure-view.png" alt="4주간 Android 앱에서 비정상 종료가 발생하지 않은 세션의 비율을 시각화한 그래프" style="width:90%" >}}

Datadog은 시간 경과에 따른 애플리케이션 상태를 종합적으로 파악할 수 있도록 다음과 같은 기본 제공 메트릭을 제공합니다. 정확성을 보장하기 위해 이러한 메트릭은 세션을 보존하거나 폐기하기 전에 계산됩니다. 즉, 세션의 0.01%만 유지하더라도 이러한 메트릭은 수집된 세션의 100%를 기준으로 계산됩니다. 이러한 메트릭은 [성능 요약][1]에 사용되어 앱 성능에 대한 정확한 개요를 제공합니다.

**참고**:
- 아래 표에 명시된 {{< ui >}}Default{{< /ui >}} 카디널리티에는 환경, 앱 이름, 앱 ID, 앱 버전, 서비스, OS 이름, OS 버전, 브라우저 이름 및 국가의 디멘션이 포함됩니다.
- 아래 메트릭에 대한 모든 쿼리에는 `@session.type:user`가 포함되지만, 실제 사용자 세션이 아닌 브라우저 Synthetic 테스트 감사에서 가져오는 `rum.measure.lighthouse.*` 메트릭은 예외입니다. [Lighthouse 감사][5]를 참조하세요.
- 아래 나열된 메트릭 외에 추가적인 성능 메트릭이 필요한 경우, RUM 이벤트에서 [사용자 지정 메트릭][2]을 생성할 수 있습니다. 기본 제공 메트릭과 사용자 지정 메트릭 모두 수집된 전체 트래픽(100%)을 기준으로 계산됩니다.
- 일부 메트릭은 세션이나 뷰가 처음 탐지될 때 캡처됩니다. 다른 메트릭은 세션이나 뷰가 비활성 상태가 될 때 캡처됩니다. 짧은 시간 동안 이러한 메트릭을 비교하면 예상치 못한 비율이 나타날 수 있습니다. [메트릭 계산 시점](#when-metrics-are-computed)을 참조하세요.

| 메트릭 이름 | 설명 | 디멘션 | 플랫폼 |
|-------------|-------------|------------|----------|
| `rum.measure.app.startup_to_full_display` | 애플리케이션 실행 중 전체 화면 표시까지 걸리는 시간 | 기본값, 백분위수 분석 | 모바일 전용 |
| `rum.measure.app.startup_to_initial_display` | 애플리케이션 실행 중 초기 화면 표시까지 걸리는 시간 | 기본값, 백분위수 분석 | 모바일 전용 |
| `rum.measure.error` | 오류 수 | 기본값, 충돌 여부, 뷰 이름 | 모바일 및 브라우저 |
| `rum.measure.error.anr` | ANR(Android 응답 없음) 수 | 기본값, 충돌 여부, 뷰 이름 | 모바일 전용 |
| `rum.measure.error.hang` | 행 발생 횟수(iOS 앱 멈춤 현상) | 기본값 | 모바일 전용 |
| `rum.measure.error.hang.duration` | 행 지속 시간(iOS 앱 멈춤 현상) | 기본값, 뷰 이름 | 모바일 전용 |
| `rum.measure.lighthouse.performance` | Lighthouse Performance 카테고리 점수(0~100) | 앱 ID, 뷰 이름 | 브라우저 전용 |
| `rum.measure.lighthouse.accessibility` | Lighthouse Accessibility 카테고리 점수(0~100) | 앱 ID, 뷰 이름 | 브라우저 전용 |
| `rum.measure.lighthouse.best_practices` | Lighthouse Best Practices 카테고리 점수(0~100) | 앱 ID, 뷰 이름 | 브라우저 전용 |
| `rum.measure.lighthouse.seo` | Lighthouse SEO 카테고리 점수(0~100) | 앱 ID, 뷰 이름 | 브라우저 전용 |
| `rum.measure.lighthouse.agentic` | Lighthouse Agentic 카테고리 점수(0~100) | 앱 ID, 뷰 이름 | 브라우저 전용 |
| `rum.measure.session` | 세션 수 | 기본값 | 모바일 및 브라우저 |
| `rum.measure.session.action` | 액션 수 | 기본값 | 모바일 및 브라우저 |
| `rum.measure.session.crash_free` | 비정상 종료가 발생하지 않은 세션 수 | 기본값 | 모바일 전용 |
| `rum.measure.session.error` | 세션당 오류 수(@session.error.count) | 기본값, 백분위수 분석 | 모바일 및 브라우저 |
| `rum.measure.session.frustration` | 사용자 불만족 시그널 수 | 기본값 | 모바일 및 브라우저 |
| `rum.measure.session.inactive` | 비활성 세션 수 | 기본값 | 모바일 및 브라우저 |
| `rum.measure.session.time_spent` | 세션 지속 시간 | 기본값, 백분위수 분석 | 모바일 및 브라우저 |
| `rum.measure.view` | 뷰 수 | 기본값, 뷰 이름 | 모바일 및 브라우저 |
| `rum.measure.view.cpu_ticks_per_second` | 초당 CPU 틱 | 기본값, 뷰 이름 | 모바일 전용 |
| `rum.measure.view.crash_free` | 비정상 종료가 발생하지 않은 세션 비율 | 기본값, 뷰 이름 | 모바일 전용 |
| `rum.measure.view.cumulative_layout_shift` | Cumulative Layout Shift | 기본값, 백분위수 분석, 뷰 이름 | 브라우저 전용 |
| `rum.measure.view.loading_time` | 페이지가 준비되고 진행 중인 네트워크 요청이나 DOM 변경이 없는 상태가 될 때까지 걸리는 시간 | 기본값, 백분위수 분석, 뷰 이름 | 모바일 및 브라우저 |
| `rum.measure.view.error_free` | 오류 없는 세션 수 | 기본값, 뷰 이름 | 모바일 및 브라우저 |
| `rum.measure.view.first_contentful_paint` | 브라우저가 텍스트, 이미지(배경 이미지 포함), 흰색이 아닌 캔버스 또는 SVG를 처음 렌더링하는 시간 | 기본값, 백분위수 분석, 뷰 이름 | 브라우저 전용 |
| `rum.measure.view.frozen_frame` | 멈춘 프레임 수 | 기본값, 뷰 이름 | 모바일 전용 |
| `rum.measure.view.frozen_frame_free` | 멈춘 프레임이 없는 뷰 수 | 기본값 | 모바일 전용 |
| `rum.measure.view.inactive` | 비활성 뷰 수 | 기본값, 백분위수 분석 | 모바일 및 브라우저 |
| `rum.measure.view.interaction_to_next_paint` | 사용자의 페이지 상호작용과 다음 페인트 간에 경과한 가장 긴 시간  | 기본값, 백분위수 분석 | 브라우저 전용 |
| `rum.measure.view.interaction_to_next_view` | 이전 뷰에서의 마지막 사용자 상호작용과 현재 뷰 시작 사이의 시간 | 기본값, 백분위수 분석 | 모바일 전용 |
| `rum.measure.view.largest_contentful_paint` | 페이지 로드 중 뷰포트(화면에 보이는 영역)에서 가장 큰 DOM 객체가 렌더링되는 시점 | 기본값, 백분위수 분석, 뷰 이름 | 브라우저 전용 |
| `rum.measure.view.memory` | 사용된 시스템 메모리 양 | 기본값, 백분위수 분석 | 모바일 전용 |
| `rum.measure.view.network_settled` | 네트워크 안정화 | 기본값, 백분위수 분석 | 모바일 전용 |
| `rum.measure.view.refresh_rate` | 사용자의 평균 새로 고침 빈도(FPS) | 기본값, 백분위수 분석 | 모바일 전용 |
| `rum.measure.view.slow_rendered` | 느리게 렌더링된 뷰 수 | 기본값 | 모바일 전용 |
| `rum.measure.view.time_spent` | 현재 뷰에서 보낸 시간 | 기본값 | 모바일 및 브라우저 |

## 메트릭 계산 시점 {#when-metrics-are-computed}

메트릭은 세션 또는 뷰의 수명 주기에서 서로 다른 시점에 캡처됩니다.

- {{< ui >}}On detection{{< /ui >}}: `rum.measure.session` 및 `rum.measure.view`는 세션 또는 뷰가 처음 탐지될 때 캡처됩니다.
- {{< ui >}}On inactivity{{< /ui >}}: `rum.measure.session.inactive`, `rum.measure.session.crash_free`, `rum.measure.view.inactive`, `rum.measure.view.crash_free`와 같은 메트릭은 세션 또는 뷰가 비활성 상태가 될 때(즉, 세션 또는 뷰가 종료될 때) 캡처됩니다.

특정 시간 구간에서 시작된 세션이나 뷰가 다른 시간 구간에서 종료될 수 있으므로, 짧은 시간 구간에서 탐지 시점 메트릭과 비활성화 시점 메트릭을 비교하면 비율이 100%를 초과하는 등 예상치 못한 결과가 발생할 수 있습니다.

예를 들어, 전날의 많은 세션이 여전히 활성 상태이고 당일에 종료되는 경우, 오늘 집계된 비활성 세션 수가 오늘 시작된 세션 수를 초과할 수 있습니다. 이는 비정상 종료가 발생하지 않은 세션 비율 (`rum.measure.session.crash_free`/`rum.measure.session`)과 같은 비율이 100%를 초과하는 값을 반환할 수 있으며, 이는 정상적인 동작입니다.

**권장 사항**: 탐지 시점 메트릭과 비활성화 시점 메트릭을 결합하여 비율을 계산할 때는 대부분의 세션이 시작되고 종료되는 시점을 모두 포함할 수 있도록 충분히 긴 시간 구간(예: 1주일 이상)을 사용하세요.

## API {#api}

메트릭은 [APIs][3] 또는 Datadog 전용 [Terraform modules][4]를 통해 관리할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /ko/real_user_monitoring/platform/generate_metrics/
[3]: /ko/api/latest/rum-metrics/
[4]: https://registry.terraform.io/providers/DataDog/datadog/3.60.0/docs/resources/rum_metric
[5]: /ko/real_user_monitoring/application_monitoring/browser/optimizing_performance/#lighthouse-audits