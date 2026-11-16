---
description: 데이터 레이크를 Datadog에 연결하여 Iceberg 표 메타데이터, 최신성 및 품질을 모니터링합니다.
further_reading:
- link: /data_observability/
  tag: 문서
  text: Data Observability 개요
- link: https://www.datadoghq.com/architecture/monitoring-insurance-data-lakes-on-aws-using-datadog/
  tag: 아키텍처 센터
  text: Datadog을 사용하여 AWS에서 보험 데이터 레이크 모니터링하기
title: 데이터 레이크 통합
---
## 개요 {#overview}

Datadog Data Observability는 데이터 레이크 카탈로그에 연결하여 Iceberg 표의 상태를 모니터링합니다. 연결되면 Datadog은 스키마, 최신성, 행 수, 표 크기를 포함한 표 메타데이터를 동기화합니다.

이 통합을 사용하여 다음을 수행하세요.
- **Iceberg 표 메타데이터를 동기화**하여 Datadog이 데이터 레이크 구조와 동기화 상태를 유지하도록 합니다.
- **데이터 최신성을 모니터링**하여 오래되었거나 지연된 데이터를 탐지합니다.
시간에 따른 행 수 및 표 크기 등 - **표와 관련된 메트릭을 추적**합니다.

{{< whatsnext desc="다음 데이터 레이크 카탈로그에 연결하세요." >}}
   {{< nextlink href="data_observability/quality_monitoring/data_lakes/aws_glue" >}}Iceberg 표(AWS Glue){{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}