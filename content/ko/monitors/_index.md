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
    - 알림
    - 경고
    - 모니터링
description: 경고 플랫폼을 사용하여 모니터 생성, 알림 및 자동화 설정, 모니터 관리
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: 릴리스 노트
  text: 최신 Datadog 경고 릴리스를 확인하세요!(앱 로그인 필요)
- link: https://dtdg.co/fe
  tag: 기초 구축
  text: 효과적인 모니터 생성에 대한 대화형 세션에 참여하세요
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: 블로그
  text: '모니터링 101: 중요한 사항에 대한 경고'
- link: /api/v1/monitors/
  tag: 설명서
  text: Datadog 모니터 API
title: 모니터링
---

## 개요

Datadog 모니터링은 인프라스트럭처에 관한 중요한 가시성을 제공하여, 성능 문제 및 서비스 중단을 사전에 감지하고 실시간으로 대응할 수 있도록 도와드립니다. 조직은 주요 메트릭 및 임계값을 추적하도록 모니터링을 설정하여 시스템 다운타임이 발생하거나 문제가 고객에게 영향을 미치기 전에 즉시 알림을 받고 해당 문제를 해결할 수 있습니다.

경고 플랫폼을 통해 메트릭, 통합 가용성 및 네트워크 엔드포인트를 확인하여 중요 변경 사항을 모니터링할 수 있습니다. Datadog 모니터링을 사용하면 다음 작업을 수행할 수 있습니다.
- 모니터링 및 응답 프로세스 간소화
- 운영 효율성 향상
- 성능 최적화

## 시작하기

Datadog 모니터링을 시작하는 가장 빠른 방법은 [권장 모니터링][1]을 활용하는 것입니다. 이는 Datadog 및 통합 파트너가 미리 설정한 Datadog의 모니터링 모음입니다.

또한 학습 센터(Learning Center)의 랩 환경이나 모니터링 시작하기 지침에 따라 처음부터 직접 모니터링을 만들 수 있습니다.

{{< whatsnext desc="다음 리소스를 사용하여 모니터링 생성하기:" >}}
  {{< nextlink href="/getting_started/monitors/" >}}모니터링 시작하기: 메트릭 기반 모니터링 생성 방법{{< /nextlink >}}
  {{< nextlink href="/monitors/types/" >}}모니터링 유형으로 모니터링 생성하기{{< /nextlink >}}
  {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}학습 센터: 샌드박스 랩 환경에서 모니터 구축{{< /nextlink >}}
{{< /whatsnext >}}

## 집계 데이터 분석

데이터는 이해하기 쉽고, 세부적이며 범위에 따라 태그가 지정되고 장기 보관되어야 합니다. 긴급도에 따라 알림 및 진단에 다양한 데이터 유형을 활용하세요. 모든 애플리케이션을 계측하고 가능한 한 많은 관련 데이터를 수집하면 복잡한 시스템에 대한 종합적인 측정 및 관측이 가능합니다.

Datadog으로 애플리케이션의 서비스 상태와 인프라스트럭처의 상태를 측정합니다. Datadog 플랫폼 전반의 데이터를 사용하여 잠재적 문제에 대한 알림을 생성하세요.

## 중요한 사항에 대한 알림

[모니터링 알림][2]을 설정하여 팀에 문제를 알리고 트러블슈팅 지침을 제공합니다. 적합한 팀원에게 해당 알림을 전달하고, 템플릿 변수를 활용하여 상세 정보를 포함합니다. 이메일 또는 Slack으로 경고를 보낼 때 스냅샷을 첨부합니다.

경고 피로도를 줄여 팀이 중요한 사항에 대한 알림을 해결하는 데 집중할 수 있도록 합니다. [다운타임][3]을 생성하여 애플리케이션 유지 관리 도중 알림을 음소거합니다. 

## 다음 단계

모니터링과 알림은 IT 시스템과 애플리케이션의 안정성, 성능, 가용성을 보장하기 위한 필수 도구입니다. 문제가 커지기 전에 해당 문제를 신속하게 감지하고 대응하여 운영 효율성을 유지하고 사용자 경험을 개선하며 잠재적 위험을 완화할 수 있도록 도와드립니다. 모니터링의 기능에 대해 자세히 알아보세요. 
1. [다운타임을 예약하여 모니터링을 음소거합니다.][4]
1. [모니터링을 관리 및 구성합니다.][5]
1. [상태 페이지를 통해 알림을 조사합니다.][6]
1. [모니터링 품질 페이지에서 잘못 설정된 모니터링을 해결합니다.][7]

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/recommended
[2]: /ko/monitors/notify
[3]: /ko/monitors/downtimes
[4]: /ko/monitors/downtimes/?tab=bymonitorname
[5]: /ko/monitors/manage
[6]: /ko/monitors/status/status_page
[7]: /ko/monitors/quality/