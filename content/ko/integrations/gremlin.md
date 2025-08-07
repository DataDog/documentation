---
app_id: gremlin
categories:
- 문제 추적
custom_kind: 통합
description: Gremlin에서 발생하는 이벤트를 Datadog으로 전송
further_reading:
- link: https://www.datadoghq.com/blog/gremlin-datadog/
  tag: 블로그
  text: How Gremlin monitors its own Chaos Engineering service with Datadog
integration_version: 1.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Gremlin
---
## 개요

Datadog에서 Gremlin 공격을 직접 확인, 재실행, 중단할 수 있습니다.

Pairing Gremlin with Datadog's [Events](https://docs.datadoghq.com/getting_started/#events) is an effective way to add failure-testing context to your Datadog workflows.

- 대시보드 상단에 공격 이벤트를 오버레이하여 Gremlin이 언제 어떻게 메트릭에 영향을 미치는지 정확히 파악할 수 있습니다.
- Show, Rerun, and Halt Gremlin attacks from your Datadog [Event Stream](https://app.datadoghq.com/event/stream)

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/gremlin/images/events-overlay.png)

## 설정

### 설정

To activate this integration, you need to pass your Datadog API key to Gremlin. This is done on the [Integrations Page](https://app.gremlin.com/settings/integrations), by clicking the **Add** button on the row for **Datadog**. You are prompted for your **Datadog API key**. Once entered, the integration is initialized.

- API key: <span class="hidden-api-key">${api_key}</span>

You should start seeing events from this integration in your [Event Stream](https://app.datadoghq.com/event/stream).

## 수집한 데이터

### Metrics

Gremlin 통합은 메트릭을 제공하지 않습니다.

### 이벤트

The Gremlin integration sends events to your [Datadog Event Stream](https://app.gremlin.com/settings/integrations) when attacks are started or stopped on Gremlin.

### 서비스 점검

Gremlin 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [How Gremlin monitors its own Chaos Engineering service with Datadog](https://www.datadoghq.com/blog/gremlin-datadog/)