---
algolia:
  tags:
  - monitors
  - alerts
aliases:
- /ko/guides/monitors/
- /ko/guides/monitoring/
- /ko/guides/alerting/
- /ko/guides/monitors/the-conditions
- /ko/monitoring
cascade:
  algolia:
    rank: 70
    tags:
    - alerts
    - alerting
    - monitoring
description: 경고 플랫폼을 사용하여 모니터 생성, 알림 및 자동화 설정, 모니터 관리
further_reading:
- link: /api/v1/monitors/
  tag: 설명서
  text: Datadog 모니터 API
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 효과적인 모니터 생성에 대한 대화형 세션에 참여하세요
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: 블로그
  text: '모니터링 101: 중요한 사항에 대한 경보'
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: 블로그
  text: Datadog 모니터 알림 규칙을 사용해 모니터 경보 라우팅
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: 블로그
  text: 기본 모니터와 ECS Explorer를 사용하여 ECS 문제를 더 빠르게 탐지하고 해결
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: 블로그
  text: '규모에 맞는 Datadog 최적화: Zendesk의 비용 효율적 관측 가능성'
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: 블로그
  text: Sensitive Data Scanner에서 ML을 사용하여 로그의 인명 감지
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: 릴리스 노트
  text: 최신 Datadog Alerting 릴리스를 확인하세요! (앱 로그인 필요).
- link: https://learn.datadoghq.com/courses/apm-monitors-and-alerting
  tag: 학습 센터
  text: APM Monitors and Alerting
title: 모니터
---
## 개요 {#overview}

Datadog Monitor를 사용하면 인프라에 대한 중요한 가시성을 제공하여 성능 문제 및 장애를 사전에 탐지하고 실시간으로 대응할 수 있습니다. 주요 메트릭과 임계값을 추적하도록 모니터를 구성하면 조직은 즉각적인 경보를 받고 고객 영향이나 시스템 가동 중지가 발생하기 전에 문제를 해결할 수 있습니다.

Alerting 플랫폼을 통해 메트릭, 통합 가용성 및 네트워크 엔드포인트를 확인하여 중요한 변경 사항을 모니터링하세요. Datadog Monitor를 사용하면 다음이 가능합니다.
- 모니터링 및 응답 프로세스 간소화
- 운영 효율성 향상
- 성능 최적화

## 시작하기 {#get-started}

Datadog Monitor를 시작하는 가장 빠른 방법은 [모니터 템플릿][1]을 사용하는 것입니다. 모니터 템플릿은 Datadog 및 통합 파트너가 미리 구성해 둔 모니터 모음입니다.

또한 학습 센터의 실습 환경이나 모니터 시작하기 가이드를 통해 처음부터 직접 모니터를 생성할 수도 있습니다.

{{< whatsnext desc="모니터 생성에 사용할 수 있는 리소스:" >}}
    {{< nextlink href="/getting_started/monitors/" >}}모니터 시작하기: 메트릭 기반 모니터를 구축하는 방법에 대한 가이드{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}모니터 유형에서 모니터 만들기{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}학습 센터: 샌드박스 실습 환경에서 모니터 구축{{< /nextlink >}}
{{< /whatsnext >}}

## 집계 데이터 분석 {#analyze-aggregate-data}

데이터는 잘 이해되고, 세분화되어 있으며, 범위에 따라 태그가 붙어 있고, 장기간 보존되어야 합니다. 긴급도 수준에 따라 경보와 진단에 서로 다른 데이터 유형을 사용하는 것이 좋습니다. 복잡한 시스템에 대한 포괄적인 측정과 관측성을 확보하기 위해 모든 애플리케이션을 계측하고 가능한 한 많은 관련 데이터를 수집하세요.

Datadog을 사용하여 애플리케이션 상태와 인프라 상태를 측정하세요. Datadog 플랫폼 전반의 데이터를 활용하여 잠재적인 문제를 탐지하는 경보를 생성하세요.

## 중요한 사항에 대한 경보 {#alert-on-what-matters}

[Monitor Notifications][2]를 설정하여 문제 발생 시 팀에 알리고 문제 해결 가이드를 제공하세요. 적절한 담당자에게 알림을 전달하고, 세부 정보를 포함하기 위한 템플릿 변수를 활용하며, 이메일이나 Slack으로 경보를 보낼 때 스냅샷을 첨부하세요.

경보 피로를 줄여 팀이 정말 중요한 경보 해결에 집중할 수 있도록 하세요. 애플리케이션 유지보수 기간 동안 경보음을 소거하려면 [가동 중지][3]를 생성하세요.

## 다음 단계 {#whats-next}

모니터와 경보는 IT 시스템과 애플리케이션의 신뢰성, 성능 및 가용성을 보장하는 데 필수적인 도구입니다. 이들은 운영 효율성을 유지하고, 사용자 경험을 개선하며, 문제가 확대되기 전에 신속하게 감지하고 대응할 수 있도록 하여 잠재적인 위험을 완화하는 데 도움을 줍니다. 모니터 기능에 대해 자세히 알아보세요. 
1. [가동 중지 예약을 통해 모니터 음소거][4]
1. [모니터링 구성 및 관리][5]
1. [상태 페이지를 통한 경보 조사][6]
1. [모니터 품질 페이지에서 잘못 설정된 모니터 해결][7]

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/templates
[2]: /ko/monitors/notify
[3]: /ko/monitors/downtimes
[4]: /ko/monitors/downtimes/?tab=bymonitorname
[5]: /ko/monitors/manage
[6]: /ko/monitors/status/status_page
[7]: /ko/monitors/quality/