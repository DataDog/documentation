---
description: Datadog의 UI 탐색, 대시보드, 모니터, 통합 및 핵심 플랫폼 기능을 포함한 주요 기능의 개요
further_reading:
- link: https://learn.datadoghq.com/bundles/frontend-engineer-learning-path
  tag: 학습 센터
  text: 프런트엔드 엔지니어 학습 경로
- link: https://learn.datadoghq.com/bundles/backend-engineer-learning-path
  tag: 학습 센터
  text: 백엔드 엔지니어 학습 경로
- link: https://learn.datadoghq.com/bundles/site-reliability-engineer-learning-path
  tag: 학습 센터
  text: 사이트 안정성 엔지니어 학습 경로
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 Datadog의 탄탄한 기반을 구축하세요.
- link: https://www.datadoghq.com/blog/datadog-quick-nav-menu/
  tag: 블로그
  text: Datadog 빠른 이동 메뉴 소개
title: Datadog에서 시작하기
---
{{< learning-center-callout header="학습 센터에서 Datadog 핵심 기술 체험" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/bundles/core-skills-learning-path">}}
  실제 클라우드 컴퓨팅 용량과 Datadog 평가판 계정으로 무료로 학습하세요. 태그 지정, 메트릭, 모니터 및 대시보드에 빠르게 익숙해지려면 이 실습을 시작하세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

이번 가이드에서는 [Datadog 사이트][1]에서 사용할 수 있는 기능을 대략적으로 소개합니다.

<div class="alert alert-info">
  Datadog 사이트 탐색은 브라우저 너비에 따라 달라집니다. 최대 세 가지 유형의 탐색을 사용할 수 있습니다. 내비게이션 유형을 변경하려면 브라우저 너비를 조절해주세요.
  <br><br>
  <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> 키를 눌러 Datadog 전반에서 대시보드 및 모니터와 같은 페이지와 엔터티를 검색할 수 있습니다.
</div>

## 인프라 {#infrastructure}

[인프라 목록][2]은 모든 인프라 리소스(호스트, 컨테이너, 프로세스 등)와 관련 메타데이터를 한곳에서 조회할 수 있는 중앙 화면입니다. 

**주요 기능:**

- 인프라 성능을 조사합니다.
- 태그 및 메트릭을 기반으로 호스트를 정렬, 필터링 및 시각화합니다.
- 호스트를 검사하여 태그, 성능, 상태 등을 검토합니다.

시작하려면 앱에서 [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Hosts{{< /ui >}}][3]로 이동하세요. 자세한 내용은 [인프라 목록 문서][2]를 참조하세요.

## 호스트 및 컨테이너 맵 {#host-and-container-maps}

{{< img src="getting_started/application/host_map_2025.png" alt="가용 영역별로 그룹화된 호스트 맵 개요" >}}

[호스트 및 컨테이너 맵][4]은 모든 호스트와 컨테이너에 대한 시각적 개요를 제공하며, CPU 사용량과 같은 주요 메트릭별로 색상을 구분하여 문제를 파악할 수 있도록 합니다.

**주요 기능**:

- 시각적 맵을 통해 전체 인프라를 한눈에 조회합니다.
- 다양한 메트릭으로 색상을 구분하여 성능 문제를 파악하고, 태그와 메타데이터별로 필터링하고 그룹화합니다.
- 개별 호스트나 컨테이너를 자세히 살펴보고 문제를 해결합니다.

시작하려면 앱에서 [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Host Map{{< /ui >}}][5]으로 이동하세요. 자세한 내용은 [호스트 및 컨테이너 맵 문서][4]를 참조하세요.

## Log Management {#log-management}

[Datadog Log Management][6]를 사용하면 애플리케이션과 인프라에서 생성되는 모든 로그를 전송하고 처리할 수 있습니다. [Live Tail][7]을 사용하여 인덱싱 없이 실시간으로 로그를 관찰할 수 있습니다.

**주요 기능**:

- 모든 서비스, 애플리케이션 및 플랫폼에서 로그를 자동으로 수집합니다.
- 실시간으로 로그를 조회하고 검색하며 서비스, 호스트, 오류 유형 등으로 필터링합니다.
- 보관할 로그와 보관 기간을 선택하여 스토리지 비용을 절감합니다.

시작하려면 앱에서 [{{< ui >}}Logs{{< /ui >}}][8]로 이동하세요. 자세한 내용은 [Log Management 문서][6]를 참조하세요.

## APM {#apm}

[Datadog Application Performance Monitoring][9](APM 또는 트레이싱)은 로그 및 인프라 모니터링과 함께 애플리케이션 성능에 대한 심층적인 인사이트를 제공합니다.

**주요 기능**:

- 분산 시스템 전반에서 애플리케이션으로 들어오는 요청을 엔드투엔드로 트레이싱합니다.
- 요청의 각 단계에서 소요된 시간을 시각화하여 성능 병목 현상을 확인합니다.
- Service Map으로 서비스 종속성과 데이터 흐름을 시각화합니다.
- 트레이스를 해당 로그, 메트릭 및 사용자 세션과 연관시켜 풀스택 컨텍스트를 파악합니다.

시작하려면 앱에서 [{{< ui >}}APM{{< /ui >}}][10]으로 이동하세요. 자세한 내용은 [APM 문서][9]를 참조하세요.

## RUM 및 Session Replay {#rum-session-replay}

Datadog [Real User Monitoring][11](RUM)을 사용하면 웹 및 모바일 애플리케이션 전반에서 실시간 사용자 활동과 경험을 시각화하고 분석할 수 있습니다. [Session Replay][12]를 사용하여 세션을 캡처하고 조회함으로써 사용자 행동을 더 잘 이해할 수 있습니다.

**주요 기능**:
- Core Web Vitals 및 Mobile Vitals를 사용하여 웹 브라우저와 모바일 플랫폼(iOS, Android, React Native, Flutter 등) 전반의 성능을 모니터링합니다.
- 자동 그룹화, 크래시 리포팅 및 의심되는 커밋 식별을 통해 오류를 추적하고 문제를 해결합니다.
- 레이지 클릭(rage clicks) 및 에러 클릭과 같은 사용자 불만 신호를 감지하여 UX 문제를 식별합니다.
- Feature Flag 성능 및 도입률을 모니터링합니다.
- 프런트엔드 문제를 백엔드 트레이스, 로그 및 인프라 메트릭과 연관시켜 풀스택 가시성을 확보합니다.

시작하려면 앱에서 [{{< ui >}}RUM explorer{{< /ui >}}][13]로 이동하세요. 자세한 내용은 [RUM 문서][11]를 참조하세요.

## Synthetic Monitoring {#synthetic-monitoring}

Datadog [Synthetic Monitoring][14]을 사용하면 전 세계에서 시뮬레이션된 요청과 작업을 사전에 모니터링하는 API, 브라우저, 모바일 및 Network Path 테스트를 생성하고 실행할 수 있습니다. 이러한 테스트는 애플리케이션과 API를 모니터링하여 사용자에게 영향을 미치기 전에 성능 문제와 가동 중지를 감지합니다.

**주요 기능**:

- 비즈니스에 중요한 API 엔드포인트와 사용자 여정을 테스트합니다.
- 오류를 감지하고, 회귀를 식별하며, 롤백을 자동화하여 프로덕션 환경에서 문제가 발생하는 것을 방지합니다.
- 다양한 위치에 있는 사용자의 성능 문제를 찾아 경보를 보냅니다.

시작하려면 앱에서 [{{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}][15]으로 이동하세요. 자세한 내용은 [Synthetic Monitoring 문서][14]를 참조하세요.

## Integrations {#integrations}

Datadog의 {{< translate key="integration_count" >}} [integrations][16]을 사용하여 인프라의 모든 메트릭과 로그를 통합하고 전체 관측 가능성 시스템에 대한 인사이트를 얻습니다.

{{< img src="getting_started/application/integrations-2025.png" alt="Integrations" >}}

**주요 기능**:

- 사용 가능한 통합은 클라우드 기술, 인시던트 대응, 데이터 계층, 보안, AI 등을 포괄합니다.
- 통합을 설정한 후에는 데이터 센터에 있는 데이터든, 온라인 서비스의 데이터든 모든 데이터가 Datadog에서 동일하게 처리됩니다.
- [개발자 문서][17]를 사용하여 직접 통합을 구축합니다.

시작하려면 앱에서 [{{< ui >}}Integrations{{< /ui >}}][18]로 이동하거나 [문서][19]에서 통합 목록을 살펴보세요.

## Dashboards {#dashboards}

[대시보드][20]에는 실시간 성능 메트릭이 포함된 그래프가 있어 메트릭, 로그, 트레이스 등 전반에 걸친 데이터를 통합적으로 볼 수 있습니다.

**주요 기능**:

- 기본 제공 대시보드로 시작하거나 특정 질문에 맞게 직접 대시보드를 만듭니다.
- 드래그 앤 드롭 위젯, 사용자 지정 쿼리, 유연한 레이아웃으로 대시보드를 사용자 지정합니다.
- 여러 데이터 유형(메트릭, 로그, APM, RUM 포함)을 한곳에 결합하여 실시간으로 데이터를 조회합니다.
- 팀의 컨텍스트를 위해 댓글이나 이벤트로 그래프에 주석을 추가합니다.

시작하려면 앱에서 [{{< ui >}}Dashboard List{{< /ui >}}][21]로 이동하세요. 자세한 내용은 [대시보드 문서][20]를 참조하세요.

## Monitors {#monitors}

[모니터][22]는 메트릭 기준치, 통합 가용성, 네트워크 엔드포인트 등에 따라 경보와 알림을 표시합니다.

- Datadog에 보고되는 모든 메트릭을 사용하여 모니터를 만듭니다.
- 여러 트리거 조건을 사용하여 복잡한 경보 로직을 구축합니다.
- 경보 메시지에 `@`을(를) 추가하여 적절한 담당자에게 알림을 전달하고 Slack, 이메일, PagerDuty 등으로 경보를 보냅니다.
- 다운타임을 예약하여 시스템 작동 중단, 오프라인 점검 등의 상황에서 알림을 억제합니다.

시작하려면 앱에서 [{{< ui >}}Monitors List{{< /ui >}}][23]으로 이동하세요. 자세한 내용은 [모니터 설명서][22]를 참조하세요.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: /ko/infrastructure/list/
[3]: https://app.datadoghq.com/infrastructure
[4]: /ko/infrastructure/hostmap/
[5]: https://app.datadoghq.com/infrastructure/map
[6]: /ko/logs/
[7]: /ko/logs/explorer/live_tail/
[8]: https://app.datadoghq.com/logs
[9]: /ko/tracing/
[10]: https://app.datadoghq.com/apm/home
[11]: /ko/real_user_monitoring/
[12]: /ko/session_replay/
[13]: https://app.datadoghq.com/rum/sessions
[14]: /ko/synthetics/
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://www.datadoghq.com/product/platform/integrations/
[17]: /ko/extend/integrations/
[18]: https://app.datadoghq.com/integrations
[19]: /ko/integrations/
[20]: /ko/dashboards/
[21]: https://app.datadoghq.com/dashboard/lists
[22]: /ko/monitors/
[23]: https://app.datadoghq.com/monitors/manage