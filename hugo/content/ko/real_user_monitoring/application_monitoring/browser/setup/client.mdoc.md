---
aliases:
- /ko/real_user_monitoring/setup
- /ko/real_user_monitoring/browser/setup/client
description: NPM 또는 CDN을 사용한 클라이언트 측 계측으로 RUM Browser SDK를 설정하여 웹 애플리케이션의 사용자 경험,
  성능 및 오류를 모니터링합니다.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/advanced_configuration/
  tag: 설명서
  text: 고급 구성
- link: /session_replay/browser/
  tag: 설명서
  text: 세션 리플레이 설정
- link: /real_user_monitoring/error_tracking/browser/
  tag: 설명서
  text: 오류 추적 설정
- link: /real_user_monitoring/correlate_with_other_telemetry/
  tag: 설명서
  text: RUM 이벤트를 다른 텔레메트리와 상호 연결하기
title: 브라우저 모니터링 클라이언트 측 설정
---
## 개요 {% #overview %}

Datadog 브라우저 SDK를 사용하면 웹 애플리케이션에 대해 Real User Monitoring(RUM)을 활성화하여 사용자 경험과 애플리케이션 성능에 대한 포괄적인 가시성을 확보할 수 있습니다. RUM을 사용하면 페이지 로드 시간, 사용자 상호작용, 리소스 로딩 및 애플리케이션 오류를 실시간으로 모니터링할 수 있습니다.

RUM의 주요 기능:

- 페이지 로드, 사용자 작업 및 리소스 요청에 대한 상세 성능 메트릭을 통해 사용자 경험 모니터링
- 세션 리플레이 기능을 통해 애플리케이션 내 사용자 여정 추적
- 성능 병목 현상 식별 및 APM 트레이스와의 연계를 통한 프론트엔드/백엔드 성능의 상관관계 분석

브라우저 SDK는 최신 데스크톱 및 모바일 브라우저를 지원하며 주요 성능 메트릭, 사용자 상호작용 및 애플리케이션 오류를 자동으로 수집합니다. 설정이 완료되면 Datadog에서 애플리케이션별 RUM 구성을 관리하고, 대시보드 및 RUM Explorer에서 수집된 데이터를 시각화할 수 있습니다.

{% partial file="sdk/setup/browser.mdoc.md" /%}

#### 세션 샘플링 비율 설정 {% #set-session-sampling-rates %}

애플리케이션이 Datadog RUM으로 전송하는 데이터 양을 제어하기 위해 브라우저 SDK 초기화 시 RUM 세션의 샘플링 비율을 지정할 수 있습니다. 예를 들어, 세션의 80%를 샘플링하려면 `sessionSampleRate`를 80으로 설정합니다.

```javascript
datadogRum.init({
  applicationId: '<APP_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  sessionSampleRate: 80,
  sessionReplaySampleRate: 20,
  // ... other configuration options
});
```

자세한 내용은 [브라우저 RUM & 세션 리플레이 샘플링][1]을 참조하세요.

## 애플리케이션 모니터링 시작 {% #start-monitoring-your-application %}

RUM의 기본 설정을 완료했으므로, 애플리케이션이 브라우저 오류를 수집하고 실시간으로 문제 모니터링과 디버깅을 시작할 수 있습니다.

[대시보드][3]에서 [수집된 데이터][2]를 시각화하거나 [RUM Explorer][4]에서 검색 쿼리를 생성합니다.

Datadog이 데이터 수신을 시작할 때까지 애플리케이션은 Applications 페이지에 pending으로 표시됩니다.

## 다음 단계 {% #next-steps %}

[고급 구성][5]을 참조하세요.


[1]: /ko/real_user_monitoring/guide/sampling-browser-plans/
[2]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/
[3]: /ko/real_user_monitoring/platform/dashboards/
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/