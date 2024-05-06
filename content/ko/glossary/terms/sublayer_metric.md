---
core_product:
- apm
title: 하위 계층 메트릭
---
하위 계층 메트릭은 트레이스 내에서 특정 유형 또는 서비스의 실행 기간입니다.

일부 [Tracing Application Metrics][1]는 `sublayer_service` 및 `sublayer_type`으로 태그가 지정되어 트레이스 내에서 개별 서비스의 실행 시간을 확인할 수 있습니다.

하위 계층 메트릭은 서비스에 다운스트림 종속성이 있는 경우에만 사용할 수 있습니다.

[1]: /ko/tracing/metrics/metrics_namespace/