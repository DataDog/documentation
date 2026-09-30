---
app_id: neoload
categories:
- 알림
- 테스트
custom_kind: 통합
description: NeLoad 성능 테스트 결과 모니터링 및 분석
integration_version: 1.0.0
media:
- caption: NeLoad Performance Testing 대시보드
  image_url: images/neoload-dashboard.png
  media_type: image
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: NeoLoad
---
## 개요

[Tricentis NeoLoad](https://www.tricentis.com/products/performance-testing-neoload) simplifies and scales performance testing for APIs and microservices, as well as end-to-end application testing through protocol and browser-based capabilities.

NeoLoad 통합을 사용해 NeoLoad 테스트 성능 메트릭을 추적할 수 있습니다.

- NeoLoad에서 애플리케이션 성능과 로드 테스팅 메트릭을 연결하세요.
- Analyze and visualize NeoLoad metrics in Datadog like throughput, errors, and performance using the out-of-the-box dashboard or [Metrics Explorer](https://docs.datadoghq.com/metrics/explorer).

## 설정

### 설정

For detailed instructions on NeoLoad configuration, follow the [NeoLoad documentation](https://documentation.tricentis.com/neoload/latest/en/content/reference_guide/datadog.htm). Since NeoLoad version 9.1, you can choose which metrics to send in the **Push Counters** configuration of the Datadog Connector in NeoLoad.

Datadog에서 NeoLoad 통합을 설치해 기본 NeoLoad 대시보드를 대시보드 목록에 추가하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **NeoLoad.Controller.User.Load** <br>(count) | Number of Virtual Users running during a NeoLoad test<br>_Shown as user_ |
| **NeoLoad.Controller.Throughput** <br>(count) | Throughput during a NeoLoad test<br>_Shown as megabyte_ |
| **NeoLoad.Request.PerSecond** <br>(rate) | Number of HTTP requests sent per second during a NeoLoad test<br>_Shown as request_ |
| **NeoLoad.Transaction.PerSecond** <br>(rate) | Number of Transactions completed per second during a NeoLoad test<br>_Shown as transaction_ |
| **NeoLoad.Request.Errors** <br>(count) | Number of errors during a NeoLoad test<br>_Shown as error_ |

### 이벤트

All NeoLoad performance tests events are sent to your [Datadog Events Explorer](https://docs.datadoghq.com/events/).
NeoLoad sends events to the Datadog API when a performance test starts and ends.
Set the option in the **Push Counters** configuration of the Datadog Connector in NeoLoad. Available since NeoLoad 9.1.

## 트러블슈팅

Need help? Contact [Datadog support](https://docs.datadoghq.com/help/) or [Tricentis NeoLoad support](https://support-hub.tricentis.com/).